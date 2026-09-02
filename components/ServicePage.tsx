import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Nav } from './Nav';
import { Footer } from './Footer';
import { SectionLabel } from './SectionLabel';
import { MoonGlyph } from './MoonLantern';

export type Service = {
  slug: string;
  /** Nav/card label. */
  name: string;
  h1: string;
  /** Green half of the h1. */
  h1Accent: string;
  intro: string;
  /** What the work actually includes. */
  covers: string[];
  /**
   * Symptoms, in the visitor's words. This is the part that earns search
   * traffic — people describe the problem, not the service.
   */
  signs: string[];
  steps: { n: string; title: string; body: string }[];
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://oakenit.com';

export function ServicePage({ service, others }: { service: Service; others: Service[] }) {
  // Per-page Service schema. The homepage carries the Organization and
  // ProfessionalService nodes; this links each page back to them so search
  // engines can tell these are three services of one firm, not three firms.
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/services/${service.slug}#service`,
    name: service.name,
    description: service.intro,
    url: `${SITE_URL}/services/${service.slug}`,
    serviceType: service.name,
    provider: { '@id': `${SITE_URL}#organization` },
    areaServed: { '@type': 'Country', name: 'United Kingdom' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.name} — what it covers`,
      itemListElement: service.covers.map((c) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: c },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Nav />
      <main>
        {/* Header */}
        <section className="relative canopy pt-36 pb-14 lg:pt-44 lg:pb-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="mb-6">
              <SectionLabel>{service.name}</SectionLabel>
            </div>
            <h1 className="font-display font-extrabold text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.05] tracking-[-0.035em] text-forest-800 dark:text-cream-100 max-w-4xl">
              {service.h1} <span className="text-leaf">{service.h1Accent}</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg text-forest-800/75 dark:text-cream-100/70 leading-relaxed">
              {service.intro}
            </p>
            <a
              href="/#contact"
              className="group mt-9 inline-flex items-center gap-3 rounded-full bg-forest-700 dark:bg-leaf-300 text-cream-50 dark:text-forest-950 px-7 py-4 text-base font-medium hover:bg-forest-600 dark:hover:bg-leaf-200 transition-colors leaf-glow"
            >
              Discuss a project
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </section>

        {/* Signs + covers */}
        <section className="py-14 lg:py-20 border-t border-forest-900/10 dark:border-cream-100/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-14">
            <div className="lg:col-span-6">
              <h2 className="font-display font-bold text-[clamp(1.5rem,2.4vw,2.1rem)] leading-[1.16] tracking-[-0.025em] text-forest-800 dark:text-cream-100 mb-7">
                You probably need this if&hellip;
              </h2>
              <ul className="space-y-4">
                {service.signs.map((s) => (
                  <li key={s} className="flex gap-3 text-forest-800/80 dark:text-cream-100/70 leading-relaxed">
                    <MoonGlyph className="h-4 w-4 shrink-0 mt-1 text-lantern-500 dark:text-lantern-300" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-6">
              <h2 className="font-display font-bold text-[clamp(1.5rem,2.4vw,2.1rem)] leading-[1.16] tracking-[-0.025em] text-forest-800 dark:text-cream-100 mb-7">
                What the work covers
              </h2>
              <ul className="rounded-2xl border border-forest-900/12 dark:border-cream-100/10 bg-cream-100/70 dark:bg-forest-900/60 divide-y divide-forest-900/10 dark:divide-cream-100/10">
                {service.covers.map((c) => (
                  <li key={c} className="flex items-center gap-3 px-6 py-4 text-forest-800/85 dark:text-cream-100/75">
                    <MoonGlyph className="h-3.5 w-3.5 shrink-0 text-lantern-500/85 dark:text-lantern-300/75" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-14 lg:py-20 border-t border-forest-900/10 dark:border-cream-100/10 bg-forest-50/60 dark:bg-forest-900/40">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="mb-8">
              <SectionLabel as="h2">How it works</SectionLabel>
            </div>
            <div className="grid md:grid-cols-3 gap-px bg-forest-900/10 dark:bg-cream-100/10 border border-forest-900/10 dark:border-cream-100/10">
              {service.steps.map((s) => (
                <div key={s.n} className="bg-cream-50 dark:bg-forest-950 p-7 md:p-8">
                  <span className="flex items-center gap-2.5 font-display font-bold text-leaf-600 dark:text-leaf-300 text-sm tracking-[0.3em] big-numeral">
                    <MoonGlyph className="h-4 w-4 shrink-0 text-lantern-500 dark:text-lantern-300" />
                    {s.n}
                  </span>
                  <h3 className="mt-5 font-display font-bold text-xl tracking-[-0.02em] text-forest-800 dark:text-cream-100 mb-1.5">
                    {s.title}
                  </h3>
                  <p className="text-forest-800/70 dark:text-cream-100/60 text-sm leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-forest-800/60 dark:text-cream-100/55">
              No unnecessary retainers, and no vendor lock-in.
            </p>
          </div>
        </section>

        {/* The other two services */}
        <section className="py-14 lg:py-20 border-t border-forest-900/10 dark:border-cream-100/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="mb-8">
              <SectionLabel as="h2">Also from us</SectionLabel>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/services/${o.slug}`}
                  className="card group rounded-2xl border border-forest-900/12 dark:border-cream-100/10 bg-cream-100/70 dark:bg-forest-900/60 p-7 flex items-start justify-between gap-4"
                >
                  <div>
                    <div className="font-display font-bold text-lg tracking-[-0.02em] text-forest-800 dark:text-cream-100">
                      {o.name}
                    </div>
                    <p className="mt-2 text-sm text-forest-800/70 dark:text-cream-100/60 leading-snug">
                      {o.intro.split('. ')[0]}.
                    </p>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="mt-1 shrink-0 text-forest-800/35 dark:text-cream-100/35 group-hover:text-leaf-600 dark:group-hover:text-leaf-200 transition-colors"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
