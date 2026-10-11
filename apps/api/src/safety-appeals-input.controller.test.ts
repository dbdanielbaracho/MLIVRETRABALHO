import {test} from 'node:test';
import assert from 'node:assert/strict';
import {BadRequestException,ConflictException,ForbiddenException,NotFoundException,UnauthorizedException} from '@nestjs/common';
import {SafetyAppealsController,SafetyAppealsAdminController} from './safety-appeals.controller';
import type {DatabaseService} from './database.service';
import type {AuthService} from './auth.service';
const ID='11111111-2222-3333-4444-555555555555';
const statuses=['submitted','reviewing','upheld','modified','reversed'];
function setup(options:{authorized?:boolean;membership?:boolean;role?:string;found?:boolean;related?:boolean;inserted?:boolean;current?:string;error?:Error}={}){
 const queries:{sql:string;params:unknown[]}[]=[],contexts:string[]=[],memberships:unknown[][]=[];
 const existing={id:ID,safetyCaseId:ID,reason:'Original database reason',createdAt:'2026-10-11T00:00:00Z',status:options.current??'submitted'};
 const event={id:'database-event',actorIdentityId:'trusted-identity',fromStatus:'submitted',toStatus:'reviewing',note:null,createdAt:'2026-10-11T00:01:00Z'};
 const auth={identityFromAuthorization:async()=>{if(options.authorized===false)throw new UnauthorizedException();return {id:'trusted-identity'};},requireMembership:async(...args:unknown[])=>{memberships.push(args);if(options.membership===false)throw new UnauthorizedException();return {role:options.role??'owner'};}};
 const db={tenant:async(tenant:string,op:(db:unknown)=>Promise<unknown>)=>{contexts.push(tenant);if(options.error)throw options.error;return op({query:async(sql:string,params:unknown[]=[])=>{
  queries.push({sql,params});
  if(sql.startsWith('SELECT sc.id'))return {rows:options.found===false?[]:[{id:ID,reporterIdentityId:options.related===false?'other-reporter':'trusted-identity',professionalIdentityId:options.related===false?'other-professional':'trusted-identity'}]};
  if(sql.startsWith('INSERT INTO safety_case_appeals'))return {rows:options.inserted===false?[]:[{...existing,reason:params[3]}]};
  if(sql.startsWith('SELECT a.id'))return {rows:[existing]};
  if(sql.startsWith('SELECT id FROM safety_case_appeals'))return {rows:options.found===false?[]:[{id:ID}]};
  if(sql.startsWith('SELECT COALESCE'))return {rows:[{status:options.current??'submitted'}]};
  if(sql.startsWith('SELECT id,')&&sql.includes('actor_identity_id'))return {rows:[event]};
  return {rows:[]};
 } });}};
 return {controller:new SafetyAppealsController(db as unknown as DatabaseService,auth as unknown as AuthService),admin:new SafetyAppealsAdminController(db as unknown as DatabaseService,auth as unknown as AuthService),queries,contexts,memberships,existing,event};
}
async function invalidCreate(body:unknown){const h=setup();await assert.rejects(h.controller.create(body as never,'Bearer fixture','trusted-tenant'),(e:unknown)=>e instanceof BadRequestException&&e.message==='safety_appeal_invalid');assert.equal(h.contexts.length,0);}
async function invalidReview(body:unknown,message='safety_appeal_status_invalid'){const h=setup();await assert.rejects(h.admin.status(ID,body as never,'Bearer fixture','trusted-tenant'),(e:unknown)=>e instanceof BadRequestException&&e.message===message);assert.equal(h.contexts.length,0);}
test('appeal creation rejects non-object JSON, non-text reason and malformed case UUID before SQL',async()=>{
 for(const b of [null,undefined,[],true,42,'text'])await invalidCreate(b);
 for(const reason of [null,undefined,true,42,{},[],['reason'],'','  ','x'.repeat(4001)])await invalidCreate({safetyCaseId:ID,reason});
 for(const safetyCaseId of [null,undefined,true,42,{},[],ID+'x','bad',''])await invalidCreate({safetyCaseId,reason:'Fixture reason'});
});
test('appeal creation preserves trimmed reason limit and trusted identity, tenant and real case',async()=>{
 const h=setup({role:'member'});const result=await h.controller.create({safetyCaseId:ID,reason:'  '+'x'.repeat(4000)+'  ',tenantId:'forged',appellantIdentityId:'forged'} as never,'Bearer fixture','trusted-tenant');
 assert.equal(result.created,true);assert.equal(result.status,'submitted');assert.equal(result.id,ID);
 assert.deepEqual(h.contexts,['trusted-tenant']);assert.deepEqual(h.memberships,[['trusted-identity','trusted-tenant']]);
 assert.deepEqual(h.queries.find(q=>q.sql.startsWith('INSERT INTO safety_case_appeals'))!.params,['trusted-tenant',ID,'trusted-identity','x'.repeat(4000)]);
});
test('appeal retries return existing database reason and latest status without replacing original appeal',async()=>{
 const h=setup({inserted:false,current:'modified'});const result=await h.controller.create({safetyCaseId:ID,reason:'Retry reason'},'Bearer fixture','trusted-tenant');
 assert.deepEqual(result,{...h.existing,created:false});assert.equal(h.queries.filter(q=>/UPDATE|DELETE/.test(q.sql)).length,0);
 assert.deepEqual(h.queries.at(-1)!.params,[ID,'trusted-identity','trusted-tenant']);
});
test('appeal creation maintains related-person ACL, owner/admin override and missing case 404',async()=>{
 const denied=setup({role:'member',related:false});await assert.rejects(denied.controller.create({safetyCaseId:ID,reason:'Fixture'},'Bearer fixture','trusted-tenant'),(e:unknown)=>e instanceof ForbiddenException&&e.message==='safety_appeal_access_denied');assert.equal(denied.queries.length,1);
 for(const role of ['owner','admin']){const h=setup({role,related:false});assert.equal((await h.controller.create({safetyCaseId:ID,reason:'Fixture'},'Bearer fixture','trusted-tenant')).created,true);}
 const missing=setup({found:false});await assert.rejects(missing.controller.create({safetyCaseId:ID,reason:'Fixture'},'Bearer fixture','trusted-tenant'),(e:unknown)=>e instanceof NotFoundException);assert.equal(missing.queries.length,1);
});
test('appeal authentication, tenant and membership precede creation or review payload validation',async()=>{
 for(const operation of ['create','status','events']){
  const invoke=(h:ReturnType<typeof setup>,tenant?:string)=>operation==='create'?h.controller.create(null as never,undefined,tenant):operation==='status'?h.admin.status('bad',null as never,undefined,tenant):h.admin.events('bad',undefined,tenant);
  const a=setup({authorized:false});await assert.rejects(invoke(a,'trusted-tenant'),(e:unknown)=>e instanceof UnauthorizedException);assert.equal(a.memberships.length,0);assert.equal(a.contexts.length,0);
  const t=setup();await assert.rejects(invoke(t),(e:unknown)=>e instanceof BadRequestException&&e.message==='tenant_required');assert.equal(t.memberships.length,0);
  const m=setup({membership:false});await assert.rejects(invoke(m,'trusted-tenant'),(e:unknown)=>e instanceof UnauthorizedException);assert.equal(m.contexts.length,0);
 }
});
test('appeal review preserves owner/admin requirement before malformed input and event reads',async()=>{
 for(const write of [false,true]){const h=setup({role:'member'});await assert.rejects(write?h.admin.status('bad',null as never,'Bearer fixture','trusted-tenant'):h.admin.events('bad','Bearer fixture','trusted-tenant'),(e:unknown)=>e instanceof ForbiddenException&&e.message==='safety_admin_required');assert.equal(h.contexts.length,0);}
});
test('appeal review rejects non-object JSON and non-text or unknown status before SQL',async()=>{
 for(const b of [null,undefined,[],true,42,'text'])await invalidReview(b);
 for(const status of [null,undefined,true,42,{},[],['reviewing'],'invalid',' Reviewing '])await invalidReview({status});
});
test('appeal review rejects non-text optional note and retains trimmed UTF16 limit and status priority',async()=>{
 for(const note of [42,true,false,{},[],['Fixture'],'x'.repeat(2001)])await invalidReview({status:'reviewing',note},'safety_appeal_note_invalid');
 await invalidReview({status:'invalid',note:42});
 const h=setup();await h.admin.status(ID,{status:'reviewing',note:'  '+'x'.repeat(2000)+'  '},'Bearer fixture','trusted-tenant');assert.equal(h.queries.at(-1)!.params[5],'x'.repeat(2000));
});
test('appeal review and events reject malformed appeal UUID before advisory lock or SQL',async()=>{
 for(const id of ['bad','',ID+'x'])for(const write of [false,true]){const h=setup();await assert.rejects(write?h.admin.status(id,{status:'reviewing'},'Bearer fixture','trusted-tenant'):h.admin.events(id,'Bearer fixture','trusted-tenant'),(e:unknown)=>e instanceof BadRequestException&&e.message==='safety_appeal_invalid');assert.equal(h.contexts.length,0);}
});
test('appeal optional notes remain null for omitted, null, empty or whitespace and trim textual notes',async()=>{
 for(const role of ['owner','admin'])for(const note of [undefined,null,'','  ',' Fixture ']){
  const h=setup({role});const result=await h.admin.status(ID,{status:'reviewing',note,actorIdentityId:'forged',tenantId:'forged'} as never,'Bearer fixture','trusted-tenant');
  assert.deepEqual(result,{id:ID,status:'reviewing',changed:true});assert.deepEqual(h.contexts,['trusted-tenant']);
  assert.deepEqual(h.queries[0],{sql:'SELECT pg_advisory_xact_lock(hashtext($1))',params:[ID]});
  assert.deepEqual(h.queries.at(-1)!.params,['trusted-tenant',ID,'trusted-identity','submitted','reviewing',typeof note==='string'?note.trim()||null:null]);
 }
});
test('appeal all transition pairs retain same idempotence and conflict policy after advisory serialization',async()=>{
 for(const current of statuses)for(const next of statuses){
  const h=setup({current});const operation=h.admin.status(ID,{status:next},'Bearer fixture','trusted-tenant');
  const allowed=current==='submitted'&&next!=='submitted'||current==='reviewing'&&['upheld','modified','reversed'].includes(next);
  if(current===next)assert.deepEqual(await operation,{id:ID,status:current,changed:false});
  else if(allowed)assert.deepEqual(await operation,{id:ID,status:next,changed:true});
  else await assert.rejects(operation,(e:unknown)=>e instanceof ConflictException&&e.message==='safety_appeal_transition_invalid');
  const lock=h.queries[0];assert.ok(lock);assert.equal(lock.sql,'SELECT pg_advisory_xact_lock(hashtext($1))');
  assert.equal(h.queries.filter(q=>q.sql.startsWith('INSERT INTO safety_case_appeal_events')).length,current!==next&&allowed?1:0);
 }
});
test('appeal review and event reads preserve tenant-filtered real events and missing appeal 404',async()=>{
 const h=setup();assert.deepEqual(await h.admin.events(ID,'Bearer fixture','trusted-tenant'),[h.event]);for(const q of h.queries)assert.deepEqual(q.params,[ID,'trusted-tenant']);
 for(const write of [false,true]){const m=setup({found:false});await assert.rejects(write?m.admin.status(ID,{status:'reviewing'},'Bearer fixture','trusted-tenant'):m.admin.events(ID,'Bearer fixture','trusted-tenant'),(e:unknown)=>e instanceof NotFoundException&&e.message==='safety_appeal_not_found');assert.equal(m.queries.filter(q=>q.sql.startsWith('INSERT')).length,0);}
});
test('appeal database failures propagate instead of fabricating successful create or review',async()=>{
 for(const write of [false,true]){const error=new Error('database fixture unavailable'),h=setup({error});await assert.rejects(write?h.admin.status(ID,{status:'reviewing'},'Bearer fixture','trusted-tenant'):h.controller.create({safetyCaseId:ID,reason:'Fixture'},'Bearer fixture','trusted-tenant'),(e:unknown)=>e===error);}
});
