import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import AuthProvider from '@/components/AuthProvider';

const geistSans = localFont({
  src: './fonts/geist-latin.woff2',
  variable: '--font-geist-sans',
});

const geistMono = localFont({
  src: './fonts/geist-mono-latin.woff2',
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  title: 'Employee Onboarding Portal | HP Landscaping & Restore',
  description: 'Employee onboarding portal for HP Landscaping and Restore teams',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gray-50">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
