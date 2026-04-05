export default function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://hplandscaping.com/#organization',
        name: 'HP Landscaping & Restore',
        url: 'https://hplandscaping.com',
        description:
          'Professional landscaping services and property restoration by HP Landscaping & Restore.',
        foundingDate: '2020',
        areaServed: {
          '@type': 'Country',
          name: 'United States',
        },
        sameAs: [],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://onboarding.hplandscaping.com/#website',
        url: 'https://onboarding.hplandscaping.com',
        name: 'HP Landscaping & Restore - Employee Onboarding Portal',
        publisher: {
          '@id': 'https://hplandscaping.com/#organization',
        },
      },
      {
        '@type': 'WebApplication',
        '@id': 'https://onboarding.hplandscaping.com/#app',
        name: 'Employee Onboarding Portal',
        url: 'https://onboarding.hplandscaping.com',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description:
          'Employee onboarding portal for HP Landscaping and Restore teams. Submit W-9 forms, review SOPs, upload certifications, and complete onboarding checklists.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        provider: {
          '@id': 'https://hplandscaping.com/#organization',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
