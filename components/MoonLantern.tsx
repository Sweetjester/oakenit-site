'use client';

/**
 * The hanging lantern: a hexagonal carriage lantern on a corded ring — ball
 * finial, peaked roof with a brim, faceted glass with a flame inside, base rim
 * and a drop finial.
 *
 * Drawn as SVG so it scales, tints and — the point of it — glows. In dark mode
 * each lantern casts a warm pool of light onto the page (see `.lantern-light`
 * in globals.css); the SVG only carries the light *source*.
 *
 * ⚠️ **This replaced a brass hoop-and-globe design on 2026-09-03.** That one
 * was a tilted ring with a jade inlay, a filigree leaf sprig and a globe hung
 * inside the opening. Once the background tree became Andy's illustration —
 * which carries its own drawn carriage lanterns — the hoop was the only thing
 * left on the site in a different shape, and Andy flagged it in the footer.
 * Do not reinstate the hoop; and definitely not the crescent that preceded it
 * (it read as the Pakistani flag — see CLAUDE.md).
 *
 * ⚠️ **The glass centre must stay at local y = 96.** `HangingLantern` places
 * the light at `size * (cord + 58) / 100`, which is that point once the group
 * is shifted by `cord - 38`. Move the glass and the glow drifts off it.
 */

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
  // shift so the lantern's top edge (local y=38) lands exactly at `top`
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
        <linearGradient id={id('glass')} x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#f7c04a" stopOpacity="0.16" />
          <stop offset="55%" stopColor="#fff6de" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#d4820c" stopOpacity="0.2" />
        </linearGradient>
        <radialGradient id={id('halo')} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#ffdb8a" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#ffdb8a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={id('flame')} cx="0.5" cy="0.62" r="0.55">
          <stop offset="0%" stopColor="#fffaeb" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#ffd479" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#f7c04a" stopOpacity="0.15" />
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
          {/* the light the glass throws, inside the SVG so it sits under the
              frame rather than washing over it */}
          <ellipse cx="50" cy="96" rx="31" ry="35" fill={`url(#${id('halo')})`} stroke="none" />

          {/* ---- ball finial --------------------------------------------- */}
          <circle cx="50" cy="42" r="3.5" strokeWidth="1.2" opacity="0.95" fill="currentColor" fillOpacity="0.22" />

          {/* ---- peaked roof with a brim --------------------------------- */}
          <path
            d="M50 45.8 C 58.5 50.5, 66 56, 69.5 61.5 H30.5 C 34 56, 41.5 50.5, 50 45.8 Z"
            strokeWidth="1.3"
            opacity="0.95"
            fill="currentColor"
            fillOpacity="0.14"
          />
          {/* hips, so the roof reads as faceted rather than as a cone */}
          <path d="M50 46.4 V61.2 M50 46.4 L61.5 61.2 M50 46.4 L38.5 61.2" strokeWidth="0.7" opacity="0.4" />
          {/* brim */}
          <path d="M27 61.5 H73 L70.5 66 H29.5 Z" strokeWidth="1.2" opacity="0.92" />

          {/* ---- glass ---------------------------------------------------- */}
          <path
            d="M29.5 66 H70.5 L67 126 H33 Z"
            fill={`url(#${id('glass')})`}
            stroke="none"
          />
          <path d="M29.5 66 H70.5 L67 126 H33 Z" strokeWidth="1.35" opacity="0.95" />
          {/* corner posts and a muntin bar */}
          <path d="M42.8 66.6 L41.4 125.4 M57.2 66.6 L58.6 125.4" strokeWidth="0.8" opacity="0.6" />
          <path d="M30.6 77 H69.4" strokeWidth="0.7" opacity="0.35" />

          {/* ---- flame ---------------------------------------------------- */}
          <path
            d="M50 87 c 5.4 7, 5.4 13.4, 0 19.4 c -5.4 -6, -5.4 -12.4, 0 -19.4 Z"
            fill={`url(#${id('flame')})`}
            stroke="none"
          />
          <path d="M50 92.5 c 2.6 3.6, 2.6 6.8, 0 9.8 c -2.6 -3, -2.6 -6.2, 0 -9.8 Z" fill="#fffdf5" fillOpacity="0.7" stroke="none" />

          {/* ---- base rim and drop finial --------------------------------- */}
          <path d="M31.5 126 H68.5 L66 131 H34 Z" strokeWidth="1.2" opacity="0.92" />
          <path d="M42 131 L50 143.5 L58 131" strokeWidth="1.1" opacity="0.85" />
          <path d="M50 138.4 l 2 2.5 -2 2.5 -2 -2.5 Z" strokeWidth="0.7" opacity="0.6" />
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
 * The glass centre sits at local (50, 96) with the group shifted by
 * (cord - 38), so in rendered pixels it lands at
 * (size * 0.5, size * (cord + 58) / 100).
 *
 * ⚠️ `glassX` was `size * 0.68` until 2026-09-03. That was right for the old
 * hoop design, where the globe hung off-centre inside the ring's opening — on
 * the centred carriage lantern it threw the glow visibly to the right of the
 * fixture. If the lantern art is ever re-centred, move this with it.
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
  const glassX = size * 0.5;
  const glassY = (size * (cord + 58)) / 100;

  return (
    <div className="absolute top-0" style={{ left, width: size }}>
      <div
        className="lantern-light"
        style={{
          width: light,
          height: light,
          left: glassX - light / 2,
          top: glassY - light / 2,
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
