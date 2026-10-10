import test from 'node:test';
import assert from 'node:assert/strict';
import {teamPlanRequirements} from './team-plan-input';
test('team plan rejects malformed roots, requirements and rows without a TypeError', () => {
  for (const body of [null, undefined, [], 1, 'x', {}, {requirements: null}, {requirements: 1}, {requirements: []}, {requirements: [null]}, {requirements: [[]]}, {requirements: [1]}]) assert.equal(teamPlanRequirements(body), null);
});
test('team plan rejects invalid roles and counts instead of coercing a requirement', () => {
  for (const row of [{role: 1, count: 1}, {role: ' ', count: 1}, {role: 'Bartender', count: '1'}, {role: 'Bartender', count: null}, {role: 'Bartender', count: 0}, {role: 'Bartender', count: -1}, {role: 'Bartender', count: 1.5}, {role: 'Bartender', count: NaN}, {role: 'Bartender', count: Infinity}]) assert.equal(teamPlanRequirements({requirements: [row]}), null);
});
test('team plan preserves valid requirement order, duplicates and existing role trimming', () => {
  const body = {requirements: [{role: ' Bartender ', count: 2, tenantId: 'ignored'}, {role: 'Bartender', count: 1}]};
  assert.deepEqual(teamPlanRequirements(body), [{role: 'Bartender', count: 2}, {role: 'Bartender', count: 1}]);
  assert.equal(body.requirements[0]?.role, ' Bartender ');
});
