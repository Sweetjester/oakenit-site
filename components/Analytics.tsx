import Script from 'next/script';

/**
 * Analytics scripts — both are no-ops until their respective env vars
 * are set, so safe to leave in tree on dev/preview.
 *
 * - Plausible: privacy-friendly, GDPR-clean, no cookie banner needed.
 *   Set NEXT_PUBLIC_PLAUSIBLE_DOMAIN="oakenit.com".
 *
 * - Microsoft Clarity: free session recording + heatmaps. Brutal feedback.
 *   Set NEXT_PUBLIC_CLARITY_ID="<your project id>".
 */
export function Analytics() {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

  return (
    <>
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
