import test from 'node:test';
import assert from 'node:assert/strict';
import {readStoredCompanySession} from './stored-session';

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
