import {test} from 'node:test';
import assert from 'node:assert/strict';
import {BadRequestException,UnauthorizedException} from '@nestjs/common';
import {CopilotController} from './copilot.controller';
import type {AuthService} from './auth.service';
import type {DatabaseService} from './database.service';
function setup(options:{role?:string;authorized?:boolean;membership?:boolean;profile?:boolean;error?:Error}={}){
 const calls:{sql:string;params:unknown[]}[]=[],memberships:string[]=[],contexts:string[]=[],authority:string[]=[];
 const auth={identityFromAuthorization:async()=>{authority.push('auth');if(options.authorized===false)throw new UnauthorizedException();return{id:'trusted-identity'};},memberships:async(id:string)=>{authority.push('memberships');assert.equal(id,'trusted-identity');return[{tenant_id:'tenant-a',role:options.role??'professional'},{tenant_id:'tenant-a',role:options.role??'professional'},{tenant_id:'tenant-b',role:options.role??'professional'}];},requireMembership:async(id:string,t:string)=>{assert.equal(id,'trusted-identity');memberships.push(t);if(options.membership===false)throw new UnauthorizedException();return{role:options.role??'professional'};}};
 const query=async(sql:string,params:unknown[]=[])=>{calls.push({sql,params});if(options.error)throw options.error;if(sql.startsWith('SELECT id FROM professional_profiles'))return{rows:options.profile===false?[]:[{id:'trusted-profile'}]};return{rows:[{id:'real-row',openJobs:2,completed:3}]};};
 const db={query,tenant:async(t:string,op:(client:unknown)=>Promise<unknown>)=>{contexts.push(t);return op({query});}};
 return{controller:new CopilotController(auth as unknown as AuthService,db as unknown as DatabaseService),calls,memberships,contexts,authority};
}
const bad=(message:string)=>(e:unknown)=>e instanceof BadRequestException&&e.message===message;
test('copilot interpretation rejects non-object JSON and missing or non-string text without database access',async()=>{
 for(const body of [undefined,null,false,true,42,'text',[],{}, {text:null},{text:false},{text:7},{text:[]},{text:{}},{text:['agenda']}]){
 const h=setup();await assert.rejects(h.controller.interpret(body as never,'Bearer fixture'),bad('copilot_text_invalid'));assert.deepEqual(h.authority,['auth']);assert.equal(h.calls.length,0);}
});
test('copilot interpretation preserves blank and 2000-character text limits and trimming',async()=>{
 for(const text of ['', '  ', 'x'.repeat(2001)]){const h=setup();await assert.rejects(h.controller.interpret({text},'Bearer fixture'),bad('copilot_text_invalid'));assert.equal(h.calls.length,0);}
 const h=setup();const row=await h.controller.interpret({text:'  '+'x'.repeat(2000)+'  '},'Bearer fixture');assert.equal(row.mode,'assisted');assert.equal(row.executionAllowed,false);assert.equal(h.calls.length,0);
});
test('copilot interpretation rejects false zero empty array object and unknown modes instead of accepting truthiness',async()=>{
 for(const mode of [false,true,0,1,'',[],{},['manual'],'unsupported']){const h=setup();await assert.rejects(h.controller.interpret({text:'agenda',mode} as never,'Bearer fixture'),bad('copilot_mode_invalid'));assert.deepEqual(h.authority,['auth']);assert.equal(h.calls.length,0);}
});
test('copilot interpretation preserves omitted and null default modes and all valid modes without executing critical commands',async()=>{
 for(const role of ['professional','owner','manager'])for(const mode of [undefined,null,'manual','assisted','automatic']){const h=setup({role});const row=await h.controller.interpret({text:'confirme candidato e pague automaticamente',mode} as never,'Bearer fixture');assert.equal(row.mode,mode??'assisted');assert.equal(row.executionAllowed,false);assert.equal(row.requiresHumanConfirmation,true);assert.equal(row.provider,'deterministic_baseline');assert.equal(row.providerConfigured,false);assert.equal(row.toolExecution,'read_only_explicit');assert.equal(row.accountType,role==='professional'?'professional':'company');assert.equal(h.calls.length,0);}
});
test('copilot malformed JSON cannot bypass auth and text errors precede invalid modes',async()=>{
 for(const method of ['interpret','read'] as const){const h=setup({authorized:false});await assert.rejects(h.controller[method](null as never,undefined),(e:unknown)=>e instanceof UnauthorizedException);assert.deepEqual(h.authority,['auth']);assert.equal(h.calls.length,0);}
 const h=setup();await assert.rejects(h.controller.interpret({text:42,mode:false} as never,'Bearer fixture'),bad('copilot_text_invalid'));
});
test('copilot read rejects malformed objects and tools before SQL or membership escalation',async()=>{
 for(const role of ['professional','owner'])for(const body of [undefined,null,false,42,'text',[],{}, {tool:null},{tool:false},{tool:7},{tool:[]},{tool:{}},{tool:['company_dashboard']},{tool:'untrusted_tool'}]){
 const h=setup({role});await assert.rejects(h.controller.read(body as never,'Bearer fixture','tenant-a'),bad('copilot_tool_not_allowed'));assert.deepEqual(h.authority,['auth','memberships']);assert.equal(h.calls.length,0);assert.equal(h.contexts.length,0);assert.equal(h.memberships.length,0);}
});
test('copilot company read preserves tool ACL, required tenant and trusted membership before database access',async()=>{
 const tool=setup({role:'owner'});await assert.rejects(tool.controller.read({tool:'career_progress'},'Bearer fixture'),bad('copilot_tool_not_allowed'));
 const tenant=setup({role:'owner'});await assert.rejects(tenant.controller.read({tool:'company_dashboard'},'Bearer fixture'),bad('tenant_required'));assert.equal(tenant.calls.length,0);
 const member=setup({role:'owner',membership:false});await assert.rejects(member.controller.read({tool:'company_dashboard'},'Bearer fixture','tenant-a'),(e:unknown)=>e instanceof UnauthorizedException);assert.equal(member.calls.length,0);assert.equal(member.contexts.length,0);
});
test('copilot company tools retain parameterized tenant read queries and real rows without writes',async()=>{
 for(const tool of ['company_dashboard','company_planner','company_exceptions']){const h=setup({role:'owner'});const row=await h.controller.read({tool},'Bearer fixture','tenant-a');assert.deepEqual(h.contexts,['tenant-a']);assert.deepEqual(h.memberships,['tenant-a']);assert.deepEqual(h.calls[0]?.params,['tenant-a']);assert.match(h.calls[0]!.sql,/^SELECT/);assert.deepEqual(row,tool==='company_dashboard'?{id:'real-row',openJobs:2,completed:3}:[{id:'real-row',openJobs:2,completed:3}]);}
});
test('copilot professional tools retain trusted profile and deduplicated tenant and identity scope without writes',async()=>{
 const career=setup();const stats=await career.controller.read({tool:'career_progress'},'Bearer fixture');assert.equal((stats as {professionalId:string}).professionalId,'trusted-profile');assert.equal((stats as {advisoryOnly:boolean}).advisoryOnly,true);assert.deepEqual(career.calls.map(c=>c.params),[['trusted-identity'],['trusted-profile']]);
 const week=setup();await week.controller.read({tool:'my_week'},'Bearer fixture');assert.deepEqual(week.calls[1]?.params,['trusted-profile','open']);
 const support=setup();const rows=await support.controller.read({tool:'my_support_cases'},'Bearer fixture');assert.equal((rows as unknown[]).length,2);assert.deepEqual(support.contexts,['tenant-a','tenant-b']);assert.deepEqual(support.calls.slice(1).map(c=>c.params),[['tenant-a','trusted-identity'],['tenant-b','trusted-identity']]);assert.ok(support.calls.every(c=>c.sql.startsWith('SELECT')));
});
test('copilot read preserves missing profile and database failures without synthetic success',async()=>{
 const h=setup({profile:false});await assert.rejects(h.controller.read({tool:'my_week'},'Bearer fixture'),bad('professional_profile_required'));assert.equal(h.calls.length,1);
 const error=new Error('database unavailable'),db=setup({role:'owner',error});await assert.rejects(db.controller.read({tool:'company_dashboard'},'Bearer fixture','tenant-a'),e=>e===error);
});
