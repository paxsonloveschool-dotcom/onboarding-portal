import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Document Upload',
  description:
    'Upload required documents for HP Landscaping onboarding. Includes driver\'s license, certifications, insurance documents, and other required identification.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'HP Landscaping - Document Upload',
    description: 'Securely upload onboarding documents for HP Landscaping employment.',
  },
};

export default function DocumentsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
