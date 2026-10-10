import {test} from 'node:test';
import assert from 'node:assert/strict';
import {SupportController} from './support.controller';
import type {DatabaseService} from './database.service';
import type {AuthService} from './auth.service';
const assignmentId='11111111-2222-3333-4444-555555555555';
const body={assignmentId,category:'schedule',description:'  fixture  '};
function fixture(found=true,authorized=true){
 const calls:Array<{sql:string;values:unknown[]}>=[],tenants:string[]=[];
 const auth={identityFromAuthorization:async()=>({id:'reporter'}),requireMembership:async()=>{if(!authorized)throw Error('membership_denied');return {role:'professional'};}};
 const db={tenant:async(tenant:string,work:(client:unknown)=>Promise<unknown>)=>{tenants.push(tenant);return work({query:async(sql:string,values:unknown[])=>{calls.push({sql,values});return {rows:sql.startsWith('SELECT')?(found?[{id:assignmentId}]:[]):[{id:'case',status:'open'}]};}});}};
 return {controller:new SupportController(db as unknown as DatabaseService,auth as unknown as AuthService),calls,tenants};
}
test('support insertion checks the actual assignment in the tenant transaction before writing and binds all parameters',async()=>{
 const f=fixture();assert.deepEqual(await f.controller.create(body,'Bearer fixture','tenant-a'),{id:'case',status:'open'});
 assert.deepEqual(f.tenants,['tenant-a']);assert.equal(f.calls.length,2);
 assert.match(f.calls[0]!.sql,/WHERE tenant_id=\$1 AND id=\$2/);assert.deepEqual(f.calls[0]!.values,['tenant-a',assignmentId]);
 assert.deepEqual(f.calls[1]!.values,['tenant-a','reporter',assignmentId,'schedule','fixture','normal']);
});
test('an assignment hidden by tenant RLS cannot produce a support INSERT or acknowledgement',async()=>{
 const f=fixture(false);await assert.rejects(f.controller.create(body,'Bearer fixture','tenant-b'),/support_assignment_not_found/);
 assert.deepEqual(f.tenants,['tenant-b']);assert.equal(f.calls.length,1);assert.equal(f.calls.some(x=>x.sql.startsWith('INSERT')),false);
});
test('invalid support input and denied membership never start the tenant transaction',async()=>{
 const f=fixture();for(const input of [{...body,assignmentId:' '},{...body,description:'x'.repeat(4001)},null])await assert.rejects(f.controller.create(input,'Bearer fixture','tenant-a'),/support_case_invalid/);
 assert.equal(f.tenants.length,0);assert.equal(f.calls.length,0);
 const denied=fixture(true,false);await assert.rejects(denied.controller.create(body,'Bearer fixture','tenant-a'),/membership_denied/);assert.equal(denied.tenants.length,0);
});
test('a legitimate unlinked request remains allowed without querying an assignment',async()=>{
 const f=fixture();await f.controller.create({category:'other',description:'unlinked'},'Bearer fixture','tenant-a');
 assert.equal(f.calls.length,1);assert.match(f.calls[0]!.sql,/^INSERT/);assert.deepEqual(f.calls[0]!.values,['tenant-a','reporter',null,'other','unlinked','normal']);
});
