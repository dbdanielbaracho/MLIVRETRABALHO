import {test} from 'node:test';
import assert from 'node:assert/strict';
import {BadRequestException,UnauthorizedException} from '@nestjs/common';
import {AvailabilityController} from './availability.controller';
import type {AuthService} from './auth.service';
import type {DatabaseService} from './database.service';
const valid={startsAt:'2026-10-10T18:00:00-03:00',endsAt:'2026-10-11T01:00:00Z'};
function setup(authorized=true,profile=true){
 const calls:{sql:string;params:unknown[]}[]=[];const authCalls:(string|undefined)[]=[];
 const auth={identityFromAuthorization:async(a?:string)=>{authCalls.push(a);if(!authorized)throw new UnauthorizedException();return{id:'actual-identity'};}};
 const row={id:'actual-window',...valid};
 const db={query:async(sql:string,params:unknown[])=>{calls.push({sql,params});return{rows:sql.startsWith('SELECT id')?(profile?[{id:'actual-profile'}]:[]):[row]};}};
 return {controller:new AvailabilityController(db as unknown as DatabaseService,auth as unknown as AuthService),calls,authCalls,row};
}
test('malformed availability is a known400 rejection before a profile query or insert',async()=>{
 for(const body of [null,[],{}, {...valid,startsAt:42},{...valid,endsAt:{}},{...valid,endsAt:valid.startsAt}]){
  const h=setup();await assert.rejects(h.controller.add(body,'Bearer fixture'),(e:unknown)=>e instanceof BadRequestException&&e.getStatus()===400&&e.message==='availability_range_invalid');
  assert.equal(h.calls.length,0);assert.deepEqual(h.authCalls,['Bearer fixture']);
 }
});
test('availability authenticates before inspecting a malformed payload',async()=>{
 const h=setup(false);await assert.rejects(h.controller.add(null),(e:unknown)=>e instanceof UnauthorizedException&&e.getStatus()===401);
 assert.equal(h.calls.length,0);assert.deepEqual(h.authCalls,[undefined]);
});
test('availability keeps identity/profile binding, original timestamps, idempotent SQL and missing-profile rejection',async()=>{
 const h=setup();assert.deepEqual(await h.controller.add({...valid,professionalId:'other-profile',tenantId:'other-company'}),h.row);
 const first=h.calls[0],second=h.calls[1];assert.ok(first);assert.ok(second);
 assert.deepEqual(first.params,['actual-identity']);assert.deepEqual(second.params,['actual-profile',valid.startsAt,valid.endsAt]);assert.match(second.sql,/ON CONFLICT/);
 const absent=setup(true,false);await assert.rejects(absent.controller.add(valid),(e:unknown)=>e instanceof BadRequestException&&e.message==='professional_profile_required');assert.equal(absent.calls.length,1);
});
