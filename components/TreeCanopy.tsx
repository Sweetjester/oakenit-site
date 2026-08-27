'use client';

import Image from 'next/image';
import { MoonLantern } from './MoonLantern';

/**
 * The background tree, with real lanterns hung on it.
 *
 * public/tree.png is public/mark.png with its baked-in lanterns masked out —
 * the originals were raster, so they could neither take the new moon-lantern
 * design nor light anything. These anchors are where they used to hang,
 * measured off that mask, so the new ones land on the same branches.
 *
 * `x`/`y` are the globe's centre and `w` the lantern width, both as a
 * percentage of the (square) container. A lantern's globe sits at 68% of its
 * width across and, at cord 40, 1.18 widths down — hence the offsets below.
 */
// `cord` is recovered from the mask too: each blob's top is where the original
// cord met its branch, so these hang from the same points the artwork did
// rather than floating below them.
const LANTERNS = [
  { x: 79.64, y: 75.39, w: 7.46, cord: 230, sway: 7, delay: 0.0 },
  { x: 14.48, y: 70.11, w: 7.01, cord: 170, sway: 9, delay: 1.3 },
  { x: 69.29, y: 65.1, w: 7.34, cord: 122, sway: 6.4, delay: 2.2 },
  { x: 28.12, y: 66.75, w: 7.01, cord: 138, sway: 8.2, delay: 0.7 },
  { x: 89.33, y: 66.61, w: 6.89, cord: 148, sway: 7.6, delay: 1.8 },
];

/** The smaller glowing orbs the artwork carried, as pure light. */
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

/** globe offset from the svg's own top-left, in multiples of its width */
const GLOBE_X = 0.68;
const globeY = (cord: number) => (cord + 58) / 100;

type Props = {
  /** Opacity of the tree itself. The lanterns stay brighter than it. */
  treeClassName?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  idPrefix: string;
};

export function TreeCanopy({
  treeClassName = 'opacity-[0.16] dark:opacity-[0.2]',
  className = '',
  priority = false,
  sizes = '70vw',
  idPrefix,
}: Props) {
  return (
    <div className={className}>
      <div className="relative w-full h-full">
      <div className={`absolute inset-0 ${treeClassName}`}>
        <Image src="/tree.png" alt="" fill priority={priority} sizes={sizes} className="object-contain" />
      </div>

      {/* the orbs: light with no fixture */}
      {ORBS.map((o, i) => (
        <div
          key={`orb-${i}`}
          className="lantern-light-soft absolute"
          style={{
            width: `${o.w * 3.2}%`,
            height: `${o.w * 3.2}%`,
            left: `${o.x - o.w * 1.6}%`,
            top: `${o.y - o.w * 1.6}%`,
            animationDelay: `${o.delay}s`,
          }}
        />
      ))}

      {/* the lanterns themselves */}
      {LANTERNS.map((l, i) => (
        <div
          key={`lan-${i}`}
          className="absolute"
          style={{
            width: `${l.w}%`,
            left: `${l.x - l.w * GLOBE_X}%`,
            top: `${l.y - l.w * globeY(l.cord)}%`,
          }}
        >
          <div
            className="lantern-light-soft absolute"
            style={{
              width: '420%',
              height: '420%',
              left: `${GLOBE_X * 100 - 210}%`,
              top: `${globeY(l.cord) * 100 - 210}%`,
              animationDelay: `${l.delay}s`,
            }}
          />
          <MoonLantern
            cord={l.cord}
            sway={l.sway}
            delay={l.delay}
            uid={`${idPrefix}${i}`}
            className="relative w-full h-auto text-lantern-600/70 dark:text-lantern-300/80 opacity-45 dark:opacity-100"
          />
        </div>
      ))}
      </div>
    </div>
  );
}
