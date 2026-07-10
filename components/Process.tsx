'use client';

import { motion } from 'framer-motion';

const steps = [
  { n: '01', title: 'Listen', body: '30-min call. You describe the problem.' },
  { n: '02', title: 'Scope', body: 'One-page proposal within 5 working days.' },
  { n: '03', title: 'Ship', body: 'Two-week sprints. Demo every Friday.' },
  { n: '04', title: 'Stay', body: 'Optional monthly retainer. Cancel anytime.' },
];

export function Process() {
  return (
    <section
      id="process"
      className="relative py-20 lg:py-28 border-t border-ink-900/10 dark:border-parchment/10 bg-parchment/60 dark:bg-ink-900/40"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-ink-800/55 dark:text-parchment/50 mb-10">
          <span className="h-px w-8 bg-oak-500 dark:bg-oak-400" />
          <span>How we work</span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-ink-900/10 dark:bg-parchment/10 border border-ink-900/10 dark:border-parchment/10">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-parchment-50 dark:bg-ink-950 p-7 md:p-8 flex flex-col gap-6 overflow-hidden"
            >
              <span className="font-display text-oak-600 dark:text-oak-400 text-sm tracking-widest big-numeral">
                {s.n}
              </span>
              <div>
                <h3 className="font-display text-xl text-ink-900 dark:text-parchment mb-1">
                  {s.title}
                </h3>
                <p className="text-ink-800/70 dark:text-parchment/60 text-sm leading-relaxed">
                  {s.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
