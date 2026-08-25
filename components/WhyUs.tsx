'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { SectionLabel } from './SectionLabel';

const points = [
  {
    h: 'Senior, by default.',
    p: 'Everyone you work with has shipped real systems for a decade. No juniors in disguise, no offshoring.',
  },
  {
    h: 'AI is the unfair advantage.',
    p: 'We use AI constantly, critically, never blindly. A small team that ships like a big one.',
  },
  {
    h: 'Plain English, every step.',
    p: 'You will know what we are doing, why, and what it costs. If we can’t explain it in a paragraph, we won’t do it.',
  },
];

export function WhyUs() {
  return (
    <section id="why" className="relative py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <div className="mb-5">
              <SectionLabel>Why OakenIT</SectionLabel>
            </div>
            <h2 className="font-display text-[clamp(1.9rem,3.9vw,3.2rem)] leading-[1.08] tracking-[-0.015em] mb-6 text-forest-800 dark:text-cream-100">
              Why <span className="text-lantern">us.</span>
            </h2>
            <p className="text-forest-800/75 dark:text-cream-100/65 text-lg leading-relaxed max-w-md">
              Most firms sell you complexity. We sell you its absence.
            </p>
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
              className="group relative flex gap-5 p-8 rounded-2xl border border-forest-900/12 dark:border-cream-100/10 hover:border-lantern-500/50 dark:hover:border-lantern-300/40 bg-cream-100/60 dark:bg-forest-900/40 transition-colors duration-500"
            >
              <div className="shrink-0 h-10 w-10 rounded-full bg-forest-700 dark:bg-lantern-300 text-cream-50 dark:text-forest-950 flex items-center justify-center mt-1 group-hover:bg-lantern-400 group-hover:text-forest-950 transition-colors duration-500">
                <Check size={18} strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="font-display text-[1.4rem] leading-snug text-forest-800 dark:text-cream-100 mb-2">
                  {p.h}
                </h3>
                <p className="text-forest-800/75 dark:text-cream-100/65 leading-relaxed">{p.p}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
