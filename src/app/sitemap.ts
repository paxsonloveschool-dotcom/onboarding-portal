import type { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://onboarding.hplandscaping.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Public pages - crawlable
  const publicRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/login`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/register`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Division landing/dashboard pages - visible to search engines for discoverability
  const divisions = ['hp-landscaping', 'restore'] as const;
  const divisionPages = ['dashboard', 'w9', 'sops', 'documents', 'checklist'] as const;

  const divisionRoutes: MetadataRoute.Sitemap = divisions.flatMap((division) =>
    divisionPages.map((page) => ({
      url: `${BASE_URL}/${division}/${page}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: page === 'dashboard' ? 0.6 : 0.4,
    }))
  );

  // LLM-friendly content page
  const llmRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/llms.txt`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  return [...publicRoutes, ...llmRoutes, ...divisionRoutes];
}
