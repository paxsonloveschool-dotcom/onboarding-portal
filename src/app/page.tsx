'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* HP Hero */}
        <div className="bg-gradient-to-br from-green-950 via-green-900 to-emerald-800 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 text-[200px]">🌿</div>
            <div className="absolute bottom-10 right-10 text-[150px]">🌳</div>
          </div>
          <div className="max-w-7xl mx-auto px-4 py-20 text-center relative z-10">
            <div className="mb-6">
              <span className="inline-block bg-white/10 backdrop-blur px-4 py-1.5 rounded-full text-sm font-medium text-green-200 border border-white/20">
                HP Landscaping
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Employee Onboarding Portal
            </h1>
            <p className="text-xl text-green-100/80 mb-10 max-w-2xl mx-auto">
              Welcome to the HP family. Complete your onboarding below for your assigned division.
            </p>

            {!session ? (
              <Link
                href="/login"
                className="inline-block bg-white text-green-900 font-semibold px-8 py-3.5 rounded-lg hover:bg-green-50 transition shadow-lg text-lg"
              >
                Sign In to Get Started
              </Link>
            ) : (
              <p className="text-green-200 text-lg">
                Welcome back, <strong>{session.user?.name}</strong>. Select your division below.
              </p>
            )}
          </div>
        </div>

        {/* Division Cards */}
        <div className="max-w-6xl mx-auto px-4 -mt-12 pb-20">
          <div className="grid md:grid-cols-2 gap-8">
            {/* HP Landscaping Division */}
            <Link href={session ? '/hp-landscaping/dashboard' : '/login'}>
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-1 cursor-pointer group">
                <div className="bg-gradient-to-r from-green-800 to-emerald-700 p-8 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-200 text-sm font-medium uppercase tracking-wider mb-1">Division</p>
                      <h2 className="text-3xl font-bold">HP Landscaping</h2>
                    </div>
                    <span className="text-5xl opacity-80 group-hover:scale-110 transition-transform">🌿</span>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-2 text-gray-600 text-sm mb-4">
                    <li className="flex items-center space-x-2">
                      <span className="text-green-600">&#10003;</span>
                      <span>W-9 Tax Form Submission</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-green-600">&#10003;</span>
                      <span>Safety & Equipment SOPs</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-green-600">&#10003;</span>
                      <span>Certification & ID Upload</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-green-600">&#10003;</span>
                      <span>8-Step Onboarding Checklist</span>
                    </li>
                  </ul>
                  <div className="flex justify-end">
                    <span className="inline-flex items-center text-green-700 font-semibold group-hover:translate-x-1 transition-transform">
                      Start Onboarding →
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Restore Division */}
            <Link href={session ? '/restore/dashboard' : '/login'}>
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-1 cursor-pointer group">
                <div className="bg-gradient-to-r from-blue-800 to-indigo-700 p-8 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-200 text-sm font-medium uppercase tracking-wider mb-1">Division</p>
                      <h2 className="text-3xl font-bold">Restore</h2>
                    </div>
                    <span className="text-5xl opacity-80 group-hover:scale-110 transition-transform">🔧</span>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-2 text-gray-600 text-sm mb-4">
                    <li className="flex items-center space-x-2">
                      <span className="text-blue-600">&#10003;</span>
                      <span>W-9 Tax Form Submission</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-blue-600">&#10003;</span>
                      <span>Restoration & Safety SOPs</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-blue-600">&#10003;</span>
                      <span>IICRC Certification Upload</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-blue-600">&#10003;</span>
                      <span>8-Step Onboarding Checklist</span>
                    </li>
                  </ul>
                  <div className="flex justify-end">
                    <span className="inline-flex items-center text-blue-700 font-semibold group-hover:translate-x-1 transition-transform">
                      Start Onboarding →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-green-950 text-green-300/60 text-center py-6 text-sm border-t border-green-800/50">
        &copy; {new Date().getFullYear()} HP Landscaping LLC. All rights reserved.
      </footer>
    </>
  );
}
