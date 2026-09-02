import type { Metadata, Viewport } from 'next';
import { Manrope, Prata, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider, themeInitScript } from '@/components/ThemeProvider';
import { StructuredData } from '@/components/StructuredData';
import { Analytics } from '@/components/Analytics';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://oakenit.com';

// Headings. Geometric-ish sans with enough character to carry the brand
// without reading as generic SaaS.
const display = Manrope({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['500', '600', '700', '800'],
});

// The face from the logo lockup, kept for the wordmark ALONE so the site's
// lockup still matches Andy's actual logo artwork. Single weight, no italic.
const wordmark = Prata({
  subsets: ['latin'],
  variable: '--font-wordmark',
  display: 'swap',
  weight: '400',
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
    default: 'OakenIT — Software, infrastructure and IT problems solved, for UK businesses',
    template: '%s · OakenIT',
  },
  description:
    'OakenIT helps businesses kickstart their IT — building from the ground up, or replacing something that is outdated. Software, infrastructure, automation and technical consulting for UK businesses.',
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
    title: 'OakenIT — We help businesses kickstart their IT',
    description:
      'We help businesses build software and improve infrastructure to solve common and niche business problems.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OakenIT — We help businesses kickstart their IT',
    description:
      'Software and infrastructure for common and niche business problems.',
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
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf7f1' },
    { media: '(prefers-color-scheme: dark)', color: '#031507' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-GB"
      className={`${display.variable} ${wordmark.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <StructuredData />
      </head>
      <body className="grain font-sans bg-cream-50 dark:bg-forest-950 text-forest-800 dark:text-cream-100 antialiased transition-colors duration-300">
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
