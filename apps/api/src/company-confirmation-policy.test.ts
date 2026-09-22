import test from 'node:test';
import assert from 'node:assert/strict';
import { confirmationDecision } from './company-confirmation-policy';

test('creates assignment when none exists',()=>{assert.equal(confirmationDecision(undefined),'create');});
test('returns existing confirmed assignment idempotently',()=>{assert.equal(confirmationDecision('confirmed'),'return_existing');});
test('rejects incompatible existing assignment states',()=>{for(const status of ['checked_in','in_progress','checked_out','completed','cancelled'])assert.equal(confirmationDecision(status),'conflict');});
