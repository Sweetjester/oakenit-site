'use client';

import { motion } from 'framer-motion';
import { SectionLabel } from './SectionLabel';
import { LanternGlyph } from './Lantern';

const experience = [
  'Business-critical infrastructure',
  'Microsoft 365 and cloud environments',
  'Bespoke internal applications',
  'Automation and systems integration',
  'Cyber security and resilience',
  'Multi-site businesses',
  'High-volume transactional systems',
];

/**
 * ⚠️ Case studies are factual claims about real client work. Every entry here
 * must be signed off by Andy before it goes in front of prospects — do not
 * invent, embellish or "round up" a figure to fill the grid. One real case
 * study beats three plausible ones.
 */
const caseStudies = [
  {
    metric: '90%+',
    metricLabel: 'field reporting captured during a major live deployment',
    body: 'Designed and delivered a custom proof-of-posting platform used across a high-volume outdoor advertising operation.',
    arc: ['Manual, inconsistent reporting', 'Custom capture platform', 'Near-complete coverage'],
  },
];

export function Proof() {
  return (
    <section id="work" className="relative py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mb-10">
          <SectionLabel>Our work</SectionLabel>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Selected experience */}
          <div className="lg:col-span-5">
            <h2 className="font-display text-[clamp(1.9rem,3.9vw,3.2rem)] leading-[1.08] tracking-[-0.015em] text-forest-800 dark:text-cream-100 mb-7">
              Selected <span className="text-lantern">experience.</span>
            </h2>
            <ul className="space-y-3">
              {experience.map((e) => (
                <li
                  key={e}
                  className="flex items-center gap-3 text-forest-800/80 dark:text-cream-100/70"
                >
                  <LanternGlyph className="h-4 w-3 shrink-0 text-lantern-500 dark:text-lantern-300" />
                  <span>{e}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Case studies */}
          <div className="lg:col-span-7 space-y-5">
            {caseStudies.map((c, i) => (
              <motion.article
                key={c.metric}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden rounded-2xl border border-forest-900/12 dark:border-cream-100/10 bg-cream-100/70 dark:bg-forest-900/60 p-8 md:p-10"
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(circle at 90% 0%, rgba(237,162,27,0.16), transparent 60%)',
                  }}
                />
                <div className="relative flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-4">
                  <span className="font-display text-5xl md:text-6xl leading-none text-lantern big-numeral">
                    {c.metric}
                  </span>
                  <span className="text-sm text-forest-800/70 dark:text-cream-100/60 max-w-xs leading-snug">
                    {c.metricLabel}
                  </span>
                </div>
                <p className="relative text-forest-800/80 dark:text-cream-100/70 leading-relaxed">
                  {c.body}
                </p>
                <div className="relative mt-7 pt-6 border-t border-forest-900/10 dark:border-cream-100/10 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs uppercase tracking-[0.18em] text-forest-800/60 dark:text-cream-100/55">
                  {c.arc.map((step, j) => (
                    <span key={step} className="flex items-center gap-3">
                      {j > 0 && <span className="text-lantern-500 dark:text-lantern-300">→</span>}
                      <span>{step}</span>
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}

            <p className="text-sm text-forest-800/60 dark:text-cream-100/50 leading-relaxed">
              Most of our work sits behind NDAs or inside businesses that would rather not
              advertise their internal systems. Ask and we will walk you through the
              closest comparable project on a call.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
