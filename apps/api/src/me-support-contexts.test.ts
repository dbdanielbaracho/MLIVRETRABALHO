import {test} from 'node:test';
import assert from 'node:assert/strict';
import {MeController} from './me.controller';
import {AuthService} from './auth.service';
import type {DatabaseService} from './database.service';
test('support contexts are fetched only for the actual authenticated identity and preserve real names',async()=>{
 const events:string[]=[],rows=[{tenantId:'tenant-a',displayName:'Empresa real com acento'}];
 const auth={identityFromAuthorization:async(header?:string)=>{events.push('auth:'+header);return {id:'actual-identity',email:'fixture@example.test'};},supportContexts:async(id:string)=>{events.push('contexts:'+id);return rows;}};
 const controller=new MeController(auth as unknown as AuthService);
 assert.deepEqual(await controller.supportContexts('Bearer fixture'),rows);assert.deepEqual(events,['auth:Bearer fixture','contexts:actual-identity']);
});
test('identity with no memberships receives actual empty contexts, not an invented platform tenant',async()=>{
 const auth={identityFromAuthorization:async()=>({id:'actual-identity'}),supportContexts:async()=>[]};
 const controller=new MeController(auth as unknown as AuthService);assert.deepEqual(await controller.supportContexts('Bearer fixture'),[]);
});
test('unauthorized support context read cannot query membership metadata',async()=>{
 let reads=0;const auth={identityFromAuthorization:async()=>{throw Error('unauthorized');},supportContexts:async()=>{reads++;return [];}};
 const controller=new MeController(auth as unknown as AuthService);await assert.rejects(controller.supportContexts(),/unauthorized/);assert.equal(reads,0);
});
test('support context query binds authenticated identity and selects only own tenant id and real display name',async()=>{
 const calls:Array<{sql:string;values:unknown[]}>=[],rows=[{tenantId:'actual-tenant',displayName:'Actual company'}];
 const db={query:async(sql:string,values:unknown[])=>{calls.push({sql,values});return {rows};}};
 const auth=new AuthService(db as unknown as DatabaseService);assert.deepEqual(await auth.supportContexts('actual-identity'),rows);
 const call=calls[0];assert.ok(call);assert.deepEqual(call.values,['actual-identity']);assert.match(call.sql,/WHERE m.identity_id=\$1/);assert.match(call.sql,/JOIN tenants t ON t.id=m.tenant_id/);
 assert.match(call.sql,/t.display_name AS "displayName"/);assert.doesNotMatch(call.sql,/INSERT|UPDATE|DELETE|SET LOCAL|SECURITY DEFINER|email|token|password|SELECT \*/);
});
test('real support context database failure propagates rather than confirming no authorized spaces',async()=>{
 const db={query:async()=>{throw Error('database_offline');}};
 const auth=new AuthService(db as unknown as DatabaseService);await assert.rejects(auth.supportContexts('actual-identity'),/database_offline/);
});
