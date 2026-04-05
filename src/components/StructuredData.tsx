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
          'Professional landscaping services and property restoration. HP Landscaping handles lawn care, landscape design, hardscaping, and seasonal maintenance. Restore handles water damage, fire damage, mold remediation, and property restoration.',
        foundingDate: '2020',
        knowsAbout: [
          'Landscaping',
          'Lawn Care',
          'Hardscaping',
          'Irrigation',
          'Property Restoration',
          'Water Damage Restoration',
          'Mold Remediation',
        ],
        numberOfEmployees: {
          '@type': 'QuantitativeValue',
          name: 'Employees',
        },
        department: [
          {
            '@type': 'LandscapingBusiness',
            name: 'HP Landscaping',
            description:
              'Professional landscaping division offering lawn care, landscape design, hardscaping, irrigation systems, tree care, and seasonal maintenance.',
            serviceType: [
              'Lawn Care & Mowing',
              'Landscape Design & Installation',
              'Hardscaping & Pavers',
              'Irrigation System Installation & Repair',
              'Tree & Shrub Care',
              'Seasonal Cleanup & Maintenance',
              'Mulching & Bed Maintenance',
              'Snow Removal',
            ],
          },
          {
            '@type': 'HomeAndConstructionBusiness',
            name: 'Restore',
            description:
              'Property restoration division specializing in water damage, fire damage, mold remediation, and full property restoration services.',
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://onboarding.hplandscaping.com/#website',
        url: 'https://onboarding.hplandscaping.com',
        name: 'HP Landscaping & Restore - Employee Onboarding Portal',
        publisher: {
          '@id': 'https://hplandscaping.com/#organization',
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://onboarding.hplandscaping.com/login',
          description: 'Sign in to the employee onboarding portal',
        },
      },
      {
        '@type': 'WebApplication',
        '@id': 'https://onboarding.hplandscaping.com/#app',
        name: 'HP Landscaping & Restore - Employee Onboarding Portal',
        url: 'https://onboarding.hplandscaping.com',
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: 'Employee Onboarding',
        operatingSystem: 'Web',
        description:
          'Employee onboarding portal for HP Landscaping and Restore teams. Submit W-9 tax forms, review safety and equipment SOPs, upload driver\'s licenses and certifications, and complete the 8-step onboarding checklist.',
        featureList: [
          'W-9 Tax Form Submission',
          'Standard Operating Procedures Review',
          'Document & Certification Upload',
          '8-Step Onboarding Checklist',
          'Progress Tracking Dashboard',
          'Multi-Division Support (HP Landscaping & Restore)',
        ],
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
