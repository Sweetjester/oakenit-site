import type { Metadata } from 'next';
import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider, themeInitScript } from '@/components/ThemeProvider';
import { StructuredData } from '@/components/StructuredData';
import { Analytics } from '@/components/Analytics';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.oakenit.com';

const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  axes: ['opsz', 'SOFT'],
});

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'OakenIT — Development, infrastructure, consulting for UK businesses',
    template: '%s · OakenIT',
  },
  description:
    'AI-augmented technical team for UK businesses. We build the software you need, run the infrastructure you have, and answer the hard questions that decide what comes next.',
  keywords: [
    'AI consultancy UK',
    'software development UK',
    'managed IT services',
    'cloud infrastructure',
    'fractional CTO',
    'AI strategy',
    'cybersecurity',
    'technical consulting',
    'custom software',
    'CTO-as-a-service',
  ],
  authors: [{ name: 'OakenIT' }],
  creator: 'OakenIT',
  publisher: 'OakenIT',
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: SITE_URL,
    siteName: 'OakenIT',
    title: 'OakenIT — Build. Run. Decide.',
    description:
      'Senior engineers and architects. We build, run, and advise on the technology your business depends on — AI-augmented, plainly explained.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OakenIT — Build. Run. Decide.',
    description:
      'AI-augmented technical team for UK businesses. Development, infrastructure, consulting.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION
      ? { 'msvalidate.01': process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
  category: 'technology',
  icons: {
    icon: [{ url: '/logo.svg', type: 'image/svg+xml' }],
    apple: '/logo.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-GB"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <StructuredData />
      </head>
      <body className="grain font-sans bg-parchment-50 dark:bg-ink-950 text-ink-800 dark:text-parchment antialiased transition-colors duration-300">
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
