import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { SectionLabel } from '@/components/SectionLabel';
import { LanternGlyph } from '@/components/Lantern';
import { SiteEmbed } from '@/components/SiteEmbed';

export const metadata: Metadata = {
  title: 'Our work',
  description:
    'Selected OakenIT work — bespoke software, infrastructure and automation for UK businesses, including CV Live, our own hosted product.',
  alternates: { canonical: '/work' },
};

const experience = [
  'Business-critical infrastructure',
  'Microsoft 365 and cloud environments',
  'Bespoke internal applications',
  'Automation and systems integration',
  'Cyber security and resilience',
  'Multi-site businesses',
  'High-volume transactional systems',
];

const cvLiveBuilt = [
  'CV parsing and AI-assisted rewriting',
  'Automated per-user subdomains',
  'Generated Open Graph share cards',
  'One-click PDF export',
  'Subscription billing and account management',
];

export default function WorkPage() {
  return (
    <>
      <Nav />
      <main>
        {/* Header ------------------------------------------------------- */}
        <section className="relative canopy pt-36 pb-14 lg:pt-44 lg:pb-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="mb-6">
              <SectionLabel>Our work</SectionLabel>
            </div>
            <h1 className="font-display text-[clamp(2.2rem,5vw,4.4rem)] leading-[1.06] tracking-[-0.015em] text-forest-800 dark:text-cream-100 max-w-4xl">
              Things we have <span className="text-leaf">actually built.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg text-forest-800/75 dark:text-cream-100/70 leading-relaxed">
              Most client work sits behind NDAs, or inside businesses that would rather not
              advertise their internal systems. Here is what we can show you — starting
              with one you can go and use yourself.
            </p>
          </div>
        </section>

        {/* CV Live ------------------------------------------------------ */}
        <section className="py-14 lg:py-20 border-t border-forest-900/10 dark:border-cream-100/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              <div className="lg:col-span-5 lg:sticky lg:top-32">
                <div className="text-[10px] uppercase tracking-[0.25em] text-forest-800/50 dark:text-cream-100/45 mb-5">
                  Our own product
                </div>
                <h2 className="font-display text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.08] tracking-[-0.015em] text-forest-800 dark:text-cream-100">
                  CV Live
                </h2>

                <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="font-display text-5xl leading-none text-leaf big-numeral">
                    60s
                  </span>
                  <span className="text-sm text-forest-800/70 dark:text-cream-100/60 max-w-xs leading-snug">
                    from uploaded CV to a live, hosted personal site
                  </span>
                </div>

                <p className="mt-7 text-forest-800/80 dark:text-cream-100/70 leading-relaxed">
                  A CV is usually a PDF that dies in an inbox. CV Live turns one into a
                  hosted, click-to-expand site on its own subdomain — designed, built and
                  shipped end to end, including the billing.
                </p>

                <ul className="mt-7 space-y-2.5">
                  {cvLiveBuilt.map((b) => (
                    <li
                      key={b}
                      className="flex items-center gap-3 text-sm text-forest-800/85 dark:text-cream-100/75"
                    >
                      <LanternGlyph className="h-3.5 w-2.5 shrink-0 text-lantern-500/85 dark:text-lantern-300/75" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-forest-900/10 dark:border-cream-100/10 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs uppercase tracking-[0.18em] text-forest-800/60 dark:text-cream-100/55">
                  {['A CV stuck in a PDF', 'Automated render and deploy', 'Live on its own subdomain'].map(
                    (step, j) => (
                      <span key={step} className="flex items-center gap-3">
                        {j > 0 && <span className="text-leaf-500 dark:text-leaf-300">→</span>}
                        <span>{step}</span>
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="lg:col-span-7">
                <SiteEmbed
                  src="https://www.cvlive.io/"
                  label="www.cvlive.io"
                  title="CV Live — live site"
                  height={700}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Client work -------------------------------------------------- */}
        <section className="py-14 lg:py-20 border-t border-forest-900/10 dark:border-cream-100/10 bg-forest-50/60 dark:bg-forest-900/40">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-14">
            <div className="lg:col-span-5">
              <div className="text-[10px] uppercase tracking-[0.25em] text-forest-800/50 dark:text-cream-100/45 mb-5">
                Client project
              </div>
              <h2 className="font-display text-[clamp(1.7rem,3vw,2.4rem)] leading-[1.12] tracking-[-0.01em] text-forest-800 dark:text-cream-100">
                Proof-of-posting platform
              </h2>
            </div>

            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-5">
                <span className="font-display text-5xl md:text-6xl leading-none text-leaf big-numeral">
                  90%+
                </span>
                <span className="text-sm text-forest-800/70 dark:text-cream-100/60 max-w-xs leading-snug">
                  field reporting captured during a major live deployment
                </span>
              </div>
              <p className="text-forest-800/80 dark:text-cream-100/70 leading-relaxed">
                Designed and delivered a custom proof-of-posting platform used across a
                high-volume outdoor advertising operation.
              </p>
              <div className="mt-7 pt-6 border-t border-forest-900/10 dark:border-cream-100/10 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs uppercase tracking-[0.18em] text-forest-800/60 dark:text-cream-100/55">
                {['Manual, inconsistent reporting', 'Custom capture platform', 'Near-complete coverage'].map(
                  (step, j) => (
                    <span key={step} className="flex items-center gap-3">
                      {j > 0 && <span className="text-leaf-500 dark:text-leaf-300">→</span>}
                      <span>{step}</span>
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Selected experience ------------------------------------------ */}
        <section className="py-14 lg:py-20 border-t border-forest-900/10 dark:border-cream-100/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <h2 className="font-display text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.08] tracking-[-0.015em] text-forest-800 dark:text-cream-100">
                Selected <span className="text-leaf">experience.</span>
              </h2>
            </div>
            <div className="lg:col-span-7">
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
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

              <p className="mt-8 text-sm text-forest-800/60 dark:text-cream-100/50 leading-relaxed max-w-xl">
                Ask, and we will walk you through the closest comparable project on a call.
              </p>

              <a
                href="/#contact"
                className="group mt-8 inline-flex items-center gap-3 rounded-full bg-forest-700 dark:bg-leaf-300 text-cream-50 dark:text-forest-950 px-7 py-4 text-base font-medium hover:bg-forest-600 dark:hover:bg-leaf-200 transition-colors"
              >
                Discuss a project
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
