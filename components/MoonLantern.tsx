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

/**
 * An open crescent: outer circle r40 at (50,78) minus inner r33 at (62,78),
 * meeting at (77.29, 48.76) and (77.29, 107.24). Thick on the left, opening to
 * the right, with the lantern hung in the opening.
 */
const CRESCENT =
  'M77.29 48.76 A40 40 0 1 0 77.29 107.24 A33 33 0 1 1 77.29 48.76 Z';

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
  const H = top + 126;
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
        {/* the lit glass — the only fill in an otherwise drawn piece */}
        <radialGradient id={id('glass')} cx="0.5" cy="0.52" r="0.55">
          <stop offset="0%" stopColor="#fff6de" stopOpacity="0.95" />
          <stop offset="55%" stopColor="#f7c04a" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#d4820c" stopOpacity="0.06" />
        </radialGradient>
        <radialGradient id={id('halo')} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#ffdb8a" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#ffdb8a" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* ---- cord, bead, ring ----------------------------------------- */}
        <line x1="50" y1="0" x2="50" y2={top - 30} strokeWidth="1" opacity="0.65" />
        <circle cx="50" cy={top - 27} r="2.4" strokeWidth="1" opacity="0.9" fill="currentColor" fillOpacity="0.25" />
        <line x1="50" y1={top - 24.6} x2="50" y2={top - 22} strokeWidth="1" opacity="0.65" />
        <circle cx="50" cy={top - 17.6} r="4.4" strokeWidth="1.2" opacity="0.9" />
        <line x1="50" y1={top - 13.2} x2="50" y2={top - 1} strokeWidth="1" opacity="0.65" />

        <g transform={`translate(0 ${shift})`}>
          {/* ---- crescent ------------------------------------------------ */}
          <path d={CRESCENT} strokeWidth="1.5" opacity="0.95" />
          {/* an inner contour, so the band reads as drawn rather than cut */}
          <path
            d="M75.5 52.5 A36.4 36.4 0 1 0 75.5 103.5"
            strokeWidth="0.7"
            opacity="0.4"
          />

          {/* leaf sprig laid along the band */}
          <g transform="rotate(235 50 78)" strokeWidth="0.85" opacity="0.75">
            <path d="M40 47.5 q 9 -3.4 18 -1.4" />
            <path d="M45.6 46.6 q 1.8 -4 5.4 -3.4 q -1.4 3.8 -5.4 3.4 Z" />
            <path d="M51.4 45.8 q 1.9 -4 5.4 -3.2 q -1.5 3.8 -5.4 3.2 Z" />
            <path d="M47.8 48.4 q 1.5 3.4 4.9 3.6 q -0.9 -3.6 -4.9 -3.6 Z" />
          </g>

          {/* ---- the hanging lantern ------------------------------------- */}
          <ellipse cx="70" cy="96" rx="27" ry="28" fill={`url(#${id('halo')})`} stroke="none" />

          {/* chain from the upper limb */}
          <line x1="70" y1="50" x2="70" y2="56" strokeWidth="0.9" opacity="0.7" />
          <circle cx="70" cy="58" r="2" strokeWidth="0.9" opacity="0.8" />
          <line x1="70" y1="60" x2="70" y2="63" strokeWidth="0.9" opacity="0.7" />

          {/* onion dome + finial */}
          <path d="M70 63 v3" strokeWidth="1" opacity="0.85" />
          <path
            d="M60.5 80 C 60.5 72, 64.5 68.5, 70 66 C 75.5 68.5, 79.5 72, 79.5 80 Z"
            strokeWidth="1.2"
            opacity="0.92"
          />
          <path d="M66.5 79.6 q 3.5 -6 3.5 -9.6 q 0 3.6 3.5 9.6" strokeWidth="0.7" opacity="0.45" />
          {/* collar */}
          <path d="M58.5 80 H81.5 M60.5 83.4 H79.5" strokeWidth="1.1" opacity="0.9" />

          {/* glass body */}
          <path
            d="M60.5 83.4 C 54 90, 54 103, 60.5 110 H79.5 C 86 103, 86 90, 79.5 83.4 Z"
            fill={`url(#${id('glass')})`}
            stroke="none"
          />
          <path
            d="M60.5 83.4 C 54 90, 54 103, 60.5 110 H79.5 C 86 103, 86 90, 79.5 83.4 Z"
            strokeWidth="1.3"
            opacity="0.95"
          />
          {/* pointed-arch panels */}
          <path d="M70 84.2 C 64.6 88, 63.6 103, 66.4 110" strokeWidth="0.8" opacity="0.55" />
          <path d="M70 84.2 C 75.4 88, 76.4 103, 73.6 110" strokeWidth="0.8" opacity="0.55" />
          <path d="M63.4 89 q 6.6 -5 13.2 0" strokeWidth="0.7" opacity="0.4" />

          {/* base + finial */}
          <path d="M59.5 110 H80.5 M62 113.4 H78" strokeWidth="1.1" opacity="0.9" />
          <path d="M65.6 113.4 L70 121 L74.4 113.4" strokeWidth="1.1" opacity="0.85" />
          <path d="M70 117.2 l1.7 2.1 -1.7 2.1 -1.7 -2.1 Z" strokeWidth="0.7" opacity="0.6" />

          {/* ---- pendant below the crescent ------------------------------ */}
          <circle cx="50" cy="122.5" r="2.6" strokeWidth="1" opacity="0.85" />
          {/* four-pointed star */}
          <path
            d="M50 127 C 50.6 130.2, 51.6 131.2, 54.6 131.8 C 51.6 132.4, 50.6 133.4, 50 136.6 C 49.4 133.4, 48.4 132.4, 45.4 131.8 C 48.4 131.2, 49.4 130.2, 50 127 Z"
            strokeWidth="0.9"
            opacity="0.85"
          />
          {/* leaf */}
          <path
            d="M50 138 c 4.6 3, 5.4 8, 0 12.4 c -5.4 -4.4, -4.6 -9.4, 0 -12.4 Z"
            strokeWidth="1.1"
            opacity="0.9"
          />
          <line x1="50" y1="140" x2="50" y2="148.6" strokeWidth="0.7" opacity="0.5" />
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

