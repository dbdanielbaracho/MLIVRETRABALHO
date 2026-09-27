import { describe, expect, it } from 'vitest';
import { parseCorsOrigins } from './cors';

describe('parseCorsOrigins', () => {
  it('keeps CORS disabled when unset', () => {
    expect(parseCorsOrigins()).toEqual([]);
    expect(parseCorsOrigins('   ')).toEqual([]);
  });

  it('accepts explicit unique HTTP/HTTPS origins', () => {
    expect(parseCorsOrigins('https://app.example.com, http://localhost:3000,https://app.example.com')).toEqual([
      'https://app.example.com',
      'http://localhost:3000',
    ]);
  });

  it('rejects wildcard and non-origin values', () => {
    expect(() => parseCorsOrigins('*')).toThrow('cors_wildcard_forbidden');
    expect(() => parseCorsOrigins('javascript:alert(1)')).toThrow('cors_origin_invalid_protocol');
    expect(() => parseCorsOrigins('https://app.example.com/path')).toThrow('cors_origin_must_be_origin_only');
  });
});
