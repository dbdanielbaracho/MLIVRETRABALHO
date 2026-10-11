import {test} from 'node:test';
import assert from 'node:assert/strict';
import {BadRequestException,ForbiddenException,NotFoundException,UnauthorizedException} from '@nestjs/common';
import {CompanyJobsController} from './company-jobs.controller';
import type {AuthService} from './auth.service';
import type {DatabaseService} from './database.service';
const JOB='aaaaaaaa-1111-2222-3333-444444444444',PRO='bbbbbbbb-1111-2222-3333-444444444444',ASSIGN='cccccccc-1111-2222-3333-444444444444';
function setup(options:{authorized?:boolean;member?:boolean;role?:string;job?:boolean;jobStatus?:string;interest?:boolean;existing?:string;recipient?:boolean;error?:Error}={}){
 const calls:{sql:string;params:unknown[]}[]=[],tenants:string[]=[],authority:string[]=[];
 const auth={identityFromAuthorization:async()=>{authority.push('auth');if(options.authorized===false)throw new UnauthorizedException();return{id:'trusted-company-owner'};},requireMembership:async(id:string,t:string)=>{authority.push('membership');assert.equal(id,'trusted-company-owner');assert.equal(t,'trusted-tenant');if(options.member===false)throw new UnauthorizedException();return{role:options.role??'owner'};}};
 const assignment={id:ASSIGN,jobId:JOB,professionalId:PRO,status:'confirmed',confirmedAt:'2026-10-11T00:00:00Z'};
 const candidate={professionalId:PRO,status:'interested',displayName:'actual fixture professional',homeCity:null,primaryRole:null};
 const query=async(sql:string,params:unknown[]=[])=>{calls.push({sql,params});if(options.error)throw options.error;if(sql.startsWith('SELECT id,status,title'))return{rows:options.job===false?[]:[{id:JOB,status:options.jobStatus??'open',title:'fixture',requiredRole:null,workCity:null}]};if(sql.startsWith('SELECT 1 FROM marketplace_interests'))return{rows:options.interest===false?[]:[{exists:1}]};if(sql.startsWith('SELECT id,job_id'))return{rows:options.existing?[{...assignment,status:options.existing}]:[]};if(sql.startsWith('SELECT active_marketplace_professional_identity'))return{rows:[{identityId:options.recipient===false?null:'trusted-professional-identity'}]};if(sql.startsWith('INSERT INTO work_assignments'))return{rows:[assignment]};if(sql.includes('p.display_name AS'))return{rows:[candidate]};return{rows:[]};};
 const db={tenant:async(t:string,op:(client:unknown)=>Promise<unknown>)=>{tenants.push(t);return op({query});}};
 return{controller:new CompanyJobsController(db as unknown as DatabaseService,auth as unknown as AuthService),calls,tenants,authority,assignment,candidate};
}
const bad=(m:string)=>(e:unknown)=>e instanceof BadRequestException&&e.message===m;
test('company confirmation rejects non-object JSON without TypeError or side effects',async()=>{
 for(const body of [undefined,null,false,true,42,'text',[],{}]){const h=setup();await assert.rejects(h.controller.confirm(JOB,body as never,'Bearer fixture','trusted-tenant'),bad('professional_required'));assert.equal(h.calls.length,0);assert.equal(h.tenants.length,0);}
});
test('company confirmation rejects malformed professional UUIDs and types before SQL',async()=>{
 for(const professionalId of [undefined,null,false,42,[],{},[PRO],'','invalid']){const h=setup();await assert.rejects(h.controller.confirm(JOB,{professionalId} as never,'Bearer fixture','trusted-tenant'),bad('professional_required'));assert.equal(h.calls.length,0);}
});
test('company candidate recommendation and confirmation paths reject malformed job UUIDs before SQL',async()=>{
 for(const mode of ['candidates','recommendations','confirm'])for(const jobId of ['invalid','',null,false,[JOB]]){
  const h=setup();const op=mode==='confirm'?h.controller.confirm(jobId as never,{professionalId:PRO},'Bearer fixture','trusted-tenant'):mode==='candidates'?h.controller.candidates(jobId as never,'Bearer fixture','trusted-tenant'):h.controller.recommendations(jobId as never,'Bearer fixture','trusted-tenant');
  await assert.rejects(op,bad('job_invalid'));assert.equal(h.calls.length,0);
 }
});
test('company malformed confirmation JSON and path preserve auth tenant membership and company role precedence',async()=>{
 for(const options of [{authorized:false},{member:false},{role:'professional'}]){const h=setup(options);await assert.rejects(h.controller.confirm('invalid',null as never,'Bearer fixture','trusted-tenant'),(e:unknown)=>options.role?e instanceof ForbiddenException&&e.message==='company_role_required':e instanceof UnauthorizedException);assert.equal(h.calls.length,0);}
 const h=setup();await assert.rejects(h.controller.confirm('invalid',null as never,'Bearer fixture'),bad('tenant_required'));assert.equal(h.calls.length,0);
 for(const options of [{authorized:false},{member:false},{role:'professional'}]){const h=setup(options);await assert.rejects(h.controller.candidates('invalid','Bearer fixture','trusted-tenant'),(e:unknown)=>options.role?e instanceof ForbiddenException:e instanceof UnauthorizedException);assert.equal(h.calls.length,0);}
});
test('company valid confirmation retains real ACK trusted tenant membership recipient and one notification',async()=>{
 for(const role of ['owner','admin','manager','company']){
  const h=setup({role});const row=await h.controller.confirm(JOB,{professionalId:PRO,tenantId:'spoof',recipientIdentityId:'spoof'} as never,'Bearer fixture','trusted-tenant');
  assert.deepEqual(row,{...h.assignment,tenantId:'trusted-tenant'});assert.deepEqual(h.tenants,['trusted-tenant']);
  assert.deepEqual(h.calls.filter(x=>x.sql.startsWith('INSERT INTO tenant_memberships')).map(x=>x.params),[['trusted-tenant','trusted-professional-identity']]);
  assert.deepEqual(h.calls.filter(x=>x.sql.startsWith('INSERT INTO work_assignments')).map(x=>x.params),[['trusted-tenant',JOB,PRO,'confirmed']]);
  assert.equal(h.calls.filter(x=>x.sql.startsWith('INSERT INTO notifications')).length,1);assert.deepEqual(h.calls.find(x=>x.sql.startsWith('INSERT INTO notifications'))?.params,['trusted-tenant','trusted-professional-identity']);
 }
});
test('company confirmation replay returns exact existing confirmed ACK without recreating assignment membership or notification',async()=>{
 const h=setup({existing:'confirmed'});assert.deepEqual(await h.controller.confirm(JOB,{professionalId:PRO},'Bearer fixture','trusted-tenant'),{...h.assignment,tenantId:'trusted-tenant'});assert.equal(h.calls.some(x=>x.sql.startsWith('INSERT')),false);assert.equal(h.calls.some(x=>x.sql.includes('confirm_marketplace_interest')),false);
});
test('company confirmation retains conflict guard for all progressed or terminal assignment states',async()=>{
 for(const existing of ['checked_in','in_progress','checked_out','completed','cancelled']){const h=setup({existing});await assert.rejects(h.controller.confirm(JOB,{professionalId:PRO},'Bearer fixture','trusted-tenant'),bad('assignment_state_conflict'));assert.equal(h.calls.some(x=>x.sql.startsWith('INSERT')),false);}
});
test('company confirmation retains valid UUID missing job closed job interest and active recipient checks',async()=>{
 const missing=setup({job:false});await assert.rejects(missing.controller.confirm(JOB,{professionalId:PRO},'Bearer fixture','trusted-tenant'),(e:unknown)=>e instanceof NotFoundException&&e.message==='job_not_found');
 for(const [options,message]of [[{jobStatus:'closed'},'job_not_open'],[{interest:false},'job_interest_required'],[{recipient:false},'professional_identity_required']] as const){const h=setup(options);await assert.rejects(h.controller.confirm(JOB,{professionalId:PRO},'Bearer fixture','trusted-tenant'),bad(message));assert.equal(h.calls.some(x=>x.sql.startsWith('INSERT')),false);}
});
test('company candidate and recommendation reads retain real tenant data or empty result without fabricated professionals',async()=>{
 const h=setup();assert.deepEqual(await h.controller.candidates(JOB,'Bearer fixture','trusted-tenant'),[h.candidate]);assert.deepEqual(await h.controller.recommendations(JOB,'Bearer fixture','trusted-tenant'),[]);assert.deepEqual(h.tenants,['trusted-tenant','trusted-tenant']);assert.ok(h.calls.every(x=>x.params[0]===JOB));
});
test('company invalid professional retains payload-before-job priority and database failure cannot fabricate confirmation',async()=>{
 const h=setup();await assert.rejects(h.controller.confirm('invalid',{professionalId:false} as never,'Bearer fixture','trusted-tenant'),bad('professional_required'));assert.equal(h.calls.length,0);
 const error=new Error('database unavailable'),f=setup({error});await assert.rejects(f.controller.confirm(JOB,{professionalId:PRO},'Bearer fixture','trusted-tenant'),e=>e===error);
});
