import Image from 'next/image';
import { HangingLantern } from './MoonLantern';

/**
 * The footer is night-side in both themes — the canopy after dark, lanterns
 * still lit. It anchors the page and lets the mark sit on its natural ground.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-forest-950 text-cream-100">
      {/* canopy glow + ghosted mark */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[420px] bg-leaf-400/10 blur-[130px] rounded-full" />
        <div className="absolute right-[-6%] -bottom-24 w-[420px] aspect-square opacity-[0.13]">
          <Image src="/mark.png" alt="" fill sizes="420px" className="object-contain" />
        </div>
      </div>

      {/* a couple of lanterns hanging off the top edge */}
      <div className="absolute inset-x-0 top-0 pointer-events-none hidden sm:block">
        <HangingLantern left="13%" cord={26} size={54} sway={8} delay={0} reach={7} uid="foot0" />
        <HangingLantern left="29%" cord={48} size={38} sway={10} delay={1.4} reach={6} uid="foot1" />
        <HangingLantern left="84%" cord={34} size={44} sway={9} delay={2.3} reach={6.5} uid="foot2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-7">
            <div className="flex items-center gap-2.5">
              <div className="relative h-9 w-9 shrink-0">
                <Image src="/mark.png" alt="OakenIT" fill sizes="36px" className="object-contain" />
              </div>
              <span className="font-display text-2xl leading-none tracking-[-0.01em]">
                OakenIT
              </span>
            </div>
            <p className="mt-6 text-cream-100/60 max-w-sm leading-relaxed">
              Senior technical expertise for UK businesses — software, infrastructure,
              and the difficult problems in between.
            </p>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.25em] text-cream-100/45 mb-5">Site</h4>
            <ul className="space-y-3 text-cream-100/75">
              <li><a href="/#services" className="hover:text-leaf-200 transition-colors">What we do</a></li>
              <li><a href="/work" className="hover:text-leaf-200 transition-colors">Our work</a></li>
              <li><a href="/#process" className="hover:text-leaf-200 transition-colors">How we work</a></li>
              <li><a href="/#contact" className="hover:text-leaf-200 transition-colors">Discuss a project</a></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.25em] text-cream-100/45 mb-5">Contact</h4>
            <ul className="space-y-3 text-cream-100/75">
              <li>
                <a href="mailto:hello@oakenit.com" className="hover:text-leaf-200 transition-colors">
                  hello@oakenit.com
                </a>
              </li>
              <li>
                <a href="https://oakenit.com" className="hover:text-leaf-200 transition-colors">
                  oakenit.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="my-10 h-px bg-gradient-to-r from-transparent via-cream-100/15 to-transparent" />

        <div className="flex flex-col md:flex-row justify-between gap-4 text-sm text-cream-100/45">
          <p>© {year} OakenIT. All rights reserved.</p>
          <p className="font-mono text-xs">
            <span className="text-leaf-300 animate-flicker">●</span> All systems lit
          </p>
        </div>
      </div>
    </footer>
  );
}
