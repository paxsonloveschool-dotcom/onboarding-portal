import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Onboarding Dashboard',
  description:
    'Track your HP Landscaping onboarding progress. View W-9 status, SOP completion, document uploads, and your 8-step onboarding checklist at a glance.',
  openGraph: {
    title: 'HP Landscaping - Onboarding Dashboard',
    description: 'Track your HP Landscaping employee onboarding progress and completion status.',
  },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
