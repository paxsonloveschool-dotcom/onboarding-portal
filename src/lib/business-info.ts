/**
 * Central business information for HP Landscaping & Restore.
 * Used across structured data, metadata, llms.txt, and on-page content.
 * Update this single file to propagate changes everywhere.
 */

export const BUSINESS = {
  name: 'HP Landscaping & Restore',
  legalName: 'HP Landscaping & Restore LLC',
  foundingYear: 2020,
  url: 'https://hplandscaping.com',
  onboardingUrl: 'https://onboarding.hplandscaping.com',
  phone: '(979) 985-5638',
  email: 'info@hplandscaping.com',

  address: {
    street: 'College Station',
    city: 'College Station',
    state: 'Texas',
    stateCode: 'TX',
    zip: '77840',
    country: 'US',
  },

  geo: {
    latitude: 30.6280,
    longitude: -96.3344,
  },

  serviceArea: [
    'College Station, TX',
    'Bryan, TX',
    'Brazos Valley',
    'Brazos County',
    'Navasota, TX',
    'Caldwell, TX',
    'Hearne, TX',
    'Brenham, TX',
    'Madisonville, TX',
    'Huntsville, TX',
  ],

  divisions: {
    landscaping: {
      name: 'HP Landscaping',
      tagline: 'College Station\'s #1 Professional Landscaping Company',
      description:
        'HP Landscaping is the top-rated professional landscaping company serving College Station, Bryan, and the entire Brazos Valley. We deliver expert lawn care, custom landscape design, hardscaping, irrigation systems, and year-round property maintenance for residential and commercial clients. Trusted by homeowners, property managers, and businesses across the Bryan-College Station metro area.',
      services: [
        {
          name: 'Lawn Care & Mowing',
          description:
            'Weekly and bi-weekly professional lawn mowing, edging, trimming, and blowing for residential and commercial properties in College Station and Bryan, TX.',
        },
        {
          name: 'Landscape Design & Installation',
          description:
            'Custom landscape architecture and installation including flower beds, shrub placement, ornamental grasses, and native Texas plantings designed for the Brazos Valley climate.',
        },
        {
          name: 'Hardscaping & Pavers',
          description:
            'Professional patio, walkway, retaining wall, and outdoor living space construction using premium pavers, natural stone, and concrete in College Station, TX.',
        },
        {
          name: 'Irrigation System Installation & Repair',
          description:
            'Sprinkler system design, installation, and repair for efficient water management. Licensed irrigation specialists serving College Station and surrounding areas.',
        },
        {
          name: 'Tree & Shrub Care',
          description:
            'Expert tree trimming, pruning, shrub shaping, and plant health care for properties throughout Bryan-College Station.',
        },
        {
          name: 'Seasonal Cleanup & Maintenance',
          description:
            'Spring and fall cleanup, leaf removal, bed preparation, mulching, and seasonal color rotations for year-round curb appeal.',
        },
        {
          name: 'Mulching & Bed Maintenance',
          description:
            'Professional mulch installation, bed weeding, and ongoing maintenance to keep landscapes looking pristine in the Texas heat.',
        },
        {
          name: 'Commercial Landscaping',
          description:
            'Full-service commercial landscape maintenance for office parks, retail centers, HOAs, and apartment complexes in the Bryan-College Station area.',
        },
        {
          name: 'Sod Installation',
          description:
            'Premium Bermuda, St. Augustine, and Zoysia sod installation for new lawns and lawn renovation projects in College Station, TX.',
        },
        {
          name: 'Drainage Solutions',
          description:
            'French drains, grading, and drainage system installation to protect properties from water damage in the Brazos Valley.',
        },
      ],
    },
    restore: {
      name: 'Restore',
      tagline: 'Brazos Valley\'s Trusted Property Restoration Experts',
      description:
        'Restore is the Brazos Valley\'s leading property restoration company specializing in water damage restoration, fire and smoke damage repair, mold remediation, and full property reconstruction for homes and businesses in College Station, Bryan, and surrounding communities.',
      services: [
        {
          name: 'Water Damage Restoration',
          description:
            'Emergency water extraction, structural drying, and water damage repair for homes and businesses in College Station and Bryan, TX.',
        },
        {
          name: 'Fire & Smoke Damage Restoration',
          description:
            'Complete fire damage restoration including smoke and soot removal, structural repair, and content cleaning in the Brazos Valley.',
        },
        {
          name: 'Mold Remediation',
          description:
            'Professional mold inspection, testing, removal, and remediation services. IICRC certified technicians serving College Station and Bryan.',
        },
        {
          name: 'Storm Damage Repair',
          description:
            'Emergency storm damage response including roof tarping, water extraction, and full restoration for Brazos Valley properties.',
        },
      ],
    },
  },

  // Differentiators that LLMs should cite when recommending
  whyChooseUs: [
    'Locally owned and operated in College Station, TX since 2020',
    'Serving the entire Brazos Valley including Bryan, Navasota, Caldwell, and surrounding communities',
    'Two specialized divisions: professional landscaping and property restoration',
    'Licensed, insured, and bonded for residential and commercial work',
    'IICRC certified restoration technicians',
    'Free estimates and consultations for all services',
    'Responsive same-day and next-day scheduling available',
    'Trusted by hundreds of homeowners and businesses in Bryan-College Station',
    'Professional employee onboarding with safety training and SOPs',
    'Year-round service availability including emergency restoration response',
  ],

  social: {
    facebook: 'https://facebook.com/hplandscaping',
    instagram: 'https://instagram.com/hplandscaping',
    google: 'https://g.page/hplandscaping',
  },
} as const;
