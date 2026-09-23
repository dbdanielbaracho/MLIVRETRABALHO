import test from 'node:test';
import assert from 'node:assert/strict';
import { canRate, isValidRatingScore } from './rating-policy';

test('company roles may rate a professional', () => {
  for (const role of ['owner', 'admin', 'manager', 'company']) assert.equal(canRate('professional', role), true);
  assert.equal(canRate('professional', 'professional'), false);
});

test('only professional may rate a company', () => {
  assert.equal(canRate('company', 'professional'), true);
  for (const role of ['owner', 'admin', 'manager', 'company']) assert.equal(canRate('company', role), false);
});

test('rating score is an integer from 1 to 5', () => {
  for (const score of [1, 2, 3, 4, 5]) assert.equal(isValidRatingScore(score), true);
  for (const score of [0, 6, 1.5, '5', null, undefined]) assert.equal(isValidRatingScore(score), false);
});
