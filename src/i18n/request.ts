import { getRequestConfig } from 'next-intl/server';

import { routing } from './routing';
import { type Locale, type Messages } from './types';

const MESSAGES_FILES_ROUTE = './translations/';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  const messages = (await import(`${MESSAGES_FILES_ROUTE}${locale}.json`)) as { default: Messages };

  return {
    locale,
    messages: messages.default,
  };
});
