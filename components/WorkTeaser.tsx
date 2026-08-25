'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SectionLabel } from './SectionLabel';

/**
 * Homepage teaser. The work itself lives at /work — this exists so the
 * homepage still carries a credibility signal without duplicating the page.
 */
const highlights = [
  {
    metric: '60s',
    label: 'from uploaded CV to a live hosted site',
    name: 'CV Live',
    tag: 'Our own product',
  },
  {
    metric: '90%+',
    label: 'field reporting captured on a live deployment',
    name: 'Proof-of-posting platform',
    tag: 'Client project',
  },
];

export function WorkTeaser() {
  return (
    <section id="work" className="relative py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-10 mb-10 items-end">
          <div>
            <div className="mb-5">
              <SectionLabel>Our work</SectionLabel>
            </div>
            <h2 className="font-display text-[clamp(1.9rem,3.9vw,3.2rem)] leading-[1.08] tracking-[-0.015em] text-forest-800 dark:text-cream-100">
              Things we have <span className="text-lantern">actually built.</span>
            </h2>
          </div>
          <div className="flex lg:justify-end">
            <a
              href="/work"
              className="group inline-flex items-center gap-2 text-forest-600 dark:text-lantern-200 hover:text-lantern-600 dark:hover:text-lantern-100 transition-colors"
            >
              See our work
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {highlights.map((h, i) => (
            <motion.a
              key={h.name}
              href="/work"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="card group relative overflow-hidden rounded-2xl border border-forest-900/12 dark:border-cream-100/10 bg-cream-100/70 dark:bg-forest-900/60 p-8 md:p-9 block"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at 90% 0%, rgba(237,162,27,0.18), transparent 62%)',
                }}
              />
              <div className="relative text-[10px] uppercase tracking-[0.25em] text-forest-800/50 dark:text-cream-100/45 mb-5">
                {h.tag}
              </div>
              <div className="relative flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-4">
                <span className="font-display text-5xl leading-none text-lantern big-numeral">
                  {h.metric}
                </span>
                <span className="text-sm text-forest-800/70 dark:text-cream-100/60 max-w-[16rem] leading-snug">
                  {h.label}
                </span>
              </div>
              <div className="relative flex items-center justify-between gap-4 pt-5 border-t border-forest-900/10 dark:border-cream-100/10">
                <span className="font-display text-xl text-forest-800 dark:text-cream-100">
                  {h.name}
                </span>
                <ArrowUpRight
                  size={16}
                  className="text-forest-800/35 dark:text-cream-100/35 group-hover:text-lantern-600 dark:group-hover:text-lantern-200 transition-colors"
                />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
