'use client';

import DocumentUploader from '@/components/DocumentUploader';
import { brands } from '@/lib/brands';

export default function HPDocumentsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Document Upload</h1>
      <p className="text-gray-500 mb-8">
        Upload required documents such as government ID, certifications, and licenses.
      </p>
      <DocumentUploader brand={brands.hp} />
    </div>
  );
}
