'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SectionLabel } from './SectionLabel';
import Image from 'next/image';

/**
 * Homepage teaser. The work itself lives at /work — this exists so the
 * homepage carries a credibility signal without duplicating the page.
 *
 * These were live iframes of each product. Measured on throttled mobile that
 * cost the homepage 36 extra requests across six third-party hosts (both
 * sites, plus SoundCloud's four) and helped push LCP to 4.7s — Core Web Vitals
 * are a ranking factor, so the homepage is the worst place to pay it. They are
 * now static 1280x800 screenshots, captured from the real sites and refreshed
 * with `scripts/thumbs.js`. The genuinely-live embeds stay on /work, where the
 * visitor has already chosen to look.
 */
const highlights = [
  {
    metric: '60s',
    label: 'from uploaded CV to a live hosted site',
    name: 'CV Live',
    tag: 'Our own product',
    shot: '/shot-cvlive.jpg',
  },
  {
    metric: '10',
    label: 'cues playing from the page, not a pasted-in widget',
    name: 'PhantomAxis Studios',
    tag: 'Recent build',
    shot: '/shot-phantomaxis.jpg',
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
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <SectionLabel as="h2">Our work</SectionLabel>
          <a
            href="/work"
            className="group inline-flex items-center gap-2 text-sm text-forest-600 dark:text-leaf-200 hover:text-leaf-600 dark:hover:text-leaf-100 transition-colors"
          >
            See our work
            <ArrowUpRight
              size={15}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {highlights.map((h, i) => (
            <motion.a
              key={h.name}
              href="/work"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="card group relative overflow-hidden rounded-2xl border border-forest-900/12 dark:border-cream-100/10 bg-cream-100/70 dark:bg-forest-900/60 flex flex-col"
            >
              {/* preview */}
              <div className="relative border-b border-forest-900/10 dark:border-cream-100/10 bg-cream-50 dark:bg-forest-950">
                {h.shot ? (
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={h.shot}
                      alt={`${h.name} — homepage`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-cream-100/10 dark:bg-forest-950/25 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                ) : (
                  <div className="aspect-[16/10] flex items-center justify-center px-6">
                    <div className="text-center">
                      <div className="font-display font-extrabold text-4xl leading-none tracking-[-0.03em] text-leaf big-numeral">
                        {h.metric}
                      </div>
                      <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-forest-800/45 dark:text-cream-100/40">
                        Under NDA
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* footer */}
              <div className="relative p-6 flex flex-col gap-3 flex-1">
                <div className="text-[10px] uppercase tracking-[0.25em] text-forest-800/50 dark:text-cream-100/45">
                  {h.tag}
                </div>
                <div className="flex items-start justify-between gap-3">
                  <span className="font-display font-bold text-lg leading-snug tracking-[-0.02em] text-forest-800 dark:text-cream-100">
                    {h.name}
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="mt-1 shrink-0 text-forest-800/35 dark:text-cream-100/35 group-hover:text-leaf-600 dark:group-hover:text-leaf-200 transition-colors"
                  />
                </div>
                <p className="text-sm text-forest-800/70 dark:text-cream-100/60 leading-snug mt-auto">
                  {h.shot && (
                    <span className="font-display font-bold text-leaf mr-1.5 big-numeral">
                      {h.metric}
                    </span>
                  )}
                  {h.label}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
