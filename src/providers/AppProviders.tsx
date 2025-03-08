'use client';

import { type ReactNode } from 'react';
import { isServer, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { I18nProvider } from 'react-aria-components';
import { type Locale } from '@/i18n/types';

type AppProvidersProps = {
  locale: Locale;
  children: ReactNode;
};

// INFO: Configure TanStack Query for Advanced Server Rendering
// https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

// Wrapper for Application Global Providers
export function AppProviders({ locale, children }: AppProvidersProps) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider locale={locale}>
        <NuqsAdapter>{children}</NuqsAdapter>
      </I18nProvider>
    </QueryClientProvider>
  );
}
