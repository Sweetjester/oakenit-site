'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

/**
 * A live site, framed. The iframe renders at desktop width and is scaled down
 * to fit — squashing a desktop layout into a 390px column looks broken, where
 * a scaled-down desktop render reads as "a real site". Scrolling still works
 * inside the frame.
 */
const DESKTOP_WIDTH = 1280;
const MOBILE_WIDTH = 430;
/** Below this container width, frame the site's own mobile layout instead of
 *  shrinking its desktop one to the point of illegibility. Keep it near actual
 *  phone widths — a ~660px portfolio column still reads fine scaled down. */
const BREAKPOINT = 520;

type Props = {
  src: string;
  /** Shown in the chrome bar. */
  label: string;
  title: string;
  /** Frame height at DESKTOP_WIDTH, before scaling. */
  height?: number;
  /** Frame height at MOBILE_WIDTH, before scaling. */
  mobileHeight?: number;
  /** Browser bar + caption. Off for thumbnails. */
  chrome?: boolean;
  /**
   * Always render the desktop layout, however narrow the container. A card
   * thumbnail wants a recognisable shrunk-down desktop page, not the site's
   * mobile layout letterboxed into a landscape box.
   */
  desktopOnly?: boolean;
  /**
   * When false the iframe ignores the pointer, so a card wrapping this stays
   * clickable instead of the frame swallowing the click.
   */
  interactive?: boolean;
};

export function SiteEmbed({
  src,
  label,
  title,
  height = 900,
  mobileHeight = 760,
  chrome = true,
  desktopOnly = false,
  interactive = true,
}: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    setWidth(el.clientWidth);
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const wide = desktopOnly || width >= BREAKPOINT;
  const designWidth = wide ? DESKTOP_WIDTH : MOBILE_WIDTH;
  const frameHeight = wide ? height : mobileHeight;
  const scale = width ? Math.min(1, width / designWidth) : 0;

  return (
    <figure
      className={
        chrome
          ? 'rounded-2xl overflow-hidden border border-forest-900/12 dark:border-cream-100/10 bg-cream-100/70 dark:bg-forest-900/60 shadow-[0_30px_70px_-40px_rgba(6,32,13,0.5)]'
          : 'overflow-hidden'
      }
    >
      {/* Chrome */}
      {chrome && (
      <div className="flex items-center gap-3 px-4 py-3 border-b border-forest-900/10 dark:border-cream-100/10 bg-cream-200/50 dark:bg-forest-950/50">
        <div className="flex gap-1.5 shrink-0">
          <span className="h-2.5 w-2.5 rounded-full bg-forest-900/15 dark:bg-cream-100/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-forest-900/15 dark:bg-cream-100/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-forest-900/15 dark:bg-cream-100/15" />
        </div>
        <div className="flex-1 min-w-0 text-center">
          <span className="inline-block max-w-full truncate rounded-full px-3 py-1 text-xs font-mono bg-cream-50/80 dark:bg-forest-900/70 text-forest-800/60 dark:text-cream-100/55 border border-forest-900/10 dark:border-cream-100/10">
            {label}
          </span>
        </div>
        <a
          href={src}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 inline-flex items-center gap-1.5 text-xs text-forest-600 dark:text-leaf-200 hover:text-leaf-600 dark:hover:text-leaf-100 transition-colors"
        >
          Open
          <ArrowUpRight size={13} />
        </a>
      </div>
      )}

      {/* Scaled viewport */}
      <div
        ref={wrap}
        className="relative overflow-hidden bg-cream-50 dark:bg-forest-950"
        style={{ height: scale ? frameHeight * scale : 420 }}
      >
        <iframe
          src={src}
          title={title}
          loading="lazy"
          key={wide ? 'wide' : 'narrow'}
          width={designWidth}
          height={frameHeight}
          referrerPolicy="no-referrer-when-downgrade"
          tabIndex={interactive ? undefined : -1}
          className={`absolute top-0 left-0 border-0 transition-opacity duration-500 ${
            interactive ? '' : 'pointer-events-none'
          }`}
          style={{
            transform: `scale(${scale || 1})`,
            transformOrigin: 'top left',
            opacity: scale ? 1 : 0,
          }}
        />
      </div>

      {chrome && (
        <figcaption className="px-4 py-3 border-t border-forest-900/10 dark:border-cream-100/10 text-xs text-forest-800/55 dark:text-cream-100/45">
          Live site — scroll inside the frame.
        </figcaption>
      )}
    </figure>
  );
}
