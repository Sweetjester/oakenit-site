import Script from 'next/script';

/**
 * Analytics. Each is a no-op until its env var is set, so this is safe to
 * leave in tree on dev and preview.
 *
 * - Cloudflare Web Analytics: cookieless, no personal data, no consent banner
 *   required. This is the one that's live.
 *   Set NEXT_PUBLIC_CF_BEACON="<site tag>".
 *
 * - Plausible: alternative, paid. NEXT_PUBLIC_PLAUSIBLE_DOMAIN="oakenit.com".
 * - Microsoft Clarity: session recording + heatmaps. NEXT_PUBLIC_CLARITY_ID.
 *   Note Clarity *does* set cookies and record sessions — switching it on means
 *   the privacy notice needs updating and a consent banner becomes arguable.
 *
 * The beacon is injected here rather than by Cloudflare's auto-install: edge
 * HTML rewriting is what broke the contact form on 2026-09-02 (see § 8).
 */
export function Analytics() {
  const cfBeacon = process.env.NEXT_PUBLIC_CF_BEACON;
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

  return (
    <>
      {cfBeacon && (
        <Script
          defer
          strategy="afterInteractive"
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={`{"token": "${cfBeacon}"}`}
        />
      )}

      {plausibleDomain && (
        <Script
          defer
          strategy="afterInteractive"
          data-domain={plausibleDomain}
          src="https://plausible.io/js/script.outbound-links.tagged-events.js"
        />
      )}

      {clarityId && (
        <Script
          id="ms-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${clarityId}");
            `,
          }}
        />
      )}
    </>
  );
}
