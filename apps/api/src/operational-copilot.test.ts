import test from 'node:test';
import assert from 'node:assert/strict';
import { buildOperationalAlerts } from './operational-copilot';

const now = new Date('2026-09-24T12:00:00.000Z');

test('prioritizes open replacement requests', () => {
  const alerts = buildOperationalAlerts([], [{ id: 'r1', assignmentId: 'a1', title: 'Bartender' }], now);
  assert.equal(alerts.length, 1);
  assert.equal(alerts[0]?.kind, 'replacement_open');
  assert.equal(alerts[0]?.priority, 'high');
});

test('flags job starting within 48h without confirmed worker', () => {
  const alerts = buildOperationalAlerts([{ id: 'j1', title: 'Garçom', startsAt: '2026-09-25T12:00:00.000Z', interestCount: 2, confirmedCount: 0, activeCount: 0 }], [], now);
  assert.equal(alerts[0]?.kind, 'job_unstaffed_soon');
  assert.match(alerts[0]?.recommendedAction ?? '', /interessados/i);
});

test('flags open job with no interest outside urgent horizon', () => {
  const alerts = buildOperationalAlerts([{ id: 'j2', title: 'Limpeza', startsAt: '2026-09-30T12:00:00.000Z', interestCount: 0, confirmedCount: 0, activeCount: 0 }], [], now);
  assert.equal(alerts[0]?.kind, 'job_no_interest');
  assert.equal(alerts[0]?.priority, 'medium');
});

test('does not flag staffed job', () => {
  const alerts = buildOperationalAlerts([{ id: 'j3', title: 'Cozinha', startsAt: '2026-09-25T12:00:00.000Z', interestCount: 1, confirmedCount: 1, activeCount: 0 }], [], now);
  assert.deepEqual(alerts, []);
});
