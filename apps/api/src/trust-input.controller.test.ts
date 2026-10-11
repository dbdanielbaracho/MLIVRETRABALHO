import {test} from 'node:test';
import assert from 'node:assert/strict';
import {BadRequestException,ForbiddenException,NotFoundException,UnauthorizedException} from '@nestjs/common';
import {TrustEventsController} from './trust-events.controller';
import type {AuthService} from './auth.service';
import type {DatabaseService} from './database.service';
const PRO='aaaaaaaa-1111-2222-3333-444444444444',ASSIGNMENT='bbbbbbbb-1111-2222-3333-444444444444',base={professionalId:PRO,eventType:'incident'};
function setup(options:{authorized?:boolean;membership?:boolean;role?:string;visible?:boolean;assignment?:boolean;assignmentPro?:string;error?:Error}={}){
 const calls:{sql:string;params:unknown[]}[]=[],contexts:string[]=[],authority:string[]=[];
 const auth={identityFromAuthorization:async()=>{authority.push('auth');if(options.authorized===false)throw new UnauthorizedException();return{id:'trusted-reporter'};},requireMembership:async(id:string,t:string)=>{authority.push('membership');assert.equal(id,'trusted-reporter');assert.equal(t,'trusted-tenant');if(options.membership===false)throw new UnauthorizedException();return{role:options.role??'owner'};}};
 const listed=[{id:'actual-event',assignmentId:ASSIGNMENT,eventType:'incident',cause:'company',reportedByIdentityId:'trusted-reporter',occurredAt:'2026-10-11T00:00:00Z',notes:'actual note'}];
 const query=async(sql:string,params:unknown[]=[])=>{calls.push({sql,params});if(options.error)throw options.error;if(sql.startsWith('SELECT 1'))return{rows:options.visible===false?[]:[{exists:1}]};if(sql.startsWith('SELECT professional_id'))return{rows:options.assignment===false?[]:[{professionalId:options.assignmentPro??PRO}]};if(sql.startsWith('SELECT id'))return{rows:listed};return{rows:[{id:'actual-event',eventType:params[3],cause:params[4],reportedByIdentityId:params[5],occurredAt:'2026-10-11T00:00:00Z'}]};};
 const db={tenant:async(t:string,op:(client:unknown)=>Promise<unknown>)=>{contexts.push(t);return op({query});}};
 return{controller:new TrustEventsController(db as unknown as DatabaseService,auth as unknown as AuthService),calls,contexts,authority,listed};
}
const bad=(message:string)=>(e:unknown)=>e instanceof BadRequestException&&e.message===message;
test('trust create rejects non-object JSON without TypeError or real event insertion',async()=>{
 for(const body of [undefined,null,false,true,42,'text',[],{}]){const h=setup();await assert.rejects(h.controller.create(body as never,'Bearer fixture','trusted-tenant'),bad('trust_event_invalid'));assert.equal(h.calls.length,0);}
});
test('trust create rejects malformed professional UUIDs and non-text event types before SQL',async()=>{
 for(const professionalId of [undefined,null,false,42,[],{},[PRO],'','invalid']){const h=setup();await assert.rejects(h.controller.create({...base,professionalId} as never,'Bearer fixture','trusted-tenant'),bad('trust_event_invalid'));assert.equal(h.calls.length,0);}
 for(const eventType of [undefined,null,false,42,[],{},['incident'],'unknown']){const h=setup();await assert.rejects(h.controller.create({...base,eventType} as never,'Bearer fixture','trusted-tenant'),bad('trust_event_invalid'));assert.equal(h.calls.length,0);}
});
test('trust create rejects falsy and non-text causes instead of recording malformed causal attribution',async()=>{
 for(const cause of [false,true,0,42,[],{},['company'],'','automatic_guilt']){const h=setup();await assert.rejects(h.controller.create({...base,cause} as never,'Bearer fixture','trusted-tenant'),bad('trust_cause_invalid'));assert.equal(h.calls.length,0);}
});
test('trust create rejects non-text notes before SQL without coercing event evidence',async()=>{
 for(const notes of [false,true,42,[],{},['text']]){const h=setup();await assert.rejects(h.controller.create({...base,notes} as never,'Bearer fixture','trusted-tenant'),bad('trust_notes_invalid'));assert.equal(h.calls.length,0);}
});
test('trust absence events still require an assignment and malformed optional UUIDs reject before SQL',async()=>{
 for(const eventType of ['no_show','late_arrival'])for(const assignmentId of [undefined,null,'']){const h=setup();await assert.rejects(h.controller.create({...base,eventType,assignmentId} as never,'Bearer fixture','trusted-tenant'),bad('assignment_required'));assert.equal(h.calls.length,0);}
 for(const assignmentId of ['',false,42,[],{},[ASSIGNMENT],'invalid']){const h=setup();await assert.rejects(h.controller.create({...base,assignmentId} as never,'Bearer fixture','trusted-tenant'),bad('trust_assignment_invalid'));assert.equal(h.calls.length,0);}
});
test('trust valid events retain original causal choices nullish defaults notes and trusted real ACK',async()=>{
 for(const eventType of ['no_show','late_arrival','incident','commendation'])for(const cause of [undefined,null,'professional','company','force_majeure','platform','undetermined']){
  const h=setup();const row=await h.controller.create({...base,eventType,cause,assignmentId:ASSIGNMENT,notes:'  fixture evidence  ',tenantId:'spoof',reportedByIdentityId:'spoof'} as never,'Bearer fixture','trusted-tenant');
  assert.deepEqual(h.calls[0]?.params,[PRO]);assert.deepEqual(h.calls[1]?.params,[ASSIGNMENT]);assert.deepEqual(h.calls[2]?.params,['trusted-tenant',ASSIGNMENT,PRO,eventType,cause??'undetermined','trusted-reporter','fixture evidence']);assert.deepEqual(row,{id:'actual-event',eventType,cause:cause??'undetermined',reportedByIdentityId:'trusted-reporter',occurredAt:'2026-10-11T00:00:00Z'});
 }
 for(const notes of [undefined,null,'','  '])for(const assignmentId of [undefined,null]){const h=setup();await h.controller.create({...base,notes,assignmentId} as never,'Bearer fixture','trusted-tenant');assert.deepEqual(h.calls[1]?.params,['trusted-tenant',null,PRO,'incident','undetermined','trusted-reporter',null]);}
});
test('trust list rejects malformed UUID before tenant SQL and retains scoped real rows',async()=>{
 for(const id of ['invalid','',null,false,[PRO]]){const h=setup();await assert.rejects(h.controller.list(id as never,'Bearer fixture','trusted-tenant'),bad('trust_event_invalid'));assert.equal(h.calls.length,0);}
 const h=setup();assert.deepEqual(await h.controller.list(PRO,'Bearer fixture','trusted-tenant'),h.listed);assert.deepEqual(h.calls.map(x=>x.params),[[PRO],[PRO]]);assert.deepEqual(h.contexts,['trusted-tenant']);
});
test('trust JSON and path validation preserve auth tenant membership and company role precedence',async()=>{
 for(const mode of ['create','list'])for(const options of [{authorized:false},{membership:false},{role:'professional'}]){
  const h=setup(options);const op=mode==='create'?h.controller.create(null as never,'Bearer fixture','trusted-tenant'):h.controller.list('invalid','Bearer fixture','trusted-tenant');
  await assert.rejects(op,(e:unknown)=>options.role?e instanceof ForbiddenException&&e.message==='company_role_required':e instanceof UnauthorizedException);assert.equal(h.calls.length,0);
 }
 const h=setup();await assert.rejects(h.controller.create(null as never,'Bearer fixture'),bad('tenant_required'));assert.equal(h.calls.length,0);
 for(const role of ['owner','admin','manager','company']){const h=setup({role});await h.controller.create(base,'Bearer fixture','trusted-tenant');assert.deepEqual(h.contexts,['trusted-tenant']);}
});
test('trust valid UUIDs retain visibility assignment existence and professional relation checks',async()=>{
 for(const mode of ['create','list']){const h=setup({visible:false});await assert.rejects(mode==='create'?h.controller.create(base,'Bearer fixture','trusted-tenant'):h.controller.list(PRO,'Bearer fixture','trusted-tenant'),(e:unknown)=>e instanceof NotFoundException&&e.message==='professional_not_found');assert.equal(h.calls.length,1);}
 for(const [options,message]of [[{assignment:false},'assignment_not_found'],[{assignmentPro:'other-professional'},'assignment_professional_mismatch']] as const){const h=setup(options);await assert.rejects(h.controller.create({...base,assignmentId:ASSIGNMENT},'Bearer fixture','trusted-tenant'),bad(message));assert.equal(h.calls.length,2);}
});
test('trust database failure rejects instead of fabricating a successful event or list',async()=>{
 const error=new Error('database unavailable');for(const mode of ['create','list']){const h=setup({error});await assert.rejects(mode==='create'?h.controller.create(base,'Bearer fixture','trusted-tenant'):h.controller.list(PRO,'Bearer fixture','trusted-tenant'),e=>e===error);}
});
