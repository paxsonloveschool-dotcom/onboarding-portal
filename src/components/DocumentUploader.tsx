'use client';

import { useState, useEffect } from 'react';
import { BrandConfig } from '@/types';

interface UploadedDoc {
  id: number;
  file_name: string;
  doc_type: string;
  uploaded_at: string;
}

export default function DocumentUploader({ brand }: { brand: BrandConfig }) {
  const [docs, setDocs] = useState<UploadedDoc[]>([]);
  const [docType, setDocType] = useState('government_id');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchDocs();
  }, []);

  const fetchDocs = async () => {
    const res = await fetch('/api/documents');
    if (res.ok) {
      const data = await res.json();
      setDocs(data.documents || []);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('doc_type', docType);

    try {
      const res = await fetch('/api/documents', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Upload failed');
      }

      setMessage('Document uploaded successfully!');
      setFile(null);
      fetchDocs();
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const docTypeLabels: Record<string, string> = {
    government_id: 'Government ID',
    drivers_license: "Driver's License",
    certification: 'Certification',
    insurance: 'Insurance Document',
    other: 'Other',
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleUpload} className="space-y-4 max-w-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Document Type</label>
          <select
            value={docType}
            onChange={(e) => setDocType(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none"
          >
            {Object.entries(docTypeLabels).map(([val, label]) => (
              <option key={val} value={val}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select File</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          />
        </div>

        {message && (
          <p
            className={`text-sm ${message.startsWith('Error') ? 'text-red-600' : 'text-green-600'}`}
          >
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={!file || uploading}
          className="px-6 py-2.5 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition disabled:opacity-50"
          style={{ backgroundColor: brand.primaryColor }}
        >
          {uploading ? 'Uploading...' : 'Upload Document'}
        </button>
      </form>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Uploaded Documents</h3>
        {docs.length === 0 ? (
          <p className="text-gray-500 text-sm">No documents uploaded yet.</p>
        ) : (
          <div className="space-y-2">
            {docs.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">📄</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{doc.file_name}</p>
                    <p className="text-xs text-gray-500">
                      {docTypeLabels[doc.doc_type] || doc.doc_type} &middot;{' '}
                      {new Date(doc.uploaded_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
