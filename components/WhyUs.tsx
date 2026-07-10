'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const points = [
  {
    h: 'Senior, by default.',
    p: 'Everyone you work with has shipped real systems for a decade. No juniors in disguise. No offshoring.',
  },
  {
    h: 'AI is the unfair advantage.',
    p: 'We use AI constantly, critically, never blindly. A small team that ships like a big one.',
  },
  {
    h: 'Three skills, one contract.',
    p: 'Build, run, advise — under one roof. No bouncing between an agency, an MSP, and a consultant.',
  },
  {
    h: 'Plain English, every step.',
    p: 'You will know what we are doing, why, and what it costs. If we can’t explain it in a paragraph, we won’t do it.',
  },
];

export function WhyUs() {
  return (
    <section id="why" className="relative py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-ink-800/55 dark:text-parchment/50 mb-5">
              <span className="h-px w-8 bg-oak-500 dark:bg-oak-400" />
              <span>Why OakenIT</span>
            </div>
            <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight mb-6 text-ink-900 dark:text-parchment">
              Why{' '}
              <span className="italic text-oak-gradient">us.</span>
            </h2>
            <p className="text-ink-800/75 dark:text-parchment/65 text-lg leading-relaxed max-w-md">
              Most firms sell you complexity. We sell you its absence.
            </p>

            <div className="mt-10 p-7 rounded-2xl border border-oak-500/30 dark:border-oak-400/20 bg-oak-400/10 dark:bg-oak-400/[0.04]">
              <p className="font-display italic text-lg text-ink-900 dark:text-parchment/90 leading-snug">
                &ldquo;The technical team you would hire if you could — by the month.&rdquo;
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-4">
          {points.map((p, i) => (
            <motion.div
              key={p.h}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex gap-5 p-8 rounded-2xl border border-ink-900/10 dark:border-parchment/10 hover:border-oak-500/50 dark:hover:border-oak-400/40 bg-parchment dark:bg-ink-900/40 transition-colors duration-500"
            >
              <div className="shrink-0 h-10 w-10 rounded-full bg-oak-500 dark:bg-oak-400 text-ink-950 flex items-center justify-center mt-1">
                <Check size={18} strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="font-display text-2xl text-ink-900 dark:text-parchment mb-2">{p.h}</h3>
                <p className="text-ink-800/75 dark:text-parchment/65 leading-relaxed">{p.p}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
