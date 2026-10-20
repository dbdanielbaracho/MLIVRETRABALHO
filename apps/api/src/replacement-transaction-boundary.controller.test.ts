import {test} from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseService} from './database.service';
import {ReplacementController} from './replacement.controller';
import type {AuthService} from './auth.service';
const TENANT='11111111-2222-4333-8444-555555555555',REQUEST='66666666-7777-4888-8999-000000000000',ORIGINAL='99999999-2222-4333-8444-555555555555',PRO='aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee',JOB='bbbbbbbb-cccc-4ddd-8eee-ffffffffffff',NEW='cccccccc-dddd-4eee-8fff-000000000000';
function transactionFixture(stage?:string){
 const primary=Error('explicit '+stage+' error'),rollback=Error('explicit rollback error');
 const queries:Array<{sql:string;values:unknown[]}>=[],releases:Array<unknown>=[],authEvents:unknown[][]=[];
 let connects=0;
 const client={query:async(sql:string,values:unknown[]=[])=>{
  queries.push({sql,values});
  if(sql==='ROLLBACK')throw rollback;
  if(stage&&sql.startsWith(stage))throw primary;
  if(sql.startsWith('SELECT assignment_id'))return{rows:[{assignmentId:ORIGINAL}]};
  if(sql.startsWith('SELECT job_id'))return{rows:[{jobId:JOB,status:'confirmed',isOriginalProfessional:false}]};
  if(sql.startsWith('SELECT 1 FROM talent_pool_members')||sql.startsWith('SELECT 1 FROM professional_availability_network'))return{rows:[{}]};
  if(sql.startsWith('INSERT INTO work_assignments'))return{rows:[{id:NEW,status:'confirmed'}]};
  if(sql.startsWith('SELECT active_tenant_professional_identity'))return{rows:[{identityId:'trusted-recipient'}]};
  assert.ok(sql==='BEGIN'||sql==='COMMIT'||sql==='SET LOCAL ROLE app_runtime'||sql==="SELECT set_config('app.tenant_id',$1,true)"||sql.startsWith('UPDATE ')||sql.startsWith('INSERT INTO notifications'),'unexpected SQL '+sql);
  return{rows:[]};
 },release:(destroy?:unknown)=>{releases.push(destroy);}};
 const db=Object.create(DatabaseService.prototype) as DatabaseService;
 Object.defineProperty(db,'pool',{value:{connect:async()=>{connects++;return client;}}});
 const auth={identityFromAuthorization:async(a?:string)=>{authEvents.push(['identity',a]);return{id:'trusted-actor'};},requireMembership:async(actor:string,tenant:string)=>{authEvents.push(['membership',actor,tenant]);return{role:'owner'};}};
 return{controller:new ReplacementController(db,auth as unknown as AuthService),queries,releases,authEvents,primary,rollback,connects:()=>connects};
}
for(const stage of ['INSERT INTO work_assignments','INSERT INTO notifications','COMMIT'])test('actual replacement select plus tenant transaction preserves '+stage+' error through failed rollback without matched ACK',async()=>{
 const f=transactionFixture(stage);let ack:Awaited<ReturnType<ReplacementController['select']>>|undefined;
 await assert.rejects(async()=>{ack=await f.controller.select(REQUEST,{professionalId:PRO,tenantId:'forged',identityId:'forged'},'Bearer fixture',TENANT);},(error:unknown)=>error===f.primary);
 assert.equal(ack,undefined);assert.notEqual(f.primary,f.rollback);
 assert.equal(f.connects(),1,'no automatic retry or second connection');
 assert.deepEqual(f.releases,[true],'failed rollback discards exactly this connection once');
 assert.equal(f.queries.filter(q=>q.sql.startsWith(stage)).length,1);
 const index=f.queries.findIndex(q=>q.sql.startsWith(stage));
 assert.equal(index,f.queries.length-2,'only ROLLBACK may follow the primary failure');
 assert.equal(f.queries.at(-1)!.sql,'ROLLBACK');
 assert.deepEqual(f.queries[2]!.values,[TENANT]);
 assert.deepEqual(f.authEvents,[['identity','Bearer fixture'],['membership','trusted-actor',TENANT]]);
 assert.ok(f.queries.every(q=>!q.values.includes('forged')));
 // SQL/client/auth are explicit fixtures. No real PostgreSQL rollback, RLS enforcement, HTTP or notification delivery is claimed.
});
test('actual replacement select plus tenant transaction returns bound ACK only after successful COMMIT and ordinary release',async()=>{
 const f=transactionFixture();
 assert.deepEqual(await f.controller.select(REQUEST,{professionalId:PRO},'Bearer fixture',TENANT),{replacementRequestId:REQUEST,assignmentId:NEW,replacedAssignmentId:ORIGINAL,professionalId:PRO,status:'matched'});
 assert.equal(f.connects(),1);assert.deepEqual(f.releases,[undefined]);
 assert.equal(f.queries.at(-1)!.sql,'COMMIT');assert.equal(f.queries.some(q=>q.sql==='ROLLBACK'),false);
 assert.deepEqual(f.queries.find(q=>q.sql.startsWith('INSERT INTO work_assignments'))!.values,[TENANT,JOB,PRO]);
 assert.deepEqual(f.queries.find(q=>q.sql.startsWith('INSERT INTO notifications'))!.values,[TENANT,'trusted-recipient']);
});
