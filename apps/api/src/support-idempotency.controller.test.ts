import {test} from 'node:test';
import assert from 'node:assert/strict';
import {SupportController} from './support.controller';
import {supportCaseInput} from './support-input';
import {supportRequestDigest} from './support-idempotency';
import type {DatabaseService} from './database.service';
import type {AuthService} from './auth.service';
const assignment='11111111-2222-3333-4444-555555555555',key='aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee';
const body={assignmentId:assignment,category:'schedule',description:' fixture ',priority:'normal'};
const input=supportCaseInput(body);assert.ok(input);const digest=supportRequestDigest(input);
const ack={id:'case',category:'schedule',priority:'normal',status:'open',createdAt:'2026-10-10T12:00:00Z'};
const existing={...ack,status:'reviewing',requestHash:digest};
function fixture(replies:Array<Array<Record<string,unknown>>|Error>,authFailure?:Error){
 const calls:Array<{sql:string;values:unknown[]}>=[],tenants:string[]=[];
 const auth={identityFromAuthorization:async()=>{if(authFailure)throw authFailure;return {id:'authenticated-reporter'};},requireMembership:async()=>({role:'professional'})};
 const db={tenant:async(tenant:string,work:(client:unknown)=>Promise<unknown>)=>{tenants.push(tenant);return work({query:async(sql:string,values:unknown[])=>{calls.push({sql,values});const next=replies.shift();if(next instanceof Error)throw next;if(!next)throw Error('unexpected_query');return {rows:next};}});}};
 return {controller:new SupportController(db as unknown as DatabaseService,auth as unknown as AuthService),calls,tenants};
}
test('new keyed support verifies assignment and binds tenant/reporter/key/hash before insert',async()=>{
 const f=fixture([[],[{id:assignment}],[ack]]);
 assert.deepEqual(await f.controller.create({...body,reporterIdentityId:'injected'},'Bearer fixture','tenant-a',key.toUpperCase()),ack);
 assert.deepEqual(f.tenants,['tenant-a']);const [lookup,check,insert]=f.calls;assert.ok(lookup);assert.ok(check);assert.ok(insert);
 assert.deepEqual(lookup.values,['tenant-a','authenticated-reporter',key]);assert.match(lookup.sql,/tenant_id=\$1 AND reporter_identity_id=\$2 AND request_key=\$3/);
 assert.deepEqual(check.values,['tenant-a',assignment]);
 assert.deepEqual(insert.values,['tenant-a','authenticated-reporter',assignment,'schedule','fixture','normal',key,digest]);assert.match(insert.sql,/ON CONFLICT.*DO NOTHING/);
});
test('replay returns actual current case acknowledgement without overwriting review or requiring assignment still present',async()=>{
 const f=fixture([[existing]]);
 const result=await f.controller.create(body,'Bearer fixture','tenant-a',key);
 assert.deepEqual(result,{...ack,status:'reviewing'});assert.equal(f.calls.length,1);assert.equal(f.calls.some(c=>/INSERT|UPDATE|work_assignments/.test(c.sql)),false);
 assert.equal('requestHash' in result,false);
});
test('same key with a different normalized payload returns conflict without any write',async()=>{
 const f=fixture([[existing]]);
 await assert.rejects(f.controller.create({...body,description:'different'},'Bearer fixture','tenant-a',key),/support_request_key_conflict/);
 assert.equal(f.calls.length,1);assert.equal(f.calls.some(c=>/INSERT|UPDATE/.test(c.sql)),false);
});
test('concurrent unique-key loser reads the committed case rather than creating or resetting another case',async()=>{
 const f=fixture([[],[{id:assignment}],[],[existing]]);
 assert.deepEqual(await f.controller.create(body,'Bearer fixture','tenant-a',key),{...ack,status:'reviewing'});
 assert.equal(f.calls.filter(c=>c.sql.startsWith('INSERT')).length,1);assert.equal(f.calls.some(c=>c.sql.startsWith('UPDATE')),false);
 const read=f.calls[3];assert.ok(read);assert.deepEqual(read.values,['tenant-a','authenticated-reporter',key]);
});
test('invalid supplied key never starts tenant work, with authentication before key validation',async()=>{
 const f=fixture([]);for(const invalid of ['', 'not-a-uuid'])await assert.rejects(f.controller.create(body,'Bearer fixture','tenant-a',invalid),/support_request_key_invalid/);
 assert.equal(f.tenants.length,0);assert.equal(f.calls.length,0);
 const denied=fixture([],Error('unauthorized'));await assert.rejects(denied.controller.create(body,undefined,'tenant-a','bad-key'),/unauthorized/);assert.equal(denied.tenants.length,0);
});
test('missing replay after a lost insert cannot fabricate success or perform compensating writes',async()=>{
 const f=fixture([[],[{id:assignment}],[],[]]);
 await assert.rejects(f.controller.create(body,'Bearer fixture','tenant-a',key),/support_request_replay_missing/);
 assert.equal(f.calls.filter(c=>c.sql.startsWith('INSERT')).length,1);assert.equal(f.calls.some(c=>c.sql.startsWith('UPDATE')),false);
});
test('real database errors remain errors and an unlinked keyed request still needs only lookup plus insert',async()=>{
 const failed=fixture([Error('database_offline')]);await assert.rejects(failed.controller.create(body,'Bearer fixture','tenant-a',key),/database_offline/);
 const f=fixture([[],[ack]]);assert.deepEqual(await f.controller.create({category:'other',description:'unlinked'},'Bearer fixture','tenant-a',key),ack);
 assert.equal(f.calls.length,2);assert.equal(f.calls.some(c=>c.sql.includes('work_assignments')),false);
});
