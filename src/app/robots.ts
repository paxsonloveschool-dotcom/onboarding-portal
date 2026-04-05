import type { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://onboarding.hplandscaping.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Allow all crawlers including AI/LLM bots (GPTBot, Google-Extended, Anthropic, etc.)
        userAgent: '*',
        allow: ['/', '/login', '/register', '/hp-landscaping/', '/restore/', '/llms.txt'],
        disallow: [
          '/api/',
          '/admin/',
          '/hp-landscaping/w9',
          '/hp-landscaping/documents',
          '/restore/w9',
          '/restore/documents',
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
