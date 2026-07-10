'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

type Props = {
  size?: number;
  withWordmark?: boolean;
  className?: string;
};

/**
 * The image paths below point at SVG placeholders. When you have real logo
 * artwork:
 *   - If you save it as SVG, drop it at the same paths — no change needed.
 *   - If you save it as PNG, drop it at /public/logo.png + /public/logo-light.png
 *     and update the `src` strings from `.svg` to `.png` (2 lines).
 */
export function Logo({ size = 36, withWordmark = true, className = '' }: Props) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: size, height: size }}
        className="relative shrink-0"
      >
        {/* Dark-mode artwork */}
        <Image
          src="/logo.svg"
          alt="OakenIT"
          fill
          priority
          sizes={`${size}px`}
          className="object-contain hidden dark:block"
        />
        {/* Light-mode artwork */}
        <Image
          src="/logo-light.svg"
          alt="OakenIT"
          fill
          priority
          sizes={`${size}px`}
          className="object-contain block dark:hidden"
        />
      </motion.div>

      {withWordmark && (
        <span className="font-display text-[1.35rem] leading-none tracking-tight">
          <span className="text-oak-600 dark:text-oak-400">Oaken</span>
          <span className="text-ink-900 dark:text-parchment">IT</span>
        </span>
      )}
    </div>
  );
}
