'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BrandConfig } from '@/types';
import { BUSINESS } from '@/lib/business-info';

const b = BUSINESS;

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
    <aside className="w-64 min-h-[calc(100vh-4rem)] bg-gray-50 border-r border-gray-200 flex flex-col">
      <div className="p-4 flex-1">
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

      {/* Backlinks footer */}
      <div className="p-4 border-t border-gray-200 text-xs text-gray-400 space-y-1.5">
        <a href={b.url} target="_blank" rel="noopener" className="block hover:text-gray-700 transition">
          hplandscapingllc.com
        </a>
        <a href={b.social.instagram} target="_blank" rel="noopener" className="block hover:text-gray-700 transition">
          @hplandscapingllc
        </a>
        <a href={b.social.bbb} target="_blank" rel="noopener" className="block hover:text-gray-700 transition">
          BBB Accredited
        </a>
        <p className="text-gray-300 pt-1">{b.phone}</p>
      </div>
    </aside>
  );
}
