'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

type Props = {
  size?: number;
  withWordmark?: boolean;
  className?: string;
};

/**
 * The lockup: the lantern-tree mark (real artwork, /public/mark.png — it has a
 * transparent background so it sits on either theme) plus the wordmark set in
 * the display serif to match the supplied logo.
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
          fill
          priority
          sizes={`${size}px`}
          className="object-contain"
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
