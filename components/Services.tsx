'use client';

import { motion } from 'framer-motion';
import { Rocket, Code2, LifeBuoy, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { SectionLabel } from './SectionLabel';
import { MoonGlyph } from './MoonLantern';

const pillars = [
  {
    icon: Rocket,
    tag: 'Kickstart',
    href: '/services/it-setup',
    blurb:
      'For businesses setting up, or starting again after outgrowing whatever they started with. The foundations, done properly the first time.',
    includes: [
      'Cloud and Microsoft 365 setup',
      'Networks, devices and access',
      'Security and backups from day one',
      'Getting off spreadsheets and paper',
      'Migrating from a system you have outgrown',
    ],
  },
  {
    icon: Code2,
    tag: 'Bespoke development',
    href: '/services/software-development',
    blurb:
      'Software shaped around how your business actually works, rather than a product you have to reshape your business around.',
    includes: [
      'Internal business applications',
      'Customer and staff portals',
      'API integrations',
      'Workflow automation',
      'Data and reporting systems',
    ],
  },
  {
    icon: LifeBuoy,
    tag: 'Short & long-term support',
    href: '/services/it-support',
    blurb:
      'A pair of hands for a fortnight, or a technical team on call for years. The same people either way, and no notice period dressed up as a contract.',
    includes: [
      'Fixing what is broken now',
      'Monitoring and maintenance',
      'Infrastructure and cloud management',
      'Security and compliance',
      'Technical advice when decisions come up',
    ],
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mb-8">
          <SectionLabel as="h2">What we do</SectionLabel>
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
                    'radial-gradient(circle at 85% 0%, rgba(127,187,53,0.22), transparent 62%)',
                }}
              />

              <div className="relative flex items-center gap-4 mb-6 min-h-[2.75rem]">
                <div className="h-11 w-11 shrink-0 rounded-xl bg-leaf-400/12 border border-leaf-500/30 dark:border-leaf-300/25 flex items-center justify-center text-forest-600 dark:text-leaf-200 group-hover:bg-leaf-300 group-hover:text-forest-950 group-hover:border-leaf-300 transition-colors duration-500">
                  <p.icon size={19} strokeWidth={1.7} />
                </div>
                <h3 className="font-display font-bold text-xl md:text-2xl leading-snug tracking-[-0.02em] text-forest-800 dark:text-cream-100">
                  {p.tag}
                </h3>
              </div>

              <p className="relative text-forest-800/75 dark:text-cream-100/65 leading-relaxed mb-7">
                {p.blurb}
              </p>

              <ul className="relative space-y-2.5 pt-6 border-t border-forest-900/10 dark:border-cream-100/10">
                {p.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-forest-800/85 dark:text-cream-100/75"
                  >
                    <MoonGlyph className="h-3.5 w-3.5 shrink-0 text-lantern-500/85 dark:text-lantern-300/75" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={p.href}
                className="relative mt-7 inline-flex items-center gap-2 text-sm text-forest-600 dark:text-leaf-200 hover:text-leaf-600 dark:hover:text-leaf-100 transition-colors"
              >
                More on {p.tag.toLowerCase()}
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
