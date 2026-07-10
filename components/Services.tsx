'use client';

import { motion } from 'framer-motion';
import { Code2, Server, Compass, ArrowUpRight } from 'lucide-react';

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
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-ink-800/55 dark:text-parchment/50 mb-5">
              <span className="h-px w-8 bg-oak-500 dark:bg-oak-400" />
              <span>What we do</span>
            </div>
            <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-ink-900 dark:text-parchment">
              <span className="whitespace-nowrap">Three disciplines.</span>{' '}
              <span className="text-oak-gradient italic whitespace-nowrap">One team.</span>
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-base lg:text-lg text-ink-800/75 dark:text-parchment/65 max-w-md">
              Build, run, advise — under one roof. One contract, one point of contact, no
              scope game.
            </p>
          </div>
        </div>

        {/* Three pillars */}
        <div className="grid lg:grid-cols-3 gap-4">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="card-hover group relative overflow-hidden rounded-2xl border border-ink-900/10 dark:border-parchment/10 bg-parchment dark:bg-ink-900/60 p-8 md:p-10 flex flex-col"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at top right, rgba(212,164,55,0.18), transparent 60%)',
                }}
              />

              <div className="relative flex items-start justify-between mb-8">
                <div className="h-12 w-12 rounded-xl bg-oak-400/10 dark:bg-oak-400/10 border border-oak-500/30 dark:border-oak-400/20 flex items-center justify-center text-oak-600 dark:text-oak-300 group-hover:bg-oak-500 dark:group-hover:bg-oak-400 group-hover:text-ink-950 dark:group-hover:text-ink-950 transition-colors duration-500">
                  <p.icon size={20} strokeWidth={1.6} />
                </div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-ink-800/45 dark:text-parchment/40 mt-2">
                  {p.tag}
                </span>
              </div>

              <h3 className="relative font-display text-2xl md:text-3xl text-ink-900 dark:text-parchment mb-3">
                {p.title}
              </h3>
              <p className="relative text-ink-800/75 dark:text-parchment/65 leading-relaxed mb-7">{p.blurb}</p>

              <ul className="relative mt-auto space-y-2 pt-6 border-t border-ink-900/10 dark:border-parchment/10">
                {p.includes.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-ink-800/80 dark:text-parchment/75">
                    <span className="text-oak-500/80 dark:text-oak-400/70 text-xs">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="relative mt-8 flex items-center gap-2 text-sm text-oak-600/0 dark:text-oak-300/0 group-hover:text-oak-600 dark:group-hover:text-oak-300 transition-colors duration-500">
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
