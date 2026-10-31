import assert from 'node:assert/strict';
import {randomUUID,randomBytes} from 'node:crypto';
import {readFileSync} from 'node:fs';
import type {PoolClient} from 'pg';
import {DatabaseService} from './database.service';
// Called only inside the existing guarded loopback CI database and disposable schema.
// This proves bounded admin locks, not grant/assignment writes or admin HTTP runtime.
export async function verifyPlatformSupportAdminLocks(setup:PoolClient,schema:string,databaseUrl:string){
 assert.match(schema,/^support_fixture_[a-f0-9]{32}$/);
 const url=new URL(databaseUrl);assert.ok(['localhost','127.0.0.1','[::1]'].includes(url.hostname));assert.equal(url.pathname,'/mlivretrabalho_http');
 const login='support_admin_lock_'+randomUUID().replaceAll('-',''),password=randomBytes(24).toString('hex');
 const admin=randomUUID(),target=randomUUID(),ordinary=randomUUID(),unrelated=randomUUID(),ids=[admin,target,ordinary,unrelated];
 let db:DatabaseService|undefined,created=false,stage='setup';
 try{
  await setup.query(`CREATE ROLE ${login} LOGIN PASSWORD '${password}' NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT NOBYPASSRLS`);created=true;
  await setup.query(`GRANT USAGE ON SCHEMA ${schema} TO ${login}`);
  await setup.query(`GRANT SELECT(id,deactivated_at) ON identities TO ${login}`);
  await setup.query('INSERT INTO identities(id) SELECT unnest($1::uuid[])',[ids]);
  await setup.query('INSERT INTO platform_support_administrators(identity_id,active) VALUES($1,true)',[admin]);
  await setup.query('INSERT INTO platform_support_operators(identity_id,active) VALUES($1,true)',[ordinary]);
  url.username=login;url.password=password;url.searchParams.set('options',`-c search_path=${schema},public -c statement_timeout=5000`);
  const prior=process.env.DATABASE_URL;try{process.env.DATABASE_URL=url.toString();db=new DatabaseService();}finally{if(prior===undefined)delete process.env.DATABASE_URL;else process.env.DATABASE_URL=prior;}
  const runtime=db,denied=(e:unknown)=>(e as {code:string}).code==='42501',locked=(e:unknown)=>(e as {code:string}).code==='55P03';
  assert.deepEqual((await runtime.query('SELECT current_user actor,session_user login')).rows[0],{actor:login,login});
  assert.deepEqual((await setup.query('SELECT rolsuper,rolbypassrls,rolcreaterole,rolcreatedb,rolinherit FROM pg_roles WHERE rolname=$1',[login])).rows[0],{rolsuper:false,rolbypassrls:false,rolcreaterole:false,rolcreatedb:false,rolinherit:false});
  const as=async<T>(actor:string|null,work:(c:PoolClient)=>Promise<T>)=>runtime.transaction(async c=>{if(actor!==null)await c.query("SELECT set_config('app.platform_support_identity',$1,true)",[actor]);return work(c);});
  stage='baseline';
  for(const [sql,values]of [['SELECT id FROM identities WHERE id=$1 AND deactivated_at IS NULL FOR SHARE',[admin]],['SELECT deactivated_at FROM identities WHERE id=$1 FOR UPDATE',[target]],['SELECT identity_id FROM platform_support_administrators WHERE identity_id=$1 AND active FOR SHARE',[admin]]] as [string,string[]][])await assert.rejects(as(admin,c=>c.query(sql,values)),denied);
  console.log('PLATFORM_SUPPORT_ADMIN_LOCK_BASELINE_REPRODUCED '+JSON.stringify({actualRestrictedLogin:true,legacyActorAdminAndTargetQueries42501:true,before0081:true}));
  await setup.query(readFileSync('packages/db/migrations/0081_platform_support_admin_locks.sql','utf8'));
  await setup.query(`GRANT EXECUTE ON FUNCTION platform_support_lock_administrator(),platform_support_lock_role_target(uuid,boolean) TO ${login}`);
  const adminLock=(actor:string|null)=>as(actor,async c=>(await c.query('SELECT platform_support_lock_administrator() active')).rows[0].active as boolean);
  const targetLock=(actor:string|null,id:string|null,active:boolean|null)=>as(actor,async c=>(await c.query('SELECT platform_support_lock_role_target($1,$2) active',[id,active])).rows[0].active as boolean);
  stage='authority';assert.equal(await adminLock(admin),true);
  assert.equal(await adminLock(null),false);assert.equal(await adminLock(ordinary),false);assert.equal(await adminLock(target),false);
  assert.equal(await targetLock(admin,admin,true),false);assert.equal(await targetLock(admin,null,true),false);assert.equal(await targetLock(admin,target,null),false);assert.equal(await targetLock(admin,randomUUID(),true),false);
  assert.equal((await setup.query('SELECT count(*)::int n FROM platform_support_operators WHERE identity_id=$1',[target])).rows[0]?.n,0);
  assert.equal(await targetLock(admin,target,true),true);assert.equal(await targetLock(ordinary,target,true),false);
  // None of these helpers grant authority, return identity rows or write business data.
  for(const sql of ['UPDATE identities SET deactivated_at=NULL','UPDATE platform_support_administrators SET active=true','SELECT * FROM platform_support_administrators','UPDATE platform_support_operators SET active=true','UPDATE platform_support_assignments SET revoked_at=NULL','UPDATE platform_support_capability SET enabled=true','SELECT * FROM platform_support_cases','SELECT * FROM platform_support_audit','SELECT * FROM public.sessions'])await assert.rejects(as(admin,c=>c.query(sql)),denied);
  stage='locks';await setup.query("SET lock_timeout='100ms'");
  try{await as(admin,async c=>{
   assert.equal((await c.query('SELECT platform_support_lock_role_target($1,true) active',[target])).rows[0].active,true);
   for(const [sql,values]of [['UPDATE identities SET deactivated_at=now() WHERE id=$1',[admin]],['UPDATE platform_support_administrators SET active=false WHERE identity_id=$1',[admin]],['UPDATE identities SET deactivated_at=now() WHERE id=$1',[target]]] as [string,string[]][])await assert.rejects(setup.query(sql,values),locked);
   await assert.rejects(as(admin,async second=>{await second.query("SET LOCAL lock_timeout='100ms'");await second.query('SELECT platform_support_lock_role_target($1,true)',[target]);}),locked);
   await setup.query('UPDATE identities SET deactivated_at=now() WHERE id=$1',[unrelated]);
  });}finally{await setup.query('SET lock_timeout=0');}
  // The target lock is transaction scoped and works before the first operator row.
  await setup.query('UPDATE identities SET deactivated_at=now() WHERE id=$1',[target]);
  assert.equal(await targetLock(admin,target,true),false);assert.equal(await targetLock(admin,target,false),true);
  await setup.query('UPDATE identities SET deactivated_at=NULL WHERE id=$1',[target]);
  stage='revocation-and-shadowing';
  await setup.query('UPDATE platform_support_administrators SET active=false WHERE identity_id=$1',[admin]);
  assert.equal(await adminLock(admin),false);assert.equal(await targetLock(admin,target,false),false);
  await as(ordinary,async c=>{
   await c.query('CREATE TEMP TABLE platform_support_administrators(identity_id uuid,active boolean) ON COMMIT DROP');
   await c.query('INSERT INTO platform_support_administrators VALUES($1,true)',[ordinary]);
   assert.equal((await c.query('SELECT platform_support_lock_administrator() active')).rows[0].active,false);
   assert.equal((await c.query('SELECT platform_support_lock_role_target($1,true) active',[target])).rows[0].active,false);
  });
  await setup.query('UPDATE platform_support_administrators SET active=true WHERE identity_id=$1',[admin]);
  await setup.query('UPDATE identities SET deactivated_at=now() WHERE id=$1',[admin]);assert.equal(await adminLock(admin),false);assert.equal(await targetLock(admin,target,false),false);
  await setup.query('UPDATE identities SET deactivated_at=NULL WHERE id=$1',[admin]);
  await assert.rejects(as(admin,async c=>{assert.equal((await c.query('SELECT platform_support_lock_role_target($1,true) active',[target])).rows[0].active,true);throw Error('synthetic_admin_lock_rollback');}),/synthetic_admin_lock_rollback/);
  await setup.query('UPDATE identities SET deactivated_at=now() WHERE id=$1',[target]);await setup.query('UPDATE identities SET deactivated_at=NULL WHERE id=$1',[target]);
  assert.equal((await runtime.transaction(c=>c.query("SELECT NULLIF(current_setting('app.platform_support_identity',true),'') actor"))).rows[0]?.actor,null);
  assert.equal((await setup.query('SELECT count(*)::int n FROM platform_support_operators WHERE identity_id=$1',[target])).rows[0]?.n,0);
  assert.equal((await setup.query('SELECT count(*)::int n FROM platform_support_audit WHERE actor_identity_id=ANY($1::uuid[])',[ids])).rows[0]?.n,0);
  console.log('PLATFORM_SUPPORT_ADMIN_LOCK_RUNTIME_PG_PASS '+JSON.stringify({actualDatabaseService:true,currentUserEqualsRestrictedLogin:true,noSetRole:true,dedicatedActiveAdminOnly:true,ordinaryOperatorNotAdmin:true,selfAndUnknownDenied:true,targetBeforeRoleExists:true,deactivatedTargetGrantDeniedRevocationLockAllowed:true,actorAdminTargetLocks55P03:true,concurrentTargetSerialized:true,unrelatedIdentityNotBlocked:true,revocationDeactivationAndTempShadowDenied:true,rollbackReleasesLocks:true,contextCleared:true,noBusinessWritesOrAudit:true,noIdentityUpdateOrAdminReadACL:true,adminBusinessRuntimeProof:false,adminHTTPRuntimeProof:false,operationalConfiguration:false,production:false}));
 }catch(e){console.error('PLATFORM_SUPPORT_ADMIN_LOCK_DIAGNOSTIC '+JSON.stringify({stage,sqlstate:typeof(e as {code?:unknown})?.code==='string'?(e as {code:string}).code:null,assertion:e instanceof assert.AssertionError}));throw e;
 }finally{
  if(db)await db.onModuleDestroy();
  await setup.query('DELETE FROM platform_support_administrators WHERE identity_id=$1',[admin]);await setup.query('DELETE FROM platform_support_operators WHERE identity_id=$1',[ordinary]);await setup.query('DELETE FROM identities WHERE id=ANY($1::uuid[])',[ids]);
  if(created){await setup.query(`DROP OWNED BY ${login}`);await setup.query(`DROP ROLE ${login}`);assert.equal((await setup.query('SELECT count(*)::int n FROM pg_roles WHERE rolname=$1',[login])).rows[0]?.n,0);}
  assert.equal((await setup.query('SELECT count(*)::int n FROM identities WHERE id=ANY($1::uuid[])',[ids])).rows[0]?.n,0);
 }
 console.log('PLATFORM_SUPPORT_ADMIN_LOCK_CLEANUP_PASS '+JSON.stringify({loginACLsAndSyntheticRowsRemoved:true,poolClosed:true,noRealProvisioning:true}));
}
