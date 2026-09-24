import test from 'node:test';
import assert from 'node:assert/strict';
import { safetyAppealTransition } from './safety-appeal-policy';

test('appeal transitions are idempotent for the same status', () => {
  assert.equal(safetyAppealTransition('submitted', 'submitted'), 'same');
  assert.equal(safetyAppealTransition('reviewing', 'reviewing'), 'same');
});

test('submitted appeal may enter review or receive a human decision', () => {
  for (const next of ['reviewing', 'upheld', 'modified', 'reversed'] as const) {
    assert.equal(safetyAppealTransition('submitted', next), 'allowed');
  }
});

test('reviewing appeal may only move to a terminal human decision', () => {
  for (const next of ['upheld', 'modified', 'reversed'] as const) {
    assert.equal(safetyAppealTransition('reviewing', next), 'allowed');
  }
  assert.equal(safetyAppealTransition('reviewing', 'submitted'), 'conflict');
});

test('terminal appeal decisions cannot be silently reopened', () => {
  for (const current of ['upheld', 'modified', 'reversed'] as const) {
    assert.equal(safetyAppealTransition(current, 'reviewing'), 'conflict');
    assert.equal(safetyAppealTransition(current, 'submitted'), 'conflict');
  }
});
