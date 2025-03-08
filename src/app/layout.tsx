import { type Metadata } from 'next';
import { Roboto_Condensed } from 'next/font/google';

import { type Locale } from '@/i18n/types';

import '@/styles/globals.css';

const font = Roboto_Condensed({
  weight: ['400'],
});

type RootLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
};

export const metadata: Metadata = {
  title: 'Marvel characters',
  description: 'Marvel characters App',
};

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params;

  return (
    <html dir="ltr" lang={locale}>
      <body className={`${font.className} antialiased`}>{children}</body>
    </html>
  );
}
