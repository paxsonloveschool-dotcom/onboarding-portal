'use client';

import ChecklistView from '@/components/ChecklistView';
import { brands } from '@/lib/brands';

export default function HPChecklistPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Onboarding Checklist</h1>
      <p className="text-gray-500 mb-8">
        Complete each task below to finish your HP Landscaping onboarding.
      </p>
      <ChecklistView brand={brands.hp} />
    </div>
  );
}
