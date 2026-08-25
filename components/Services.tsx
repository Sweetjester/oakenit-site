'use client';

import { motion } from 'framer-motion';
import { Code2, Server, Compass, ArrowUpRight } from 'lucide-react';
import { SectionLabel } from './SectionLabel';
import { LanternGlyph } from './Lantern';

const pillars = [
  {
    icon: Code2,
    tag: '01 · Development',
    title: 'We build software.',
    blurb: 'Idea to production. Modern stack, senior engineers, no offshoring.',
    includes: [
      'Web apps & SaaS',
      'Internal tools & dashboards',
      'AI agents & copilots',
      'APIs & integrations',
      'Mobile apps',
    ],
  },
  {
    icon: Server,
    tag: '02 · Systems',
    title: 'We run the platform.',
    blurb: 'Quiet infrastructure that wakes us — not you.',
    includes: [
      'Cloud architecture',
      'DevOps, CI/CD, IaC',
      'Monitoring & on-call',
      'Cybersecurity & compliance',
      'Backups & DR',
    ],
  },
  {
    icon: Compass,
    tag: '03 · Consulting',
    title: 'We answer the hard questions.',
    blurb: 'Senior advice — not slideware.',
    includes: [
      'Technical strategy',
      'AI roadmaps & POC scoping',
      'Architecture & code audits',
      'CTO-as-a-service',
      'M&A diligence',
    ],
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section header */}
        <div className="grid lg:grid-cols-2 gap-10 mb-12 lg:mb-16 items-end">
          <div>
            <div className="mb-5">
              <SectionLabel>What we do</SectionLabel>
            </div>
            <h2 className="font-display font-semibold text-[clamp(2.4rem,5vw,4.25rem)] leading-[1.02] tracking-[-0.02em] text-forest-800 dark:text-cream-100">
              <span className="whitespace-nowrap">Three disciplines.</span>{' '}
              <span className="italic font-medium text-lantern whitespace-nowrap">One team.</span>
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-base lg:text-lg text-forest-800/75 dark:text-cream-100/65 max-w-md">
              Build, run, advise — under one roof. One contract, one point of contact, no
              scope game.
            </p>
          </div>
        </div>

        {/* Three pillars */}
        <div className="grid lg:grid-cols-3 gap-5">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="card group relative overflow-hidden rounded-2xl border border-forest-900/12 dark:border-cream-100/10 bg-cream-100/70 dark:bg-forest-900/60 p-8 md:p-10 flex flex-col"
            >
              {/* lantern light warms the card on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at 85% 0%, rgba(237,162,27,0.20), transparent 62%)',
                }}
              />

              <div className="relative flex items-start justify-between mb-8">
                <div className="h-12 w-12 rounded-xl bg-lantern-400/12 border border-lantern-500/30 dark:border-lantern-300/25 flex items-center justify-center text-forest-600 dark:text-lantern-200 group-hover:bg-lantern-300 group-hover:text-forest-950 group-hover:border-lantern-300 transition-colors duration-500">
                  <p.icon size={20} strokeWidth={1.6} />
                </div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-forest-800/45 dark:text-cream-100/40 mt-2">
                  {p.tag}
                </span>
              </div>

              <h3 className="relative font-display font-semibold text-3xl md:text-[2.1rem] leading-tight text-forest-800 dark:text-cream-100 mb-3">
                {p.title}
              </h3>
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

              <div className="relative mt-8 flex items-center gap-2 text-sm text-forest-600/0 dark:text-lantern-200/0 group-hover:text-forest-600 dark:group-hover:text-lantern-200 transition-colors duration-500">
                <a href="#contact" className="flex items-center gap-2">
                  Brief us
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
