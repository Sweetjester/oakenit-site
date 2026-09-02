import Image from 'next/image';
import { HangingLantern } from './MoonLantern';
import { TreeCanopy } from './TreeCanopy';
import { COMPANY } from '@/lib/company';

/**
 * The footer follows the theme like everything else. It used to be night-side
 * in both, as an anchor — but a dark slab under a light page reads as a bug
 * rather than a decision, so it went (2026-09-01).
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-cream-100 dark:bg-forest-950 text-forest-800 dark:text-cream-100 border-t border-forest-900/10 dark:border-cream-100/10">
      {/* canopy glow + ghosted mark */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[420px] rounded-full blur-[130px] bg-transparent dark:bg-leaf-400/10" />
        <TreeCanopy
          idPrefix="foottree"
          className="absolute right-[-6%] -bottom-24 w-[420px] aspect-square"
          treeClassName="opacity-[0.14] dark:opacity-[0.5]"
        />
      </div>

      {/* a couple of lanterns hanging off the top edge */}
      <div className="absolute inset-x-0 top-0 pointer-events-none hidden sm:block">
        <HangingLantern left="13%" cord={26} size={54} sway={8} delay={0} reach={7} uid="foot0" />
        <HangingLantern left="29%" cord={48} size={38} sway={10} delay={1.4} reach={6} uid="foot1" />
        <HangingLantern left="84%" cord={34} size={44} sway={9} delay={2.3} reach={6.5} uid="foot2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <div className="flex items-center gap-2.5">
              <div className="relative h-9 w-9 shrink-0">
                <Image src="/mark.png" alt="OakenIT" fill sizes="36px" className="object-contain" />
              </div>
              <span className="font-wordmark text-2xl leading-none tracking-[-0.01em]">
                OakenIT
              </span>
            </div>
            <p className="mt-6 text-forest-800/70 dark:text-cream-100/60 max-w-sm leading-relaxed">
              Senior technical expertise for UK businesses — software, infrastructure,
              and the difficult problems in between.
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.25em] text-forest-800/50 dark:text-cream-100/45 mb-5">Services</h4>
            <ul className="space-y-3 text-forest-800/80 dark:text-cream-100/75">
              <li><a href="/services/it-setup" className="hover:text-leaf-600 dark:hover:text-leaf-200 transition-colors">IT setup</a></li>
              <li><a href="/services/software-development" className="hover:text-leaf-600 dark:hover:text-leaf-200 transition-colors">Bespoke development</a></li>
              <li><a href="/services/it-support" className="hover:text-leaf-600 dark:hover:text-leaf-200 transition-colors">IT support</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.25em] text-forest-800/50 dark:text-cream-100/45 mb-5">Site</h4>
            <ul className="space-y-3 text-forest-800/80 dark:text-cream-100/75">
              <li><a href="/#services" className="hover:text-leaf-600 dark:hover:text-leaf-200 transition-colors">What we do</a></li>
              <li><a href="/work" className="hover:text-leaf-600 dark:hover:text-leaf-200 transition-colors">Our work</a></li>
              <li><a href="/#stack" className="hover:text-leaf-600 dark:hover:text-leaf-200 transition-colors">Our stack</a></li>
              <li><a href="/#contact" className="hover:text-leaf-600 dark:hover:text-leaf-200 transition-colors">Discuss a project</a></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.25em] text-forest-800/50 dark:text-cream-100/45 mb-5">Contact</h4>
            <ul className="space-y-3 text-forest-800/80 dark:text-cream-100/75">
              <li>
                <a href="mailto:hello@oakenit.com" className="hover:text-leaf-600 dark:hover:text-leaf-200 transition-colors">
                  hello@oakenit.com
                </a>
              </li>
              <li>
                <a href="https://oakenit.com" className="hover:text-leaf-600 dark:hover:text-leaf-200 transition-colors">
                  oakenit.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="my-10 h-px bg-gradient-to-r from-transparent via-forest-900/15 dark:via-cream-100/15 to-transparent" />

        <div className="flex flex-col md:flex-row justify-between gap-4 text-sm text-forest-800/50 dark:text-cream-100/45">
          <p>© {year} {COMPANY.tradingName}. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a
              href="/privacy"
              className="hover:text-leaf-600 dark:hover:text-leaf-200 transition-colors"
            >
              Privacy
            </a>
            <p className="font-mono text-xs">
              <span className="text-leaf-600 dark:text-leaf-300 animate-flicker">●</span> All
              systems lit
            </p>
          </div>
        </div>

        {/* Statutory trading disclosures — required on the website of a UK
            limited company by the Companies (Trading Disclosures) Regulations. */}
        <p className="mt-6 text-xs leading-relaxed text-forest-800/40 dark:text-cream-100/35 max-w-3xl">
          {COMPANY.legalName} is a company registered in {COMPANY.placeOfRegistration},
          company number {COMPANY.number}. Registered office: {COMPANY.registeredOffice}.
          {COMPANY.vatNumber ? ` VAT registration number ${COMPANY.vatNumber}.` : ''}
        </p>
      </div>
    </footer>
  );
}
