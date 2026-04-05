import type { Metadata } from 'next';
import HPLayoutClient from './layout-client';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://onboarding.hplandscaping.com';

export const metadata: Metadata = {
  title: {
    default: 'HP Landscaping Onboarding',
    template: '%s | HP Landscaping',
  },
  description:
    'Employee onboarding portal for HP Landscaping. Submit your W-9 tax form, review landscaping safety SOPs & equipment procedures, upload certifications and IDs, and complete your 8-step onboarding checklist.',
  keywords: [
    'HP Landscaping',
    'landscaping onboarding',
    'landscaping employee portal',
    'W-9 landscaping',
    'landscaping SOPs',
    'safety procedures',
    'equipment training',
    'landscaping certifications',
  ],
  openGraph: {
    title: 'HP Landscaping - Employee Onboarding Portal',
    description:
      'Join the HP Landscaping team. Complete W-9 forms, review safety & equipment SOPs, upload certifications, and track your onboarding progress.',
    url: `${BASE_URL}/hp-landscaping/dashboard`,
    siteName: 'HP Landscaping & Restore',
  },
  twitter: {
    card: 'summary',
    title: 'HP Landscaping - Employee Onboarding',
    description: 'Complete your HP Landscaping employee onboarding online.',
  },
  alternates: {
    canonical: `${BASE_URL}/hp-landscaping/dashboard`,
  },
};

export default function HPLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LandscapingBusiness',
            '@id': 'https://hplandscaping.com/#business',
            name: 'HP Landscaping',
            url: 'https://hplandscaping.com',
            description:
              'Professional landscaping services including lawn care, landscape design, hardscaping, irrigation, and seasonal maintenance.',
            priceRange: '$$',
            serviceType: [
              'Lawn Care',
              'Landscape Design',
              'Hardscaping',
              'Irrigation Systems',
              'Seasonal Maintenance',
              'Tree & Shrub Care',
            ],
            parentOrganization: {
              '@type': 'Organization',
              '@id': 'https://hplandscaping.com/#organization',
              name: 'HP Landscaping & Restore',
            },
            potentialAction: {
              '@type': 'JoinAction',
              name: 'Employee Onboarding',
              target: `${BASE_URL}/hp-landscaping/dashboard`,
              description: 'Complete the HP Landscaping employee onboarding process.',
            },
          }),
        }}
      />
      <HPLayoutClient>{children}</HPLayoutClient>
    </>
  );
}
