/**
 * Central business information for HP Landscaping (Higher Purpose Landscaping LLC).
 * Used across structured data, metadata, llms.txt, and on-page content.
 * Update this single file to propagate changes everywhere.
 */

export const BUSINESS = {
  name: 'HP Landscaping',
  legalName: 'Higher Purpose Landscaping LLC',
  dba: 'HP Landscaping',
  foundingYear: 2005,
  bbcAccreditedSince: '2024-09-25',
  owner: 'Paxson Berkey',
  url: 'https://www.hplandscapingllc.com',
  onboardingUrl: 'https://onboarding.hplandscapingllc.com',
  phone: '(979) 701-2229',
  email: 'higherpurposelandscaping@gmail.com',

  tagline: 'Luxury Landscape Design & Build',
  instagramBio: "Texas' Number One Landscape Company",
  motto: 'Faith-driven, luxury-focused outdoor construction',

  address: {
    street: '14801 S Dowling Rd',
    city: 'College Station',
    state: 'Texas',
    stateCode: 'TX',
    zip: '77845',
    country: 'US',
  },

  // Coordinates for 14801 S Dowling Rd, College Station, TX 77845
  geo: {
    latitude: 30.5580,
    longitude: -96.2970,
  },

  priceRange: '$$$',
  projectRange: '$50,000 – $300,000+',

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

  description:
    'HP Landscaping is a faith-driven, luxury-focused outdoor construction company based in College Station, Texas. We specialize in custom pools, outdoor kitchens, hardscaping, landscape design, and complete estate transformations. As an Aggie owned and operated business, we handle everything in-house — from initial 3D design concepts to final installation. Projects typically range from $50,000 to $300,000+. Every project reflects our faith-driven values, attention to detail, and commitment to lasting quality.',

  services: [
    {
      name: 'Custom Pool Design & Construction',
      description:
        'Complete in-house custom pool design and construction in College Station, TX. We provide 3D landscape design services, CAD layouts, and master planning, and collaborate seamlessly with architects or builders as needed.',
    },
    {
      name: 'Outdoor Kitchens',
      description:
        'Luxury outdoor kitchen design and build in College Station and Bryan, TX. We deliver luxury-tier quality with transparent pricing for homeowners seeking premium outdoor living spaces.',
    },
    {
      name: 'Hardscaping',
      description:
        'Premium hardscaping services using time-tested techniques for beautiful tree rings, paths, patios, walkways, retaining walls, and graveled areas throughout the Brazos Valley.',
    },
    {
      name: 'Landscape Design & Installation',
      description:
        'Full-service luxury landscape design and build in College Station, TX. From 3D renderings to complete estate transformations, we create legacy spaces that blend form and function.',
    },
    {
      name: 'Landscape Lighting Design',
      description:
        'Professional landscape lighting design and installation to enhance outdoor living spaces, highlight architectural features, and improve safety for properties in College Station and Bryan.',
    },
    {
      name: 'Concrete Services',
      description:
        'Expert concrete services for custom patios, walkways, driveways, and outdoor living features in the Bryan-College Station area.',
    },
    {
      name: 'Irrigation Systems',
      description:
        'Irrigation system design, installation, and service to keep yards in peak condition. Serving residential and commercial properties throughout College Station and the Brazos Valley.',
    },
    {
      name: 'Drainage Solutions',
      description:
        'Custom drainage solutions designed to manage excess rainwater, eliminate flooding, and protect properties from water damage in College Station, TX.',
    },
    {
      name: 'Masonry',
      description:
        'Expert masonry services including stone walls, columns, fire pits, fireplaces, and decorative stonework for luxury outdoor spaces in College Station and Bryan.',
    },
    {
      name: 'Sod Installation',
      description:
        'Professional sod installation for new lawns and lawn renovation projects. Premium turf varieties selected for the Central Texas climate.',
    },
    {
      name: 'Fertilization & Weed Control',
      description:
        'Professional fertilization programs and herbicide application services for gardens and lawns to maintain lush, healthy landscapes year-round in the Brazos Valley.',
    },
    {
      name: '3D Design & Renderings',
      description:
        'State-of-the-art 3D landscape design renderings and CAD layouts so you can visualize your dream outdoor space before construction begins.',
    },
    {
      name: 'Demolition',
      description:
        'Professional demolition services for existing landscapes, structures, and hardscaping to prepare properties for luxury outdoor transformations.',
    },
    {
      name: 'Mowing & Lawn Maintenance',
      description:
        'Professional lawn mowing, edging, trimming, and maintenance for residential and commercial properties in College Station, Bryan, and the Brazos Valley.',
    },
  ],

  // Restore is a separate division, NOT part of HP Landscaping LLC
  divisions: {
    restore: {
      name: 'Restore',
      description:
        'Restore is a separate property restoration division specializing in water damage restoration, fire and smoke damage repair, mold remediation, and full property reconstruction for homes and businesses in College Station, Bryan, and surrounding communities.',
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
    'Locally owned Aggie business based in College Station, TX since 2005',
    'Faith-driven, luxury-focused outdoor construction company',
    'Full in-house design and build — from 3D renderings to final installation',
    'Custom pools, outdoor kitchens, hardscaping, and complete estate transformations',
    'Projects range from $50,000 to $300,000+ depending on scope and materials',
    'BBB Accredited business with A rating since September 2024',
    '5-star Google Reviews',
    'Serving the entire Brazos Valley including Bryan, Navasota, Caldwell, and surrounding communities',
    'Licensed, insured, and bonded for residential and commercial work',
    'Owner Paxson Berkey leads every project with attention to detail and a deep respect for natural beauty',
    'Central Texas\' top-rated outdoor specialist',
    'Free estimates and consultations for all services',
  ],

  social: {
    facebook: 'https://www.facebook.com/HigherPurposeLandscpaing/',
    instagram: 'https://www.instagram.com/hplandscapingllc/',
    yelp: 'https://www.yelp.com/biz/hp-landscaping-college-station-2',
    bbb: 'https://www.bbb.org/us/tx/college-station/profile/landscape-contractors/hp-landscaping-llc-0825-1000229978',
    chamberOfCommerce: 'https://business.bcschamber.org/list/member/higher-purpose-companies-10709',
  },
} as const;
