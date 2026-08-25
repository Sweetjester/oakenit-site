/**
 * Heartwood — the OakenIT internal operating system.
 *
 * Repo: Sweetjester/heartwood. It runs on an append-only event log, and every
 * inquiry filed here becomes a card on its sales board plus a `lead.received`
 * event, so a lead is durable business state rather than a message that has to
 * be noticed in an inbox.
 *
 * The token carries only the `ingest` scope: it can file a lead and nothing
 * else. It cannot read the business, write documents, or see the approval
 * queue. If this environment ever leaks, the exposure is "someone can create
 * leads", not "someone can read OakenIT".
 *
 * ── The one rule for this module ──────────────────────────────────────────
 * A visitor's form submission must NEVER fail because Heartwood is slow, down,
 * or misconfigured. Every function here swallows its own errors and reports
 * success/failure as a value. Callers log the result; they do not branch the
 * user-facing outcome on it.
 */

const BASE = process.env.HEARTWOOD_URL || 'https://heartwood-app-production.up.railway.app';
const TOKEN = process.env.HEARTWOOD_INGEST_TOKEN;

/** Fail fast rather than leaving a visitor waiting on our internal systems. */
const TIMEOUT_MS = 4000;

export type IngestResult =
  | { ok: true; itemId: string; eventId: string }
  | { ok: false; reason: string };

export interface InquiryPayload {
  name: string;
  email: string;
  company?: string;
  message: string;
  source?: string;
}

export async function fileInquiry(inquiry: InquiryPayload): Promise<IngestResult> {
  if (!TOKEN) {
    return { ok: false, reason: 'HEARTWOOD_INGEST_TOKEN not set' };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(`${BASE}/ingest/inquiry`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: inquiry.name,
        email: inquiry.email,
        company: inquiry.company || '',
        message: inquiry.message,
        source: inquiry.source || 'oakenit.com',
      }),
      signal: controller.signal,
      cache: 'no-store',
    });

    if (!res.ok) {
      const body = await res.text().catch(() => '');
      return { ok: false, reason: `${res.status} ${body.slice(0, 200)}` };
    }

    const data = (await res.json()) as { item_id?: string; event_id?: string };
    return {
      ok: true,
      itemId: String(data.item_id ?? ''),
      eventId: String(data.event_id ?? ''),
    };
  } catch (err) {
    const reason =
      err instanceof Error && err.name === 'AbortError'
        ? `timed out after ${TIMEOUT_MS}ms`
        : err instanceof Error
          ? err.message
          : String(err);
    return { ok: false, reason };
  } finally {
    clearTimeout(timer);
  }
}
