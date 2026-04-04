'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProgressBar from '@/components/ProgressBar';
import { brands } from '@/lib/brands';

const brand = brands.hp;

export default function HPDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({ completed: 0, total: 0, hasW9: false, docCount: 0 });

  useEffect(() => {
    fetch('/api/checklist')
      .then((r) => r.json())
      .then((data) => {
        const items = data.items || [];
        setStats((s) => ({
          ...s,
          completed: items.filter((i: any) => i.completed).length,
          total: items.length,
        }));
      });

    fetch('/api/w9')
      .then((r) => r.json())
      .then((data) => {
        setStats((s) => ({ ...s, hasW9: !!data.submission }));
      });

    fetch('/api/documents')
      .then((r) => r.json())
      .then((data) => {
        setStats((s) => ({ ...s, docCount: (data.documents || []).length }));
      });
  }, []);

  const cards = [
    {
      title: 'W-9 Tax Form',
      desc: stats.hasW9 ? 'Submitted' : 'Not yet submitted',
      icon: '📋',
      href: '/hp-landscaping/w9',
      status: stats.hasW9,
    },
    {
      title: 'SOPs & Handbook',
      desc: 'Review company procedures',
      icon: '📖',
      href: '/hp-landscaping/sops',
      status: null,
    },
    {
      title: 'Documents',
      desc: `${stats.docCount} uploaded`,
      icon: '📁',
      href: '/hp-landscaping/documents',
      status: stats.docCount > 0,
    },
    {
      title: 'Onboarding Checklist',
      desc: `${stats.completed}/${stats.total} completed`,
      icon: '✅',
      href: '/hp-landscaping/checklist',
      status: stats.completed === stats.total && stats.total > 0,
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome, {session?.user?.name || 'Employee'}!
        </h1>
        <p className="text-gray-500 mt-1">HP Landscaping Onboarding Dashboard</p>
      </div>

      <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Onboarding Progress</h2>
        <ProgressBar completed={stats.completed} total={stats.total} color={brand.primaryColor} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {cards.map((card) => (
          <Link key={card.title} href={card.href}>
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{card.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{card.title}</h3>
                    <p className="text-sm text-gray-500">{card.desc}</p>
                  </div>
                </div>
                {card.status !== null && (
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-medium ${
                      card.status
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {card.status ? 'Done' : 'Pending'}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
