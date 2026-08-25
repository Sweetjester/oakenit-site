'use client';

import { motion } from 'framer-motion';
import { SectionLabel } from './SectionLabel';
import { LanternGlyph } from './Lantern';

const steps = [
  {
    n: '01',
    title: 'Understand',
    body: 'A short conversation about the problem, the business, and what success looks like.',
  },
  {
    n: '02',
    title: 'Scope',
    body: 'We recommend an approach, explain the trade-offs, and give you a clear proposal.',
  },
  {
    n: '03',
    title: 'Deliver',
    body: 'Small releases, visible progress, and regular communication.',
  },
  {
    n: '04',
    title: 'Support',
    body: 'Hand it over, keep improving it, or keep us available for when you need us.',
  },
];

export function Process() {
  return (
    <section
      id="process"
      className="relative py-16 lg:py-24 border-y border-forest-900/10 dark:border-cream-100/10 bg-forest-50/70 dark:bg-forest-900/40"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mb-10">
          <SectionLabel>How we work</SectionLabel>
        </div>

        <div className="relative">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-forest-900/10 dark:bg-cream-100/10 border border-forest-900/10 dark:border-cream-100/10">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-cream-50 dark:bg-forest-950 p-7 md:p-9 flex flex-col gap-6 overflow-hidden"
              >
                {/* the step's own light, warming on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(circle at 50% 0%, rgba(237,162,27,0.16), transparent 60%)',
                  }}
                />
                <span className="relative flex items-center gap-2.5 font-display text-lantern-600 dark:text-lantern-300 text-sm tracking-[0.3em] big-numeral">
                  <LanternGlyph className="h-4 w-3 shrink-0" />
                  {s.n}
                </span>
                <div className="relative">
                  <h3 className="font-display text-xl text-forest-800 dark:text-cream-100 mb-1.5">
                    {s.title}
                  </h3>
                  <p className="text-forest-800/70 dark:text-cream-100/60 text-sm leading-relaxed">
                    {s.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="mt-6 text-sm text-forest-800/60 dark:text-cream-100/55">
          No unnecessary retainers, and no vendor lock-in.
        </p>
      </div>
    </section>
  );
}
