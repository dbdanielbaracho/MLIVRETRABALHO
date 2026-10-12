import {test} from 'node:test';
import assert from 'node:assert/strict';
import {BadRequestException,UnauthorizedException} from '@nestjs/common';
import {CancellationController} from './cancellation.controller';
import type {DatabaseService} from './database.service';
import type {AuthService} from './auth.service';
const ID='11111111-2222-3333-4444-555555555555';
function setup(options:{authorized?:boolean;membership?:boolean;role?:string;professional?:boolean;found?:boolean;status?:string;conflict?:boolean;error?:Error}={}){
 const queries:{sql:string;params:unknown[]}[]=[],contexts:string[]=[],memberships:unknown[][]=[];
 const auth={identityFromAuthorization:async()=>{if(options.authorized===false)throw new UnauthorizedException();return{id:'trusted-identity'};},requireMembership:async(...args:unknown[])=>{memberships.push(args);if(options.membership===false)throw new UnauthorizedException();return{role:options.role??'owner'};}};
 const db={tenant:async(tenant:string,op:(db:unknown)=>Promise<unknown>)=>{contexts.push(tenant);if(options.error)throw options.error;return op({query:async(sql:string,params:unknown[]=[])=>{queries.push({sql,params});if(sql.startsWith('SELECT wa.id'))return{rows:options.found===false?[]:[{id:ID,status:options.status??'confirmed',professionalIdentityId:options.professional?'trusted-identity':'other-professional'}]};if(sql.startsWith('UPDATE work_assignments'))return{rows:options.conflict?[]:[{id:ID,status:'cancelled'}]};return{rows:[]};}});}};
 return{controller:new CancellationController(db as unknown as DatabaseService,auth as unknown as AuthService),queries,contexts,memberships};
}
async function invalid(body:unknown,message='cancellation_reason_required'){const h=setup();await assert.rejects(h.controller.cancel(ID,body as never,'Bearer fixture','trusted-tenant'),(e:unknown)=>e instanceof BadRequestException&&e.message===message);assert.equal(h.contexts.length,0);}
test('cancellation rejects malformed JSON and non-text, blank or oversized reasons before SQL',async()=>{
 for(const body of [null,undefined,[],true,42,'text'])await invalid(body);
 for(const reason of [undefined,null,true,42,{},[],['Fixture'],'','  ','x'.repeat(1001)])await invalid({reason});
});
test('cancellation keeps trimmed maximum reason and authenticated tenant, actor and no-compensation policy',async()=>{
 const h=setup();assert.deepEqual(await h.controller.cancel(ID,{reason:'  '+'x'.repeat(1000)+'  ',tenantId:'forged',initiator_identity_id:'forged'} as never,'Bearer fixture','trusted-tenant'),{id:ID,status:'cancelled',initiatorKind:'company',compensationPolicy:'none_until_fin_risk_policy_approved'});
 assert.deepEqual(h.contexts,['trusted-tenant']);assert.deepEqual(h.memberships,[['trusted-identity','trusted-tenant']]);
 assert.deepEqual(h.queries[0]?.params,['trusted-tenant',ID]);
 assert.deepEqual(h.queries.find(q=>q.sql.startsWith('INSERT INTO assignment_cancellations'))?.params,['trusted-tenant',ID,'trusted-identity','x'.repeat(1000),'company']);
 assert.deepEqual(h.queries.find(q=>q.sql.startsWith('UPDATE work_assignments'))?.params,['trusted-tenant',ID,['confirmed','checked_in']]);
 assert.deepEqual(h.queries.find(q=>q.sql.startsWith('UPDATE replacement_requests'))?.params,['trusted-tenant',ID]);
});
test('cancellation rejects malformed assignment UUID before SQL',async()=>{
 for(const id of ['bad','',ID+'x']){const h=setup();await assert.rejects(h.controller.cancel(id,{reason:'Fixture'},'Bearer fixture','trusted-tenant'),(e:unknown)=>e instanceof BadRequestException&&e.message==='assignment_invalid');assert.equal(h.contexts.length,0);}
});
test('cancellation authentication, tenant and membership precede payload and path validation',async()=>{
 const a=setup({authorized:false});await assert.rejects(a.controller.cancel('bad',null as never,undefined,'trusted-tenant'),(e:unknown)=>e instanceof UnauthorizedException);assert.equal(a.memberships.length,0);assert.equal(a.contexts.length,0);
 const t=setup();await assert.rejects(t.controller.cancel('bad',null as never,'Bearer fixture'),(e:unknown)=>e instanceof BadRequestException&&e.message==='tenant_required');assert.equal(t.memberships.length,0);
 const m=setup({membership:false});await assert.rejects(m.controller.cancel('bad',null as never,'Bearer fixture','trusted-tenant'),(e:unknown)=>e instanceof UnauthorizedException);assert.equal(m.contexts.length,0);
});
test('cancellation preserves own-professional permission, company roles and denied unrelated member',async()=>{
 const own=setup({role:'member',professional:true});const result=await own.controller.cancel(ID,{reason:'Fixture'},'Bearer fixture','trusted-tenant');assert.equal(result.initiatorKind,'professional');assert.equal(own.queries[1]?.params[4],'professional');
 for(const role of ['owner','admin','manager','company']){const h=setup({role});assert.equal((await h.controller.cancel(ID,{reason:'Fixture'},'Bearer fixture','trusted-tenant')).initiatorKind,'company');}
 const other=setup({role:'member'});await assert.rejects(other.controller.cancel(ID,{reason:'Fixture'},'Bearer fixture','trusted-tenant'),(e:unknown)=>e instanceof BadRequestException&&e.message==='cancellation_not_allowed');assert.equal(other.queries.length,1);
});
test('cancellation preserves confirmed and checked_in scope and refuses completed or already cancelled assignments',async()=>{
 for(const status of ['confirmed','checked_in']){const h=setup({status});assert.equal((await h.controller.cancel(ID,{reason:'Fixture'},'Bearer fixture','trusted-tenant')).status,'cancelled');}
 for(const status of ['completed','cancelled','in_progress','no_show']){const h=setup({status});await assert.rejects(h.controller.cancel(ID,{reason:'Fixture'},'Bearer fixture','trusted-tenant'),(e:unknown)=>e instanceof BadRequestException&&e.message==='assignment_not_cancellable');assert.equal(h.queries.length,1);}
});
test('cancellation keeps durable ON CONFLICT record and conditional update conflict without invented ACK',async()=>{
 const h=setup({conflict:true});await assert.rejects(h.controller.cancel(ID,{reason:'Fixture'},'Bearer fixture','trusted-tenant'),(e:unknown)=>e instanceof BadRequestException&&e.message==='cancellation_conflict');
 assert.match(h.queries[1]!.sql,/ON CONFLICT\(assignment_id\) DO NOTHING/);assert.match(h.queries[2]!.sql,/status=ANY\(\$3::text\[\]\)/);assert.equal(h.queries.length,3);
});
test('cancellation locks the assignment before writes and terminally closes only its open replacement request',async()=>{
 const h=setup();await h.controller.cancel(ID,{reason:'Fixture'},'Bearer fixture','trusted-tenant');
 assert.match(h.queries[0]!.sql,/FOR NO KEY UPDATE$/);
 const close=h.queries.find(q=>q.sql.startsWith('UPDATE replacement_requests'));assert.ok(close);
 assert.match(close.sql,/status='cancelled'/);assert.match(close.sql,/resolved_at=COALESCE\(resolved_at,now\(\)\)/);
 assert.match(close.sql,/assignment_id=\$2 AND status='open'/);assert.deepEqual(close.params,['trusted-tenant',ID]);
});
test('cancellation missing assignment retains existing error without writes',async()=>{
 const h=setup({found:false});await assert.rejects(h.controller.cancel(ID,{reason:'Fixture'},'Bearer fixture','trusted-tenant'),(e:unknown)=>e instanceof BadRequestException&&e.message==='assignment_not_found');assert.equal(h.queries.length,1);
});
test('cancellation database error propagates instead of fabricating cancellation',async()=>{
 const error=new Error('fixture DB unavailable'),h=setup({error});await assert.rejects(h.controller.cancel(ID,{reason:'Fixture'},'Bearer fixture','trusted-tenant'),(e:unknown)=>e===error);
});

