import test from 'node:test';
import assert from 'node:assert/strict';
import {isAdminRole,isCompanyRole,tenantHeaders} from './web-contract.ts';

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
