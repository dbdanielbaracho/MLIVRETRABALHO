import {verifyPlatformSupportDispatch} from './platform-support-dispatch-store.pg';
// Disposable PostgreSQL fixture invoked only by the guarded CI journey; no HTTP surface.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {randomUUID} from 'node:crypto';
import {Pool} from 'pg';
import {PlatformSupportStore} from './platform-support-store';
import {verifyPlatformSupportPrivacy} from './platform-support-privacy.pg';
import {verifyPlatformSupportOperator} from './platform-support-operator-store.pg';
export async function verifyPlatformSupportIntake(config:{databaseUrl:string}){
 const url=new URL(config.databaseUrl);
 assert.ok(['localhost','127.0.0.1','[::1]'].includes(url.hostname));assert.equal(url.pathname,'/mlivretrabalho_http');
 const pool=new Pool({connectionString:config.databaseUrl,max:4,connectionTimeoutMillis:5000}),schema='support_fixture_'+randomUUID().replaceAll('-','');
 const setup=await pool.connect();
 const owner=randomUUID(),foreign=randomUUID(),operator=randomUUID(),input={category:'other',description:'Synthetic platform request'};
 try{
  const peer=(setup as unknown as {connection:{stream:{remoteAddress?:string}}}).connection.stream.remoteAddress;assert.ok(peer&&['127.0.0.1','::1','::ffff:127.0.0.1'].includes(peer));
  assert.equal((await setup.query('SELECT current_database() name')).rows[0].name,'mlivretrabalho_http');
  await setup.query(`CREATE SCHEMA ${schema}`);await setup.query(`SET search_path TO ${schema},public`);
  await setup.query('CREATE TABLE identities(id uuid PRIMARY KEY,deactivated_at timestamptz)');
  await setup.query(readFileSync('packages/db/migrations/0074_platform_support_intake.sql','utf8'));
  await setup.query(readFileSync('packages/db/migrations/0075_platform_support_response_receipt.sql','utf8'));
  await setup.query(readFileSync('packages/db/migrations/0076_platform_support_dispatch.sql','utf8'));
  await setup.query('INSERT INTO identities(id) VALUES($1),($2),($3)',[owner,foreign,operator]);
  const db={transaction:async<T>(work:(c:import('pg').PoolClient)=>Promise<T>)=>{const c=await pool.connect();try{await c.query('BEGIN');await c.query(`SET LOCAL search_path TO ${schema},public`);const r=await work(c);await c.query('COMMIT');return r;}catch(e){await c.query('ROLLBACK');throw e;}finally{c.release();}}};
  const store=new PlatformSupportStore(db),error=(message:string)=>(e:unknown)=>e instanceof Error&&e.message===message;
  await assert.rejects(store.prepare(owner,input),error('platform_support_unavailable'));
  assert.equal((await setup.query('SELECT count(*)::int n FROM platform_support_intents')).rows[0].n,0);
  await setup.query('UPDATE platform_support_capability SET enabled=true');
  await assert.rejects(store.prepare(owner,input),error('platform_support_unavailable'));
  await setup.query('INSERT INTO platform_support_operators(identity_id,active) VALUES($1,true)',[operator]);
  await assert.rejects(store.prepare(owner,{...input,description:'\ud800'}),error('platform_support_input_invalid'));
  const prepared=await store.prepare(owner,input);assert.ok(prepared.requestKey);
  assert.equal((await setup.query('SELECT count(*)::int n FROM platform_support_cases')).rows[0].n,0);
  await assert.rejects(store.submit(foreign,prepared.requestKey,input),error('platform_support_not_found'));
  await assert.rejects(store.recover(foreign,prepared.requestKey),error('platform_support_not_found'));
  await assert.rejects(store.submit(owner,prepared.requestKey,{...input,description:'Different'}),error('platform_support_payload_conflict'));
  const results=await Promise.all([store.submit(owner,prepared.requestKey,input),store.submit(owner,prepared.requestKey,input)]);assert.deepEqual(results[0],results[1]);
  assert.equal((await setup.query('SELECT count(*)::int n FROM platform_support_cases')).rows[0].n,1);
  assert.equal((await setup.query("SELECT count(*)::int n FROM platform_support_audit WHERE action='submitted'")).rows[0].n,1);
  await setup.query('UPDATE platform_support_capability SET enabled=false');assert.deepEqual(await store.recover(owner,prepared.requestKey),results[0]);assert.deepEqual(await store.submit(owner,prepared.requestKey,input),results[0]);
  await assert.rejects(store.prepare(owner,input),error('platform_support_unavailable'));
  await setup.query('UPDATE platform_support_capability SET enabled=true');
  const fault=await store.prepare(owner,input);
  await setup.query("CREATE FUNCTION fail_audit() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RAISE EXCEPTION 'synthetic_audit_failure' USING ERRCODE='P0001'; END $$");
  await setup.query('CREATE TRIGGER fail_audit BEFORE INSERT ON platform_support_audit FOR EACH ROW EXECUTE FUNCTION fail_audit()');
  await assert.rejects(store.submit(owner,fault.requestKey,input));
  assert.equal((await setup.query('SELECT count(*)::int n FROM platform_support_cases WHERE id=$1',[fault.requestKey])).rows[0].n,0);assert.deepEqual(await store.recover(owner,fault.requestKey),{status:'prepared'});
  await setup.query('DROP TRIGGER fail_audit ON platform_support_audit');
  await setup.query("UPDATE platform_support_intents SET created_at=now()-interval '2 days',expires_at=now()-interval '1 day' WHERE request_key=$1",[fault.requestKey]);
  await assert.rejects(store.submit(owner,fault.requestKey,input),error('platform_support_intent_expired'));
  await assert.rejects(store.recover(owner,fault.requestKey),error('platform_support_intent_expired'));
  await setup.query('UPDATE platform_support_operators SET active=false');await assert.rejects(store.prepare(owner,input),error('platform_support_unavailable'));
  await setup.query('UPDATE identities SET deactivated_at=now() WHERE id=$1',[owner]);await assert.rejects(store.recover(owner,prepared.requestKey),error('platform_support_identity_required'));
  await setup.query('BEGIN');try{await setup.query('SET LOCAL ROLE app_runtime');await assert.rejects(setup.query('SELECT * FROM platform_support_cases'),(e:unknown)=>(e as {code:string}).code==='42501');}finally{await setup.query('ROLLBACK');}
  const policies=(await setup.query('SELECT relrowsecurity,relforcerowsecurity FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace WHERE n.nspname=$1 AND c.relkind=\'r\' AND c.relname LIKE \'platform_support_%\'',[schema])).rows;
  assert.equal(policies.length,8);assert.ok(policies.every(p=>p.relrowsecurity&&p.relforcerowsecurity));
  console.log('PLATFORM_SUPPORT_INTAKE_PG_PASS '+JSON.stringify({actualPostgreSQL:true,isolatedSchema:true,defaultDisabled:true,operatorRequired:true,ownerIsolation:true,concurrentReplaySingleCaseAndAudit:true,payloadConflict:true,auditFailureRollsBackCase:true,expiryAndRevocation:true,tenantRuntimeDenied:true,allEightTablesForcedRLS:true,http:false,operatorAPI:false,production:false}));
  await verifyPlatformSupportOperator(setup,db,store,owner,foreign,operator);
  await verifyPlatformSupportDispatch(setup,db,store,owner,foreign,operator);
  await verifyPlatformSupportPrivacy(setup,db,store,owner,foreign,operator);
 }finally{await setup.query('ROLLBACK').catch(()=>undefined);await setup.query('SET search_path TO public');await setup.query(`DROP SCHEMA IF EXISTS ${schema} CASCADE`);setup.release();await pool.end();}
}
