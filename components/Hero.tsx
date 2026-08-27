'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { HangingLantern } from './MoonLantern';

/** Lanterns strung across the top of the hero, at hand-picked offsets. */
const strung = [
  { left: '7%', cord: 239, size: 44, sway: 7, delay: 0, reach: 6.5 },
  { left: '19%', cord: 276, size: 58, sway: 9, delay: 1.4, reach: 7 },
  { left: '40%', cord: 294, size: 34, sway: 6.5, delay: 0.6, reach: 5.5 },
  { left: '60%', cord: 462, size: 40, sway: 8, delay: 2.1, reach: 6 },
  { left: '77%', cord: 190, size: 62, sway: 6, delay: 0.3, reach: 7.5 },
  { left: '90%', cord: 539, size: 38, sway: 9.5, delay: 1.1, reach: 6 },
];


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

        <div className="absolute -right-24 bottom-0 w-[min(70vw,720px)] aspect-square opacity-[0.13] dark:opacity-[0.18] pointer-events-none">
          <Image src="/mark.png" alt="" fill priority sizes="70vw" className="object-contain" />
        </div>

        <div className="absolute inset-x-0 top-0 h-[52vh] hidden sm:block pointer-events-none">
          {strung.map((l, i) => (
            <HangingLantern key={l.left} uid={`hero${i}`} {...l} />
          ))}
        </div>
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl w-full mx-auto px-6 lg:px-10 pt-32 pb-16"
      >
        <h1 className="font-display text-[clamp(2.2rem,5vw,4.4rem)] leading-[1.06] tracking-[-0.015em] text-forest-800 dark:text-cream-100 max-w-5xl">
          <AnimatedLine delay={0.3}>Practical solutions in English,</AnimatedLine>
          <AnimatedLine delay={0.45}>
            <span className="text-leaf">not CLI.</span>
          </AnimatedLine>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-2xl text-lg lg:text-xl text-forest-800/75 dark:text-cream-100/70 leading-relaxed"
        >
          OakenIT helps businesses build software and improve infrastructure to solve
          common and niche business problems.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1 }}
          className="mt-6 text-sm tracking-[0.08em] text-forest-800/60 dark:text-cream-100/55"
        >
          Software · Infrastructure · Automation · Technical consulting
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
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
        </motion.div>

      </motion.div>
    </section>
  );
}

function AnimatedLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-y-hidden pb-[0.06em]">
      <motion.span
        initial={{ y: '110%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}
