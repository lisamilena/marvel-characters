import { describe, it, expect } from 'vitest';

import { getLocaleKey } from './utils';

describe('getLocaleKey', () => {
  it('should return the correct key for a given locale', () => {
    expect(getLocaleKey('en-GB')).toBe('enGB');
    expect(getLocaleKey('es-ES')).toBe('esES');
    expect(getLocaleKey('de-DE')).toBe('deDE');
  });

  it('should return undefined for an unsupported locale', () => {
    expect(getLocaleKey('ja-JP')).toBeUndefined();
    expect(getLocaleKey('zh-CN')).toBeUndefined();
    expect(getLocaleKey('')).toBeUndefined();
  });

  it('should handle case sensitivity properly', () => {
    expect(getLocaleKey('EN-GB')).toBeUndefined();
    expect(getLocaleKey('es-es')).toBeUndefined();
  });

  it('should handle unexpected inputs', () => {
    expect(getLocaleKey(null as unknown as string)).toBeUndefined();
    expect(getLocaleKey(undefined as unknown as string)).toBeUndefined();
    expect(getLocaleKey(123 as unknown as string)).toBeUndefined();
  });
});
