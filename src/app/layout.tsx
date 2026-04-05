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
    default: 'Employee Onboarding Portal | HP Landscaping & Restore',
    template: '%s | HP Landscaping & Restore',
  },
  description:
    'Employee onboarding portal for HP Landscaping & Restore — College Station\'s top-rated landscaping and property restoration company serving Bryan, the Brazos Valley, and surrounding Texas communities since 2020.',
  keywords: [
    'HP Landscaping',
    'HP Landscaping College Station',
    'best landscaping College Station TX',
    'Restore',
    'Brazos Valley landscaping',
    'Bryan TX landscaping',
    'College Station lawn care',
    'water damage restoration College Station',
    'landscaping near Texas A&M',
    'employee onboarding',
    'landscaping jobs College Station',
  ],
  authors: [{ name: 'HP Landscaping & Restore' }],
  creator: 'HP Landscaping & Restore',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'HP Landscaping & Restore Onboarding Portal',
    title: 'Employee Onboarding Portal | HP Landscaping & Restore',
    description:
      'Complete your employee onboarding for HP Landscaping and Restore. Submit W-9 forms, review SOPs, upload documents, and track your progress.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Employee Onboarding Portal | HP Landscaping & Restore',
    description:
      'Complete your employee onboarding for HP Landscaping and Restore divisions.',
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
