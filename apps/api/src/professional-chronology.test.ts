import {test} from 'node:test';
import assert from 'node:assert/strict';
import {UnauthorizedException} from '@nestjs/common';
import {WorkAssignmentsController} from './work-assignments.controller';
import {WorkPassportController} from './work-passport.controller';
import {EarningsController} from './earnings.controller';
import {compareTimestamp} from './timestamp-order';
import type {AuthService} from './auth.service';
import type {DatabaseService} from './database.service';
const {localConfiguration,requireLocalDatabasePeer}=require('../../../scripts/professional-chronology-e2e.cjs');
const local={CI:'true',DATABASE_URL:'postgresql://fixture:fixture@127.0.0.1:5432/mlivretrabalho_http',BASE_URL:'http://127.0.0.1:3000'};
test('chronology fixture requires CI and an exact disposable PostgreSQL database before connecting',()=>{
 assert.equal(localConfiguration(local).origin,local.BASE_URL);
 for(const CI of ['','false','production'])assert.throws(()=>localConfiguration({...local,CI}));
 for(const DATABASE_URL of ['postgresql://fixture:fixture@db.example:5432/mlivretrabalho_http','postgresql://fixture:fixture@localhost/mlivretrabalho_http','postgresql://fixture:fixture@localhost:5432/production','postgresql://fixture:fixture@localhost:5432/mlivretrabalho_http?host=remote','postgresql://fixture:fixture@localhost:5432/mlivretrabalho_http#ignored'])assert.throws(()=>localConfiguration({...local,DATABASE_URL}));
});
test('chronology fixture rejects external credentialed or non-origin HTTP targets',()=>{
 for(const BASE_URL of ['https://localhost:3000','http://api.example:3000','http://localhost','http://private@localhost:3000','http://localhost:3000/v1','http://localhost:3000/?override=1','http://localhost:3000/#fragment'])assert.throws(()=>localConfiguration({...local,BASE_URL}));
});
test('chronology database peer guard accepts CI container mapping only through a real loopback socket',()=>{
 for(const peer of ['127.0.0.1','::1','::ffff:127.0.0.1'])assert.doesNotThrow(()=>requireLocalDatabasePeer({name:'mlivretrabalho_http',address:'172.17.0.2'},peer));
 for(const peer of [undefined,null,'172.17.0.2','203.0.113.1','localhost'])assert.throws(()=>requireLocalDatabasePeer({name:'mlivretrabalho_http',address:'127.0.0.1'},peer));
 assert.throws(()=>requireLocalDatabasePeer({name:'production',address:'127.0.0.1'},'127.0.0.1'));
});

const older='2026-10-21T12:00:00.000Z',newer='2026-10-22T12:00:00.000Z';
const cases=[['assignments',WorkAssignmentsController,'startsAt','asc'],['passport',WorkPassportController,'completedAt','desc'],['earnings',EarningsController,'createdAt','desc']] as const;
function fixture(Controller:typeof cases[number][1],field:string,values:unknown[],split=1){
 const tenants:string[]=[],authCalls:(string|undefined)[]=[];
 const auth={identityFromAuthorization:async(a?:string)=>{authCalls.push(a);return{id:'actual-identity'};},memberships:async()=>[{tenant_id:'a',role:'professional'},{tenant_id:'company-only',role:'owner'},{tenant_id:'b',role:'professional'}],requireMembership:async(_id:string,t:string)=>{if(!['a','b'].includes(t))throw new UnauthorizedException();}};
 const rows=values.map((value,index)=>({id:'row-'+index,[field]:value,title:'Fixture '+index,amountCents:25000}));
 const db={query:async()=>({rows:[{id:'profile-id',display_name:'Professional'}]}),tenant:async(t:string,work:(db:unknown)=>Promise<unknown>)=>{
  tenants.push(t);return work({query:async(sql:string,params:unknown[])=>{
   const own=t==='a'?rows.slice(0,split):rows.slice(split);
   if(sql.startsWith('SELECT (SELECT count(*)')){assert.deepEqual(params,['profile-id',t,'completed']);return{rows:[{completed:String(own.length),rating_count:'0',rating_sum:'0'}]};}
   assert.ok(params.includes(t));return{rows:own};
  }});
 }};
 const controller=new Controller(db as unknown as DatabaseService,auth as unknown as AuthService);
 return{controller,tenants,authCalls,rows};
}
test('passport global fifty-entry limit retains the most recent instants across both bounded tenant slices',async()=>{
 const dates=Array.from({length:52},(_,i)=>new Date(Date.parse(older)+i*86400000));
 const f=fixture(WorkPassportController,'completedAt',dates,26),result=await f.controller.mine('Bearer fixture');
 assert.ok(!Array.isArray(result));
 assert.equal(result.completedWorkCount,52);assert.equal(result.verifiedHistory.length,50);
 assert.deepEqual(result.verifiedHistory.map((r:{id:string})=>r.id),Array.from({length:50},(_,i)=>'row-'+(51-i)));
});
for(const [name,Controller,field,direction]of cases){
 test(name+' sorts actual pg-shaped Date objects by epoch across tenant slices',async()=>{
  const f=fixture(Controller,field,[new Date(older),new Date(newer)]),result=await f.controller.mine('Bearer fixture');
  const rows=Array.isArray(result)?result:result.verifiedHistory;
  assert.deepEqual(rows.map((r:{id:string})=>r.id),direction==='asc'?['row-0','row-1']:['row-1','row-0']);
  assert.deepEqual(f.tenants,['a','b']);assert.deepEqual(f.authCalls,['Bearer fixture']);
  assert.equal(f.rows[0]?.[field] instanceof Date,true);assert.equal((f.rows[0]?.[field] as Date).toISOString(),older);
 });
 test(name+' retains optional-date nulls last and tenant authorization before querying',async()=>{
  const f=fixture(Controller,field,[null,new Date(older),new Date(newer)]),result=await f.controller.mine('Bearer fixture');
  const rows=Array.isArray(result)?result:result.verifiedHistory;
  assert.deepEqual(rows.map((r:{id:string})=>r.id),direction==='asc'?['row-1','row-2','row-0']:['row-2','row-1','row-0']);
  const denied=fixture(Controller,field,[new Date(older),new Date(newer)]);
  await assert.rejects(denied.controller.mine('Bearer fixture','foreign'),(e:unknown)=>e instanceof UnauthorizedException);assert.deepEqual(denied.tenants,[]);
 });
}
test('timestamp comparator preserves numeric epoch zero and pre-1970 instants before missing values',()=>{
 const values=[null,new Date(-1),new Date(0),undefined];
 assert.deepEqual([...values].sort((a,b)=>compareTimestamp(a,b,'asc')),[new Date(-1),new Date(0),null,undefined]);
 assert.deepEqual([...values].sort((a,b)=>compareTimestamp(a,b,'desc')),[new Date(0),new Date(-1),null,undefined]);
});
test('timestamp comparator compares equivalent offsets and mixed Date/ISO values by the same instant',()=>{
 assert.equal(compareTimestamp(new Date(older),'2026-10-21T09:00:00-03:00','asc'),0);
 assert.ok(compareTimestamp(new Date(older),newer,'asc')<0);assert.ok(compareTimestamp(older,new Date(newer),'desc')>0);
});
test('timestamp comparator keeps unavailable pairs stable without NaN ordering',()=>{
 assert.equal(compareTimestamp(null,undefined,'asc'),0);assert.equal(compareTimestamp(new Date(NaN),null,'desc'),0);
 assert.ok(compareTimestamp(new Date(0),null,'desc')<0);
});
