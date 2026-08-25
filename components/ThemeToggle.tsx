'use client';

import { Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeProvider';

type Props = {
  className?: string;
};

export function ThemeToggle({ className = '' }: Props) {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className={`relative h-10 w-10 rounded-full border border-forest-900/15 dark:border-cream-100/15 hover:border-lantern-500 dark:hover:border-lantern-300 text-forest-800 dark:text-cream-100/80 hover:text-lantern-600 dark:hover:text-lantern-200 transition-colors flex items-center justify-center ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'dark' ? (
          <motion.span
            key="moon"
            initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25 }}
            className="block"
          >
            <Moon size={16} strokeWidth={1.7} />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25 }}
            className="block"
          >
            <Sun size={16} strokeWidth={1.7} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
