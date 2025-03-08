import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

import { LOCALES, SUPPORTED_LOCALES } from './types';

const routing = defineRouting({
  locales: SUPPORTED_LOCALES,
  defaultLocale: LOCALES.enGB,
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);

export { getPathname, Link, redirect, routing, usePathname, useRouter };
