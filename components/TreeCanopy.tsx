'use client';

import Image from 'next/image';
import { Fireflies } from './Fireflies';

/**
 * The background tree: Andy's illustration, shown as itself.
 *
 * This used to mask `tree-lines.png` and paint the ink with a gradient stack.
 * That existed because the *previous* mark was a solid green fill and had to be
 * edge-detected into line work before it could be lit. The 2026-09-03 artwork
 * is already ink and watercolour, with its own green washes, ochre trunk and
 * six gold lanterns — masking it replaced all of that with a flat colour and
 * left a faint pencil ghost of the drawing.
 *
 * So the drawing is an `<Image>` now, at its own colours, and the lantern light
 * sits on top at the anchors below. Those anchors are the centroids of the
 * warm blobs in the artwork, so the glow lands on the lanterns as drawn.
 * Regenerate tree.png and the anchors together or the light drifts off them.
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


type Props = {
  className?: string;
  /** Opacity of the drawing itself. */
  treeClassName?: string;
  idPrefix: string;
};

export function TreeCanopy({
  className = '',
  treeClassName = 'opacity-[0.30] dark:opacity-[0.55]',
  idPrefix,
}: Props) {
  return (
    <div className={className}>
      <div className="relative h-full w-full">
        {/* the drawing itself */}
        <div className={`absolute inset-0 ${treeClassName}`}>
          <Image
            src="/tree.png"
            alt=""
            fill
            sizes="(max-width: 768px) 90vw, 55vw"
            className="object-contain object-bottom"
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
