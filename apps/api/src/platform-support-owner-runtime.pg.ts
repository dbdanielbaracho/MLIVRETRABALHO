import {verifyPlatformSupportOwnerHTTP} from './platform-support-owner-http-runtime.pg';
import assert from 'node:assert/strict';
import {randomUUID,randomBytes} from 'node:crypto';
import type {PoolClient} from 'pg';
import {DatabaseService} from './database.service';
import {PlatformSupportOwnerStore} from './platform-support-owner-store';
// Guarded by the intake fixture: loopback peer, disposable database and UUID schema.
// A real non-superuser LOGIN is confined to this disposable schema, closed and dropped in finally.
export async function verifyPlatformSupportOwnerRuntime(setup:PoolClient,schema:string,databaseUrl:string,origin:string){
 assert.match(schema,/^support_fixture_[a-f0-9]{32}$/);
 const url=new URL(databaseUrl);assert.ok(['localhost','127.0.0.1','[::1]'].includes(url.hostname));assert.equal(url.pathname,'/mlivretrabalho_http');
 const role='support_owner_runtime_'+randomUUID().replaceAll('-',''),password=randomBytes(24).toString('hex');
 const owner=randomUUID(),other=randomUUID(),operator=randomUUID(),input={category:'other',description:'Synthetic restricted runtime request'};
 let runtime:DatabaseService|undefined,roleCreated=false,triggerCreated=false;
 const fault='owner_runtime_fault_'+randomUUID().replaceAll('-','');
 try{
  await setup.query(`CREATE ROLE ${role} LOGIN PASSWORD '${password}' NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT NOBYPASSRLS`);roleCreated=true;
  await setup.query(`GRANT USAGE ON SCHEMA ${schema} TO ${role}`);
  await setup.query(`GRANT SELECT(id,deactivated_at) ON identities TO ${role}`);
  await setup.query(`GRANT SELECT ON platform_support_intents,platform_support_cases,platform_support_assignments,platform_support_operators,platform_support_responses TO ${role}`);
  await setup.query(`GRANT INSERT(request_key,owner_identity_id,payload_hash),UPDATE(submitted_at) ON platform_support_intents TO ${role}`);
  await setup.query(`GRANT INSERT(id,owner_identity_id,category,description),UPDATE(status,closed_at,updated_at) ON platform_support_cases TO ${role}`);
  await setup.query(`GRANT INSERT(case_id,actor_identity_id,action) ON platform_support_audit TO ${role}`);
  await setup.query(`GRANT EXECUTE ON FUNCTION platform_support_lock_administrator(),platform_support_lock_owner_identity(),platform_support_intake_available(boolean) TO ${role}`);
  await setup.query('INSERT INTO identities(id) VALUES($1),($2),($3)',[owner,other,operator]);
  await setup.query('INSERT INTO platform_support_operators(identity_id,active) VALUES($1,true)',[operator]);
  await setup.query('UPDATE platform_support_capability SET enabled=true');
  const attrs=(await setup.query('SELECT rolsuper,rolbypassrls,rolcreaterole,rolcreatedb FROM pg_roles WHERE rolname=$1',[role])).rows[0];
  assert.deepEqual(attrs,{rolsuper:false,rolbypassrls:false,rolcreaterole:false,rolcreatedb:false});
  const functions=(await setup.query("SELECT p.prosecdef,p.proconfig,has_function_privilege('app_runtime',p.oid,'execute') AS tenant FROM pg_proc p JOIN pg_namespace n ON n.oid=p.pronamespace WHERE n.nspname=$1 AND p.proname IN('platform_support_lock_owner_identity','platform_support_intake_available') ORDER BY p.proname",[schema])).rows;
  assert.equal(functions.length,2);assert.ok(functions.every(f=>f.prosecdef&&f.proconfig.some((x:string)=>x.replace(/\s/g,'')==='search_path=pg_catalog,pg_temp')&&!f.tenant));
  // Use DatabaseService's actual Pool and transaction(), not a replacement transaction adapter.
  url.username=role;url.password=password;url.searchParams.set('options',`-c search_path=${schema},public -c statement_timeout=5000`);
  const prior=process.env.DATABASE_URL;
  try{process.env.DATABASE_URL=url.toString();runtime=new DatabaseService();}finally{if(prior===undefined)delete process.env.DATABASE_URL;else process.env.DATABASE_URL=prior;}
  const db=runtime!;
  const identity=await db.transaction(async c=>(await c.query('SELECT current_user AS actor,session_user AS login')).rows[0]);assert.deepEqual(identity,{actor:role,login:role});
  // Reproduce the lock/ACL obstacle without granting UPDATE on identity or capability.
  await assert.rejects(db.transaction(c=>c.query('SELECT id FROM identities WHERE id=$1 FOR SHARE',[owner])),(e:unknown)=>(e as {code:string}).code==='42501');
  console.log('PLATFORM_SUPPORT_OWNER_LOCK_ACL_REPRODUCED '+JSON.stringify({realDatabaseService:true,nonSuperuserLogin:true,identitySelectForShareDenied:true,noPermissionRelaxation:true}));
  for(const query of ["UPDATE identities SET deactivated_at=NULL","UPDATE platform_support_capability SET enabled=true","UPDATE platform_support_operators SET active=true","SELECT * FROM platform_support_administrators","SELECT * FROM platform_support_audit"])
   await assert.rejects(db.transaction(c=>c.query(query)),(e:unknown)=>(e as {code:string}).code==='42501');
  // Bounded helper locks preserve deactivation/intake serialization without UPDATE ACLs.
  await setup.query("SET lock_timeout='100ms'");
  try{
   await db.transaction(async c=>{
    await c.query("SELECT set_config('app.platform_support_identity',$1,true)",[owner]);
    assert.equal((await c.query('SELECT platform_support_intake_available(true) AS enabled')).rows[0].enabled,true);
    for(const [sql,values] of [
     ['UPDATE identities SET deactivated_at=now() WHERE id=$1',[owner]],
     ['UPDATE identities SET deactivated_at=now() WHERE id=$1',[operator]],
     ['UPDATE platform_support_operators SET active=false WHERE identity_id=$1',[operator]],
     ['UPDATE platform_support_capability SET enabled=false',[]]
    ] as [string,string[]][])await assert.rejects(setup.query(sql,values),(e:unknown)=>(e as {code:string}).code==='55P03');
   });
  }finally{await setup.query('SET lock_timeout=0');}
  const store=new PlatformSupportOwnerStore(db);
  const intent=await store.prepare(owner,input);assert.deepEqual(await store.recover(owner,intent.requestKey),{status:'prepared'});
  await assert.rejects(store.submit(other,intent.requestKey,input),/not_found/);
  const [one,two]=await Promise.all([store.submit(owner,intent.requestKey,input),store.submit(owner,intent.requestKey,input)]);assert.deepEqual(one,two);
  const listed=await store.list(owner,undefined,undefined);assert.equal(listed.acceptingRequests,true);assert.deepEqual(listed.items.map(r=>r.id),[one.id]);
  assert.deepEqual((await store.list(other,undefined,undefined)).items,[]);
  await assert.rejects(store.detail(other,one.id),/not_found/);assert.equal((await store.detail(owner,one.id)).description,input.description);
  await assert.rejects(store.withdraw(other,one.id),/not_found/);
  const recovered=await store.recover(owner,intent.requestKey);assert.equal(recovered.id,one.id);
  // RLS independently filters unqualified reads even without the store's owner WHERE clause.
  const raw=await db.transaction(async c=>{await c.query("SELECT set_config('app.platform_support_identity',$1,true)",[other]);return(await c.query('SELECT id FROM platform_support_cases')).rows;});assert.deepEqual(raw,[]);
  const pending=await store.prepare(owner,input);
  await setup.query(`CREATE FUNCTION ${fault}() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW.actor_identity_id='${owner}'::uuid AND NEW.action='submitted' THEN RAISE EXCEPTION 'synthetic_owner_runtime_audit_fault'; END IF; RETURN NEW; END $$`);
  await setup.query(`CREATE TRIGGER ${fault} BEFORE INSERT ON platform_support_audit FOR EACH ROW EXECUTE FUNCTION ${fault}()`);triggerCreated=true;
  await assert.rejects(store.submit(owner,pending.requestKey,input),/synthetic_owner_runtime_audit_fault/);
  assert.equal((await setup.query('SELECT count(*)::int n FROM platform_support_cases WHERE id=$1',[pending.requestKey])).rows[0].n,0);
  assert.deepEqual(await store.recover(owner,pending.requestKey),{status:'prepared'});
  await setup.query(`DROP TRIGGER ${fault} ON platform_support_audit`);triggerCreated=false;await setup.query(`DROP FUNCTION ${fault}()`);
  assert.equal((await store.submit(owner,pending.requestKey,input)).id,pending.requestKey);
  const withdrawn=await store.withdraw(owner,one.id);assert.equal(withdrawn.status,'withdrawn');assert.deepEqual(await store.withdraw(owner,one.id),withdrawn);
  await setup.query('UPDATE platform_support_capability SET enabled=false');assert.equal((await store.list(owner,undefined,undefined)).acceptingRequests,false);
  // Caller-writable temp names cannot shadow the qualified definer relations.
  await db.transaction(async c=>{
   await c.query("SELECT set_config('app.platform_support_identity',$1,true)",[owner]);
   await c.query('CREATE TEMP TABLE identities(id uuid,deactivated_at timestamptz) ON COMMIT DROP');
   await c.query('CREATE TEMP TABLE platform_support_capability(singleton boolean,enabled boolean) ON COMMIT DROP');
   await c.query('INSERT INTO platform_support_capability VALUES(true,true)');
   assert.equal((await c.query('SELECT platform_support_lock_owner_identity() AS active')).rows[0].active,true);
   assert.equal((await c.query('SELECT platform_support_intake_available(false) AS enabled')).rows[0].enabled,false);
  });
  await assert.rejects(store.prepare(owner,input),/unavailable/);assert.equal((await store.detail(owner,one.id)).id,one.id);
  await setup.query('UPDATE identities SET deactivated_at=now() WHERE id=$1',[owner]);await assert.rejects(store.detail(owner,one.id),/identity_required/);
  // Neither operation context nor rollback failure leaves an identity on the pooled connection.
  assert.equal((await db.transaction(c=>c.query("SELECT NULLIF(current_setting('app.platform_support_identity',true),'') AS actor"))).rows[0].actor,null);
  console.log('PLATFORM_SUPPORT_OWNER_RUNTIME_PG_PASS '+JSON.stringify({actualDatabaseServicePoolAndTransaction:true,nonSuperuserNonBypassLogin:true,noSetRoleFallback:true,ownerPrepareSubmitRecoverListDetailWithdraw:true,concurrentReplaySingleCase:true,rlsForeignUnfilteredReadDenied:true,auditFailureRollback:true,capabilityFalseHistoryOnly:true,deactivatedOwnerDenied:true,transactionContextCleared:true,noIdentityCapabilityOperatorUpdateACL:true,boundedLockFunctionsOnly:true,identityOperatorAndCapabilityLocksPreserved:true,tempShadowingDenied:true,httpRestrictedRuntimeProof:false,operatorAdminRestrictedRuntimeProof:false,operationalActivation:false,production:false}));
  await verifyPlatformSupportOwnerHTTP(setup,schema,databaseUrl,url.toString(),origin,operator);
 }finally{
  if(runtime)await runtime.onModuleDestroy();
  if(triggerCreated){await setup.query(`DROP TRIGGER IF EXISTS ${fault} ON platform_support_audit`);await setup.query(`DROP FUNCTION IF EXISTS ${fault}()`);}
  await setup.query('DELETE FROM platform_support_audit WHERE actor_identity_id=ANY($1::uuid[]) OR subject_identity_id=ANY($1::uuid[])',[[owner,other,operator]]);
  await setup.query('DELETE FROM platform_support_cases WHERE owner_identity_id=ANY($1::uuid[])',[[owner,other]]);
  await setup.query('DELETE FROM platform_support_intents WHERE owner_identity_id=ANY($1::uuid[])',[[owner,other]]);
  await setup.query('DELETE FROM platform_support_operators WHERE identity_id=$1',[operator]);
  await setup.query('DELETE FROM identities WHERE id=ANY($1::uuid[])',[[owner,other,operator]]);
  await setup.query('UPDATE platform_support_capability SET enabled=false');
  if(roleCreated){await setup.query(`DROP OWNED BY ${role}`);await setup.query(`DROP ROLE ${role}`);assert.equal((await setup.query('SELECT count(*)::int n FROM pg_roles WHERE rolname=$1',[role])).rows[0].n,0);}
 }
 console.log('PLATFORM_SUPPORT_OWNER_RUNTIME_CLEANUP_PASS '+JSON.stringify({ephemeralDatabaseLoginDropped:true,grantsRemoved:true,syntheticRowsRemoved:true,capabilityFalse:true,production:false}));
}
