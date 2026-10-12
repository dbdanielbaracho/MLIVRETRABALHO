import {test} from 'node:test';
import assert from 'node:assert/strict';
import {BadRequestException,ForbiddenException,UnauthorizedException} from '@nestjs/common';
import {ReplacementController} from './replacement.controller';
import type {DatabaseService} from './database.service';
import type {AuthService} from './auth.service';
const ID='11111111-2222-3333-4444-555555555555',PRO='aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',NEW='99999999-8888-7777-6666-555555555555';
function setup(options:{authorized?:boolean;membership?:boolean;role?:string;found?:boolean;original?:boolean;status?:string;candidate?:boolean;available?:boolean;inserted?:boolean;recipient?:boolean;originalProfessionalId?:string;insertedStatus?:string;error?:Error}={}){
 const queries:{sql:string;params:unknown[]}[]=[],contexts:string[]=[],memberships:unknown[][]=[];
 const auth={identityFromAuthorization:async()=>{if(options.authorized===false)throw new UnauthorizedException();return{id:'trusted-identity'};},requireMembership:async(...args:unknown[])=>{memberships.push(args);if(options.membership===false)throw new UnauthorizedException();return{role:options.role??'owner'};}};
 const db={tenant:async(tenant:string,op:(db:unknown)=>Promise<unknown>)=>{contexts.push(tenant);if(options.error)throw options.error;return op({query:async(sql:string,params:unknown[]=[])=>{
 queries.push({sql,params});
 if(sql.startsWith('SELECT assignment_id'))return{rows:options.found===false?[]:[{assignmentId:ID}]};
 if(sql.startsWith('SELECT job_id'))return{rows:options.original===false?[]:[{jobId:NEW,status:options.status??'confirmed',isOriginalProfessional:typeof params[2]==='string'&&params[2].toLowerCase()===(options.originalProfessionalId??ID).toLowerCase()}]};
 if(sql.startsWith('SELECT status'))return{rows:options.found===false?[]:[{status:options.status??'confirmed'}]};
 if(sql.startsWith('SELECT 1 FROM talent_pool_members'))return{rows:options.candidate===false?[]:[{}]};
 if(sql.startsWith('SELECT 1 FROM professional_availability_network'))return{rows:options.available===false?[]:[{}]};
 if(sql.startsWith('INSERT INTO work_assignments'))return{rows:options.inserted===false?[]:[{id:options.originalProfessionalId&&typeof params[2]==='string'&&params[2].toLowerCase()===options.originalProfessionalId.toLowerCase()?ID:NEW,status:options.insertedStatus??'confirmed'}]};
 if(sql.startsWith('SELECT active_tenant_professional_identity'))return{rows:options.recipient===false?[]:[{identityId:'trusted-recipient'}]};
 if(sql.startsWith('INSERT INTO replacement_requests'))return{rows:[{id:NEW,assignmentId:ID,status:'open',reason:params[2]}]};
 return{rows:[]};
 } });}};
 return{controller:new ReplacementController(db as unknown as DatabaseService,auth as unknown as AuthService),queries,contexts,memberships};
}
async function invalidCreate(body:unknown){const h=setup();await assert.rejects(h.controller.create(ID,body as never,'Bearer fixture','trusted-tenant'),(e:unknown)=>e instanceof BadRequestException&&e.message==='replacement_reason_invalid');assert.equal(h.contexts.length,0);}
async function invalidSelect(body:unknown){const h=setup();await assert.rejects(h.controller.select(ID,body as never,'Bearer fixture','trusted-tenant'),(e:unknown)=>e instanceof BadRequestException&&e.message==='professional_required');assert.equal(h.contexts.length,0);}
test('replacement create rejects malformed JSON and non-text reason before SQL',async()=>{
 for(const b of [null,undefined,[],true,42,'text'])await invalidCreate(b);
 for(const reason of [42,true,false,{},[],['Fixture']])await invalidCreate({reason});
});
test('replacement reason remains optional, trims text and preserves existing no-length-limit and upsert',async()=>{
 for(const reason of [undefined,null,'','  ',' Fixture ','x'.repeat(5000)]){
 const h=setup();const row=await h.controller.create(ID,{reason,tenantId:'forged'} as never,'Bearer fixture','trusted-tenant');
 assert.equal(row.reason,typeof reason==='string'?reason.trim()||null:null);assert.equal(row.status,'open');
 assert.deepEqual(h.contexts,['trusted-tenant']);assert.deepEqual(h.memberships,[['trusted-identity','trusted-tenant']]);
 assert.deepEqual(h.queries[0]?.params,[ID,'trusted-tenant']);assert.deepEqual(h.queries[1]?.params,['trusted-tenant',ID,row.reason]);assert.match(h.queries[1]!.sql,/DO UPDATE SET reason=EXCLUDED.reason/);
 }
});
test('replacement select rejects malformed JSON, non-text or malformed professional UUID before SQL',async()=>{
 for(const b of [null,undefined,[],true,42,'text'])await invalidSelect(b);
 for(const professionalId of [undefined,null,true,42,{},[],['Fixture'],'','bad',PRO+'x'])await invalidSelect({professionalId});
});
test('replacement create, select, candidates and auto-match reject malformed path UUID before SQL',async()=>{
 for(const id of ['bad','',ID+'x'])for(const method of ['create','select','candidates','autoMatch']){
 const h=setup(),p=method==='create'?h.controller.create(id,{},'Bearer fixture','trusted-tenant'):method==='select'?h.controller.select(id,{professionalId:PRO},'Bearer fixture','trusted-tenant'):method==='candidates'?h.controller.candidates(id,'Bearer fixture','trusted-tenant'):h.controller.autoMatch(id,'Bearer fixture','trusted-tenant');
 await assert.rejects(p,(e:unknown)=>e instanceof BadRequestException&&e.message===(method==='create'?'assignment_invalid':'replacement_invalid'));assert.equal(h.contexts.length,0);
 }
});
test('replacement auth, tenant and membership precede payload and path validation',async()=>{
 for(const method of ['create','select','candidates','autoMatch']){
 const invoke=(h:ReturnType<typeof setup>,tenant?:string)=>method==='create'?h.controller.create('bad',null as never,undefined,tenant):method==='select'?h.controller.select('bad',null as never,undefined,tenant):method==='candidates'?h.controller.candidates('bad',undefined,tenant):h.controller.autoMatch('bad',undefined,tenant);
 const a=setup({authorized:false});await assert.rejects(invoke(a,'trusted-tenant'),(e:unknown)=>e instanceof UnauthorizedException);assert.equal(a.memberships.length,0);
 const t=setup();await assert.rejects(invoke(t),(e:unknown)=>e instanceof BadRequestException&&e.message==='tenant_required');assert.equal(t.memberships.length,0);
 const m=setup({membership:false});await assert.rejects(invoke(m,'trusted-tenant'),(e:unknown)=>e instanceof UnauthorizedException);assert.equal(m.contexts.length,0);
 }
});
test('replacement maintains company role gate and all four company roles',async()=>{
 const member=setup({role:'member'});await assert.rejects(member.controller.create('bad',null as never,'Bearer fixture','trusted-tenant'),(e:unknown)=>e instanceof ForbiddenException&&e.message==='company_role_required');assert.equal(member.contexts.length,0);
 for(const role of ['owner','admin','manager','company']){const h=setup({role});assert.equal((await h.controller.create(ID,{},'Bearer fixture','trusted-tenant')).status,'open');}
});
test('replacement select retains open request, original status, active candidate and availability before writes',async()=>{
 for(const [options,message] of [[{found:false},'replacement_not_open'],[{original:false},'assignment_not_found'],[{status:'cancelled'},'assignment_not_replaceable'],[{candidate:false},'replacement_candidate_required'],[{available:false},'replacement_candidate_unavailable']] as const){
 const h=setup(options);await assert.rejects(h.controller.select(ID,{professionalId:PRO},'Bearer fixture','trusted-tenant'),(e:unknown)=>e instanceof BadRequestException&&e.message===message);assert.equal(h.queries.filter(q=>/^(INSERT|UPDATE)/.test(q.sql)).length,0);
 }
 const h=setup({inserted:false});await assert.rejects(h.controller.select(ID,{professionalId:PRO},'Bearer fixture','trusted-tenant'),(e:unknown)=>e instanceof BadRequestException&&e.message==='replacement_assignment_failed');assert.equal(h.queries.filter(q=>q.sql.startsWith('UPDATE')).length,0);
});
test('replacement select keeps actual assignment ACK, tenant parameters and DB-resolved notification recipient',async()=>{
 for(const recipient of [false,true]){
 const h=setup({recipient});const result=await h.controller.select(ID,{professionalId:PRO,tenantId:'forged',identityId:'forged'} as never,'Bearer fixture','trusted-tenant');
 assert.deepEqual(result,{replacementRequestId:ID,assignmentId:NEW,replacedAssignmentId:ID,professionalId:PRO,status:'matched'});
 assert.deepEqual(h.contexts,['trusted-tenant']);
 assert.deepEqual(h.queries.find(q=>q.sql.startsWith('INSERT INTO work_assignments'))?.params,['trusted-tenant',NEW,PRO]);
 assert.deepEqual(h.queries.find(q=>q.sql.startsWith('UPDATE work_assignments'))?.params,[ID,'trusted-tenant']);
 assert.deepEqual(h.queries.find(q=>q.sql.startsWith('UPDATE replacement_requests'))?.params,[ID,PRO,'trusted-tenant']);
 const notices=h.queries.filter(q=>q.sql.startsWith('INSERT INTO notifications'));assert.equal(notices.length,recipient?1:0);if(recipient)assert.deepEqual(notices[0]?.params,['trusted-tenant','trusted-recipient']);
 }
});
test('replacement create preserves missing assignment and replaceable status scope',async()=>{
 const missing=setup({found:false});await assert.rejects(missing.controller.create(ID,{},'Bearer fixture','trusted-tenant'),(e:unknown)=>e instanceof BadRequestException&&e.message==='assignment_not_found');assert.equal(missing.queries.length,1);
 for(const status of ['confirmed','checked_in','in_progress']){const h=setup({status});assert.equal((await h.controller.create(ID,{},'Bearer fixture','trusted-tenant')).status,'open');}
 for(const status of ['cancelled','completed']){const h=setup({status});await assert.rejects(h.controller.create(ID,{},'Bearer fixture','trusted-tenant'),(e:unknown)=>e instanceof BadRequestException&&e.message==='assignment_not_replaceable');assert.equal(h.queries.length,1);}
});
test('replacement creation and selection serialize by assignment before locking or writing the request',async()=>{
 const created=setup();await created.controller.create(ID,{},'Bearer fixture','trusted-tenant');
 assert.match(created.queries[0]!.sql,/FOR NO KEY UPDATE$/);assert.ok(created.queries[1]!.sql.startsWith('INSERT INTO replacement_requests'));
 const selected=setup();await selected.controller.select(ID,{professionalId:PRO},'Bearer fixture','trusted-tenant');
 assert.ok(selected.queries[0]!.sql.startsWith('SELECT assignment_id'));assert.doesNotMatch(selected.queries[0]!.sql,/FOR UPDATE/);
 assert.match(selected.queries[1]!.sql,/FROM work_assignments .*FOR NO KEY UPDATE$/);
 assert.match(selected.queries[2]!.sql,/FROM replacement_requests .*status='open' FOR UPDATE$/);
});
test('replacement DB failure propagates without fabricated success',async()=>{
 const error=new Error('fixture unavailable'),h=setup({error});await assert.rejects(h.controller.create(ID,{},'Bearer fixture','trusted-tenant'),(e:unknown)=>e===error);
});

