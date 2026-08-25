const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.oakenit.com';

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
    legalName: 'OakenIT',
    url: SITE_URL,
    logo: `${SITE_URL}/mark.png`,
    image: `${SITE_URL}/mark.png`,
    description:
      'AI-augmented technical team for UK businesses. Development, infrastructure, and consulting under one contract.',
    foundingDate: '2025',
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
      'Senior engineers and architects. We build, run, and advise on the technology your business depends on.',
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
      'UK-based technical services firm offering software development, cloud infrastructure, cybersecurity, managed IT, and AI consulting to businesses with 10–200 employees.',
    serviceType: [
      'Software development',
      'Cloud infrastructure',
      'AI consulting',
      'Managed IT services',
      'Cybersecurity',
      'CTO-as-a-service',
    ],
    areaServed: { '@type': 'Country', name: 'United Kingdom' },
    priceRange: '££',
    provider: { '@id': `${SITE_URL}#organization` },
  };

  const offerCatalog = {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'OakenIT Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Development',
          description:
            'Custom software builds, AI agents, internal tools, APIs and mobile applications.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Systems & Infrastructure',
          description:
            'Cloud architecture, DevOps, monitoring, cybersecurity, and managed IT.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Consulting',
          description:
            'Technical strategy, AI roadmaps, architecture audits, CTO-as-a-service, and technical diligence.',
        },
      },
    ],
  };

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [organization, website, professionalService, offerCatalog],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
