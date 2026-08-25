'use client';

import { motion } from 'framer-motion';
import { InquiryForm } from './InquiryForm';
import { SectionLabel } from './SectionLabel';
import { LanternGlyph } from './Lantern';

const promises = ['Free 30-min scoping call if there is a fit', 'NDAs welcome'];

export function CTA() {
  return (
    <section id="contact" className="relative py-16 lg:py-24 overflow-hidden">
      {/* Lantern light pooling behind the form */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-lantern-400/12 dark:bg-lantern-300/10 blur-[160px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="relative z-10 grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left — pitch */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-5"
            >
              <SectionLabel>Brief us</SectionLabel>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.08] tracking-[-0.015em] text-forest-800 dark:text-cream-100"
            >
              <span className="whitespace-nowrap">Brief us.</span>{' '}
              <span className="text-lantern whitespace-nowrap">
                We&rsquo;ll plan it.
              </span>
            </motion.h2>

            <motion.ul
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="mt-8 space-y-3.5 text-sm text-forest-800/75 dark:text-cream-100/65"
            >
              {promises.map((t) => (
                <li key={t} className="flex gap-3 items-center">
                  <LanternGlyph className="h-4 w-3 shrink-0 text-lantern-500 dark:text-lantern-300" />
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
