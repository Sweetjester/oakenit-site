'use client';

import { useEffect, useRef } from 'react';

/**
 * Cloudflare Turnstile, rendered *explicitly*.
 *
 * The implicit `class="cf-turnstile"` form injects an iframe into a div React
 * owns, which is the same class of hydration fight that broke this form once
 * already (Cloudflare's email obfuscation, 2026-09-02). Explicit rendering into
 * an empty ref keeps React and Turnstile out of each other's way.
 *
 * It drops a hidden `cf-turnstile-response` input inside the container, so it
 * rides along with the normal form submission — no client-side plumbing.
 */
declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      remove: (id: string) => void;
    };
    onTurnstileReady?: () => void;
  }
}

const SCRIPT_ID = 'cf-turnstile-script';
const SRC =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileReady&render=explicit';

export function Turnstile({ siteKey }: { siteKey: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const render = () => {
      if (cancelled || !ref.current || !window.turnstile || widgetId.current) return;
      widgetId.current = window.turnstile.render(ref.current, {
        sitekey: siteKey,
        theme: 'auto',
        appearance: 'interaction-only',
      });
    };

    if (window.turnstile) {
      render();
    } else {
      window.onTurnstileReady = render;
      if (!document.getElementById(SCRIPT_ID)) {
        const s = document.createElement('script');
        s.id = SCRIPT_ID;
        s.src = SRC;
        s.async = true;
        s.defer = true;
        document.head.appendChild(s);
      }
    }

    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current);
        widgetId.current = null;
      }
    };
  }, [siteKey]);

  return <div ref={ref} className="mt-4 empty:mt-0" />;
}
