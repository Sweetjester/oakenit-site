'use client';

import { MoonLantern } from './MoonLantern';
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
  { x: 79.64, y: 75.39, w: 7.46, cord: 230, sway: 7, delay: 0.0 },
  { x: 14.48, y: 70.11, w: 7.01, cord: 170, sway: 9, delay: 1.3 },
  { x: 69.29, y: 65.1, w: 7.34, cord: 122, sway: 6.4, delay: 2.2 },
  { x: 28.12, y: 66.75, w: 7.01, cord: 138, sway: 8.2, delay: 0.7 },
  { x: 89.33, y: 66.61, w: 6.89, cord: 148, sway: 7.6, delay: 1.8 },
];

/** The smaller glowing fruit the artwork carried, as light only. */
const ORBS = [
  { x: 51.93, y: 32.58, w: 5.42, delay: 0.4 },
  { x: 20.57, y: 60.77, w: 7.12, delay: 1.9 },
  { x: 38.3, y: 44.92, w: 6.44, delay: 0.9 },
  { x: 27.05, y: 40.66, w: 6.67, delay: 2.6 },
  { x: 74.11, y: 37.83, w: 6.21, delay: 1.2 },
  { x: 15.14, y: 47.27, w: 5.99, delay: 3.1 },
  { x: 84.19, y: 47.05, w: 5.31, delay: 0.2 },
  { x: 39.35, y: 25.87, w: 5.08, delay: 2.3 },
  { x: 46.6, y: 21.49, w: 5.65, delay: 1.6 },
];

const CORD_GLOBE = (cord: number) => (cord + 58) / 100;
const GLOBE_X = 0.68;

/** Light falling on the drawing, brightest at each flame and cooling outward. */
const DARK_PAINT = [
  ...LANTERNS.map(
    (l) =>
      `radial-gradient(circle at ${l.x}% ${l.y}%, rgba(255,231,168,0.98) 0%, rgba(244,186,92,0.72) 5%, rgba(150,196,104,0.3) 14%, rgba(60,120,70,0.1) 24%, rgba(0,0,0,0) 34%)`
  ),
  ...ORBS.map(
    (o) =>
      `radial-gradient(circle at ${o.x}% ${o.y}%, rgba(255,226,150,0.7) 0%, rgba(210,175,95,0.34) 6%, rgba(110,170,90,0.14) 15%, rgba(0,0,0,0) 26%)`
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
  /** Opacity of the drawing itself. The lanterns stay brighter than it. */
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

        {/* air glow around the small fruit */}
        {ORBS.map((o, i) => (
          <div
            key={`orb-${i}`}
            className="lantern-light-soft absolute"
            style={{
              width: `${o.w * 2.1}%`,
              height: `${o.w * 2.1}%`,
              left: `${o.x - o.w * 1.05}%`,
              top: `${o.y - o.w * 1.05}%`,
              animationDelay: `${o.delay}s`,
            }}
          />
        ))}

        {/* fireflies at night, motes by day — they drift a little wider than
            the canopy either way */}
        <Fireflies className="absolute -inset-[6%] h-[112%] w-[112%]" />

        {/* the lanterns */}
        {LANTERNS.map((l, i) => (
          <div key={`lan-${i}`}>
            <div
              className="lantern-light absolute"
              style={{
                width: `${l.w * 4.6}%`,
                height: `${l.w * 4.6}%`,
                left: `${l.x - l.w * 2.3}%`,
                top: `${l.y - l.w * 2.3}%`,
                animationDelay: `${l.delay}s`,
              }}
            />
            <div
              className="absolute"
              style={{
                width: `${l.w}%`,
                left: `${l.x - l.w * GLOBE_X}%`,
                top: `${l.y - l.w * CORD_GLOBE(l.cord)}%`,
              }}
            >
              <MoonLantern
                cord={l.cord}
                sway={l.sway}
                delay={l.delay}
                uid={`${idPrefix}${i}`}
                className="relative h-auto w-full text-lantern-600/70 opacity-60 dark:text-lantern-300/90 dark:opacity-100"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
