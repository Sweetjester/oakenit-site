'use client';

import { LanternGlyph } from './Lantern';

/** The shared section eyebrow: lit lantern, rule, label. */
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-forest-800/60 dark:text-cream-100/55">
      <LanternGlyph className="h-4 w-3 text-lantern-500 dark:text-lantern-300" />
      <span className="h-px w-8 bg-leaf-500/60 dark:bg-leaf-300/50" />
      <span>{children}</span>
    </div>
  );
}
