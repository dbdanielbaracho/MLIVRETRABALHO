import {test} from 'node:test';
import assert from 'node:assert/strict';
import {BadRequestException,NotFoundException,UnauthorizedException} from '@nestjs/common';
import {WorkAssignmentsController} from './work-assignments.controller';
import type {DatabaseService} from './database.service';
import type {AuthService} from './auth.service';
const ID='abcdefab-2222-3333-4444-555555555555';
const steps=['checkIn','start','checkOut','complete'];
function setup(options:{authorized?:boolean;membership?:boolean;profile?:boolean;transition?:boolean;error?:Error}={}){
 const queries:{sql:string;params:unknown[]}[]=[],contexts:string[]=[],memberships:unknown[][]=[];
 const auth={identityFromAuthorization:async()=>{if(options.authorized===false)throw new UnauthorizedException();return{id:'trusted-identity'};},requireMembership:async(...args:unknown[])=>{memberships.push(args);if(options.membership===false)throw new UnauthorizedException();return{role:'professional'};}};
 const db={tenant:async(tenant:string,op:(db:unknown)=>Promise<unknown>)=>{contexts.push(tenant);if(options.error)throw options.error;return op({query:async(sql:string,params:unknown[]=[])=>{
 queries.push({sql,params});if(sql.startsWith('SELECT id FROM professional_profiles'))return{rows:options.profile===false?[]:[{id:'trusted-profile'}]};
 if(sql.startsWith('UPDATE work_assignments'))return{rows:options.transition===false?[]:[{id:ID,status:params[0],checkedInAt:'2026-10-11T00:00:00Z',checkedOutAt:'2026-10-11T01:00:00Z',completedAt:'2026-10-11T01:01:00Z'}]};return{rows:[]};
 } });}};
 return{controller:new WorkAssignmentsController(db as unknown as DatabaseService,auth as unknown as AuthService),queries,contexts,memberships};
}
function invoke(h:ReturnType<typeof setup>,step:string,id=ID,a?:string,t?:string,coords:unknown={}){
 return step==='checkIn'?h.controller.checkIn(id,coords as never,a,t):step==='start'?h.controller.start(id,a,t):step==='checkOut'?h.controller.checkOut(id,coords as never,a,t):h.controller.complete(id,a,t);
}
test('GPS rejects non-numeric latitude rather than coercing booleans text or arrays into coordinates',async()=>{
 for(const step of ['checkIn','checkOut'])for(const lat of [false,true,'','0','-23.5',[],[0],{},NaN,Infinity]){
 const h=setup();await assert.rejects(invoke(h,step,ID,'Bearer fixture','trusted-tenant',{lat,lng:1}),(e:unknown)=>e instanceof BadRequestException&&e.message==='latitude_invalid');assert.equal(h.queries.length,1);
 }
});
test('GPS rejects non-numeric longitude rather than coercing booleans text or arrays into coordinates',async()=>{
 for(const step of ['checkIn','checkOut'])for(const lng of [false,true,'','0','-46.6',[],[0],{},NaN,Infinity]){
 const h=setup();await assert.rejects(invoke(h,step,ID,'Bearer fixture','trusted-tenant',{lat:1,lng}),(e:unknown)=>e instanceof BadRequestException&&e.message==='longitude_invalid');assert.equal(h.queries.length,1);
 }
});
test('GPS rejects non-object coordinate JSON while keeping auth and profile authority',async()=>{
 for(const step of ['checkIn','checkOut'])for(const body of [false,true,42,'text',[],[{lat:1,lng:1}]]){
 const h=setup();await assert.rejects(invoke(h,step,ID,'Bearer fixture','trusted-tenant',body),(e:unknown)=>e instanceof BadRequestException&&e.message==='location_invalid');assert.equal(h.queries.length,1);
 }
});
test('GPS accepts finite numerical zero floats and range boundaries without losing exact coordinates',async()=>{
 for(const step of ['checkIn','checkOut'])for(const [lat,lng] of [[0,0],[-23.5,-46.6],[-90,-180],[90,180],[0.001,-0.001]]){
 const h=setup();await invoke(h,step,ID,'Bearer fixture','trusted-tenant',{lat,lng});assert.deepEqual(h.queries[1]?.params.slice(5),[lat,lng]);assert.match(h.queries[1]!.sql,step==='checkIn'?/check_in_lat=\$6,check_in_lng=\$7/:/check_out_lat=\$6,check_out_lng=\$7/);
 }
});
test('GPS remains optional for missing, null or absent paired fields',async()=>{
 for(const step of ['checkIn','checkOut'])for(const body of [undefined,null,{}, {lat:null,lng:null},{lat:undefined,lng:undefined}]){
 const h=setup();await invoke(h,step,ID,'Bearer fixture','trusted-tenant',body);assert.equal(h.queries[1]?.params.length,5);assert.doesNotMatch(h.queries[1]!.sql,/check_(?:in|out)_lat=/);
 }
});
test('GPS preserves pair-first errors and existing numerical latitude or longitude bounds',async()=>{
 for(const step of ['checkIn','checkOut'])for(const [body,message] of [[{lat:false},'location_pair_required'],[{lat:1},'location_pair_required'],[{lng:1},'location_pair_required'],[{lat:null,lng:1},'location_pair_required'],[{lat:91,lng:1},'latitude_invalid'],[{lat:-91,lng:1},'latitude_invalid'],[{lat:1,lng:181},'longitude_invalid'],[{lat:1,lng:-181},'longitude_invalid']] as const){
 const h=setup();await assert.rejects(invoke(h,step,ID,'Bearer fixture','trusted-tenant',body),(e:unknown)=>e instanceof BadRequestException&&e.message===message);assert.equal(h.queries.length,1);
 }
});
test('GPS malformed inputs cannot bypass auth, required tenant, membership, UUID or professional profile gates',async()=>{
 const a=setup({authorized:false});await assert.rejects(invoke(a,'checkIn',ID,undefined,'trusted-tenant',false),(e:unknown)=>e instanceof UnauthorizedException);assert.equal(a.contexts.length,0);
 const t=setup();await assert.rejects(invoke(t,'checkIn',ID,'Bearer fixture',undefined,false),(e:unknown)=>e instanceof BadRequestException&&e.message==='tenant_required');assert.equal(t.contexts.length,0);
 const m=setup({membership:false});await assert.rejects(invoke(m,'checkIn',ID,'Bearer fixture','trusted-tenant',false),(e:unknown)=>e instanceof UnauthorizedException);assert.equal(m.contexts.length,0);
 const id=setup();await assert.rejects(invoke(id,'checkIn','bad','Bearer fixture','trusted-tenant',false),(e:unknown)=>e instanceof BadRequestException&&e.message==='assignment_invalid');assert.equal(id.contexts.length,0);
 const profile=setup({profile:false});await assert.rejects(invoke(profile,'checkIn',ID,'Bearer fixture','trusted-tenant',false),(e:unknown)=>e instanceof NotFoundException&&e.message==='professional_profile_required');assert.equal(profile.queries.length,1);
});
test('GPS changes do not affect start/completion, tenant state filters or internal ledger',async()=>{
 for(const step of ['start','complete']){const h=setup();const row=await invoke(h,step,ID,'Bearer fixture','trusted-tenant');assert.equal(row.status,step==='start'?'in_progress':'completed');assert.equal(h.queries[1]?.params.length,5);assert.equal(h.queries.filter(q=>q.sql.startsWith('INSERT INTO earnings_ledger')).length,step==='complete'?1:0);}
});
