import {test} from 'node:test';
import assert from 'node:assert/strict';
import {CareerConversionController} from './career-conversion.controller';
import type {AuthService} from './auth.service';
import type {DatabaseService} from './database.service';
const tenant='aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',assignment='bbbbbbbb-cccc-dddd-eeee-ffffffffffff',conversion='cccccccc-dddd-4eee-8fff-aaaaaaaaaaaa',profile='actual-profile',identity='actual-identity';
function fixture(){
 const calls:Array<{scope:string;sql:string;values:unknown[]}>=[],tenants:string[]=[],events:string[]=[];let completed=true,owns=true,open=true;
 const db={query:async(sql:string,values:unknown[]=[])=>{calls.push({scope:'global',sql,values});if(sql.startsWith('SELECT id FROM professional_profiles'))return {rows:[{id:profile}]};return {rows:owns?[{tenantId:tenant}]:[]};},tenant:async(t:string,work:(client:{query:(sql:string,values:unknown[])=>Promise<{rows:unknown[]}>})=>Promise<unknown>)=>{tenants.push(t);return work({query:async(sql,values)=>{calls.push({scope:t,sql,values});if(sql.startsWith('SELECT professional_id'))return {rows:completed?[{professionalId:profile}]:[]};return {rows:open?[{id:conversion,status:sql.startsWith('INSERT')?'proposed':'accepted'}]:[]};}});}};
 const auth={identityFromAuthorization:async()=>{events.push('auth');return{id:identity}},requireMembership:async(id:string,t:string)=>{events.push('member:'+id+':'+t);return{role:'owner'}}};
 return {calls,tenants,events,db,auth,controller:new CareerConversionController(db as unknown as DatabaseService,auth as unknown as AuthService),setCompleted:(v:boolean)=>{completed=v},setOwns:(v:boolean)=>{owns=v},setOpen:(v:boolean)=>{open=v}};
}
test('malformed conversion proposal cannot start a tenant query or write after real company authorization',async()=>{
 for(const body of [null,[],{assignmentId:'bad',modality:'permanent'},{assignmentId:assignment,modality:'permanent',note:1}]){
  const f=fixture();await assert.rejects(f.controller.propose(body,'Bearer fixture',tenant),/conversion_input_invalid/);assert.deepEqual(f.events,['auth','member:'+identity+':'+tenant]);assert.equal(f.calls.length,0);assert.equal(f.tenants.length,0);
 }
});
test('conversion authentication, tenant membership and company role remain before proposal shape validation',async()=>{
 const f=fixture();f.auth.identityFromAuthorization=async()=>{throw Error('unauthorized')};await assert.rejects(f.controller.propose(null,'Bearer bad',tenant),/unauthorized/);assert.equal(f.calls.length,0);
 const g=fixture();await assert.rejects(g.controller.propose(null,'Bearer fixture'),/tenant_required/);assert.deepEqual(g.events,['auth']);assert.equal(g.tenants.length,0);
 const h=fixture();h.auth.requireMembership=async()=>({role:'professional'});await assert.rejects(h.controller.propose(null,'Bearer fixture',tenant),/company_role_required/);assert.equal(h.tenants.length,0);
});
test('valid proposal binds only the completed actual tenant assignment and authenticated proposer',async()=>{
 const f=fixture(),result=await f.controller.propose({assignmentId:assignment,modality:'temp_to_hire',note:' Nota real ',professionalId:'injected-other',tenantId:'injected-other'},'Bearer fixture',tenant);
 assert.deepEqual(result,{id:conversion,status:'proposed'});assert.deepEqual(f.tenants,[tenant]);assert.deepEqual(f.calls[0]?.values,[tenant,assignment,'completed']);
 assert.deepEqual(f.calls[1]?.values,[tenant,profile,assignment,'temp_to_hire',identity,'Nota real']);assert.match(f.calls[0]?.sql??'',/WHERE tenant_id=\$1 AND id=\$2 AND status=\$3/);
});
test('a missing or not-completed tenant assignment still rejects proposal without inserting any conversion',async()=>{
 const f=fixture();f.setCompleted(false);await assert.rejects(f.controller.propose({assignmentId:assignment,modality:'permanent'},'Bearer fixture',tenant),/completed_assignment_required/);
 assert.equal(f.calls.length,1);assert.equal(f.calls.some(c=>c.sql.startsWith('INSERT')),false);
});
test('malformed response body or UUID cannot query the target conversion or start a tenant update',async()=>{
 const f=fixture();await assert.rejects(f.controller.respond(conversion,null,'Bearer fixture'),/decision_invalid/);assert.equal(f.calls.length,0);assert.deepEqual(f.events,['auth']);
 const g=fixture();await assert.rejects(g.controller.respond('bad-uuid',{decision:'accepted'},'Bearer fixture'),/conversion_not_found/);assert.equal(g.calls.length,1);assert.deepEqual(g.calls[0]?.values,[identity]);assert.equal(g.tenants.length,0);
});
test('response finds actual ownership and updates only original tenant/professional while proposed',async()=>{
 const f=fixture(),result=await f.controller.respond(conversion,{decision:'accepted',professionalId:'injected-other',tenantId:'injected-other'},'Bearer fixture');
 assert.deepEqual(result,{id:conversion,status:'accepted'});assert.deepEqual(f.calls[0]?.values,[identity]);assert.deepEqual(f.calls[1]?.values,[conversion,profile]);assert.deepEqual(f.tenants,[tenant]);
 assert.deepEqual(f.calls[2]?.values,[tenant,conversion,'accepted',profile,'proposed']);assert.match(f.calls[2]?.sql??'',/AND professional_id=\$4 AND status=\$5/);
});
test('another owner conversion and already responded conversion remain denied without fabricated acknowledgement',async()=>{
 const f=fixture();f.setOwns(false);await assert.rejects(f.controller.respond(conversion,{decision:'declined'},'Bearer fixture'),/conversion_not_found/);assert.equal(f.tenants.length,0);
 const g=fixture();g.setOpen(false);await assert.rejects(g.controller.respond(conversion,{decision:'accepted'},'Bearer fixture'),/conversion_not_open/);
});
test('actual conversion database failure propagates instead of granting or confirming a proposal',async()=>{
 const f=fixture();f.db.tenant=async()=>{throw Error('database_offline')};
 await assert.rejects(f.controller.propose({assignmentId:assignment,modality:'permanent'},'Bearer fixture',tenant),/database_offline/);
});
