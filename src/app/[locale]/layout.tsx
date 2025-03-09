import { notFound } from 'next/navigation';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { Footer } from '@/components/footer/footer-component';
import { Header } from '@/components/header/header-component';
import { routing } from '@/i18n/routing';
import { type Locale } from '@/i18n/types';
import { AppProviders } from '@/providers/AppProviders';

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  // INFO: NextIntlClientProvider provides translations to all client components.
  return (
    <NextIntlClientProvider messages={messages}>
      <Header />
      <main className="min-h-[calc(100vh_-_90px)]">
        <AppProviders locale={locale}>{children}</AppProviders>
      </main>
      <Footer />
    </NextIntlClientProvider>
  );
}
