'use client';

import { motion } from 'framer-motion';
import { Rocket, Code2, LifeBuoy } from 'lucide-react';
import { SectionLabel } from './SectionLabel';
import { MoonGlyph } from './MoonLantern';

const pillars = [
  {
    icon: Rocket,
    tag: 'Kickstart',
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
        <div className="grid lg:grid-cols-2 gap-10 mb-10 lg:mb-14 items-end">
          <div>
            <div className="mb-5">
              <SectionLabel>What we do</SectionLabel>
            </div>
            <h2 className="font-display text-[clamp(1.9rem,3.9vw,3.2rem)] leading-[1.08] tracking-[-0.015em] text-forest-800 dark:text-cream-100">
              Start it. Build it. <span className="text-leaf">Keep it running.</span>
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
                    'radial-gradient(circle at 85% 0%, rgba(127,187,53,0.22), transparent 62%)',
                }}
              />

              <div className="relative flex items-center gap-4 mb-6 min-h-[2.75rem]">
                <div className="h-11 w-11 shrink-0 rounded-xl bg-leaf-400/12 border border-leaf-500/30 dark:border-leaf-300/25 flex items-center justify-center text-forest-600 dark:text-leaf-200 group-hover:bg-leaf-300 group-hover:text-forest-950 group-hover:border-leaf-300 transition-colors duration-500">
                  <p.icon size={19} strokeWidth={1.7} />
                </div>
                <h3 className="font-display text-2xl md:text-[1.75rem] leading-tight text-forest-800 dark:text-cream-100">
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
                    <MoonGlyph className="h-3.5 w-3.5 shrink-0 text-lantern-500/85 dark:text-lantern-300/75" />
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
