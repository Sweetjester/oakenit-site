'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Lantern } from './Lantern';

/** Lanterns strung across the top of the hero, at hand-picked offsets. */
const strung = [
  { left: '10%', cord: 96, size: 24, sway: 7, delay: 0 },
  { left: '20%', cord: 40, size: 30, sway: 9, delay: 1.2 },
  { left: '31%', cord: 72, size: 21, sway: 6.5, delay: 0.6 },
  { left: '63%', cord: 88, size: 24, sway: 8, delay: 0.3 },
  { left: '74%', cord: 44, size: 33, sway: 6, delay: 1.6 },
  { left: '87%', cord: 104, size: 26, sway: 9.5, delay: 0.9 },
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

        <div className="absolute inset-x-0 top-0 h-[42vh] hidden sm:block pointer-events-none">
          {strung.map((l) => (
            <div
              key={l.left}
              className="absolute top-0"
              style={{ left: l.left, width: l.size }}
            >
              <Lantern
                cord={l.cord}
                sway={l.sway}
                delay={l.delay}
                className="w-full h-auto text-lantern-600/70 dark:text-lantern-300/80"
              />
            </div>
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
