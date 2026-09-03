'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

type Props = {
  size?: number;
  withWordmark?: boolean;
  className?: string;
};

/**
 * The lockup: the illustrated mark plus the wordmark in the display serif.
 *
 * ⚠️ The mark is requested at **4x** its display size, at high quality.
 * `sizes={`${size}px`}` made Next serve a 32px-wide, q=75 re-encode of the
 * artwork, which threw away the stroke work that makes a watercolour drawing
 * legible small — the logo turned to mush and read as the old mark. A detailed
 * illustration shown at 38px needs real pixels behind it; do not "optimise"
 * this back down.
 */
export function Logo({ size = 36, withWordmark = true, className = '' }: Props) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: size, height: size }}
        className="relative shrink-0"
      >
        <Image
          src="/mark.png"
          alt="OakenIT"
          width={size * 4}
          height={size * 4}
          quality={92}
          priority
          sizes={`${size * 4}px`}
          className="h-full w-full object-contain"
        />
      </motion.div>

      {withWordmark && (
        <span
          className="font-wordmark leading-none tracking-[-0.01em] text-forest-700 dark:text-cream-100"
          style={{ fontSize: size * 0.72 }}
        >
          OakenIT
        </span>
      )}
    </div>
  );
}
