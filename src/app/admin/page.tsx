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

interface Activity {
  id: number;
  employee_name: string;
  team: string;
  action: string;
  timestamp: string;
}

export default function AdminPage() {
  const { data: session } = useSession();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filter, setFilter] = useState<'all' | 'hp' | 'restore'>('all');
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('/api/admin')
      .then((r) => r.json())
      .then((data) => {
        setEmployees(data.employees || []);
        setActivities(data.activities || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleDelete = async (employeeId: number) => {
    const res = await fetch(`/api/admin/employees/${employeeId}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setEmployees((prev) => prev.filter((e) => e.id !== employeeId));
      setDeleteConfirm(null);
    }
  };

  const filtered = filter === 'all' ? employees : employees.filter((e) => e.team === filter);
  const onlyEmployees = filtered.filter((e) => e.role !== 'admin');

  const teamLabel = (t: string) => (t === 'hp' ? 'HP Landscaping' : 'Restore');
  const teamColor = (t: string) => (t === 'hp' ? '#2d5016' : '#1a56db');

  // Calculate aggregate stats
  const totalEmployees = employees.filter((e) => e.role !== 'admin').length;
  const hpCount = employees.filter((e) => e.team === 'hp' && e.role !== 'admin').length;
  const restoreCount = employees.filter((e) => e.team === 'restore' && e.role !== 'admin').length;
  const w9Count = employees.filter((e) => e.w9_count > 0 && e.role !== 'admin').length;
  const fullyOnboarded = employees.filter(
    (e) => e.role !== 'admin' && e.checklist_completed === e.checklist_total && e.checklist_total > 0
  ).length;

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
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500">Manage employee onboarding across all teams</p>
          </div>
        </div>

        {/* Stats cards - responsive grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-5 rounded-xl shadow-sm border">
            <p className="text-sm text-gray-500">Total Employees</p>
            <p className="text-3xl font-bold text-gray-900">{totalEmployees}</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm border">
            <p className="text-sm text-gray-500">HP Landscaping</p>
            <p className="text-3xl font-bold text-green-700">{hpCount}</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm border">
            <p className="text-sm text-gray-500">Restore</p>
            <p className="text-3xl font-bold text-blue-700">{restoreCount}</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm border">
            <p className="text-sm text-gray-500">W-9s Submitted</p>
            <p className="text-3xl font-bold text-gray-900">{w9Count}</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm border col-span-2 lg:col-span-1">
            <p className="text-sm text-gray-500">Fully Onboarded</p>
            <p className="text-3xl font-bold text-emerald-600">{fullyOnboarded}</p>
          </div>
        </div>

        {/* Recent Activity */}
        {activities.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3 text-sm">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: teamColor(activity.team) }}
                  />
                  <span className="font-medium text-gray-900">{activity.employee_name}</span>
                  <span className="text-gray-500">{activity.action}</span>
                  <span className="text-gray-400 ml-auto text-xs">
                    {new Date(activity.timestamp).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

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
            {/* Desktop table */}
            <div className="hidden md:block">
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {onlyEmployees.map((emp) => (
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
                      <td className="px-6 py-4">
                        {deleteConfirm === emp.id ? (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleDelete(emp.id)}
                              className="text-xs px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(emp.id)}
                            className="text-xs px-2 py-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            Remove
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {onlyEmployees.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                        No employees found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-gray-200">
              {onlyEmployees.map((emp) => (
                <div key={emp.id} className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{emp.name}</p>
                      <p className="text-sm text-gray-500">{emp.email}</p>
                    </div>
                    <span
                      className="px-2.5 py-1 text-xs font-medium rounded-full text-white"
                      style={{ backgroundColor: teamColor(emp.team) }}
                    >
                      {teamLabel(emp.team)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className={emp.w9_count > 0 ? 'text-green-600' : 'text-yellow-600'}>
                      W-9: {emp.w9_count > 0 ? 'Done' : 'Pending'}
                    </span>
                    <span className="text-gray-500">{emp.doc_count} docs</span>
                  </div>
                  <ProgressBar
                    completed={emp.checklist_completed}
                    total={emp.checklist_total}
                    color={teamColor(emp.team)}
                  />
                </div>
              ))}
              {onlyEmployees.length === 0 && (
                <p className="px-4 py-8 text-center text-gray-500">No employees found.</p>
              )}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
