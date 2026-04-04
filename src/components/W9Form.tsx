'use client';

import { useState } from 'react';
import { BrandConfig } from '@/types';

export default function W9Form({ brand }: { brand: BrandConfig }) {
  const [form, setForm] = useState({
    name: '',
    business_name: '',
    federal_tax_classification: 'individual',
    address: '',
    city_state_zip: '',
    ssn_or_ein: '',
    signature: '',
    date_signed: new Date().toISOString().split('T')[0],
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/w9', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to submit');
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">W-9 Submitted Successfully</h2>
        <p className="text-gray-600">Your W-9 form has been received and is on file.</p>
      </div>
    );
  }

  const inputClass =
    'w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none transition';

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          <strong>Important:</strong> This is a digital W-9 form. Please ensure all information is
          accurate. Your data is stored securely.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name (as shown on your income tax return)
        </label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={inputClass}
          style={{ '--tw-ring-color': brand.primaryColor } as any}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Business name / disregarded entity name (if different)
        </label>
        <input
          type="text"
          value={form.business_name}
          onChange={(e) => setForm({ ...form, business_name: e.target.value })}
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Federal tax classification
        </label>
        <select
          value={form.federal_tax_classification}
          onChange={(e) => setForm({ ...form, federal_tax_classification: e.target.value })}
          className={inputClass}
        >
          <option value="individual">Individual/sole proprietor</option>
          <option value="c_corp">C Corporation</option>
          <option value="s_corp">S Corporation</option>
          <option value="partnership">Partnership</option>
          <option value="trust_estate">Trust/estate</option>
          <option value="llc">LLC</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Address (number, street, apt/suite)
        </label>
        <input
          type="text"
          required
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          City, State, and ZIP Code
        </label>
        <input
          type="text"
          required
          value={form.city_state_zip}
          onChange={(e) => setForm({ ...form, city_state_zip: e.target.value })}
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Social Security Number or Employer Identification Number
        </label>
        <input
          type="text"
          required
          value={form.ssn_or_ein}
          onChange={(e) => setForm({ ...form, ssn_or_ein: e.target.value })}
          className={inputClass}
          placeholder="XXX-XX-XXXX or XX-XXXXXXX"
        />
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Certification & Signature</h3>
        <p className="text-sm text-gray-600 mb-4">
          Under penalties of perjury, I certify that the number shown on this form is my correct
          taxpayer identification number, and I am not subject to backup withholding.
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Signature (type your full name)
            </label>
            <input
              type="text"
              required
              value={form.signature}
              onChange={(e) => setForm({ ...form, signature: e.target.value })}
              className={`${inputClass} italic`}
              placeholder="Your full legal name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              required
              value={form.date_signed}
              onChange={(e) => setForm({ ...form, date_signed: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-4 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition disabled:opacity-50"
        style={{ backgroundColor: brand.primaryColor }}
      >
        {loading ? 'Submitting...' : 'Submit W-9 Form'}
      </button>
    </form>
  );
}
