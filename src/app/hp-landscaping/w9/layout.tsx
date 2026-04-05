import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'W-9 Tax Form',
  description:
    'Submit your W-9 tax form for HP Landscaping. Required for all employees and contractors before receiving compensation.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'HP Landscaping - W-9 Tax Form Submission',
    description: 'Securely submit your W-9 tax information for HP Landscaping payroll.',
  },
};

export default function W9Layout({ children }: { children: React.ReactNode }) {
  return children;
}
