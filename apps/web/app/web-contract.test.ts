import test from 'node:test';
import assert from 'node:assert/strict';
import {isAdminRole,isCompanyRole,localDateTimeToIso,reaisToCents,tenantHeaders} from './web-contract.ts';

test('company role visibility does not broaden admin access',()=>{
 for(const role of ['owner','admin']){assert.equal(isCompanyRole(role),true);assert.equal(isAdminRole(role),true);}
 for(const role of ['manager','company']){assert.equal(isCompanyRole(role),true);assert.equal(isAdminRole(role),false);}
 assert.equal(isCompanyRole('professional'),false);
});
test('tenant context is explicit and cannot survive by inference',()=>{
 assert.deepEqual(tenantHeaders('token','tenant-b'),{Authorization:'Bearer token','x-tenant-id':'tenant-b'});
 assert.deepEqual(tenantHeaders('token'),{Authorization:'Bearer token'});
});

test('admin visibility remains deny-by-default for missing role',()=>{
 assert.equal(isAdminRole(undefined),false);
 assert.equal(isAdminRole(''),false);
});

test('form transforms preserve cents and emit absolute timestamps',()=>{
 assert.equal(reaisToCents('123.45'),12345);
 assert.equal(Number.isNaN(reaisToCents('abc')),true);
 assert.match(localDateTimeToIso('2026-09-28T12:00'),/^2026-09-28T\d{2}:00:00\.000Z$/);
 assert.equal(localDateTimeToIso('invalid'),'');
});
