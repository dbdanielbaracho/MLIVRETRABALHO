import {test} from 'node:test';
import assert from 'node:assert/strict';
import {UnauthorizedException,ForbiddenException} from '@nestjs/common';
import {SafetyCasesController} from './safety-cases.controller';
import {SafetyAppealsController} from './safety-appeals.controller';
import {SupportController} from './support.controller';
import type {AuthService} from './auth.service';
import type {DatabaseService} from './database.service';
const older='2026-10-14T12:00:00.000Z',newer='2026-10-15T12:00:00.000Z';
const mineControllers=[['safety cases',SafetyCasesController],['safety appeals',SafetyAppealsController]] as const;
function mineFixture(Controller:typeof mineControllers[number][1],dates:Array<Date|string|null>){
 const tenants:string[]=[],calls:Array<{sql:string;params:unknown[]}>=[];
 const rows=dates.map((createdAt,index)=>({id:'row-'+index,createdAt,status:'reviewing',reason:'Original reason',description:'Original description'}));
 const auth={identityFromAuthorization:async()=>({id:'actor'}),memberships:async()=>[{tenant_id:'a',role:'professional'},{tenant_id:'b',role:'professional'},{tenant_id:'a',role:'professional'}],requireMembership:async(_id:string,t:string)=>{if(!['a','b'].includes(t))throw new UnauthorizedException();}};
 const db={tenant:async(t:string,work:(client:unknown)=>Promise<unknown>)=>{tenants.push(t);return work({query:async(sql:string,params:unknown[])=>{calls.push({sql,params});assert.deepEqual(params,['actor',t]);assert.match(sql,/ORDER BY .*created_at DESC/);return{rows:t==='a'?rows.slice(0,1):rows.slice(1)};}});}};
 return{controller:new Controller(db as unknown as DatabaseService,auth as unknown as AuthService),tenants,calls,rows};
}
for(const [name,Controller]of mineControllers){
 test(name+' orders real controller pg-shaped Dates newest first across distinct tenant slices',async()=>{
  const f=mineFixture(Controller,[new Date(older),new Date(newer)]),result=await f.controller.mine('Bearer fixture');
  assert.deepEqual(result.map(x=>x.id),['row-1','row-0']);assert.deepEqual(result.map(x=>x.tenantId),['b','a']);assert.deepEqual(f.tenants,['a','b']);
  assert.ok(f.rows[0]!.createdAt instanceof Date);assert.equal((f.rows[0]!.createdAt as Date).toISOString(),older);assert.equal(result[0]!.reason,'Original reason');
 });
 test(name+' retains scoped authority before SQL and nullable defensive ordering without altering projections',async()=>{
  const f=mineFixture(Controller,[null,new Date(newer),older]),result=await f.controller.mine('Bearer fixture');
  assert.deepEqual(result.map(x=>x.id),['row-1','row-2','row-0']);
  const scoped=mineFixture(Controller,[new Date(older),new Date(newer)]);assert.deepEqual((await scoped.controller.mine('Bearer fixture','a')).map(x=>x.id),['row-0']);assert.deepEqual(scoped.tenants,['a']);
  const denied=mineFixture(Controller,[]);await assert.rejects(denied.controller.mine('Bearer fixture','foreign'),(e:unknown)=>e instanceof UnauthorizedException);assert.deepEqual(denied.tenants,[]);
 });
}
function exceptionFixture(rows:Array<Record<string,unknown>>,role='owner'){
 const calls:Array<{sql:string;params:unknown[]}>=[],tenants:string[]=[];
 const auth={identityFromAuthorization:async()=>({id:'owner'}),requireMembership:async(_id:string,t:string)=>{if(t!=='a')throw new UnauthorizedException();return{role};}};
 const db={tenant:async(t:string,work:(client:unknown)=>Promise<unknown>)=>{tenants.push(t);return work({query:async(sql:string,params:unknown[])=>{calls.push({sql,params});assert.deepEqual(params,['a']);return{rows:sql.includes('FROM support_cases')?rows:[]};}});}};
 return{controller:new SupportController(db as unknown as DatabaseService,auth as unknown as AuthService),calls,tenants};
}
test('exceptions preserves overdue priority and orders equal-overdue Date rows oldest first',async()=>{
 const f=exceptionFixture([{id:'old',type:'support',priority:'normal',status:'open',createdAt:new Date(older)},{id:'new',type:'support',priority:'normal',status:'reviewing',createdAt:new Date(newer)}]);
 const result=await f.controller.exceptions('Bearer fixture','a');assert.deepEqual(result.map(x=>x.id),['old','new']);assert.ok(result.every(x=>x.overdue));assert.equal(result[0]!.targetMinutes,240);assert.equal(f.calls.length,3);
});
test('exceptions keeps a recent urgent item after an overdue normal item regardless of creation order',async()=>{
 const f=exceptionFixture([{id:'recent',type:'support',priority:'urgent',status:'open',createdAt:new Date()},{id:'overdue',type:'support',priority:'normal',status:'open',createdAt:new Date(older)}]);
 const result=await f.controller.exceptions('Bearer fixture','a');assert.deepEqual(result.map(x=>x.id),['overdue','recent']);assert.equal(result[0]!.overdue,true);assert.equal(result[1]!.overdue,false);assert.equal(result[1]!.targetMinutes,15);
});
test('exceptions preserves owner/admin authority and professional or cross-tenant denial before any query',async()=>{
 for(const role of ['owner','admin']){const f=exceptionFixture([],role);assert.deepEqual(await f.controller.exceptions('Bearer fixture','a'),[]);assert.deepEqual(f.tenants,['a']);}
 const denied=exceptionFixture([],'professional');await assert.rejects(denied.controller.exceptions('Bearer fixture','a'),(e:unknown)=>e instanceof ForbiddenException);assert.deepEqual(denied.tenants,[]);
 const foreign=exceptionFixture([]);await assert.rejects(foreign.controller.exceptions('Bearer fixture','b'),(e:unknown)=>e instanceof UnauthorizedException);assert.deepEqual(foreign.tenants,[]);
});
test('exceptions retains stable equal instants and unchanged ISO values across offsets',async()=>{
 const f=exceptionFixture([{id:'first',type:'support',priority:'normal',status:'open',createdAt:older},{id:'second',type:'support',priority:'normal',status:'open',createdAt:'2026-10-14T09:00:00-03:00'}]);
 const result=await f.controller.exceptions('Bearer fixture','a');assert.deepEqual(result.map(x=>x.id),['first','second']);assert.equal(result[1]!.createdAt,'2026-10-14T09:00:00-03:00');
});
