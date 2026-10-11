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
test('assignment all four transitions reject malformed path UUID before profile or tenant SQL',async()=>{
 for(const step of steps)for(const id of ['bad','',ID+'x','42']){const h=setup();await assert.rejects(invoke(h,step,id,'Bearer fixture','trusted-tenant'),(e:unknown)=>e instanceof BadRequestException&&e.message==='assignment_invalid');assert.equal(h.contexts.length,0);assert.equal(h.queries.length,0);}
});
test('assignment authentication precedes malformed path validation for all transitions',async()=>{
 for(const step of steps){const h=setup({authorized:false});await assert.rejects(invoke(h,step,'bad',undefined,'trusted-tenant'),(e:unknown)=>e instanceof UnauthorizedException);assert.equal(h.memberships.length,0);assert.equal(h.contexts.length,0);}
});
test('assignment required tenant and membership precede path validation for all transitions',async()=>{
 for(const step of steps){const t=setup();await assert.rejects(invoke(t,step,'bad','Bearer fixture'),(e:unknown)=>e instanceof BadRequestException&&e.message==='tenant_required');assert.equal(t.memberships.length,0);const m=setup({membership:false});await assert.rejects(invoke(m,step,'bad','Bearer fixture','trusted-tenant'),(e:unknown)=>e instanceof UnauthorizedException);assert.equal(m.contexts.length,0);}
});
test('assignment transitions retain actual ACK, trusted profile/tenant and original previous-state filters',async()=>{
 const next=['checked_in','in_progress','checked_out','completed'],previous=[['confirmed'],['checked_in'],['checked_in','in_progress'],['checked_out']];
 for(const [index,step] of steps.entries()){const h=setup(),row=await invoke(h,step,ID.toUpperCase(),'Bearer fixture','trusted-tenant');assert.equal(row.id,ID);assert.equal(row.status,next[index]);assert.deepEqual(h.contexts,['trusted-tenant']);assert.deepEqual(h.queries[0]?.params,['trusted-identity']);assert.deepEqual(h.queries[1]?.params,[next[index],ID.toUpperCase(),'trusted-profile',previous[index],'trusted-tenant']);assert.match(h.queries[1]!.sql,/professional_id=\$3.*tenant_id=\$5/);assert.equal(h.queries.filter(q=>q.sql.startsWith('INSERT INTO earnings_ledger')).length,step==='complete'?1:0);}
});
test('assignment optional GPS remains optional, paired and bound-checked before update',async()=>{
 for(const step of ['checkIn','checkOut']){
 for(const coords of [undefined,null,{}, {lat:null,lng:null}]){const h=setup();await invoke(h,step,ID,'Bearer fixture','trusted-tenant',coords);assert.equal(h.queries[1]?.params.length,5);}
 const valid=setup();await invoke(valid,step,ID,'Bearer fixture','trusted-tenant',{lat:-23.5,lng:-46.6});assert.deepEqual(valid.queries[1]?.params.slice(5),[-23.5,-46.6]);
 for(const [coords,message] of [[{lat:1},'location_pair_required'],[{lng:1},'location_pair_required'],[{lat:91,lng:1},'latitude_invalid'],[{lat:1,lng:181},'longitude_invalid'],[{lat:NaN,lng:1},'latitude_invalid']] as const){const h=setup();await assert.rejects(invoke(h,step,ID,'Bearer fixture','trusted-tenant',coords),(e:unknown)=>e instanceof BadRequestException&&e.message===message);assert.equal(h.queries.length,1);}
 }
});
test('assignment missing professional profile preserves 404 before lifecycle update',async()=>{
 const h=setup({profile:false});await assert.rejects(invoke(h,'checkIn',ID,'Bearer fixture','trusted-tenant'),(e:unknown)=>e instanceof NotFoundException&&e.message==='professional_profile_required');assert.equal(h.queries.length,1);
});
test('assignment missing, foreign or invalid-state update preserves error and never writes earnings',async()=>{
 for(const step of steps){const h=setup({transition:false});await assert.rejects(invoke(h,step,ID,'Bearer fixture','trusted-tenant'),(e:unknown)=>e instanceof BadRequestException&&e.message==='invalid_assignment_transition');assert.equal(h.queries.length,2);}
});
test('assignment completion preserves existing payable internal ledger SQL and scope without enabling transfers',async()=>{
 const h=setup();await invoke(h,'complete',ID,'Bearer fixture','trusted-tenant');const ledger=h.queries[2];assert.ok(ledger);assert.deepEqual(ledger.params,[ID,'trusted-tenant','payable']);assert.match(ledger.sql,/COALESCE\(j.pay_cents,0\)/);assert.match(ledger.sql,/ON CONFLICT\(assignment_id\) DO NOTHING/);assert.match(ledger.sql,/wa.tenant_id=\$2 AND j.tenant_id=\$2/);
});
test('assignment DB failure propagates without fabricated operational ACK',async()=>{
 const error=new Error('fixture unavailable'),h=setup({error});await assert.rejects(invoke(h,'checkIn',ID,'Bearer fixture','trusted-tenant'),(e:unknown)=>e===error);
});
