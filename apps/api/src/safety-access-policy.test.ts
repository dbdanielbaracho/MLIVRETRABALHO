import test from 'node:test';
import assert from 'node:assert/strict';
import { canAccessAssignmentSafetyCase } from './safety-access-policy';

test('professional can access own assignment safety case',()=>{assert.equal(canAccessAssignmentSafetyCase('p1','p1','professional'),true);});
test('company roles can access assignment safety case',()=>{for(const role of ['owner','admin','manager','company'])assert.equal(canAccessAssignmentSafetyCase('c1','p1',role),true);});
test('unrelated non-company identity is denied',()=>{assert.equal(canAccessAssignmentSafetyCase('x1','p1','professional'),false);assert.equal(canAccessAssignmentSafetyCase('x1','p1',undefined),false);});
