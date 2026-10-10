import {test} from 'node:test';
import assert from 'node:assert/strict';
import {SupportController} from './support.controller';
import type {DatabaseService} from './database.service';
import type {AuthService} from './auth.service';
const assignment='11111111-2222-3333-4444-555555555555';
const body={assignmentId:assignment,category:'schedule',description:'fixture'};
const uuidV4=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
function fixture(rows:unknown[]=[{id:assignment}],failure?:'auth'|'membership'|'database'){
 const events:string[]=[],calls:Array<{sql:string;values:unknown[]}>=[];
 const auth={identityFromAuthorization:async()=>{events.push('auth');if(failure==='auth')throw Error('unauthorized');return {id:'actual-reporter'};},
 requireMembership:async(id:string,tenant:string)=>{events.push('membership:'+id+':'+tenant);if(failure==='membership')throw Error('membership_required');return {role:'professional'};}};
 const db={tenant:async(tenant:string,work:(db:unknown)=>Promise<unknown>)=>{events.push('tenant:'+tenant);return work({query:async(sql:string,values:unknown[])=>{calls.push({sql,values});if(failure==='database')throw Error('database_offline');return {rows};}});}};
 return {controller:new SupportController(db as unknown as DatabaseService,auth as unknown as AuthService),events,calls};
}
test('prepare issues distinct cryptographic UUIDs after checking real tenant assignment, without creating support',async()=>{
 const f=fixture();
 const a=await f.controller.prepare({...body,reporterIdentityId:'injected'},'Bearer fixture','tenant-a');
 const b=await f.controller.prepare(body,'Bearer fixture','tenant-a');
 assert.match(a.requestKey,uuidV4);assert.match(b.requestKey,uuidV4);assert.notEqual(a.requestKey,b.requestKey);
 assert.equal(a.reporterIdentityId,'actual-reporter');assert.deepEqual(Object.keys(a).sort(),['reporterIdentityId','requestKey']);
 assert.deepEqual(f.events.slice(0,3),['auth','membership:actual-reporter:tenant-a','tenant:tenant-a']);
 assert.equal(f.calls.length,2);for(const c of f.calls){assert.deepEqual(c.values,['tenant-a',assignment]);assert.match(c.sql,/^SELECT id FROM work_assignments WHERE tenant_id=\$1 AND id=\$2$/);assert.doesNotMatch(c.sql,/INSERT|UPDATE|DELETE/);}
});
test('unlinked support can prepare a key without accessing a tenant database or writing a case',async()=>{
 const f=fixture();const result=await f.controller.prepare({category:'other',description:'valid general support'},'Bearer fixture','tenant-a');
 assert.match(result.requestKey,uuidV4);assert.equal(result.reporterIdentityId,'actual-reporter');assert.equal(f.calls.length,0);assert.equal(f.events.some(e=>e.startsWith('tenant:')),false);
});
test('authentication precedes membership and payload validation',async()=>{
 const f=fixture([], 'auth');await assert.rejects(f.controller.prepare(null,undefined,'tenant-a'),/unauthorized/);
 assert.deepEqual(f.events,['auth']);assert.equal(f.calls.length,0);
});
test('missing tenant and absent membership cannot issue a key or inspect assignments',async()=>{
 const f=fixture();await assert.rejects(f.controller.prepare(body,'Bearer fixture'),/tenant_required/);assert.deepEqual(f.events,['auth']);
 const denied=fixture([], 'membership');await assert.rejects(denied.controller.prepare(null,'Bearer fixture','tenant-b'),/membership_required/);
 assert.deepEqual(denied.events,['auth','membership:actual-reporter:tenant-b']);assert.equal(denied.calls.length,0);
});
test('invalid body and malformed assignment fail before any database work',async()=>{
 const f=fixture();for(const invalid of [null,{...body,assignmentId:'bad-id'},{...body,description:' '},{...body,description:'x'.repeat(4001)}]){
  await assert.rejects(f.controller.prepare(invalid,'Bearer fixture','tenant-a'),/support_case_invalid/);
 }
 assert.equal(f.calls.length,0);assert.equal(f.events.some(e=>e.startsWith('tenant:')),false);
});
test('missing or cross-tenant assignment cannot prepare an intent',async()=>{
 const f=fixture([]);await assert.rejects(f.controller.prepare(body,'Bearer fixture','tenant-b'),/support_assignment_not_found/);
 const query=f.calls[0];assert.ok(query);assert.deepEqual(query.values,['tenant-b',assignment]);assert.equal(f.calls.length,1);
});
test('real assignment database failure remains an error rather than a generated acknowledgement',async()=>{
 const f=fixture([], 'database');await assert.rejects(f.controller.prepare(body,'Bearer fixture','tenant-a'),/database_offline/);assert.equal(f.calls.length,1);
});
