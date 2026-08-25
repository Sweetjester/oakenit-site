'use server';

import { fileInquiry } from '@/lib/heartwood';

export type InquiryState =
  | { status: 'idle' }
  | { status: 'success' }
  | { status: 'error'; message: string; fieldErrors?: Record<string, string> };

// Public-facing email is hello@oakenit.com (shown across the site),
// but inquiries are delivered to andy@oakenit.com — which is the
// Resend account owner. hello@ is a Google Workspace alias of andy@,
// so this still arrives in the same inbox. Override with the env var
// once the oakenit.com domain is verified in Resend.
const TO_EMAIL = process.env.INQUIRY_TO_EMAIL || 'andy@oakenit.com';

/**
 * Sender. Defaults to Resend's shared onboarding domain so the form
 * works the instant RESEND_API_KEY is set — no DNS verification required.
 * Once oakenit.com is verified in Resend, set:
 *   RESEND_FROM_EMAIL="OakenIT Inquiries <inquiries@oakenit.com>"
 */
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || 'OakenIT Inquiries <onboarding@resend.dev>';

export async function submitInquiry(
  _prev: InquiryState,
  formData: FormData
): Promise<InquiryState> {
  // Honeypot — if filled, silently "succeed" so bots don't retry.
  if ((formData.get('website') as string)?.trim()) {
    return { status: 'success' };
  }

  // Time-trap — submitted under 1.5s = probable bot.
  const startedAt = Number(formData.get('startedAt') ?? 0);
  if (startedAt && Date.now() - startedAt < 1500) {
    return { status: 'success' };
  }

  const name = (formData.get('name') as string)?.trim();
  const email = (formData.get('email') as string)?.trim();
  const company = (formData.get('company') as string)?.trim() || '—';
  const project = (formData.get('project') as string)?.trim();

  const fieldErrors: Record<string, string> = {};
  if (!name) fieldErrors.name = 'Tell us your name.';
  if (!email) fieldErrors.email = 'We need an email to reply.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    fieldErrors.email = 'That email doesn’t look right.';
  if (!project) fieldErrors.project = 'Tell us something — even one line.';

  if (Object.keys(fieldErrors).length) {
    return { status: 'error', message: 'Please fix the highlighted fields.', fieldErrors };
  }

  // File the lead into Heartwood BEFORE attempting email.
  //
  // Email is a notification; Heartwood is the record. Doing it in this order
  // means a lead survives a missing API key, a bounced address, or a Resend
  // outage — it lands on the sales board either way. fileInquiry never throws.
  const filed = await fileInquiry({
    name,
    email,
    company: company === '—' ? '' : company,
    message: project,
    source: 'oakenit.com/#contact',
  });

  if (filed.ok) {
    console.log(`[inquiry] filed to Heartwood as item #${filed.itemId}`);
  } else {
    console.error(`[inquiry] Heartwood ingest failed: ${filed.reason}`);
  }

  const subject = `New inquiry — ${name}${company !== '—' ? ` (${company})` : ''}`;
  const text = [
    `Name:       ${name}`,
    `Email:      ${email}`,
    `Company:    ${company}`,
    '',
    'Enquiry:',
    project,
  ].join('\n');

  const html = `
    <div style="font-family:Inter,system-ui,sans-serif;color:#1a1816;line-height:1.55;">
      <h2 style="font-family:Georgia,serif;color:#b46000;margin:0 0 16px;">New OakenIT inquiry</h2>
      <table style="border-collapse:collapse;width:100%;max-width:560px;">
        <tr><td style="padding:6px 12px 6px 0;color:#666;width:140px;">Name</td><td><strong>${escapeHtml(name)}</strong></td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#666;">Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#666;">Company</td><td>${escapeHtml(company)}</td></tr>
      </table>
      <h3 style="font-family:Georgia,serif;margin:24px 0 8px;">Enquiry</h3>
      <p style="white-space:pre-wrap;background:#f5f1ea;padding:16px;border-radius:8px;">${escapeHtml(project)}</p>
    </div>
  `;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[inquiry] RESEND_API_KEY not set — logging instead of sending:');
    console.log(text);
    // Not a silent loss any more: the lead is on the Heartwood sales board
    // if the ingest above succeeded.
    return { status: 'success' };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject,
        text,
        html,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error('[inquiry] Resend error', res.status, body);

      // Try to surface the actual reason so we can debug from the UI.
      let detail = body;
      try {
        const parsed = JSON.parse(body);
        detail = parsed.message || parsed.error || body;
      } catch {
        /* keep raw body */
      }
      const trimmed = String(detail).slice(0, 280);

      // The visitor's inquiry is already safe on the sales board, so telling
      // them it failed would be untrue and would lose us the lead twice over.
      // Log loudly for us; show them the success they actually got.
      if (filed.ok) {
        console.error('[inquiry] email failed but lead is captured in Heartwood — treating as success');
        return { status: 'success' };
      }

      return {
        status: 'error',
        message: `Email send failed (${res.status}): ${trimmed}`,
      };
    }

    return { status: 'success' };
  } catch (err) {
    console.error('[inquiry] Network error', err);

    if (filed.ok) {
      console.error('[inquiry] email network error but lead is captured in Heartwood — treating as success');
      return { status: 'success' };
    }

    return {
      status: 'error',
      message: `Network error: ${err instanceof Error ? err.message : String(err)}`,
    };
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
