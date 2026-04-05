import type { Metadata } from 'next';
import RestoreLayoutClient from './layout-client';

export const metadata: Metadata = {
  title: 'Restore Onboarding',
  description:
    'Employee onboarding for Restore division. Complete W-9 forms, review restoration SOPs, upload IICRC certifications, and track your onboarding progress.',
  openGraph: {
    title: 'Restore - Employee Onboarding',
    description:
      'Complete your Restore onboarding: W-9 forms, restoration SOPs, IICRC certifications, and checklists.',
  },
};

export default function RestoreLayout({ children }: { children: React.ReactNode }) {
  return <RestoreLayoutClient>{children}</RestoreLayoutClient>;
}
