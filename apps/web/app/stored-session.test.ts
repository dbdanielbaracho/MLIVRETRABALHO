import test from 'node:test';
import assert from 'node:assert/strict';
import {readStoredCompanySession,validateSigninCompanySession} from './stored-session.ts';

const valid={accessToken:'test-token',identity:{id:'user-id',email:'a@example.test'},memberships:[{tenantId:'company-a',role:'company_admin'}]};
test('rejects corrupt browser session without throwing',()=>{
 for(const raw of [null,'','{','null','[]','{}',JSON.stringify({...valid,memberships:null}),JSON.stringify({...valid,identity:null}),JSON.stringify({...valid,accessToken:''}),JSON.stringify({...valid,memberships:[{tenantId:'company-a',role:'professional'}]})]){
  assert.equal(readStoredCompanySession(raw),null);
 }
});
test('accepts only validated enterprise membership and stable session fields',()=>{
 const membershipRoleCandidates=['company_admin','company_owner','admin','owner','company_manager'];
 const role=membershipRoleCandidates.find(x=>readStoredCompanySession(JSON.stringify({...valid,memberships:[{tenantId:'company-a',role:x}]}))!==null);
 assert.ok(role,'existing company role contract must provide a company role');
 const session=readStoredCompanySession(JSON.stringify({...valid,memberships:[{tenantId:'company-a',role,displayName:'Company A'}]}));
 assert.equal(session?.memberships[0]?.tenantId,'company-a');
 assert.equal(session?.identity.id,'user-id');
});

test('rejects duplicate tenant memberships rather than choosing an ambiguous authority',()=>{
  const memberships=[{tenantId:'company-a',role:'owner'},{tenantId:'company-a',role:'manager'}];
  assert.equal(readStoredCompanySession(JSON.stringify({...valid,memberships})),null);
});
test('preserves two distinct authorized companies',()=>{
  const memberships=[{tenantId:'company-a',role:'owner'},{tenantId:'company-b',role:'manager'}];
  const restored=readStoredCompanySession(JSON.stringify({...valid,memberships}));
  assert.deepEqual(restored?.memberships.map(m=>m.tenantId),['company-a','company-b']);
});

test('sign-in response rejects malformed identity, missing memberships and duplicate tenant roles',()=>{
 for(const response of [null,{},[],{...valid,memberships:null},{...valid,identity:null},{...valid,memberships:[null]},{...valid,memberships:[{tenantId:'company-a',role:'owner'},{tenantId:'company-a',role:'manager'}]}]){
  assert.equal(validateSigninCompanySession(response),null);
 }
});
test('sign-in response retains only company memberships when professional memberships coexist',()=>{
 const result=validateSigninCompanySession({...valid,memberships:[{tenantId:'personal',role:'professional'},{tenantId:'company-a',role:'owner'}]});
 assert.deepEqual(result?.memberships.map(m=>m.tenantId),['company-a']);
});

test('sign-in accepts actual API tenant_id wire memberships and returns canonical tab session',()=>{
 const result=validateSigninCompanySession({...valid,memberships:[{tenant_id:'company-a',role:'owner'}]});
 assert.deepEqual(result,{accessToken:valid.accessToken,identity:valid.identity,memberships:[{tenantId:'company-a',role:'owner'}]});
});
test('sign-in wire adaptation preserves company filtering and rejects duplicate authority across aliases',()=>{
 const result=validateSigninCompanySession({...valid,memberships:[{tenant_id:'personal',role:'professional'},{tenant_id:'company-a',role:'owner'},{tenantId:'company-b',role:'manager'}]});
 assert.deepEqual(result?.memberships.map(x=>x.tenantId),['company-a','company-b']);
 assert.equal(validateSigninCompanySession({...valid,memberships:[{tenant_id:'company-a',role:'owner'},{tenantId:'company-a',role:'manager'}]}),null);
});
test('sign-in rejects conflicting or malformed wire aliases rather than selecting a tenant authority',()=>{
 for(const memberships of [[{tenantId:'company-a',tenant_id:'company-b',role:'owner'}],[{tenantId:'company-a',tenant_id:42,role:'owner'}],[{tenant_id:' ',role:'owner'}],[{tenant_id:null,role:'owner'}]]){
  assert.equal(validateSigninCompanySession({...valid,memberships}),null);
 }
 const result=validateSigninCompanySession({...valid,memberships:[{tenantId:'company-a',tenant_id:'company-a',role:'owner'}]});
 assert.equal(result?.memberships[0]?.tenantId,'company-a');
});
test('wire sign-in adaptation does not broaden canonical stored-session restoration',()=>{
 assert.equal(readStoredCompanySession(JSON.stringify({...valid,memberships:[{tenant_id:'company-a',role:'owner'}]})),null);
 const canonical=validateSigninCompanySession({...valid,memberships:[{tenant_id:'company-a',role:'owner'}]});
 assert.ok(canonical);
 assert.deepEqual(readStoredCompanySession(JSON.stringify(canonical)),canonical);
});
