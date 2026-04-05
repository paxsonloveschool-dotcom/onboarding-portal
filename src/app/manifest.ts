import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'HP Landscaping & Restore - Employee Onboarding Portal',
    short_name: 'HP Onboarding',
    description: 'Complete your employee onboarding for HP Landscaping and Restore divisions.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f9fafb',
    theme_color: '#2d5016',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '64x64',
        type: 'image/x-icon',
      },
    ],
  };
}
