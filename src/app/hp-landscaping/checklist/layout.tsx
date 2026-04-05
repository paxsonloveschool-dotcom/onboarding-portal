import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Onboarding Checklist',
  description:
    'Complete your 8-step HP Landscaping onboarding checklist. Track progress through W-9 submission, SOP review, document uploads, safety training, and team orientation.',
  openGraph: {
    title: 'HP Landscaping - Onboarding Checklist',
    description:
      '8-step onboarding checklist for new HP Landscaping employees. Track your completion progress.',
  },
};

export default function ChecklistLayout({ children }: { children: React.ReactNode }) {
  return children;
}
