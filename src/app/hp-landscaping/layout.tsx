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
    'Employee onboarding portal for HP Landscaping (HP Landscaping LLC). Submit your W-9 tax form, review landscaping safety SOPs & equipment procedures, upload certifications and IDs, and complete your 8-step onboarding checklist.',
  keywords: [
    'HP Landscaping',
    'HP Landscaping College Station',
    'HP Landscaping LLC',
    'best landscaping company College Station TX',
    'luxury landscape design College Station',
    'custom pools College Station TX',
    'outdoor kitchens College Station',
    'hardscaping College Station TX',
    'landscape design Bryan TX',
    'Brazos Valley landscaping',
    'landscaping near Texas A&M',
    'irrigation College Station',
    'masonry College Station TX',
    'estate transformations College Station',
  ],
  openGraph: {
    title: 'HP Landscaping - Employee Onboarding Portal',
    description:
      'Join the HP Landscaping team. Complete W-9 forms, review safety & equipment SOPs, upload certifications, and track your onboarding progress.',
    url: `${BASE_URL}/hp-landscaping/dashboard`,
    siteName: 'HP Landscaping Onboarding Portal',
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
            name: b.name,
            legalName: b.legalName,
            url: b.url,
            telephone: b.phone,
            email: b.email,
            description: b.description,
            slogan: b.tagline,
            priceRange: b.priceRange,
            foundingDate: String(b.foundingYear),
            founder: {
              '@type': 'Person',
              name: b.owner,
            },
            address: {
              '@type': 'PostalAddress',
              streetAddress: b.address.street,
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
            serviceType: b.services.map(
              (s: { name: string }) => s.name
            ),
            parentOrganization: {
              '@type': 'Organization',
              '@id': `${b.url}/#organization`,
              name: b.legalName,
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
                description: `Call HP Landscaping for a free luxury landscaping estimate in College Station, TX. Projects range from ${b.projectRange}.`,
              },
            ],
          }),
        }}
      />
      <HPLayoutClient>{children}</HPLayoutClient>
    </>
  );
}
