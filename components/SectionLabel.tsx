'use client';

import { MoonGlyph } from './MoonLantern';

/**
 * The shared section eyebrow: lit lantern, rule, label.
 *
 * Pass `as="h2"` where the label is the section's only heading, so the section
 * still has one in the document outline.
 */
export function SectionLabel({
  children,
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  as?: 'div' | 'h2';
}) {
  return (
    <Tag className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-forest-800/60 dark:text-cream-100/55">
      <MoonGlyph className="h-4 w-4 text-lantern-500 dark:text-lantern-300" />
      <span className="h-px w-8 bg-leaf-500/60 dark:bg-leaf-300/50" />
      <span>{children}</span>
    </Tag>
  );
}
