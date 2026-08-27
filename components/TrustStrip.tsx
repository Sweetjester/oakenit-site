import { MoonGlyph } from './MoonLantern';

const areas = [
  'Software',
  'Infrastructure',
  'Microsoft 365',
  'Cloud',
  'Automation',
  'Security',
];

/** A quiet band under the hero — what a visitor scans before they read. */
export function TrustStrip() {
  return (
    <section className="border-y border-forest-900/10 dark:border-cream-100/10 bg-forest-50/60 dark:bg-forest-900/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6">
        <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3 text-xs uppercase tracking-[0.22em] text-forest-800/65 dark:text-cream-100/60">
          {areas.map((a, i) => (
            <li key={a} className="flex items-center gap-3">
              {i > 0 && (
                <MoonGlyph className="h-3.5 w-3.5 text-lantern-500/70 dark:text-lantern-300/60" />
              )}
              <span>{a}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
