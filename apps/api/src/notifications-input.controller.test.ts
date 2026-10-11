import {test} from 'node:test';
import assert from 'node:assert/strict';
import {BadRequestException,UnauthorizedException} from '@nestjs/common';
import {NotificationsController} from './notifications.controller';
import type {DatabaseService} from './database.service';
import type {AuthService} from './auth.service';
const ID='abcdefab-2222-3333-4444-555555555555';
function setup(options:{authorized?:boolean;membership?:boolean;found?:boolean;error?:Error}={}){
 const queries:{sql:string;params:unknown[]}[]=[],contexts:string[]=[],memberships:unknown[][]=[];
 const row={id:ID,readAt:'2026-10-11T00:00:00Z'};
 const auth={identityFromAuthorization:async()=>{if(options.authorized===false)throw new UnauthorizedException();return{id:'trusted-identity'};},requireMembership:async(...args:unknown[])=>{memberships.push(args);if(options.membership===false)throw new UnauthorizedException();return{role:'professional'};}};
 const db={tenant:async(tenant:string,op:(db:unknown)=>Promise<unknown>)=>{contexts.push(tenant);if(options.error)throw options.error;return op({query:async(sql:string,params:unknown[]=[])=>{queries.push({sql,params});return{rows:options.found===false?[]:[row]};}});}};
 return{controller:new NotificationsController(db as unknown as DatabaseService,auth as unknown as AuthService),queries,contexts,memberships,row};
}
test('mark-read rejects malformed notification UUID before tenant SQL',async()=>{
 for(const id of ['bad','',ID+'x','42']){const h=setup();await assert.rejects(h.controller.read(id,'Bearer fixture','trusted-tenant'),(e:unknown)=>e instanceof BadRequestException&&e.message==='notification_invalid');assert.equal(h.contexts.length,0);assert.equal(h.queries.length,0);}
});
test('mark-read authentication precedes malformed path validation',async()=>{
 const h=setup({authorized:false});await assert.rejects(h.controller.read('bad',undefined,'trusted-tenant'),(e:unknown)=>e instanceof UnauthorizedException);assert.equal(h.memberships.length,0);assert.equal(h.contexts.length,0);
});
test('mark-read required tenant and membership precede path validation',async()=>{
 const t=setup();await assert.rejects(t.controller.read('bad','Bearer fixture'),(e:unknown)=>e instanceof BadRequestException&&e.message==='tenant_required');assert.equal(t.memberships.length,0);assert.equal(t.contexts.length,0);
 const m=setup({membership:false});await assert.rejects(m.controller.read('bad','Bearer fixture','trusted-tenant'),(e:unknown)=>e instanceof UnauthorizedException);assert.deepEqual(m.memberships,[['trusted-identity','trusted-tenant']]);assert.equal(m.contexts.length,0);
});
test('mark-read retains actual database ACK, authenticated identity and tenant, including uppercase UUID',async()=>{
 for(const id of [ID,ID.toUpperCase()]){const h=setup();assert.deepEqual(await h.controller.read(id,'Bearer fixture','trusted-tenant'),h.row);assert.deepEqual(h.contexts,['trusted-tenant']);assert.deepEqual(h.queries[0]?.params,[id,'trusted-identity','trusted-tenant']);assert.match(h.queries[0]!.sql,/read_at=COALESCE\(read_at,now\(\)\)/);assert.equal(h.queries.length,1);}
});
test('mark-read missing or foreign valid notification retains null result without fabricated ACK',async()=>{
 const h=setup({found:false});assert.equal(await h.controller.read(ID,'Bearer fixture','trusted-tenant'),null);assert.equal(h.queries.length,1);assert.deepEqual(h.queries[0]?.params,[ID,'trusted-identity','trusted-tenant']);
});
test('mark-read database failure propagates instead of successful read',async()=>{
 const error=new Error('fixture database unavailable'),h=setup({error});await assert.rejects(h.controller.read(ID,'Bearer fixture','trusted-tenant'),(e:unknown)=>e===error);
});
