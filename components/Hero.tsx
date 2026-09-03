'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FireflySwarm } from './FireflySwarm';
import { TreeCanopy } from './TreeCanopy';



export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden"
    >
      {/* Backdrop: canopy light, faint tree, hanging lanterns ---------------- */}
      <div className="absolute inset-0 z-0 canopy pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.05] dark:opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
            backgroundSize: '86px 86px',
            maskImage: 'radial-gradient(ellipse at center, black 25%, transparent 72%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 25%, transparent 72%)',
          }}
        />

        <TreeCanopy
          idPrefix="tree"
          className="absolute -right-24 bottom-0 w-[min(70vw,720px)] aspect-square pointer-events-none"
          treeClassName="opacity-[0.3] dark:opacity-[0.62]"
        />

        {/* Swarms of fireflies where the strung lanterns used to be — the
            drawn tree carries the lanterns now. */}
        <FireflySwarm className="absolute inset-x-0 top-0 hidden h-[56vh] w-full sm:block" />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl w-full mx-auto px-6 lg:px-10 pt-32 pb-16"
      >
        <h1 className="font-display font-extrabold text-[clamp(2rem,4.4vw,3.9rem)] leading-[1.05] tracking-[-0.035em] text-forest-800 dark:text-cream-100 max-w-5xl">
          <AnimatedLine step="d1">We help businesses</AnimatedLine>
          <AnimatedLine step="d2">
            <span className="text-leaf">kickstart their IT.</span>
          </AnimatedLine>
        </h1>

        <p className="rise d3 mt-8 max-w-xl text-lg lg:text-xl text-forest-800/75 dark:text-cream-100/70 leading-relaxed">
          Building from the ground up, or replacing something that&rsquo;s outdated.
        </p>

        <p className="rise d4 mt-6 text-sm tracking-[0.08em] text-forest-800/60 dark:text-cream-100/55">
          Software · Infrastructure · Automation · Technical consulting
        </p>

        <div className="rise d5 mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 rounded-full bg-forest-700 dark:bg-leaf-300 text-cream-50 dark:text-forest-950 px-7 py-4 text-base font-medium hover:bg-forest-600 dark:hover:bg-leaf-200 transition-colors leaf-glow"
          >
            Discuss a project
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="/work"
            className="inline-flex items-center gap-3 rounded-full border border-forest-900/20 dark:border-cream-100/20 px-7 py-4 text-base text-forest-800 dark:text-cream-100 hover:border-leaf-500 dark:hover:border-leaf-300 hover:text-forest-600 dark:hover:text-leaf-200 transition-colors"
          >
            Check out our work
          </a>
        </div>

      </motion.div>
    </section>
  );
}

/**
 * A headline line that slides up behind a clip. CSS, not Framer Motion: this is
 * the largest text on the page and gating its visibility on hydration is what
 * put LCP at 4.6s. `overflow-y-hidden` (not `overflow-hidden`) so descenders
 * clip vertically while glyphs can still extend sideways.
 */
function AnimatedLine({ children, step }: { children: React.ReactNode; step: 'd1' | 'd2' }) {
  return (
    <span className="block overflow-y-hidden pb-[0.06em]">
      <span className={`rise-line ${step}`}>{children}</span>
    </span>
  );
}
