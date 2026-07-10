import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Deep, warm oak-tinted black. Dark-mode backgrounds.
        ink: {
          DEFAULT: '#1a1712',
          950: '#12100c',
          900: '#1a1712',
          800: '#24201a',
          700: '#2f2a22',
        },
        // Warm cream / parchment. Light-mode backgrounds + dark-mode text.
        parchment: {
          DEFAULT: '#f2eadb',
          50: '#fbf6ea',
          100: '#f2eadb',
          200: '#e6d9bd',
        },
        // Oak — the accent. Warm mid-brown range, deeper than OakenIT's honey.
        oak: {
          50: '#f5e8d1',
          100: '#ecd6a8',
          200: '#d9b878',
          300: '#c19b6c',
          400: '#a68158',
          500: '#8b6d47',
          600: '#6d5439',
          700: '#503d29',
        },
        // Forest — used sparingly for the odd "alive" accent (bullet sparkles,
        // active-state pings). Keeps the oak from feeling one-note.
        forest: {
          DEFAULT: '#3d7a52',
          300: '#5aa273',
          400: '#4a8e62',
          500: '#3d7a52',
          600: '#2d5f3f',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.05em',
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        drip: 'drip 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-soft': 'pulse-soft 4s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        drip: {
          '0%, 100%': { transform: 'translateY(0) scaleY(1)' },
          '50%': { transform: 'translateY(6px) scaleY(1.1)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
