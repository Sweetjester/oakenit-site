'use client';

import { motion } from 'framer-motion';
import { Hammer, Wrench, TrendingUp } from 'lucide-react';
import { SectionLabel } from './SectionLabel';
import { LanternGlyph } from './Lantern';

const pillars = [
  {
    icon: Hammer,
    tag: 'Build',
    blurb:
      'Bespoke software, internal tools and integrations designed around the way your business actually works.',
    includes: [
      'Internal business applications',
      'Customer and staff portals',
      'API integrations',
      'Workflow automation',
      'Data and reporting systems',
    ],
  },
  {
    icon: Wrench,
    tag: 'Fix',
    blurb:
      'When something technical isn’t working properly, has become unreliable, or simply needs sorting out.',
    includes: [
      'Microsoft 365',
      'Servers and cloud infrastructure',
      'Networks and connectivity',
      'Security and access',
      'Performance and reliability',
      'Legacy systems',
    ],
  },
  {
    icon: TrendingUp,
    tag: 'Improve',
    blurb:
      'Sometimes the technology works — it just works badly. We simplify complicated environments and replace manual processes.',
    includes: [
      'IT architecture reviews',
      'Infrastructure modernisation',
      'Cloud strategy',
      'Security improvements',
      'Automation opportunities',
      'Technical due diligence',
    ],
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-10 mb-10 lg:mb-14 items-end">
          <div>
            <div className="mb-5">
              <SectionLabel>What we do</SectionLabel>
            </div>
            <h2 className="font-display text-[clamp(1.9rem,3.9vw,3.2rem)] leading-[1.08] tracking-[-0.015em] text-forest-800 dark:text-cream-100">
              Build. Fix. <span className="text-lantern">Improve.</span>
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-base lg:text-lg text-forest-800/75 dark:text-cream-100/65 max-w-md">
              Most work falls into one of three shapes. Yours probably does too — and it
              doesn’t need to be perfectly defined before you get in touch.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {pillars.map((p, i) => (
            <motion.div
              key={p.tag}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="card group relative overflow-hidden rounded-2xl border border-forest-900/12 dark:border-cream-100/10 bg-cream-100/70 dark:bg-forest-900/60 p-8 md:p-9 flex flex-col"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at 85% 0%, rgba(237,162,27,0.20), transparent 62%)',
                }}
              />

              <div className="relative flex items-center gap-4 mb-6">
                <div className="h-11 w-11 shrink-0 rounded-xl bg-lantern-400/12 border border-lantern-500/30 dark:border-lantern-300/25 flex items-center justify-center text-forest-600 dark:text-lantern-200 group-hover:bg-lantern-300 group-hover:text-forest-950 group-hover:border-lantern-300 transition-colors duration-500">
                  <p.icon size={19} strokeWidth={1.7} />
                </div>
                <h3 className="font-display text-3xl leading-none text-forest-800 dark:text-cream-100">
                  {p.tag}
                </h3>
              </div>

              <p className="relative text-forest-800/75 dark:text-cream-100/65 leading-relaxed mb-7">
                {p.blurb}
              </p>

              <ul className="relative mt-auto space-y-2.5 pt-6 border-t border-forest-900/10 dark:border-cream-100/10">
                {p.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-forest-800/85 dark:text-cream-100/75"
                  >
                    <LanternGlyph className="h-3.5 w-2.5 shrink-0 text-lantern-500/85 dark:text-lantern-300/75" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
