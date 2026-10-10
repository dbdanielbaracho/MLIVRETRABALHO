import test from 'node:test';
import assert from 'node:assert/strict';
import {PlannerController} from './planner.controller';
import type {AuthService} from './auth.service';
import type {DatabaseService} from './database.service';
const tenant='aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee', jobId='bbbbbbbb-cccc-dddd-eeee-ffffffffffff';
const body={requirements:[{role:' Bartender ',count:1}]};
function fixture() {
  const events:string[]=[], calls:Array<{sql:string;values:unknown[]}>=[], tenants:string[]=[];
  let exists=true;
  const auth={identityFromAuthorization:async()=>{events.push('auth');return{id:'actual-owner'}},requireMembership:async(id:string,t:string)=>{events.push('member:'+id+':'+t);return{role:'owner'}}};
  const db={tenant:async(t:string, work:(client:{query:(sql:string,values:unknown[])=>Promise<{rows:unknown[]}>})=>Promise<unknown>)=>{tenants.push(t);return work({query:async(sql,values)=>{calls.push({sql,values});return {rows:sql.startsWith('SELECT id,')?(exists?[{id:jobId,startsAt:'2026-10-12T12:00:00Z',endsAt:'2026-10-12T20:00:00Z'}]:[]):[]};}});}};
  return {auth,db,events,calls,tenants,controller:new PlannerController(db as unknown as DatabaseService,auth as unknown as AuthService),setExists:(x:boolean)=>{exists=x}};
}
test('malformed team requirements are rejected after company authorization and before tenant queries', async()=>{
  for(const value of [null,{requirements:1},{requirements:[null]},{requirements:[{role:1,count:1}]}]) {
    const f=fixture();await assert.rejects(f.controller.teamPlan(jobId,value,'Bearer fixture',tenant),/requirements_invalid/);
    assert.deepEqual(f.events,['auth','member:actual-owner:'+tenant]);assert.equal(f.tenants.length,0);assert.equal(f.calls.length,0);
  }
});
test('team plan authentication, membership and company role remain prior to malformed input validation', async()=>{
  const a=fixture();a.auth.identityFromAuthorization=async()=>{throw Error('unauthorized')};await assert.rejects(a.controller.teamPlan(jobId,null,'Bearer bad',tenant),/unauthorized/);assert.equal(a.tenants.length,0);
  const b=fixture();await assert.rejects(b.controller.teamPlan(jobId,null,'Bearer fixture'),/tenant_required/);assert.deepEqual(b.events,['auth']);assert.equal(b.tenants.length,0);
  const c=fixture();c.auth.requireMembership=async()=>{throw Error('membership_required')};await assert.rejects(c.controller.teamPlan(jobId,null,'Bearer fixture',tenant),/membership_required/);assert.equal(c.tenants.length,0);
  const d=fixture();d.auth.requireMembership=async()=>({role:'professional'});await assert.rejects(d.controller.teamPlan(jobId,null,'Bearer fixture',tenant),/company_role_required/);assert.equal(d.tenants.length,0);
});
test('valid team plan uses only the authenticated tenant and real job interval', async()=>{
  const f=fixture();await f.controller.teamPlan(jobId,{...body,tenantId:'injected-other'},'Bearer fixture',tenant);
  assert.deepEqual(f.tenants,[tenant]);assert.deepEqual(f.calls[0]?.values,[tenant,jobId]);assert.match(f.calls[0]?.sql??'',/WHERE tenant_id=\$1 AND id=\$2/);
  assert.deepEqual(f.calls[1]?.values,['2026-10-12T12:00:00Z','2026-10-12T20:00:00Z']);assert.match(f.calls[1]?.sql??'',/pa.starts_at<=\$1 AND pa.ends_at>=\$2/);assert.equal(f.calls[1]?.sql.includes('$3'),false);assert.match(f.calls[1]?.sql??'',/WHERE active_tenant_professional\(p.id\)/);
  assert.equal(f.calls.some(c=>/^(INSERT|UPDATE|DELETE)/.test(c.sql)),false);
});
test('missing or cross-tenant job cannot query or rank any candidates', async()=>{
  const f=fixture();f.setExists(false);await assert.rejects(f.controller.teamPlan(jobId,body,'Bearer fixture',tenant),/job_not_found/);assert.equal(f.calls.length,1);
});
test('a real job without eligible candidates preserves the optimizer unfilled result', async()=>{
  const f=fixture();const plan=await f.controller.teamPlan(jobId,body,'Bearer fixture',tenant);
  assert.deepEqual(plan.selected,[]);assert.deepEqual(plan.unfilled,[{role:'Bartender',count:1}]);assert.equal(plan.score,0);
});
test('team planning database failure remains an error without fabricated candidates', async()=>{
  const f=fixture();f.db.tenant=async()=>{throw Error('database_offline')};await assert.rejects(f.controller.teamPlan(jobId,body,'Bearer fixture',tenant),/database_offline/);
});
