import {test} from 'node:test';
import assert from 'node:assert/strict';
import {BadRequestException,ForbiddenException,UnauthorizedException} from '@nestjs/common';
import {PlannerController} from './planner.controller';
import type {AuthService} from './auth.service';
import type {DatabaseService} from './database.service';
const JOB='aaaaaaaa-1111-2222-3333-444444444444',PRO='bbbbbbbb-1111-2222-3333-444444444444',body={requirements:[{role:' Bartender ',count:1}]};
function setup(options:{auth?:boolean;member?:boolean;role?:string;job?:boolean;error?:Error}={}){
 const calls:{sql:string;params:unknown[]}[]=[],tenants:string[]=[];
 const auth={identityFromAuthorization:async()=>{if(options.auth===false)throw new UnauthorizedException();return{id:'trusted-owner'};},requireMembership:async(id:string,t:string)=>{assert.equal(id,'trusted-owner');assert.equal(t,'trusted-tenant');if(options.member===false)throw new UnauthorizedException();return{role:options.role??'owner'};}};
 const candidate={professionalId:PRO,primaryRole:'Bartender',roles:[],available:true,completed:0,cancelled:0,noShows:0,lateArrivals:0,averageRating:null,ratingCount:0};
 const query=async(sql:string,params:unknown[]=[])=>{calls.push({sql,params});if(options.error)throw options.error;if(sql.startsWith('SELECT id,starts_at'))return{rows:options.job===false?[]:[{id:JOB,startsAt:'2026-10-12T12:00:00Z',endsAt:'2026-10-12T20:00:00Z'}]};if(sql.startsWith('SELECT p.id'))return{rows:[candidate]};return{rows:[]};};
 const db={tenant:async(t:string,op:(client:unknown)=>Promise<unknown>)=>{tenants.push(t);return op({query});}};
 return{controller:new PlannerController(db as unknown as DatabaseService,auth as unknown as AuthService),calls,tenants};
}
const bad=(m:string)=>(e:unknown)=>e instanceof BadRequestException&&e.message===m;
test('team planner rejects malformed job UUID before SQL after valid requirements',async()=>{
 for(const id of ['invalid','',null,false,[JOB]]){const h=setup();await assert.rejects(h.controller.teamPlan(id as never,body,'Bearer fixture','trusted-tenant'),bad('job_invalid'));assert.equal(h.calls.length,0);assert.equal(h.tenants.length,0);}
});
test('team planner malformed UUID preserves auth tenant membership company role and requirements precedence',async()=>{
 for(const options of [{auth:false},{member:false},{role:'professional'}]){const h=setup(options);await assert.rejects(h.controller.teamPlan('invalid',null,'Bearer fixture','trusted-tenant'),(e:unknown)=>options.role?e instanceof ForbiddenException&&e.message==='company_role_required':e instanceof UnauthorizedException);assert.equal(h.calls.length,0);}
 const tenant=setup();await assert.rejects(tenant.controller.teamPlan('invalid',body,'Bearer fixture'),bad('tenant_required'));assert.equal(tenant.calls.length,0);
 const shape=setup();await assert.rejects(shape.controller.teamPlan('invalid',null,'Bearer fixture','trusted-tenant'),bad('requirements_invalid'));assert.equal(shape.calls.length,0);
});
test('team planner valid UUID retains tenant bound dates actual optimizer result and job absence error',async()=>{
 const h=setup(),result=await h.controller.teamPlan(JOB,body,'Bearer fixture','trusted-tenant');assert.equal(result.selected.length,1);assert.equal(result.selected[0]?.professionalId,PRO);assert.deepEqual(result.unfilled,[]);assert.ok(Number.isFinite(result.score));assert.deepEqual(h.tenants,['trusted-tenant']);assert.deepEqual(h.calls.map(x=>x.params),[['trusted-tenant',JOB],['2026-10-12T12:00:00Z','2026-10-12T20:00:00Z']]);assert.equal(h.calls.some(x=>/^(INSERT|UPDATE|DELETE)/.test(x.sql)),false);
 const missing=setup({job:false});await assert.rejects(missing.controller.teamPlan(JOB,body,'Bearer fixture','trusted-tenant'),bad('job_not_found'));assert.equal(missing.calls.length,1);
});
test('team planner database failure does not fabricate empty success and scoped list stays factual',async()=>{
 const error=new Error('database unavailable'),h=setup({error});await assert.rejects(h.controller.teamPlan(JOB,body,'Bearer fixture','trusted-tenant'),e=>e===error);
 const list=setup();assert.deepEqual(await list.controller.list('Bearer fixture','trusted-tenant'),[]);assert.deepEqual(list.calls[0]?.params,['trusted-tenant']);
});
