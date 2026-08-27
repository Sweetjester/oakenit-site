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
  'M50 38 a40 40 0 1 0 0.01 0 Z M52 44 a34 34 0 1 0 0.01 0 Z';
/** Tilt, so the hoop doesn't sit in the upright posture of a flag crescent. */
const TILT = -24;

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
        {/* No transform: the referencing group's translate already applies. */}
        <clipPath id={id('clip')}>
          <path d={CRESCENT} fillRule="evenodd" />
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
        <g transform={`rotate(${TILT} 50 78)`}>
        <path d={CRESCENT} fillRule="evenodd" fill={`url(#${id('brass')})`} />

        <g clipPath={`url(#${id('clip')})`}>
          {/* jade inlay channel, laid along the crescent's centreline */}
          <path
            d="M50 41.5 a36.5 36.5 0 1 0 0.01 0"
            fill="none"
            stroke={`url(#${id('jade')})`}
            strokeWidth="6"
          />
          {/* filigree — a few scrolls riding the inlay */}
          <g
            fill="none"
            stroke="#f7e2a6"
            strokeWidth="1.15"
            strokeLinecap="round"
            opacity="0.7"
          >
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <g key={deg} transform={`rotate(${deg} 50 78)`}>
                <path d="M46.5 45 c 3.5 -1.6 7 0 7 2.6 c 0 2.6 -3.5 3.4 -4.4 1.7 c -0.9 -1.7 0.9 -2.6 1.8 -1.7" />
                <path d="M43.5 47 c 1.8 1.8 1.8 3.6 0.9 5.4" opacity="0.6" />
              </g>
            ))}
          </g>
          {/* inner and outer bright edges */}
          <path
            d={CRESCENT}
            fillRule="evenodd"
            fill="none"
            stroke={`url(#${id('brassEdge')})`}
            strokeWidth="3.4"
            opacity="0.95"
          />
        </g>
        </g>

        {/* ---- hanging globe ------------------------------------------- */}
        {/* halo behind the glass */}
        <ellipse cx="68" cy="97" rx="34" ry="36" fill={`url(#${id('halo')})`} />

        {/* drop chain + star */}
        <line x1="68" y1="47" x2="68" y2="60" stroke="currentColor" strokeWidth="1.4" opacity="0.85" />
        <circle cx="68" cy="62" r="3.1" fill={`url(#${id('brassEdge')})`} />
        <path d="M65.4 63.6 h5.2 l-2.6 3.4 Z" fill={`url(#${id('brass')})`} />

        {/* cap */}
        <path d="M58 78 h20 l-3 -6 h-14 Z" fill={`url(#${id('brass')})`} />
        <rect x="62" y="70" width="12" height="3" rx="1.2" fill={`url(#${id('jade')})`} />
        <circle cx="68" cy="68" r="2.4" fill={`url(#${id('brassEdge')})`} />

        {/* glass */}
        <ellipse cx="68" cy="96" rx="19.5" ry="20.5" fill={`url(#${id('glass')})`} />
        {/* ribs */}
        <g stroke="#c9a227" strokeWidth="1.2" fill="none" opacity="0.85">
          <ellipse cx="68" cy="96" rx="19.5" ry="20.5" />
          <ellipse cx="68" cy="96" rx="9.7" ry="20.5" />
          <line x1="68" y1="75.5" x2="68" y2="116.5" />
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
        {/* oak leaf */}
        <path
          d="M50 134 c 5.5 3 6.5 8.5 0 13.5 c -6.5 -5 -5.5 -10.5 0 -13.5 Z"
          fill={`url(#${id('brassEdge')})`}
        />
        <line
          x1="50" y1="136" x2="50" y2="146"
          stroke={`url(#${id('jade')})`}
          strokeWidth="0.9"
          opacity="0.8"
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

/** ~1em hanging lantern, used as the list bullet. Deliberately *not* a
 *  crescent-and-star: that pairing reads as a flag, not a lantern. */
export function MoonGlyph({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 14" fill="none" aria-hidden="true" className={className}>
      {/* hanger */}
      <circle cx="7" cy="1.5" r="1" stroke="currentColor" strokeWidth="0.9" />
      <line x1="7" y1="2.5" x2="7" y2="3.4" stroke="currentColor" strokeWidth="0.9" />
      {/* cap */}
      <path d="M4.4 4.6 h5.2 l-1.1 -1.4 h-3 Z" fill="currentColor" />
      {/* glass */}
      <ellipse cx="7" cy="7.9" rx="3.3" ry="3.4" fill="currentColor" opacity="0.3" />
      <ellipse cx="7" cy="7.9" rx="3.3" ry="3.4" stroke="currentColor" strokeWidth="1" />
      <ellipse cx="7" cy="7.9" rx="1.4" ry="3.4" stroke="currentColor" strokeWidth="0.7" opacity="0.75" />
      {/* finial */}
      <path d="M5.2 11 h3.6 l-1.8 2.6 Z" fill="currentColor" />
    </svg>
  );
}
