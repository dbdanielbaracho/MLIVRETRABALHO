import test from 'node:test';
import assert from 'node:assert/strict';
import { parseCorsOrigins } from './cors';

test('CORS stays disabled when unset', () => {
  assert.deepEqual(parseCorsOrigins(), []);
  assert.deepEqual(parseCorsOrigins('   '), []);
});

test('CORS accepts explicit unique HTTP/HTTPS origins', () => {
  assert.deepEqual(
    parseCorsOrigins('https://app.example.com, http://localhost:3000,https://app.example.com'),
    ['https://app.example.com', 'http://localhost:3000'],
  );
});

test('CORS rejects wildcard and non-origin values', () => {
  assert.throws(() => parseCorsOrigins('*'), /cors_wildcard_forbidden/);
  assert.throws(() => parseCorsOrigins('javascript:alert(1)'), /cors_origin_invalid_protocol/);
  assert.throws(() => parseCorsOrigins('https://app.example.com/path'), /cors_origin_must_be_origin_only/);
});
