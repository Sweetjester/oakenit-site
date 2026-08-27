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
        {/* Lit glass. The only fill in the piece — everything else is line. */}
        <radialGradient id={id('glass')} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#fff4d6" stopOpacity="0.9" />
          <stop offset="55%" stopColor="#f7c04a" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#d4820c" stopOpacity="0.05" />
        </radialGradient>
        <radialGradient id={id('halo')} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#ffdb8a" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ffdb8a" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Drawn in line, like the tree: strokes carry the form, one lit fill. */}
      <g
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      >
        {/* ---- suspension ------------------------------------------------ */}
        <line x1="50" y1="0" x2="50" y2={top - 22} strokeWidth="1.1" opacity="0.7" />
        <circle cx="50" cy={top - 17} r="4.2" strokeWidth="1.3" opacity="0.85" />
        <line x1="50" y1={top - 12.8} x2="50" y2={top - 7} strokeWidth="1.1" opacity="0.7" />

        <g transform={`translate(0 ${shift})`}>
          {/* cap where the cord meets the hoop */}
          <path d="M45 32 L50 39 L55 32" strokeWidth="1.3" opacity="0.9" />

          {/* ---- hoop, drawn as two arcs with a few ribs between --------- */}
          <g transform={`rotate(${TILT} 50 78)`}>
            <circle cx="50" cy="78" r="40" strokeWidth="1.5" opacity="0.95" />
            <circle cx="52" cy="78" r="34" strokeWidth="1.2" opacity="0.8" />
            {/* ribs across the band */}
            {[100, 138, 176, 214, 252, 290].map((deg) => (
              <line
                key={deg}
                x1="50"
                y1="38"
                x2="50"
                y2="44"
                strokeWidth="1"
                opacity="0.55"
                transform={`rotate(${deg} 50 78)`}
              />
            ))}
            {/* a couple of sketch strokes that overshoot, so it reads drawn */}
            <path d="M14 90 q 5 10 13 16" strokeWidth="0.9" opacity="0.4" />
            <path d="M20 56 q 4 -8 11 -13" strokeWidth="0.9" opacity="0.35" />
          </g>

          {/* ---- hanging globe ------------------------------------------- */}
          <ellipse cx="68" cy="96" rx="30" ry="31" fill={`url(#${id('halo')})`} stroke="none" />

          <line x1="68" y1="47" x2="68" y2="60" strokeWidth="1" opacity="0.7" />
          <circle cx="68" cy="62.6" r="2.6" strokeWidth="1.1" opacity="0.85" />
          <path d="M65.6 65 L68 69 L70.4 65" strokeWidth="1.1" opacity="0.85" />

          {/* cap */}
          <path d="M57.6 78 L60.4 71.6 L75.6 71.6 L78.4 78" strokeWidth="1.3" opacity="0.9" />
          <line x1="57.6" y1="78" x2="78.4" y2="78" strokeWidth="1.1" opacity="0.75" />

          {/* glass */}
          <ellipse cx="68" cy="96" rx="19.5" ry="20.5" fill={`url(#${id('glass')})`} stroke="none" />
          <ellipse cx="68" cy="96" rx="19.5" ry="20.5" strokeWidth="1.4" opacity="0.95" />
          <ellipse cx="68" cy="96" rx="9.7" ry="20.5" strokeWidth="1" opacity="0.6" />
          <line x1="68" y1="75.5" x2="68" y2="116.5" strokeWidth="0.9" opacity="0.5" />

          {/* base + finial */}
          <path d="M57.6 113.5 L78.4 113.5 L74 120.5 L62 120.5 Z" strokeWidth="1.2" opacity="0.9" />
          <path d="M62.5 120.5 L68 129 L73.5 120.5" strokeWidth="1.2" opacity="0.85" />

          {/* ---- leaf pendant -------------------------------------------- */}
          <line x1="50" y1="118" x2="50" y2="126" strokeWidth="1" opacity="0.6" />
          <path
            d="M50 126.5 c 5.5 3.4 6.5 9 0 14 c -6.5 -5 -5.5 -10.6 0 -14 Z"
            strokeWidth="1.2"
            opacity="0.9"
          />
          <line x1="50" y1="129" x2="50" y2="138.5" strokeWidth="0.8" opacity="0.55" />
        </g>
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
        className="lantern-shaft"
        style={{
          width: light * 0.6,
          height: light * 1.15,
          left: globeX - light * 0.3,
          top: globeY,
          animationDelay: `${delay + 1.1}s`,
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
