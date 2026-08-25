import Image from 'next/image';
import { Lantern } from './Lantern';

/**
 * The brand line, given a section of its own. Night-side in both themes so it
 * lands as a change of gear between the services and the reasons-to-believe.
 */
export function Ethos() {
  return (
    <section className="relative overflow-hidden bg-forest-950 text-cream-100">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/3 w-[900px] h-[500px] bg-lantern-400/10 blur-[140px] rounded-full" />
        <div className="absolute right-[-8%] -bottom-32 w-[460px] aspect-square opacity-[0.14]">
          <Image src="/mark.png" alt="" fill sizes="460px" className="object-contain" />
        </div>
      </div>

      <div className="absolute inset-x-0 top-0 pointer-events-none hidden sm:block">
        <div className="absolute top-0 left-[18%] w-8">
          <Lantern cord={36} sway={8} className="w-full h-auto text-lantern-300/70" />
        </div>
        <div className="absolute top-0 left-[72%] w-6">
          <Lantern cord={64} sway={10} delay={1.2} className="w-full h-auto text-lantern-300/50" />
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <p className="font-display text-[clamp(1.9rem,4.2vw,3.4rem)] leading-[1.14] tracking-[-0.015em]">
          Most firms sell you complexity.{' '}
          <span className="text-lantern">We sell you its absence.</span>
        </p>

        <div className="mt-10 grid md:grid-cols-2 gap-8 text-cream-100/70 leading-relaxed">
          <p>
            A lot of businesses end up with technology that has grown organically over
            years: spreadsheets, manual processes, ageing systems, disconnected software
            and infrastructure nobody wants to touch.
          </p>
          <p>
            That is where we tend to help. We understand the problem, work out the
            simplest sensible solution, and then build it. Technology should remove work,
            not create more of it.
          </p>
        </div>
      </div>
    </section>
  );
}
