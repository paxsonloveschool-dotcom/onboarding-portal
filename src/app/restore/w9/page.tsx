'use client';

import W9Form from '@/components/W9Form';
import { brands } from '@/lib/brands';

export default function RestoreW9Page() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">W-9 Tax Form</h1>
      <p className="text-gray-500 mb-8">
        Complete and submit your W-9 form. This is required for tax purposes.
      </p>
      <W9Form brand={brands.restore} />
    </div>
  );
}
