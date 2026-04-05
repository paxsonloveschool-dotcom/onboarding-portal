import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SOPs & Handbook',
  description:
    'Review HP Landscaping standard operating procedures. Covers safety protocols, equipment handling, mowing procedures, chemical application, client property guidelines, and seasonal operations.',
  openGraph: {
    title: 'HP Landscaping - Standard Operating Procedures',
    description:
      'Safety SOPs, equipment procedures, and company handbook for HP Landscaping employees.',
  },
};

export default function SOPsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