/**
 * ~1em hanging lantern, used as the list bullet.
 *
 * Redrawn 2026-09-03 to match the lanterns in Andy's illustration: ball
 * finial, shallow peaked roof with a brim, tapered hexagonal glass with corner
 * posts, a flame, and a finial below. The previous glyph was a plain ovoid and
 * read as a little vase.
 *
 * ⚠️ The viewBox is **square (34×34)** with the lantern centred, even though
 * the lantern itself is tall and narrow. Every caller sizes this with equal
 * width and height classes (`h-3.5 w-3.5`), so a tall viewBox would letterbox
 * and shrink it. Keep it square, or fix all the call sites.
 *
 * Everything is `currentColor` at varying opacity rather than fixed colours,
 * so one glyph works on cream and on near-black. The frame is solid because at
 * 14px the silhouette carries it — the interior detail is a bonus at larger
 * sizes, not what does the work.
 */
export function MoonGlyph({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 34 34" fill="none" aria-hidden="true" className={className}>
      {/* cord and hanging ball */}
      <path d="M17 1 V4.6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="17" cy="6.1" r="1.5" fill="currentColor" />

      {/* peaked roof with a brim */}
      <path d="M17 7.6 L21.6 11.4 H12.4 Z" fill="currentColor" />
      <path d="M9.6 11.4 H24.4 L23 13.3 H11 Z" fill="currentColor" />

      {/* glass, tapering in toward the base */}
      <path d="M11.2 13.3 H22.8 L21.4 25.8 H12.6 Z" fill="currentColor" opacity="0.26" />
      <path
        d="M11.2 13.3 H22.8 L21.4 25.8 H12.6 Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      {/* corner posts */}
      <path
        d="M15.1 13.8 L14.6 25.3 M18.9 13.8 L19.4 25.3"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.7"
      />
      {/* flame */}
      <path
        d="M17 17 c1.5 1.9 1.5 3.6 0 5.1 c-1.5 -1.5 -1.5 -3.2 0 -5.1 Z"
        fill="currentColor"
        opacity="0.95"
      />

      {/* base rim and finial */}
      <path d="M11.4 25.8 H22.6 L21.6 27.8 H12.4 Z" fill="currentColor" />
      <path d="M15.4 27.8 H18.6 L17 31.6 Z" fill="currentColor" />
    </svg>
  );
}
