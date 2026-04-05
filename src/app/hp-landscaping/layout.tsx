import type { Metadata } from 'next';
import HPLayoutClient from './layout-client';
import { BUSINESS } from '@/lib/business-info';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://onboarding.hplandscaping.com';
const b = BUSINESS;

export const metadata: Metadata = {
  title: {
    default: 'HP Landscaping Onboarding',
    template: '%s | HP Landscaping',
  },
  description:
    'Employee onboarding portal for HP Landscaping. Submit your W-9 tax form, review landscaping safety SOPs & equipment procedures, upload certifications and IDs, and complete your 8-step onboarding checklist.',
  keywords: [
    'HP Landscaping',
    'HP Landscaping College Station',
    'best landscaping company College Station TX',
    'lawn care College Station',
    'landscaping Bryan TX',
    'Brazos Valley landscaping',
    'College Station lawn service',
    'landscape design College Station',
    'hardscaping College Station TX',
    'irrigation College Station',
    'landscaping near Texas A&M',
    'commercial landscaping Bryan-College Station',
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
            '@id': `${b.url}/#landscaping`,
            name: b.divisions.landscaping.name,
            url: b.url,
            telephone: b.phone,
            email: b.email,
            description: b.divisions.landscaping.description,
            slogan: b.divisions.landscaping.tagline,
            priceRange: '$$',
            address: {
              '@type': 'PostalAddress',
              addressLocality: b.address.city,
              addressRegion: b.address.stateCode,
              postalCode: b.address.zip,
              addressCountry: b.address.country,
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: b.geo.latitude,
              longitude: b.geo.longitude,
            },
            areaServed: b.serviceArea.map((area: string) => ({
              '@type': 'City',
              name: area,
            })),
            serviceType: b.divisions.landscaping.services.map(
              (s: { name: string }) => s.name
            ),
            parentOrganization: {
              '@type': 'Organization',
              '@id': `${b.url}/#organization`,
              name: b.name,
            },
            potentialAction: [
              {
                '@type': 'JoinAction',
                name: 'Employee Onboarding',
                target: `${BASE_URL}/hp-landscaping/dashboard`,
                description: 'Complete the HP Landscaping employee onboarding process.',
              },
              {
                '@type': 'CommunicateAction',
                name: 'Request Free Estimate',
                target: `tel:${b.phone}`,
                description: 'Call HP Landscaping for a free landscaping estimate in College Station, TX.',
              },
            ],
          }),
        }}
      />
      <HPLayoutClient>{children}</HPLayoutClient>
    </>
  );
}
