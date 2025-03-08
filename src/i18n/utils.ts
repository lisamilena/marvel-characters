import { LOCALES } from './types';

// Get LOCALES key from string literal Ex.: 'en-GB' will return enGB
export const getLocaleKey = (locale: string) => {
  return Object.keys(LOCALES).find((key) => LOCALES[key as keyof typeof LOCALES] === locale) as
    | keyof typeof LOCALES
    | undefined;
};
