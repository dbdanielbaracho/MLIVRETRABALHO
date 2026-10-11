import {test} from 'node:test';
import assert from 'node:assert/strict';
import {BadRequestException,ForbiddenException,UnauthorizedException} from '@nestjs/common';
import {IntegrityController} from './integrity.controller';
import type {AuthService} from './auth.service';
import type {DatabaseService} from './database.service';
const ASSIGN='aaaaaaaa-1111-2222-3333-444444444444',CASE='bbbbbbbb-1111-2222-3333-444444444444',base={assignmentId:ASSIGN,kind:'other',evidence:' fixture evidence '},review={decision:'needs_more_info',note:' fixture note '};
function setup(options:{authorized?:boolean;membership?:boolean;role?:string;assignment?:boolean;open?:boolean;error?:Error}={}){
 const calls:{sql:string;params:unknown[]}[]=[],tenants:string[]=[],authority:string[]=[];
 const auth={identityFromAuthorization:async()=>{authority.push('auth');if(options.authorized===false)throw new UnauthorizedException();return{id:'trusted-admin'};},requireMembership:async(id:string,t:string)=>{authority.push('membership');assert.equal(id,'trusted-admin');assert.equal(t,'trusted-tenant');if(options.membership===false)throw new UnauthorizedException();return{role:options.role??'owner'};}};
 const listed=[{id:CASE,kind:'other',evidence:'actual evidence',status:'open',reviewNote:null,createdAt:'2026-10-11T00:00:00Z',reviewedAt:null}];
 const query=async(sql:string,params:unknown[]=[])=>{calls.push({sql,params});if(options.error)throw options.error;if(sql.startsWith('SELECT 1'))return{rows:options.assignment===false?[]:[{exists:1}]};if(sql.startsWith('SELECT id'))return{rows:listed};if(sql.startsWith('UPDATE'))return{rows:options.open===false?[]:[{id:CASE,status:params[2],reviewNote:params[3],reviewedAt:'2026-10-11T00:00:01Z'}]};return{rows:[{id:CASE,kind:params[2],status:'open',createdAt:'2026-10-11T00:00:00Z'}]};};
 const db={tenant:async(t:string,op:(client:unknown)=>Promise<unknown>)=>{tenants.push(t);return op({query});}};
 return{controller:new IntegrityController(db as unknown as DatabaseService,auth as unknown as AuthService),calls,tenants,authority,listed};
}
const bad=(message:string)=>(e:unknown)=>e instanceof BadRequestException&&e.message===message;
test('integrity create rejects non-object JSON without TypeError or case insertion',async()=>{
 for(const body of [undefined,null,false,true,42,'text',[],{}]){const h=setup();await assert.rejects(h.controller.create(body as never,'Bearer fixture','trusted-tenant'),bad('integrity_case_invalid'));assert.equal(h.calls.length,0);}
});
test('integrity create rejects malformed assignment UUID kind and non-text evidence before SQL',async()=>{
 for(const assignmentId of [undefined,null,false,42,[],{},[ASSIGN],'','invalid']){const h=setup();await assert.rejects(h.controller.create({...base,assignmentId} as never,'Bearer fixture','trusted-tenant'),bad('integrity_case_invalid'));assert.equal(h.calls.length,0);}
 for(const kind of [undefined,null,false,42,[],{},['other'],'unknown']){const h=setup();await assert.rejects(h.controller.create({...base,kind} as never,'Bearer fixture','trusted-tenant'),bad('integrity_case_invalid'));assert.equal(h.calls.length,0);}
 for(const evidence of [undefined,null,false,42,[],{},['text'],'','  ']){const h=setup();await assert.rejects(h.controller.create({...base,evidence} as never,'Bearer fixture','trusted-tenant'),bad('integrity_case_invalid'));assert.equal(h.calls.length,0);}
});
test('integrity create retains kinds trimmed evidence actual ACK and trusted admin tenant',async()=>{
 for(const kind of ['suspected_bypass','contact_exchange','other']){const h=setup();const row=await h.controller.create({...base,kind,tenantId:'spoof',createdByIdentityId:'spoof'} as never,'Bearer fixture','trusted-tenant');assert.deepEqual(h.calls[0]?.params,['trusted-tenant',ASSIGN]);assert.deepEqual(h.calls[1]?.params,['trusted-tenant',ASSIGN,kind,'fixture evidence','trusted-admin']);assert.deepEqual(row,{id:CASE,kind,status:'open',createdAt:'2026-10-11T00:00:00Z'});}
});
test('integrity create preserves scoped assignment visibility failure without insertion',async()=>{
 const h=setup({assignment:false});await assert.rejects(h.controller.create(base,'Bearer fixture','trusted-tenant'),bad('assignment_not_found'));assert.equal(h.calls.length,1);
});
test('integrity review rejects non-object JSON and non-text decision or note without changing case',async()=>{
 for(const body of [undefined,null,false,true,42,'text',[],{}]){const h=setup();await assert.rejects(h.controller.review(CASE,body as never,'Bearer fixture','trusted-tenant'),bad('review_invalid'));assert.equal(h.calls.length,0);}
 for(const decision of [undefined,null,false,42,[],{},['substantiated'],'unknown']){const h=setup();await assert.rejects(h.controller.review(CASE,{...review,decision} as never,'Bearer fixture','trusted-tenant'),bad('review_invalid'));assert.equal(h.calls.length,0);}
 for(const note of [undefined,null,false,42,[],{},['text'],'','  ']){const h=setup();await assert.rejects(h.controller.review(CASE,{...review,note} as never,'Bearer fixture','trusted-tenant'),bad('review_invalid'));assert.equal(h.calls.length,0);}
});
test('integrity review rejects malformed UUID before SQL but preserves missing or closed case error',async()=>{
 for(const id of ['invalid','',null,false,[CASE]]){const h=setup();await assert.rejects(h.controller.review(id as never,review,'Bearer fixture','trusted-tenant'),bad('review_invalid'));assert.equal(h.calls.length,0);}
 const h=setup({open:false});await assert.rejects(h.controller.review(CASE,review,'Bearer fixture','trusted-tenant'),bad('integrity_case_not_open'));assert.equal(h.calls.length,1);
});
test('integrity review preserves existing human decisions trimmed notes trusted actor and real dates',async()=>{
 for(const decision of ['substantiated','unsubstantiated','needs_more_info']){const h=setup();const row=await h.controller.review(CASE,{...review,decision,reviewedByIdentityId:'spoof'} as never,'Bearer fixture','trusted-tenant');assert.deepEqual(h.calls[0]?.params,['trusted-tenant',CASE,decision,'fixture note','trusted-admin','open','needs_more_info']);assert.deepEqual(row,{id:CASE,status:decision,reviewNote:'fixture note',reviewedAt:'2026-10-11T00:00:01Z'});}
});
test('integrity malformed JSON and UUID preserve auth tenant membership and owner admin only precedence',async()=>{
 for(const mode of ['create','review'])for(const options of [{authorized:false},{membership:false},{role:'manager'},{role:'company'},{role:'professional'}]){
  const h=setup(options);await assert.rejects(mode==='create'?h.controller.create(null as never,'Bearer fixture','trusted-tenant'):h.controller.review('invalid',null as never,'Bearer fixture','trusted-tenant'),(e:unknown)=>options.role?e instanceof ForbiddenException&&e.message==='admin_required':e instanceof UnauthorizedException);assert.equal(h.calls.length,0);
 }
 const h=setup();await assert.rejects(h.controller.create(null as never,'Bearer fixture'),bad('tenant_required'));assert.equal(h.calls.length,0);
 for(const role of ['owner','admin']){const h=setup({role});await h.controller.create(base,'Bearer fixture','trusted-tenant');assert.deepEqual(h.tenants,['trusted-tenant']);}
});
test('integrity list preserves scoped real records and original admin authority',async()=>{
 const h=setup();assert.deepEqual(await h.controller.list('Bearer fixture','trusted-tenant'),h.listed);assert.deepEqual(h.calls[0]?.params,['trusted-tenant']);assert.deepEqual(h.tenants,['trusted-tenant']);
});
test('integrity database failure rejects without fabricated case or review success',async()=>{
 const error=new Error('database unavailable');for(const mode of ['create','review']){const h=setup({error});await assert.rejects(mode==='create'?h.controller.create(base,'Bearer fixture','trusted-tenant'):h.controller.review(CASE,review,'Bearer fixture','trusted-tenant'),e=>e===error);}
});
