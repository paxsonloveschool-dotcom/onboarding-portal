'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { brands } from '@/lib/brands';

const brand = brands.godmode;

const navItems = [
  { label: 'Swarm Overview', path: '/dashboard', icon: '🕸️' },
  { label: 'Pipeline', path: '/pipeline', icon: '⚙️' },
  { label: 'Agent Tree', path: '/agents', icon: '🌳' },
  { label: 'Skills Registry', path: '/skills', icon: '🧩' },
  { label: 'Live Monitor', path: '/monitor', icon: '📡' },
  { label: 'Cognitive Guards', path: '/guards', icon: '🛡️' },
  { label: 'Sources', path: '/sources', icon: '📚' },
];

export default function GodModeLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <Navbar brand={brand} />
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 min-h-[calc(100vh-4rem)] bg-gray-950 border-r border-gray-800">
          <div className="p-4">
            <h3 className="text-xs font-semibold text-purple-400/60 uppercase tracking-wider mb-4">
              Swarm Control
            </h3>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const href = `/godmode${item.path}`;
                const isActive = pathname === href;
                return (
                  <Link
                    key={item.path}
                    href={href}
                    className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                      isActive
                        ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Agent Status Summary */}
            <div className="mt-8 p-3 bg-gray-900 rounded-lg border border-gray-800">
              <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">Live Status</h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-gray-400">Orchestrator</span>
                  </div>
                  <span className="text-green-400 font-mono">ACTIVE</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                    <span className="text-gray-400">Implementers</span>
                  </div>
                  <span className="text-yellow-400 font-mono">3/3</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-gray-400">Reviewers</span>
                  </div>
                  <span className="text-blue-400 font-mono">2/6</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gray-500" />
                    <span className="text-gray-400">Queued</span>
                  </div>
                  <span className="text-gray-400 font-mono">4</span>
                </div>
              </div>
            </div>

            {/* Escalation Level */}
            <div className="mt-4 p-3 bg-gray-900 rounded-lg border border-gray-800">
              <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Escalation</h4>
              <div className="flex gap-1">
                <div className="flex-1 h-2 rounded-full bg-green-500" title="Green: All clear" />
                <div className="flex-1 h-2 rounded-full bg-gray-700" title="Yellow: 2 failures" />
                <div className="flex-1 h-2 rounded-full bg-gray-700" title="Orange: 3 failures" />
                <div className="flex-1 h-2 rounded-full bg-gray-700" title="Red: 4+ failures" />
              </div>
              <p className="text-[10px] text-green-400 mt-1 font-mono">GREEN — All systems nominal</p>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 bg-gray-950 p-8 min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </>
  );
}
