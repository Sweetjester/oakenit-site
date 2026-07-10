'use client';

import { motion } from 'framer-motion';
import { InquiryForm } from './InquiryForm';

export function CTA() {
  return (
    <section id="contact" className="relative py-20 lg:py-28 overflow-hidden">
      {/* Glow backdrop */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-oak-400/15 dark:bg-oak-400/12 blur-[160px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left — pitch */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-ink-800/55 dark:text-parchment/50 mb-5"
            >
              <span className="h-px w-8 bg-oak-500 dark:bg-oak-400" />
              <span>Brief us</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(2rem,3.6vw,3rem)] leading-[1] tracking-tight text-ink-900 dark:text-parchment"
            >
              <span className="whitespace-nowrap">Brief us.</span>{' '}
              <span className="italic text-oak-gradient whitespace-nowrap">
                We&rsquo;ll plan it.
              </span>
            </motion.h2>

            <motion.ul
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="mt-8 space-y-3 text-sm text-ink-800/70 dark:text-parchment/60"
            >
              {[
                'Reply within one business day',
                'Free 30-min scoping call if there is a fit',
                'One-page proposal within 5 working days',
                'NDAs welcome',
              ].map((t, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-oak-500 dark:text-oak-400 mt-1">✦</span>
                  <span>{t}</span>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <InquiryForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
