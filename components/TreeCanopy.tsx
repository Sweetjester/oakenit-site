'use client';

import { Fireflies } from './Fireflies';

/**
 * The background tree, drawn in line and lit by its own lanterns.
 *
 * public/tree-lines.png is edge-work extracted from the original painted mark,
 * white on transparent. It is used as a CSS *mask* rather than an image, which
 * is the whole trick: whatever sits behind the mask becomes the ink. So the
 * paint layer underneath is a stack of radial gradients positioned at the
 * lantern anchors — in dark mode the branches near a lantern genuinely take its
 * warmth and fall away to cold green in the gaps, instead of the tree being a
 * flat silhouette with glows floating over it.
 *
 * Anchors and cords were measured off the mask of the original artwork's
 * lanterns, so the new ones hang where the painted ones did. Regenerate
 * tree.png, tree-lines.png and these numbers together or they drift apart.
 */
const LANTERNS = [
  { x: 44.02, y: 22.84, w: 2.39, delay: 0.0 },
  { x: 69.22, y: 46.61, w: 1.59, delay: 1.3 },
  { x: 60.33, y: 33.22, w: 1.52, delay: 2.2 },
  { x: 34.65, y: 33.31, w: 1.36, delay: 0.7 },
  { x: 34.05, y: 51.48, w: 1.28, delay: 1.8 },
  { x: 79.35, y: 53.39, w: 1.12, delay: 3.1 },
];


/** The glow is far wider than the drawn lantern that casts it. */
const GLOW = 11;

/** Light falling on the drawing, brightest at each flame and cooling outward. */
const DARK_PAINT = [
  ...LANTERNS.map(
    (l) =>
      `radial-gradient(circle at ${l.x}% ${l.y}%, rgba(255,231,168,0.98) 0%, rgba(244,186,92,0.72) 5%, rgba(150,196,104,0.3) 14%, rgba(60,120,70,0.1) 24%, rgba(0,0,0,0) 34%)`
  ),
  'linear-gradient(180deg, #2b6b3a 0%, #1d5228 45%, #123a1a 100%)',
].join(', ');

/** Daylight: the drawing is just ink, with a little depth top to bottom. */
const LIGHT_PAINT = 'linear-gradient(180deg, #1d5228 0%, #14401d 60%, #0f3417 100%)';

const MASK: React.CSSProperties = {
  WebkitMaskImage: 'url(/tree-lines.png)',
  maskImage: 'url(/tree-lines.png)',
  WebkitMaskSize: 'contain',
  maskSize: 'contain',
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskPosition: 'center',
  maskPosition: 'center',
};

type Props = {
  className?: string;
  /** Opacity of the drawing itself. */
  treeClassName?: string;
  idPrefix: string;
};

export function TreeCanopy({
  className = '',
  treeClassName = 'opacity-[0.22] dark:opacity-[0.5]',
  idPrefix,
}: Props) {
  return (
    <div className={className}>
      <div className="relative h-full w-full">
        {/* the drawing, taking its colour from the light behind the mask */}
        <div className={`absolute inset-0 ${treeClassName}`} style={MASK}>
          <div className="absolute inset-0 dark:hidden" style={{ background: LIGHT_PAINT }} />
          <div
            className="absolute inset-0 hidden animate-lantern-breathe dark:block"
            style={{ background: DARK_PAINT }}
          />
        </div>

        {/* fireflies at night, motes by day — they drift a little wider than
            the canopy either way */}
        <Fireflies className="absolute -inset-[6%] h-[112%] w-[112%]" />

        {/* The light each drawn lantern throws. The artwork supplies the
            fixtures — hanging vector ones on a hand-drawn tree would read as
            two different illustrations sharing a page. */}
        {LANTERNS.map((l, i) => (
          <div
            key={`lan-${i}`}
            className="lantern-light absolute"
            style={{
              width: `${l.w * GLOW}%`,
              height: `${l.w * GLOW}%`,
              left: `${l.x - (l.w * GLOW) / 2}%`,
              top: `${l.y - (l.w * GLOW) / 2}%`,
              animationDelay: `${l.delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
