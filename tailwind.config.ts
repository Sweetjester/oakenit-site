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
        // FOREST — the brand. Sampled straight off the logo mark's canopy and
        // trunk. forest-950/900 are the dark-mode grounds; 600/700 carry text
        // and solid buttons in light mode.
        forest: {
          50: '#eef5ef',
          100: '#d7e8da',
          200: '#abcfb3',
          300: '#72b081',
          400: '#3f8c53',
          500: '#246c30',
          600: '#18551f',
          700: '#0f3f18',
          800: '#0a2e12',
          900: '#06200d',
          950: '#031507',
        },
        // LEAF — the light green from the logo's leaf highlights (#a0d850).
        // The accent: emphasis text, buttons, links, rules, numerals.
        // 600 is the lightest step that clears 4.5:1 on cream; 300 is the raw
        // logo green and is dark-mode only.
        leaf: {
          50: '#f2f9e6',
          100: '#e2f2c6',
          200: '#c9e894',
          300: '#a0d850',
          400: '#7fbb35',
          500: '#5f9427',
          600: '#4a761d',
          700: '#36560f',
        },
        // LANTERN — the gold hanging from the branches. Reserved for the
        // lantern motif itself (hanging lanterns, glyph bullets); the mark
        // artwork contains this gold, so it stays as illustration, not accent.
        lantern: {
          50: '#fff8e6',
          100: '#ffedc2',
          200: '#ffdb8a',
          300: '#f7c04a',
          400: '#eda21b',
          500: '#d4820c',
          600: '#b46000',
          700: '#8a4a00',
        },
        // CREAM — the logo lockup's paper. Light-mode grounds, dark-mode text.
        cream: {
          DEFAULT: '#f3ece3',
          50: '#faf7f1',
          100: '#f3ece3',
          200: '#e6dbcb',
          300: '#d2c3ad',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        wordmark: ['var(--font-wordmark)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        sway: 'sway 6s ease-in-out infinite',
        'sway-slow': 'sway 9s ease-in-out infinite',
        flicker: 'flicker 5s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-2.5deg)' },
          '50%': { transform: 'rotate(2.5deg)' },
        },
        flicker: {
          '0%, 100%': { opacity: '0.85' },
          '45%': { opacity: '1' },
          '70%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
