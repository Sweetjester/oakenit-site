import { COMPANY } from '@/lib/company';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://oakenit.com';

/**
 * JSON-LD structured data so Google, Bing, and AI search understand
 * what OakenIT is, what services it offers, and how to surface us in
 * rich results / knowledge panels.
 *
 * Schema reference: https://schema.org
 */
export function StructuredData() {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}#organization`,
    name: 'OakenIT',
    legalName: COMPANY.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/mark.png`,
    image: `${SITE_URL}/mark.png`,
    description:
      'OakenIT helps UK businesses build software, improve infrastructure and solve difficult IT problems, without the cost and complexity of a traditional consultancy.',
    foundingDate: '2026-07-09',
    // Companies House number. A verifiable registration is a genuine trust
    // signal and distinguishes us from the many unregistered "IT guys".
    identifier: {
      '@type': 'PropertyValue',
      name: 'Companies House company number',
      value: COMPANY.number,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Flat 133 Uncle Apartments, 3 Park Lane',
      addressLocality: 'Wembley',
      addressRegion: 'Greater London',
      postalCode: 'HA9 7FG',
      addressCountry: 'GB',
    },
    email: COMPANY.email,
    areaServed: { '@type': 'Country', name: 'United Kingdom' },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'hello@oakenit.com',
      areaServed: 'GB',
      availableLanguage: ['English'],
    },
    sameAs: [
      // Add as they go live:
      // 'https://www.linkedin.com/company/oakenit',
      // 'https://twitter.com/oakenit',
    ],
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}#website`,
    url: SITE_URL,
    name: 'OakenIT',
    description:
      'Software, infrastructure, automation and technical consulting for UK businesses.',
    publisher: { '@id': `${SITE_URL}#organization` },
    inLanguage: 'en-GB',
  };

  const professionalService = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}#service`,
    name: 'OakenIT',
    url: SITE_URL,
    image: `${SITE_URL}/mark.png`,
    description:
      'UK technical services firm: bespoke software, cloud and on-premise infrastructure, Microsoft 365, networks, cyber security, workflow automation and technical consulting for small and mid-sized businesses.',
    serviceType: [
      'Bespoke software development',
      'Systems integration',
      'Workflow automation',
      'Cloud infrastructure',
      'Microsoft 365',
      'Networks and connectivity',
      'Cyber security',
      'IT architecture review',
      'Infrastructure modernisation',
      'Technical consulting',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Flat 133 Uncle Apartments, 3 Park Lane',
      addressLocality: 'Wembley',
      addressRegion: 'Greater London',
      postalCode: 'HA9 7FG',
      addressCountry: 'GB',
    },
    // National, but weighted to where we actually are — local intent is the
    // only search a two-month-old domain can realistically win.
    areaServed: [
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'City', name: 'London' },
      { '@type': 'AdministrativeArea', name: 'Greater London' },
    ],
    priceRange: '££',
    provider: { '@id': `${SITE_URL}#organization` },
  };

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [organization, website, professionalService],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
