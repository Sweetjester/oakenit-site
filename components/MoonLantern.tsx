'use client';

/**
 * The moon lantern: a brass crescent with a jade inlay and filigree, a
 * star-lit globe hanging inside it, and a small crescent pendant below.
 *
 * Drawn as SVG so it scales, tints and — the point of it — glows. In dark mode
 * each lantern casts a warm pool of light onto the page (see `.lantern-light`
 * in globals.css); the SVG only carries the light *source*.
 *
 * Geometry note: the crescent is the difference of two circles —
 * outer r40 at (50,78), inner r30 at (62,78) — which meet at (85.17, 58.94)
 * and (85.17, 97.06). Those are the tips. Everything laid inside the crescent
 * is clipped to that same path so nothing spills over the edges.
 */

const CRESCENT =
  'M85.17 58.94 A40 40 0 1 0 85.17 97.06 A30 30 0 1 1 85.17 58.94 Z';

type Props = {
  /** Cord length above the lantern, in viewBox units. */
  cord?: number;
  className?: string;
  /** Seconds for one sway cycle. 0 disables it. */
  sway?: number;
  delay?: number;
  /** Unique suffix so gradient ids don't collide between instances. */
  uid?: string;
};

export function MoonLantern({ cord = 40, className = '', sway = 7, delay = 0, uid = 'a' }: Props) {
  const top = cord;
  // shift so the crescent's top edge (local y=38) lands exactly at `top`
  const shift = top - 38;
  const H = top + 112;
  const id = (n: string) => `${n}-${uid}`;

  return (
    <svg
      viewBox={`0 0 100 ${H}`}
      fill="none"
      aria-hidden="true"
      className={className}
      style={
        sway
          ? { transformOrigin: '50px 0px', animation: `sway ${sway}s ease-in-out ${delay}s infinite` }
          : undefined
      }
    >
      <defs>
        {/* Brass: lit from the upper left, darker on the underside. */}
        <linearGradient id={id('brass')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f6dd9a" />
          <stop offset="35%" stopColor="#d9ab44" />
          <stop offset="60%" stopColor="#b8860b" />
          <stop offset="100%" stopColor="#8a6212" />
        </linearGradient>
        <linearGradient id={id('brassEdge')} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#ffeec2" />
          <stop offset="100%" stopColor="#c9a227" />
        </linearGradient>
        {/* Jade inlay */}
        <linearGradient id={id('jade')} x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#3f7d6b" />
          <stop offset="55%" stopColor="#2c5d51" />
          <stop offset="100%" stopColor="#1e463d" />
        </linearGradient>
        {/* Glass: hottest at the star, cooling outward */}
        <radialGradient id={id('glass')} cx="0.5" cy="0.52" r="0.62">
          <stop offset="0%" stopColor="#fffdf2" />
          <stop offset="42%" stopColor="#ffeeb8" />
          <stop offset="78%" stopColor="#f3cf7d" />
          <stop offset="100%" stopColor="#e0b45c" />
        </radialGradient>
        <radialGradient id={id('halo')} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#ffe9a8" stopOpacity="0.85" />
          <stop offset="45%" stopColor="#ffd166" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ffd166" stopOpacity="0" />
        </radialGradient>
        <clipPath id={id('clip')}>
          <path d={CRESCENT} transform={`translate(0 ${shift})`} />
        </clipPath>
      </defs>

      {/* ---- suspension ------------------------------------------------ */}
      <line x1="50" y1="0" x2="50" y2={top - 22} stroke="currentColor" strokeWidth="1.6" opacity="0.85" />
      <circle cx="50" cy={top - 17} r="4.4" stroke="currentColor" strokeWidth="2.2" opacity="0.9" />
      <line x1="50" y1={top - 12} x2="50" y2={top - 7} stroke="currentColor" strokeWidth="1.6" opacity="0.85" />
      {/* finial cap where the cord meets the crescent */}
      <path d={`M44.5 ${top - 8} H55.5 L50 ${top + 2} Z`} fill={`url(#${id('brassEdge')})`} />

      <g transform={`translate(0 ${shift})`}>
        {/* ---- crescent ------------------------------------------------ */}
        <path d={CRESCENT} fill={`url(#${id('brass')})`} />

        <g clipPath={`url(#${id('clip')})`}>
          {/* jade inlay channel, laid along the crescent's centreline */}
          <path
            d="M73.75 61.37 A29 29 0 1 0 73.75 94.63"
            fill="none"
            stroke={`url(#${id('jade')})`}
            strokeWidth="11"
          />
          {/* filigree — a few scrolls riding the inlay */}
          <g
            fill="none"
            stroke="#f7e2a6"
            strokeWidth="1.15"
            strokeLinecap="round"
            opacity="0.7"
          >
            {[95, 130, 165, 200, 235, 270].map((deg) => (
              <g key={deg} transform={`rotate(${deg} 50 78)`}>
                <path d="M46 49 c 4 -2 8 0 8 3 c 0 3 -4 4 -5 2 c -1 -2 1 -3 2 -2" />
                <path d="M43 51 c 2 2 2 4 1 6" opacity="0.6" />
              </g>
            ))}
          </g>
          {/* inner and outer bright edges */}
          <path
            d={CRESCENT}
            fill="none"
            stroke={`url(#${id('brassEdge')})`}
            strokeWidth="3.4"
            opacity="0.95"
          />
        </g>

        {/* ---- hanging globe ------------------------------------------- */}
        {/* halo behind the glass */}
        <ellipse cx="68" cy="97" rx="34" ry="36" fill={`url(#${id('halo')})`} />

        {/* drop chain + star */}
        <line x1="68" y1="47" x2="68" y2="60" stroke="currentColor" strokeWidth="1.4" opacity="0.85" />
        <path
          d="M68 57 l2.1 4.6 4.9 .6 -3.6 3.4 .9 4.9 -4.3 -2.4 -4.3 2.4 .9 -4.9 -3.6 -3.4 4.9 -.6 Z"
          fill={`url(#${id('brassEdge')})`}
        />

        {/* cap */}
        <path d="M58 78 h20 l-3 -6 h-14 Z" fill={`url(#${id('brass')})`} />
        <rect x="62" y="70" width="12" height="3" rx="1.2" fill={`url(#${id('jade')})`} />
        <circle cx="68" cy="68" r="2.4" fill={`url(#${id('brassEdge')})`} />

        {/* glass */}
        <ellipse cx="68" cy="96" rx="18" ry="19" fill={`url(#${id('glass')})`} />
        {/* ribs */}
        <g stroke="#c9a227" strokeWidth="1.2" fill="none" opacity="0.85">
          <ellipse cx="68" cy="96" rx="18" ry="19" />
          <ellipse cx="68" cy="96" rx="9" ry="19" />
          <line x1="68" y1="77" x2="68" y2="115" />
        </g>
        {/* the star in the glass — the light source */}
        <path
          d="M68 87 l2.6 6.4 6.4 2.6 -6.4 2.6 -2.6 6.4 -2.6 -6.4 -6.4 -2.6 6.4 -2.6 Z"
          fill="#fff8dc"
        />
        <path
          d="M68 87 l2.6 6.4 6.4 2.6 -6.4 2.6 -2.6 6.4 -2.6 -6.4 -6.4 -2.6 6.4 -2.6 Z"
          fill="none"
          stroke="#e8bf5e"
          strokeWidth="0.8"
        />

        {/* base + finial */}
        <path d="M58 113 h20 l-4 7 h-12 Z" fill={`url(#${id('jade')})`} />
        <path d="M62 120 h12 l-6 9 Z" fill={`url(#${id('brass')})`} />

        {/* ---- pendant below the crescent ------------------------------- */}
        <line x1="50" y1="118" x2="50" y2="124" stroke="currentColor" strokeWidth="1.4" opacity="0.8" />
        <circle cx="50" cy="127" r="3.4" fill={`url(#${id('brassEdge')})`} />
        <circle cx="50" cy="127" r="1.5" fill={`url(#${id('jade')})`} />
        <line x1="50" y1="130" x2="50" y2="134" stroke="currentColor" strokeWidth="1.2" opacity="0.8" />
        {/* small crescent, same construction scaled down */}
        <path
          d="M55.6 136.1 A7 7 0 1 0 55.6 142.7 A5.2 5.2 0 1 1 55.6 136.1 Z"
          fill={`url(#${id('brassEdge')})`}
        />
      </g>
    </svg>
  );
}

type HangingProps = {
  /** CSS left offset within the positioned parent. */
  left: string;
  cord: number;
  /** Rendered width in px. */
  size: number;
  sway?: number;
  delay?: number;
  /** How far the light reaches, as a multiple of `size`. */
  reach?: number;
  uid: string;
};

/**
 * A lantern hung from the top of a positioned parent, together with the light
 * it throws. The glow is a sibling element rather than an SVG filter so it can
 * screen-blend with whatever is behind it — in dark mode the lanterns are
 * genuinely lighting the page, not just glowing at it.
 *
 * The globe's centre sits at local y = 96 with the crescent shifted by
 * (cord - 38), so in rendered pixels it lands at size * (cord + 58) / 100.
 */
export function HangingLantern({
  left,
  cord,
  size,
  sway = 7,
  delay = 0,
  reach = 7,
  uid,
}: HangingProps) {
  const light = size * reach;
  const globeX = size * 0.68;
  const globeY = (size * (cord + 58)) / 100;

  return (
    <div className="absolute top-0" style={{ left, width: size }}>
      <div
        className="lantern-light"
        style={{
          width: light,
          height: light,
          left: globeX - light / 2,
          top: globeY - light / 2,
          animationDelay: `${delay}s`,
        }}
      />
      <div
        className="lantern-pool"
        style={{
          width: light * 0.8,
          height: light * 1.5,
          left: globeX - light * 0.4,
          top: globeY,
          animationDelay: `${delay + 0.6}s`,
        }}
      />
      <MoonLantern
        cord={cord}
        sway={sway}
        delay={delay}
        uid={uid}
        className="relative w-full h-auto text-lantern-600/80 dark:text-lantern-300/85"
      />
    </div>
  );
}

/** ~1em crescent-and-star, used as the list bullet. */
export function MoonGlyph({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 14" fill="none" aria-hidden="true" className={className}>
      <path
        d="M9.4 2.2 A5.4 5.4 0 1 0 9.4 11.8 A4.1 4.1 0 1 1 9.4 2.2 Z"
        fill="currentColor"
      />
      <path
        d="M10.6 5.1 l1 2.1 2.1 .3 -1.6 1.4 .4 2.1 -1.9 -1.1 -1.9 1.1 .4 -2.1 -1.6 -1.4 2.1 -.3 Z"
        fill="currentColor"
        opacity="0.9"
        transform="translate(-1.4 -1.6) scale(0.86) translate(2.2 2.4)"
      />
    </svg>
  );
}
