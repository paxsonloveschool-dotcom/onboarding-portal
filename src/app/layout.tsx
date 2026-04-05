import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/components/AuthProvider';
import StructuredData from '@/components/StructuredData';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://onboarding.hplandscaping.com';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Employee Onboarding Portal | HP Landscaping',
    template: '%s | HP Landscaping',
  },
  description:
    'Employee onboarding portal for HP Landscaping (Higher Purpose Landscaping LLC) — College Station\'s top-rated luxury landscape design & build company serving Bryan, the Brazos Valley, and surrounding Texas communities since 2005.',
  keywords: [
    'HP Landscaping',
    'Higher Purpose Landscaping LLC',
    'HP Landscaping College Station',
    'best landscaping College Station TX',
    'luxury landscape design College Station',
    'custom pools College Station TX',
    'outdoor kitchens Bryan TX',
    'Brazos Valley landscaping',
    'Bryan TX landscaping',
    'hardscaping College Station',
    'landscaping near Texas A&M',
    'employee onboarding',
    'landscaping jobs College Station',
  ],
  authors: [{ name: 'HP Landscaping' }],
  creator: 'HP Landscaping',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'HP Landscaping Onboarding Portal',
    title: 'Employee Onboarding Portal | HP Landscaping',
    description:
      'Complete your employee onboarding for HP Landscaping. Submit W-9 forms, review SOPs, upload documents, and track your progress.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Employee Onboarding Portal | HP Landscaping',
    description:
      'Complete your employee onboarding for HP Landscaping.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gray-50">
        <StructuredData />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
