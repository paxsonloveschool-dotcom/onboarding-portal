'use client';

import SOPViewer from '@/components/SOPViewer';
import { brands } from '@/lib/brands';

export default function HPSOPsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Standard Operating Procedures</h1>
      <p className="text-gray-500 mb-8">
        Review all HP Landscaping SOPs and company handbook.
      </p>
      <SOPViewer brand={brands.hp} />
    </div>
  );
}
