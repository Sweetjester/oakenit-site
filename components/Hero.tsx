'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden">
      {/* Background grid + glow */}
      <div className="absolute inset-0 -z-10">
        {/* Dark mode grid */}
        <div
          className="absolute inset-0 opacity-[0.06] hidden dark:block"
          style={{
            backgroundImage:
              'linear-gradient(rgba(245,241,234,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(245,241,234,0.6) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          }}
        />
        {/* Light mode grid */}
        <div
          className="absolute inset-0 opacity-[0.05] block dark:hidden"
          style={{
            backgroundImage:
              'linear-gradient(rgba(15,13,12,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(15,13,12,0.7) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          }}
        />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] bg-oak-300/20 dark:bg-oak-400/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-oak-400/15 dark:bg-oak-600/10 blur-[120px] rounded-full" />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="max-w-7xl w-full mx-auto px-6 lg:px-10 pt-32 pb-16"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-ink-800/55 dark:text-parchment/50 mb-10"
        >
          <span className="h-px w-10 bg-oak-500 dark:bg-oak-400" />
          <span>Bespoke tech · UK</span>
        </motion.div>

        {/* Main headline */}
        <h1 className="font-display text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[0.98] tracking-tight text-ink-900 dark:text-parchment">
          <AnimatedLine delay={0.3}>Tell us</AnimatedLine>
          <AnimatedLine delay={0.45}>
            <span className="italic text-oak-gradient">what you need.</span>
          </AnimatedLine>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-xl text-lg lg:text-xl text-ink-800/75 dark:text-parchment/70 leading-relaxed"
        >
          Quick, bespoke technical work for UK businesses — software, infrastructure, or a
          sharp answer. Senior team. AI-augmented. Brief us below.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 rounded-full bg-oak-500 dark:bg-oak-400 text-ink-950 px-7 py-4 text-base font-medium hover:bg-oak-400 dark:hover:bg-oak-300 transition-colors"
          >
            Brief us
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#process"
            className="inline-flex items-center gap-3 rounded-full border border-ink-900/20 dark:border-parchment/20 px-7 py-4 text-base text-ink-800 dark:text-parchment hover:border-oak-500 dark:hover:border-oak-400 hover:text-oak-600 dark:hover:text-oak-300 transition-colors"
          >
            How it works
          </a>
        </motion.div>

        {/* Inline stats — slimmer, sits below CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-4 text-sm text-ink-800/70 dark:text-parchment/60"
        >
          {[
            { k: '< 24h', v: 'first reply' },
            { k: '5 days', v: 'to proposal' },
            { k: '2 wks', v: 'first delivery' },
          ].map((s, i) => (
            <div key={s.v} className="flex items-center gap-2">
              {i > 0 && <span className="text-oak-500/50 dark:text-oak-400/40 mr-6">✦</span>}
              <span className="font-display text-oak-600 dark:text-oak-400 text-lg big-numeral">
                {s.k}
              </span>
              <span className="uppercase tracking-[0.18em] text-xs">{s.v}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

function AnimatedLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  // overflow-y-hidden (not overflow-hidden) so the vertical slide-up animation
  // still clips, but italic letter flourishes can extend left/right freely.
  return (
    <span className="block overflow-y-hidden">
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
