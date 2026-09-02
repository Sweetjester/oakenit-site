import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://oakenit.com';

/**
 * Only real, distinct pages belong here.
 *
 * This used to list `/#services`, `/#contact` and `/#stack`. Search engines
 * discard the fragment, so those were four duplicate submissions of the
 * homepage — it made a 2-page site look like it was padding its sitemap, and
 * gained nothing. Add entries here as real routes appear (service pages,
 * insights), not as anchors.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/work`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];
}
