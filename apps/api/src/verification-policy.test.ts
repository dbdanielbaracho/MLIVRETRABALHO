import test from 'node:test';
import assert from 'node:assert/strict';
import { canRetryVerification, verificationAllowsRestrictedAction } from './verification-policy';

test('only verified status passes restricted-action gate',()=>{
  for(const status of [undefined,null,'pending','reviewing','rejected','expired']) assert.equal(verificationAllowsRestrictedAction(status),false);
  assert.equal(verificationAllowsRestrictedAction('verified'),true);
});

test('verification retry is limited to missing rejected or expired cases',()=>{
  assert.equal(canRetryVerification(undefined),true);
  assert.equal(canRetryVerification('rejected'),true);
  assert.equal(canRetryVerification('expired'),true);
  assert.equal(canRetryVerification('pending'),false);
  assert.equal(canRetryVerification('reviewing'),false);
  assert.equal(canRetryVerification('verified'),false);
});
