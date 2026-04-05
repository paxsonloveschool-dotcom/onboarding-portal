'use client';

import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { brands } from '@/lib/brands';

const brand = brands.restore;

export default function RestoreLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar brand={brand} />
      <div className="flex flex-1">
        <Sidebar brand={brand} />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </>
  );
}
