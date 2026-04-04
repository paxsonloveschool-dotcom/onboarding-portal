'use client';

import { BrandConfig } from '@/types';

interface SOPDocument {
  title: string;
  description: string;
  filename: string;
}

const hpSOPs: SOPDocument[] = [
  {
    title: 'Employee Handbook',
    description: 'Complete guide to HP Landscaping policies, culture, and expectations.',
    filename: 'employee-handbook.pdf',
  },
  {
    title: 'Safety Procedures',
    description: 'Workplace safety guidelines for all landscaping operations.',
    filename: 'safety-procedures.pdf',
  },
  {
    title: 'Equipment Operation Guide',
    description: 'Proper use and maintenance of landscaping equipment.',
    filename: 'equipment-guide.pdf',
  },
  {
    title: 'Chemical Handling SOP',
    description: 'Safe handling procedures for fertilizers, herbicides, and pesticides.',
    filename: 'chemical-handling.pdf',
  },
  {
    title: 'Client Communication Guidelines',
    description: 'Professional standards for interacting with clients on-site.',
    filename: 'client-communication.pdf',
  },
];

const restoreSOPs: SOPDocument[] = [
  {
    title: 'Employee Handbook',
    description: 'Complete guide to Restore policies, culture, and expectations.',
    filename: 'employee-handbook.pdf',
  },
  {
    title: 'Safety Procedures',
    description: 'Workplace safety guidelines for all restoration operations.',
    filename: 'safety-procedures.pdf',
  },
  {
    title: 'Water Damage Restoration SOP',
    description: 'Step-by-step procedures for water damage restoration projects.',
    filename: 'water-damage-sop.pdf',
  },
  {
    title: 'Mold Remediation SOP',
    description: 'Protocols for safe and effective mold remediation.',
    filename: 'mold-remediation.pdf',
  },
  {
    title: 'Fire & Smoke Damage SOP',
    description: 'Procedures for fire and smoke damage assessment and restoration.',
    filename: 'fire-smoke-sop.pdf',
  },
  {
    title: 'IICRC Standards Reference',
    description: 'Reference guide for IICRC industry standards compliance.',
    filename: 'iicrc-standards.pdf',
  },
];

export default function SOPViewer({ brand }: { brand: BrandConfig }) {
  const sops = brand.slug === 'hp-landscaping' ? hpSOPs : restoreSOPs;
  const folder = brand.slug === 'hp-landscaping' ? 'hp' : 'restore';

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-800">
          Please review all Standard Operating Procedures below. These documents outline important
          policies and procedures you need to know as a {brand.name} team member.
        </p>
      </div>

      <div className="grid gap-4">
        {sops.map((sop) => (
          <div
            key={sop.filename}
            className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition"
          >
            <div className="flex items-center space-x-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                style={{ backgroundColor: brand.primaryColor }}
              >
                📖
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{sop.title}</h3>
                <p className="text-sm text-gray-500">{sop.description}</p>
              </div>
            </div>
            <a
              href={`/sops/${folder}/${sop.filename}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium rounded-lg border transition hover:bg-gray-50"
              style={{ color: brand.primaryColor, borderColor: brand.primaryColor }}
            >
              View PDF
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
