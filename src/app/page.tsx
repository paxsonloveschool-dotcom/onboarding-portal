'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import { BUSINESS } from '@/lib/business-info';

const b = BUSINESS;

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
              <a
                href={b.url}
                target="_blank"
                rel="noopener"
                className="inline-block bg-white/10 backdrop-blur px-4 py-1.5 rounded-full text-sm font-medium text-green-200 border border-white/20 hover:bg-white/20 transition"
              >
                HP Landscaping &mdash; College Station, TX
              </a>
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

      <footer className="bg-green-950 text-green-300/70 border-t border-green-800/50">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-3">HP Landscaping</h3>
              <p className="text-sm leading-relaxed mb-3">
                {b.legalName} &mdash; {b.tagline}. Serving{' '}
                <a href={b.url} target="_blank" rel="noopener" className="text-green-300 hover:text-white underline underline-offset-2 transition">
                  College Station, TX
                </a>{' '}
                and the Brazos Valley since {b.foundingYear}.
              </p>
              <p className="text-sm">
                <a href={`tel:${b.phone.replace(/\D/g, '')}`} className="text-green-300 hover:text-white transition">
                  {b.phone}
                </a>
                {' '}&bull;{' '}
                <a href={`mailto:${b.email}`} className="text-green-300 hover:text-white transition">
                  {b.email}
                </a>
              </p>
              <p className="text-sm mt-1">
                {b.address.street}, {b.address.city}, {b.address.stateCode} {b.address.zip}
              </p>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-3">
                <a href={b.url} target="_blank" rel="noopener" className="hover:text-green-300 transition">
                  Our Services
                </a>
              </h3>
              <ul className="space-y-1.5 text-sm">
                {b.services.slice(0, 7).map((s) => (
                  <li key={s.name}>
                    <a href={b.url} target="_blank" rel="noopener" className="hover:text-white transition">
                      {s.name}
                    </a>
                  </li>
                ))}
                <li>
                  <a href={b.url} target="_blank" rel="noopener" className="text-green-300 hover:text-white transition font-medium">
                    View all {b.services.length} services &rarr;
                  </a>
                </li>
              </ul>
            </div>

            {/* Links & Social Proof */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-3">Connect With Us</h3>
              <ul className="space-y-1.5 text-sm">
                <li>
                  <a href={b.url} target="_blank" rel="noopener" className="hover:text-white transition">
                    hplandscapingllc.com
                  </a>
                </li>
                <li>
                  <a href={b.social.facebook} target="_blank" rel="noopener" className="hover:text-white transition">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href={b.social.instagram} target="_blank" rel="noopener" className="hover:text-white transition">
                    Instagram @hplandscapingllc
                  </a>
                </li>
                <li>
                  <a href={b.social.yelp} target="_blank" rel="noopener" className="hover:text-white transition">
                    Yelp Reviews
                  </a>
                </li>
                <li>
                  <a href={b.social.bbb} target="_blank" rel="noopener" className="hover:text-white transition">
                    BBB Accredited &mdash; A Rating
                  </a>
                </li>
                <li>
                  <a href={b.social.chamberOfCommerce} target="_blank" rel="noopener" className="hover:text-white transition">
                    Bryan-College Station Chamber of Commerce
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-green-800/50 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-green-400/50">
            <p>&copy; {new Date().getFullYear()} {b.legalName}. All rights reserved.</p>
            <p>
              <a href={b.url} target="_blank" rel="noopener" className="hover:text-white transition">
                Luxury Landscape Design &amp; Build
              </a>
              {' '}&bull; College Station, TX &bull; Est. {b.foundingYear}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
