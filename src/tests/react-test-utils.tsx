/* eslint-disable import/export */
import { type ReactElement } from 'react';

import { render, type RenderOptions } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

import enGBMessages from '@/i18n/translations/en-GB.json';

/**
 * react-test-utils.tsx
 *
 * This file provides a custom `render` function for React Testing Library,
 * wrapping components with necessary providers or any other global dependencies required.
 *
 * Usage:
 * Instead of importing `render` from `@testing-library/react`, import from this file:
 *
 * ```tsx
 * import { render, screen } from 'src/test/react-test-utils';
 * ```
 */
const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'>) =>
  render(ui, {
    wrapper: ({ children }) => (
      <>
        <NextIntlClientProvider locale="en-EN" messages={enGBMessages}>
          {children}
        </NextIntlClientProvider>
      </>
    ),
    ...options,
  });

export * from '@testing-library/react';
export { customRender as render };
export { default as userEvent } from '@testing-library/user-event';
