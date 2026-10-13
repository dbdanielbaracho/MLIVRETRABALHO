import test from 'node:test';
import assert from 'node:assert/strict';
import {isAdminRole,isCompanyRole,localDateTimeToIso,reaisToCents,tenantHeaders,validateCompanyJobPreflight} from './web-contract.ts';

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

test('job payment cents reject missing, negative, overprecision and unsafe values',()=>{
 for(const value of [null,'',' ','-1','1.234','1e3','1,50','90071992547410.00'])assert.equal(Number.isNaN(reaisToCents(value)),true);
 assert.equal(reaisToCents('0'),0);
 assert.equal(reaisToCents('0.01'),1);
 assert.equal(reaisToCents('12.3'),1230);
 assert.equal(reaisToCents('123456.78'),12345678);
});

test('job schedule rejects impossible or normalized wall-clock values',()=>{
 for(const raw of [null,'','2026-02-30T12:00','2026-13-01T09:00','2026-09-31T09:00','2026-09-28T24:00','2026-09-28T12:60','2026-09-28','2026-09-28T12:00Z']){
  assert.equal(localDateTimeToIso(raw),'',String(raw));
 }
 assert.notEqual(localDateTimeToIso('2028-02-29T12:00'),'');
 assert.equal(localDateTimeToIso('2027-02-29T12:00'),'');
});

test('company job preflight rejects invalid shift and pay before transport',()=>{
 const valid={startsAt:'2026-10-13T09:00:00.000Z',endsAt:'2026-10-13T17:00:00.000Z',payCents:12345};
 assert.equal(validateCompanyJobPreflight(valid),null);
 for(const payCents of [NaN,Infinity,-1,1.5])assert.match(validateCompanyJobPreflight({...valid,payCents})||'',/valor válido/);
 for(const times of [{startsAt:'',endsAt:valid.endsAt},{startsAt:'invalid',endsAt:valid.endsAt},{startsAt:valid.endsAt,endsAt:valid.startsAt},{startsAt:valid.startsAt,endsAt:valid.startsAt}]){
  assert.notEqual(validateCompanyJobPreflight({...valid,...times}),null);
 }
});
