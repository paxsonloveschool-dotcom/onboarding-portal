import type { Metadata } from 'next';
import HPLayoutClient from './layout-client';

export const metadata: Metadata = {
  title: 'HP Landscaping Onboarding',
  description:
    'Employee onboarding for HP Landscaping. Complete W-9 forms, review safety SOPs, upload certifications, and track your onboarding checklist.',
  openGraph: {
    title: 'HP Landscaping - Employee Onboarding',
    description:
      'Complete your HP Landscaping onboarding: W-9 forms, safety SOPs, certifications, and checklists.',
  },
};

export default function HPLayout({ children }: { children: React.ReactNode }) {
  return <HPLayoutClient>{children}</HPLayoutClient>;
}
