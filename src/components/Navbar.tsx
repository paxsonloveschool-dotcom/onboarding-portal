'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { BrandConfig } from '@/types';

export default function Navbar({ brand }: { brand?: BrandConfig }) {
  const { data: session } = useSession();

  const bgClass = brand
    ? `bg-gradient-to-r ${brand.bgGradient}`
    : 'bg-gradient-to-r from-green-950 to-green-900';

  return (
    <nav className={`${bgClass} text-white shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{brand ? brand.logo : '🌿'}</span>
            <Link href={brand ? `/${brand.slug}/dashboard` : '/'} className="text-xl font-bold">
              {brand ? brand.name : 'HP Landscaping & Restore'}
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <span className="text-sm text-white/80">
                  {session.user?.name}
                </span>
                {(session.user as any)?.role === 'admin' && (
                  <Link
                    href="/admin"
                    className="text-sm bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="text-sm bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="text-sm bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
