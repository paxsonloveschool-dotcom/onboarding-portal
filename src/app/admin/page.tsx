'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import ProgressBar from '@/components/ProgressBar';

interface Employee {
  id: number;
  name: string;
  email: string;
  team: string;
  role: string;
  created_at: string;
  w9_count: number;
  doc_count: number;
  checklist_completed: number;
  checklist_total: number;
}

export default function AdminPage() {
  const { data: session } = useSession();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filter, setFilter] = useState<'all' | 'hp' | 'restore'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin')
      .then((r) => r.json())
      .then((data) => {
        setEmployees(data.employees || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = filter === 'all' ? employees : employees.filter((e) => e.team === filter);

  const teamLabel = (t: string) => (t === 'hp' ? 'HP Landscaping' : 'Restore');
  const teamColor = (t: string) => (t === 'hp' ? '#2d5016' : '#1a56db');

  if ((session?.user as any)?.role !== 'admin') {
    return (
      <>
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500 text-lg">Access denied. Admin only.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500">Manage employee onboarding across all teams</p>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-xl shadow-sm border">
            <p className="text-sm text-gray-500">Total Employees</p>
            <p className="text-3xl font-bold text-gray-900">{employees.length}</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm border">
            <p className="text-sm text-gray-500">HP Landscaping</p>
            <p className="text-3xl font-bold text-green-700">
              {employees.filter((e) => e.team === 'hp').length}
            </p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm border">
            <p className="text-sm text-gray-500">Restore</p>
            <p className="text-3xl font-bold text-blue-700">
              {employees.filter((e) => e.team === 'restore').length}
            </p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm border">
            <p className="text-sm text-gray-500">W-9s Submitted</p>
            <p className="text-3xl font-bold text-gray-900">
              {employees.filter((e) => e.w9_count > 0).length}
            </p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex space-x-2 mb-6">
          {(['all', 'hp', 'restore'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === f
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {f === 'all' ? 'All Teams' : teamLabel(f)}
            </button>
          ))}
        </div>

        {/* Employee table */}
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Team
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    W-9
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Documents
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Progress
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filtered.map((emp) => (
                  <tr key={emp.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{emp.name}</p>
                      <p className="text-sm text-gray-500">{emp.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="px-2.5 py-1 text-xs font-medium rounded-full text-white"
                        style={{ backgroundColor: teamColor(emp.team) }}
                      >
                        {teamLabel(emp.team)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-sm font-medium ${
                          emp.w9_count > 0 ? 'text-green-600' : 'text-yellow-600'
                        }`}
                      >
                        {emp.w9_count > 0 ? 'Submitted' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-700">{emp.doc_count} files</span>
                    </td>
                    <td className="px-6 py-4 w-48">
                      <ProgressBar
                        completed={emp.checklist_completed}
                        total={emp.checklist_total}
                        color={teamColor(emp.team)}
                      />
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      No employees found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </>
  );
}
