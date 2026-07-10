'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#why', label: 'Why us' },
  { href: '#contact', label: 'Contact' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-parchment-50/75 dark:bg-ink-950/70 backdrop-blur-xl border-b border-ink-900/10 dark:border-parchment/10'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <a href="#top" aria-label="OakenIT home" className="block">
          <Logo size={28} />
        </a>

        <nav className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-ink-800/75 dark:text-parchment/70 hover:text-oak-600 dark:hover:text-oak-300 transition-colors duration-300 relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-oak-500 dark:bg-oak-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-oak-500 dark:bg-oak-400 text-ink-950 px-5 py-2.5 text-sm font-medium hover:bg-oak-400 dark:hover:bg-oak-300 transition-colors"
          >
            Book a chat
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </a>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            className="text-ink-800 dark:text-parchment p-2"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-parchment dark:bg-ink-900 border-t border-ink-900/10 dark:border-parchment/10"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-ink-800 dark:text-parchment/80 text-lg"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-oak-500 dark:bg-oak-400 text-ink-950 px-5 py-2.5 text-sm font-medium"
              >
                Book a chat →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
