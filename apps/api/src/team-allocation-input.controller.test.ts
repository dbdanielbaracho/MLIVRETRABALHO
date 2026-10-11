import {test} from 'node:test';
import assert from 'node:assert/strict';
import {BadRequestException,ForbiddenException,UnauthorizedException} from '@nestjs/common';
import {TeamAllocationController} from './team-allocation.controller';
import type {AuthService} from './auth.service';
import type {DatabaseService} from './database.service';
const JOB='aaaaaaaa-1111-2222-3333-444444444444',TEAM='bbbbbbbb-1111-2222-3333-444444444444',PRO='cccccccc-1111-2222-3333-444444444444';
function setup(options:{auth?:boolean;member?:boolean;role?:string;job?:boolean;team?:boolean;empty?:boolean;available?:boolean;error?:Error}={}){
 const calls:{sql:string;params:unknown[]}[]=[],tenants:string[]=[];
 const auth={identityFromAuthorization:async()=>{if(options.auth===false)throw new UnauthorizedException();return{id:'trusted-owner'};},requireMembership:async(id:string,t:string)=>{assert.equal(id,'trusted-owner');assert.equal(t,'trusted-tenant');if(options.member===false)throw new UnauthorizedException();return{role:options.role??'owner'};}};
 const candidate={professionalId:PRO,primaryRole:'Bartender',homeCity:'São Paulo',available:options.available??true,completed:0,cancelled:0,noShows:0,lateArrivals:0};
 const query=async(sql:string,params:unknown[]=[])=>{calls.push({sql,params});if(options.error)throw options.error;if(sql.startsWith('SELECT required_role'))return{rows:options.job===false?[]:[{requiredRole:'Bartender',title:'Real job',workCity:'São Paulo'}]};if(sql.startsWith('SELECT 1 FROM workforce_teams'))return{rows:options.team===false?[]:[{exists:1}]};return{rows:options.empty?[]:[candidate]};};
 const db={tenant:async(t:string,op:(client:unknown)=>Promise<unknown>)=>{tenants.push(t);return op({query});}};
 return{controller:new TeamAllocationController(db as unknown as DatabaseService,auth as unknown as AuthService),calls,tenants};
}
const bad=(m:string)=>(e:unknown)=>e instanceof BadRequestException&&e.message===m;
test('team allocation rejects malformed job UUID after authority without entering scoped SQL',async()=>{
 for(const id of ['invalid','',null,false,[JOB]]){const h=setup();await assert.rejects(h.controller.allocation(TEAM,id as never,'Bearer fixture','trusted-tenant'),bad('job_invalid'));assert.equal(h.calls.length,0);assert.equal(h.tenants.length,0);}
});
test('team allocation rejects malformed team UUID after factual job lookup without querying team UUID',async()=>{
 for(const id of ['invalid','',null,false,[TEAM]]){const h=setup();await assert.rejects(h.controller.allocation(id as never,JOB,'Bearer fixture','trusted-tenant'),bad('team_not_found'));assert.equal(h.calls.length,1);assert.deepEqual(h.calls[0]?.params,['trusted-tenant',JOB]);}
});
test('team allocation malformed UUID preserves auth tenant membership and company role precedence',async()=>{
 for(const options of [{auth:false},{member:false},{role:'professional'}]){const h=setup(options);await assert.rejects(h.controller.allocation('invalid','invalid','Bearer fixture','trusted-tenant'),(e:unknown)=>options.role?e instanceof ForbiddenException&&e.message==='company_role_required':e instanceof UnauthorizedException);assert.equal(h.calls.length,0);}
 const h=setup();await assert.rejects(h.controller.allocation(TEAM,JOB,'Bearer fixture'),bad('tenant_required'));assert.equal(h.calls.length,0);
});
test('team allocation retains factual missing job before team error and empty team errors',async()=>{
 const job=setup({job:false});await assert.rejects(job.controller.allocation('invalid',JOB,'Bearer fixture','trusted-tenant'),bad('job_not_found'));assert.equal(job.calls.length,1);
 const team=setup({team:false});await assert.rejects(team.controller.allocation(TEAM,JOB,'Bearer fixture','trusted-tenant'),bad('team_not_found'));assert.equal(team.calls.length,2);
 const empty=setup({empty:true});await assert.rejects(empty.controller.allocation(TEAM,JOB,'Bearer fixture','trusted-tenant'),bad('team_empty'));assert.equal(empty.calls.length,3);
});
test('team allocation valid IDs retain real ranking reasons trusted tenant args and unavailable empty result',async()=>{
 const h=setup(),result=await h.controller.allocation(TEAM,JOB,'Bearer fixture','trusted-tenant');assert.equal(result.length,1);assert.equal(result[0]?.professionalId,PRO);assert.ok(Number.isFinite(result[0]?.score));assert.ok(result[0]?.reasons.includes('alta compatibilidade com a função'));assert.ok(result[0]?.reasons.includes('próximo do local'));assert.deepEqual(h.tenants,['trusted-tenant']);assert.deepEqual(h.calls.map(x=>x.params),[['trusted-tenant',JOB],['trusted-tenant',TEAM],[TEAM,JOB,'trusted-tenant']]);assert.equal(h.calls.some(x=>/^(INSERT|UPDATE|DELETE)/.test(x.sql)),false);
 const unavailable=setup({available:false});assert.deepEqual(await unavailable.controller.allocation(TEAM,JOB,'Bearer fixture','trusted-tenant'),[]);
});
test('team allocation database failure rejects without fabricated ranking',async()=>{
 const error=new Error('database unavailable'),h=setup({error});await assert.rejects(h.controller.allocation(TEAM,JOB,'Bearer fixture','trusted-tenant'),e=>e===error);
});
