import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {UnauthorizedException} from '@nestjs/common';
import {AuthService} from './auth.service';
import type {DatabaseService} from './database.service';
const TENANT='aaaaaaaa-1111-2222-3333-444444444444',IDENTITY='bbbbbbbb-1111-2222-3333-444444444444';
function setup(options:{missing?:boolean;error?:Error}={}){
 const calls:{sql:string;params:unknown[]}[]=[],role={role:'owner'},identity={id:IDENTITY,email:'fixture@example.test'};
 const query=async(sql:string,params:unknown[]=[])=>{calls.push({sql,params});if(options.error)throw options.error;return{rows:options.missing?[]:sql.startsWith('SELECT role FROM')?[role]:[identity]};};
 return{auth:new AuthService({query} as unknown as DatabaseService),calls,role,identity};
}
const denied=(e:unknown)=>e instanceof UnauthorizedException&&e.message==='tenant_membership_required';
test('membership rejects malformed untrusted tenant UUID with existing unauthorized error before SQL',async()=>{
 for(const id of ['invalid','',null,false,42,[TENANT],{},TENANT+'x']){const h=setup();await assert.rejects(h.auth.requireMembership(IDENTITY,id as never),denied);assert.equal(h.calls.length,0);}
});
test('membership valid UUID retains factual role trusted parameters and missing membership denial',async()=>{
 const h=setup();assert.deepEqual(await h.auth.requireMembership(IDENTITY,TENANT),h.role);assert.deepEqual(h.calls[0]?.params,[IDENTITY,TENANT]);assert.equal(h.calls.some(x=>/^(INSERT|UPDATE|DELETE)/.test(x.sql)),false);
 const missing=setup({missing:true});await assert.rejects(missing.auth.requireMembership(IDENTITY,TENANT),denied);assert.deepEqual(missing.calls[0]?.params,[IDENTITY,TENANT]);
});
test('membership database failure remains an honest rejection without manufacturing permission or denial',async()=>{
 const error=new Error('database unavailable'),h=setup({error});await assert.rejects(h.auth.requireMembership(IDENTITY,TENANT),e=>e===error);
});
test('membership guard preserves bearer session hashing and trusted identity before membership denial',async()=>{
 const h=setup();assert.deepEqual(await h.auth.identityFromAuthorization('Bearer fixture-token'),h.identity);assert.deepEqual(h.calls[0]?.params,[createHash('sha256').update('fixture-token').digest('hex')]);assert.ok(h.calls[0]?.sql.includes('s.expires_at>now() AND i.deactivated_at IS NULL'));await assert.rejects(h.auth.requireMembership(IDENTITY,'invalid'),denied);assert.equal(h.calls.length,1);
 for(const value of [undefined,'','Basic fixture-token','Bearer']){const h=setup();await assert.rejects(h.auth.identityFromAuthorization(value),(e:unknown)=>e instanceof UnauthorizedException);assert.equal(h.calls.length,0);}
});
