'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { SectionLabel } from './SectionLabel';
import { Lantern } from './Lantern';

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
            <div className="mb-5">
              <SectionLabel>Why OakenIT</SectionLabel>
            </div>
            <h2 className="font-display font-semibold text-[clamp(2.4rem,5vw,4.25rem)] leading-[1.02] tracking-[-0.02em] mb-6 text-forest-800 dark:text-cream-100">
              Why <span className="italic font-medium text-lantern">us.</span>
            </h2>
            <p className="text-forest-800/75 dark:text-cream-100/65 text-lg leading-relaxed max-w-md">
              Most firms sell you complexity. We sell you its absence.
            </p>

            {/* Pull quote, lit from the left by a hanging lantern */}
            <div className="relative mt-10 rounded-2xl border border-lantern-500/30 dark:border-lantern-300/25 bg-lantern-400/10 dark:bg-lantern-300/[0.06] p-7 pl-16 overflow-hidden">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at 12% 30%, rgba(237,162,27,0.20), transparent 60%)',
                }}
              />
              <Lantern
                cord={12}
                sway={7}
                className="absolute left-3 -top-1 w-8 h-auto text-lantern-600/80 dark:text-lantern-300/85"
              />
              <p className="relative font-display italic text-[1.35rem] leading-snug text-forest-800 dark:text-cream-100/90">
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
              className="group relative flex gap-5 p-8 rounded-2xl border border-forest-900/12 dark:border-cream-100/10 hover:border-lantern-500/50 dark:hover:border-lantern-300/40 bg-cream-100/60 dark:bg-forest-900/40 transition-colors duration-500"
            >
              <div className="shrink-0 h-10 w-10 rounded-full bg-forest-700 dark:bg-lantern-300 text-cream-50 dark:text-forest-950 flex items-center justify-center mt-1 group-hover:bg-lantern-400 group-hover:text-forest-950 transition-colors duration-500">
                <Check size={18} strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="font-display font-semibold text-[1.7rem] leading-tight text-forest-800 dark:text-cream-100 mb-2">
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