test('replacement cannot select its original professional even when active preferred and available, including equivalent UUID case',async()=>{
 for(const status of ['confirmed','checked_in','in_progress'])for(const professionalId of [PRO,PRO.toUpperCase()]){
  const h=setup({originalProfessionalId:PRO,status});
  await assert.rejects(h.controller.select(ID,{professionalId},'Bearer fixture','trusted-tenant'),
   (e:unknown)=>e instanceof BadRequestException&&e.message==='replacement_candidate_required');
  assert.equal(h.queries.filter(q=>/^(INSERT|UPDATE)/.test(q.sql)).length,0);
  assert.equal(h.queries.some(q=>q.sql.startsWith('SELECT 1 FROM talent_pool_members')),false);
  assert.deepEqual(h.queries[1]?.params,[ID,'trusted-tenant',professionalId]);
 }
});
test('distinct replacement candidate retains exact input and factual ACK while original-state and company authority remain gates',async()=>{
 const input=PRO.toUpperCase(),h=setup({originalProfessionalId:ID});
 const row=await h.controller.select(ID,{professionalId:input},'Bearer fixture','trusted-tenant');
 assert.deepEqual(row,{replacementRequestId:ID,assignmentId:NEW,replacedAssignmentId:ID,professionalId:input,status:'matched'});
 assert.deepEqual(h.queries.find(q=>q.sql.startsWith('INSERT INTO work_assignments'))?.params,['trusted-tenant',NEW,input]);
 const member=setup({role:'professional',originalProfessionalId:PRO});
 await assert.rejects(member.controller.select(ID,{professionalId:PRO},'Bearer fixture','trusted-tenant'),
  (e:unknown)=>e instanceof ForbiddenException&&e.message==='company_role_required');
 assert.equal(member.contexts.length,0);
 for(const status of ['cancelled','completed']){
  const invalid=setup({originalProfessionalId:PRO,status});
  await assert.rejects(invalid.controller.select(ID,{professionalId:PRO},'Bearer fixture','trusted-tenant'),
   (e:unknown)=>e instanceof BadRequestException&&e.message==='assignment_not_replaceable');
  assert.equal(invalid.queries.filter(q=>/^(INSERT|UPDATE)/.test(q.sql)).length,0);
 }
});

test('replacement cannot claim matched with an existing substitute assignment outside confirmed state',async()=>{
 for(const insertedStatus of ['cancelled','completed','checked_in','in_progress','checked_out']){
  const h=setup({insertedStatus});
  await assert.rejects(h.controller.select(ID,{professionalId:PRO},'Bearer fixture','trusted-tenant'),
   (e:unknown)=>e instanceof BadRequestException&&e.message==='replacement_assignment_failed');
  assert.equal(h.queries.filter(q=>q.sql.startsWith('UPDATE')).length,0);
  assert.equal(h.queries.some(q=>q.sql.startsWith('INSERT INTO notifications')),false);
 }
 const h=setup({insertedStatus:'confirmed'});
 assert.deepEqual(await h.controller.select(ID,{professionalId:PRO},'Bearer fixture','trusted-tenant'),
  {replacementRequestId:ID,assignmentId:NEW,replacedAssignmentId:ID,professionalId:PRO,status:'matched'});
});

