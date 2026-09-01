'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '/#services', label: 'What we do' },
  { href: '/work', label: 'Our work' },
  { href: '/#why', label: 'Why OakenIT' },
  { href: '/#stack', label: 'Our stack' },
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
          ? 'bg-cream-50/80 dark:bg-forest-950/75 backdrop-blur-xl border-b border-forest-900/10 dark:border-cream-100/10'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <a href="/" aria-label="OakenIT home" className="block">
          <Logo size={30} />
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-forest-800/75 dark:text-cream-100/70 hover:text-forest-600 dark:hover:text-leaf-200 transition-colors duration-300 relative group"
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-leaf-500 dark:bg-leaf-300 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <a
            href="/#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-forest-700 dark:bg-leaf-300 text-cream-50 dark:text-forest-950 px-5 py-2.5 text-sm font-medium hover:bg-forest-600 dark:hover:bg-leaf-200 transition-colors"
          >
            Discuss a project
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </a>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            className="text-forest-800 dark:text-cream-100 p-2"
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
            className="md:hidden overflow-hidden bg-cream-50 dark:bg-forest-900 border-t border-forest-900/10 dark:border-cream-100/10"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-forest-800 dark:text-cream-100/85 text-lg"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="/#contact"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-forest-700 dark:bg-leaf-300 text-cream-50 dark:text-forest-950 px-5 py-2.5 text-sm font-medium"
              >
                Discuss a project →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
