import {test} from 'node:test';
import assert from 'node:assert/strict';
import {BadRequestException,UnauthorizedException} from '@nestjs/common';
import {ProfessionalProfileController} from './professional-profile.controller';
import type {DatabaseService} from './database.service';
import type {AuthService} from './auth.service';
function setup(authorized=true){
 const calls:{sql:string;params:unknown[]}[]=[];
 const authCalls:(string|undefined)[]=[];
 const auth={identityFromAuthorization:async(value?:string)=>{authCalls.push(value);if(!authorized)throw new UnauthorizedException();return{id:'authenticated-identity',email:'fixture@example.test'};}};
 const row={id:'actual-profile',displayName:'Name',homeCity:null,primaryRole:null};
 const db={query:async(sql:string,params:unknown[])=>{calls.push({sql,params});return{rows:[row]};}};
 return {controller:new ProfessionalProfileController(db as unknown as DatabaseService,auth as unknown as AuthService),calls,authCalls,row};
}
test('invalid profile input is a known 400 rejection before any database write',async()=>{
 for(const body of [null,[],{}, {displayName:''},{displayName:42},{displayName:'Name',homeCity:{}},{displayName:'Name',primaryRole:[]}]){
  const h=setup();await assert.rejects(h.controller.upsert(body,'Bearer fixture'),(e:unknown)=>e instanceof BadRequestException&&e.getStatus()===400&&e.message==='professional_profile_invalid');
  assert.deepEqual(h.authCalls,['Bearer fixture']);assert.equal(h.calls.length,0);
 }
});
test('profile authentication failure precedes malformed input and no query is executed',async()=>{
 const h=setup(false);await assert.rejects(h.controller.upsert(null),(e:unknown)=>e instanceof UnauthorizedException&&e.getStatus()===401);
 assert.deepEqual(h.authCalls,[undefined]);assert.equal(h.calls.length,0);
});
test('profile write binds only the authenticated identity and preserves trimmed/null values and database acknowledgement',async()=>{
 const h=setup();assert.deepEqual(await h.controller.upsert({displayName:' Name ',homeCity:' ',primaryRole:null,identityId:'other-identity',id:'other-profile'},'Bearer fixture'),h.row);
 assert.equal(h.calls.length,1);assert.deepEqual(h.calls[0].params,['authenticated-identity','Name',null,null]);assert.match(h.calls[0].sql,/ON CONFLICT\(identity_id\)/);
});
test('profile database failure remains an uncertain server failure instead of being reported as invalid input',async()=>{
 const failure=new Error('fixture_database_failure');const auth={identityFromAuthorization:async()=>({id:'fixture'})};const db={query:async()=>{throw failure;}};
 const controller=new ProfessionalProfileController(db as unknown as DatabaseService,auth as unknown as AuthService);
 await assert.rejects(controller.upsert({displayName:'Name'}),e=>e===failure);
});
