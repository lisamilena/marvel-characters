const LOCALES = {
  enGB: 'en-GB',
  esES: 'es-ES',
  deDE: 'de-DE',
} as const;

const SUPPORTED_LOCALES = Object.values(LOCALES);

type Messages = Record<string, string>;

type Locale = (typeof LOCALES)[keyof typeof LOCALES];

export type { Locale, Messages };
export { LOCALES, SUPPORTED_LOCALES };
