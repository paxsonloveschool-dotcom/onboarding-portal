'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BrandConfig } from '@/types';

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: '📊' },
  { label: 'W-9 Form', path: '/w9', icon: '📋' },
  { label: 'SOPs', path: '/sops', icon: '📖' },
  { label: 'Documents', path: '/documents', icon: '📁' },
  { label: 'Checklist', path: '/checklist', icon: '✅' },
];

export default function Sidebar({ brand }: { brand: BrandConfig }) {
  const pathname = usePathname();
  const basePath = `/${brand.slug}`;

  return (
    <aside className="w-64 min-h-[calc(100vh-4rem)] bg-gray-50 border-r border-gray-200">
      <div className="p-4">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Onboarding
        </h3>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const href = `${basePath}${item.path}`;
            const isActive = pathname === href;
            return (
              <Link
                key={item.path}
                href={href}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? 'text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                style={isActive ? { backgroundColor: brand.primaryColor } : {}}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
