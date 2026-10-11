import {test} from 'node:test';
import assert from 'node:assert/strict';
import {BadRequestException,ForbiddenException,UnauthorizedException} from '@nestjs/common';
import {SafetyCasesController} from './safety-cases.controller';
import type {AuthService} from './auth.service';
import type {DatabaseService} from './database.service';
const ID='abcdefab-2222-3333-4444-555555555555',base={category:'other',description:' fixture '};
function setup(options:{authorized?:boolean;membership?:boolean;role?:string;assignment?:boolean;owner?:string;error?:Error}={}){
 const calls:{sql:string;params:unknown[]}[]=[],contexts:string[]=[],authority:string[]=[];
 const auth={identityFromAuthorization:async()=>{authority.push('auth');if(options.authorized===false)throw new UnauthorizedException();return{id:'trusted-reporter'};},requireMembership:async(id:string,t:string)=>{authority.push('membership');assert.equal(id,'trusted-reporter');assert.equal(t,'trusted-tenant');if(options.membership===false)throw new UnauthorizedException();return{role:options.role??'professional'};}};
 const query=async(sql:string,params:unknown[]=[])=>{calls.push({sql,params});if(options.error)throw options.error;if(sql.startsWith('SELECT p.identity_id'))return{rows:options.assignment===false?[]:[{professionalIdentityId:options.owner??'trusted-reporter'}]};if(sql.startsWith('SELECT role'))return{rows:[{role:options.role??'professional'}]};return{rows:[{id:'actual-case',category:params[3],status:'open',createdAt:'2026-10-11T00:00:00Z'}]};};
 const db={tenant:async(t:string,op:(client:unknown)=>Promise<unknown>)=>{contexts.push(t);return op({query});}};
 return{controller:new SafetyCasesController(db as unknown as DatabaseService,auth as unknown as AuthService),calls,contexts,authority};
}
const bad=(message:string)=>(e:unknown)=>e instanceof BadRequestException&&e.message===message;
test('safety case creation rejects non-object JSON instead of throwing body access TypeError',async()=>{
 for(const body of [undefined,null,false,true,42,'text',[]]){const h=setup();await assert.rejects(h.controller.create(body as never,'Bearer fixture','trusted-tenant'),bad('safety_case_invalid'));assert.equal(h.calls.length,0);assert.equal(h.contexts.length,0);}
});
test('safety case creation rejects non-text blank or overlong descriptions without case insertion',async()=>{
 for(const description of [undefined,null,false,true,42,[],{},['text'],'','  ','x'.repeat(4001)]){const h=setup();await assert.rejects(h.controller.create({...base,description} as never,'Bearer fixture','trusted-tenant'),bad('safety_case_invalid'));assert.equal(h.calls.length,0);}
});
test('safety case creation preserves the original category allowlist and error for non-text categories',async()=>{
 for(const category of [undefined,null,false,42,[],['other'],{},'unknown']){const h=setup();await assert.rejects(h.controller.create({...base,category} as never,'Bearer fixture','trusted-tenant'),bad('safety_case_invalid'));assert.equal(h.calls.length,0);}
});
test('safety case creation rejects malformed assignment UUID and type before SQL',async()=>{
 for(const assignmentId of ['', 'invalid', false,42,{},[],[ID]]){const h=setup();await assert.rejects(h.controller.create({...base,assignmentId} as never,'Bearer fixture','trusted-tenant'),bad('assignment_invalid'));assert.equal(h.calls.length,0);assert.equal(h.contexts.length,0);}
});
test('safety cases without assignment preserve optional null or omitted and trusted reporter tenant with real ACK',async()=>{
 for(const assignmentId of [undefined,null]){const h=setup();const row=await h.controller.create({...base,assignmentId,reporterIdentityId:'spoof',tenantId:'spoof'} as never,'Bearer fixture','trusted-tenant');assert.deepEqual(row,{id:'actual-case',category:'other',status:'open',createdAt:'2026-10-11T00:00:00Z'});assert.deepEqual(h.calls[0]?.params,['trusted-tenant','trusted-reporter',null,'other','fixture']);assert.deepEqual(h.contexts,['trusted-tenant']);}
});
test('safety case creation preserves trimmed 4000-character limit and every original category',async()=>{
 for(const category of ['harassment','violence','fraud','discrimination','unsafe_work','other']){const h=setup();await h.controller.create({category,description:'  '+'x'.repeat(4000)+'  '},'Bearer fixture','trusted-tenant');assert.equal(h.calls[0]?.params[4],'x'.repeat(4000));assert.equal(h.calls[0]?.params[3],category);}
});
test('safety case linked assignment preserves own professional and company ACL and denies unrelated identity',async()=>{
 for(const role of ['professional','owner','admin','manager','company']){const h=setup({role,owner:role==='professional'?'trusted-reporter':'other-professional'});await h.controller.create({...base,assignmentId:ID},'Bearer fixture','trusted-tenant');assert.deepEqual(h.calls[0]?.params,[ID,'trusted-tenant']);assert.deepEqual(h.calls[1]?.params,['trusted-reporter','trusted-tenant']);assert.deepEqual(h.calls[2]?.params,['trusted-tenant','trusted-reporter',ID,'other','fixture']);}
 const h=setup({owner:'other-professional'});await assert.rejects(h.controller.create({...base,assignmentId:ID},'Bearer fixture','trusted-tenant'),(e:unknown)=>e instanceof ForbiddenException&&e.message==='assignment_access_denied');assert.equal(h.calls.length,2);
});
test('safety malformed JSON cannot bypass auth tenant or membership and payload errors precede UUID errors',async()=>{
 const auth=setup({authorized:false});await assert.rejects(auth.controller.create(null as never,undefined,'trusted-tenant'),(e:unknown)=>e instanceof UnauthorizedException);assert.deepEqual(auth.authority,['auth']);assert.equal(auth.calls.length,0);
 const tenant=setup();await assert.rejects(tenant.controller.create(null as never,'Bearer fixture'),bad('tenant_required'));assert.equal(tenant.calls.length,0);
 const member=setup({membership:false});await assert.rejects(member.controller.create(null as never,'Bearer fixture','trusted-tenant'),(e:unknown)=>e instanceof UnauthorizedException);assert.equal(member.calls.length,0);
 const payload=setup();await assert.rejects(payload.controller.create({description:false,assignmentId:'invalid'} as never,'Bearer fixture','trusted-tenant'),bad('safety_case_invalid'));assert.equal(payload.calls.length,0);
});
test('safety missing linked assignment and database failure reject without fabricated case success',async()=>{
 const h=setup({assignment:false});await assert.rejects(h.controller.create({...base,assignmentId:ID},'Bearer fixture','trusted-tenant'),bad('assignment_not_found'));assert.equal(h.calls.length,1);
 const error=new Error('database unavailable'),db=setup({error});await assert.rejects(db.controller.create(base,'Bearer fixture','trusted-tenant'),e=>e===error);
});
