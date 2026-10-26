import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {randomUUID,randomBytes} from 'node:crypto';
import type {PoolClient} from 'pg';
import {DatabaseService} from './database.service';
import {PlatformSupportOperatorStore} from './platform-support-operator-store';
import {verifyPlatformSupportOperatorHTTP} from './platform-support-operator-http-runtime.pg';
// Only the existing guarded CI intake journey calls this on its disposable schema.
export async function verifyPlatformSupportOperatorRuntime(setup:PoolClient,schema:string,databaseUrl:string,origin:string){
 assert.match(schema,/^support_fixture_[a-f0-9]{32}$/);
 const url=new URL(databaseUrl);assert.ok(['localhost','127.0.0.1','[::1]'].includes(url.hostname));assert.equal(url.pathname,'/mlivretrabalho_http');
 const role='support_operator_runtime_'+randomUUID().replaceAll('-',''),password=randomBytes(24).toString('hex');
 const owner=randomUUID(),actor=randomUUID(),other=randomUUID(),caseId=randomUUID(),foreignCase=randomUUID(),fault='operator_runtime_fault_'+randomUUID().replaceAll('-','');
 let runtime:DatabaseService|undefined,created=false,trigger=false,stage='setup';
 try{
  await setup.query(`CREATE ROLE ${role} LOGIN PASSWORD '${password}' NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT NOBYPASSRLS`);created=true;
  await setup.query(`GRANT USAGE ON SCHEMA ${schema} TO ${role}`);
  await setup.query(`GRANT SELECT(id,deactivated_at) ON identities TO ${role}`);
  await setup.query(`GRANT SELECT ON platform_support_cases,platform_support_operators,platform_support_assignments,platform_support_responses TO ${role}`);
  await setup.query(`GRANT UPDATE(status,closed_at,updated_at) ON platform_support_cases TO ${role}`);
  await setup.query(`GRANT INSERT(request_key,case_id,operator_identity_id,body,resolves_case) ON platform_support_responses TO ${role}`);
  await setup.query(`GRANT INSERT(case_id,actor_identity_id,action) ON platform_support_audit TO ${role}`);
  await setup.query('INSERT INTO identities(id) VALUES($1),($2),($3)',[owner,actor,other]);
  await setup.query('INSERT INTO platform_support_operators(identity_id,active) VALUES($1,true),($2,true)',[actor,other]);
  for(const [id,operator]of [[caseId,actor],[foreignCase,other]]){
   await setup.query('INSERT INTO platform_support_intents(request_key,owner_identity_id) VALUES($1,$2)',[id,owner]);
   await setup.query("INSERT INTO platform_support_cases(id,owner_identity_id,category,description) VALUES($1,$2,'other','Synthetic restricted operator case')",[id,owner]);
   await setup.query('INSERT INTO platform_support_assignments(case_id,operator_identity_id) VALUES($1,$2)',[id,operator]);
  }
  url.username=role;url.password=password;url.searchParams.set('options',`-c search_path=${schema},public -c statement_timeout=5000`);
  const prior=process.env.DATABASE_URL;try{process.env.DATABASE_URL=url.toString();runtime=new DatabaseService();}finally{if(prior===undefined)delete process.env.DATABASE_URL;else process.env.DATABASE_URL=prior;}
  const db=runtime!,denied=(e:unknown)=>(e as {code:string}).code==='42501';
  assert.deepEqual((await db.query('SELECT current_user actor,session_user login')).rows[0],{actor:role,login:role});
  assert.deepEqual((await setup.query('SELECT rolsuper,rolbypassrls,rolcreaterole,rolcreatedb,rolinherit FROM pg_roles WHERE rolname=$1',[role])).rows[0],{rolsuper:false,rolbypassrls:false,rolcreaterole:false,rolcreatedb:false,rolinherit:false});
  const context=async<T>(work:(c:PoolClient)=>Promise<T>)=>db.transaction(async c=>{await c.query("SELECT set_config('app.platform_support_identity',$1,true)",[actor]);return work(c);});
  stage='baseline-before-migration';
  for(const sql of ['SELECT id FROM identities WHERE id=$1 AND deactivated_at IS NULL FOR SHARE','SELECT identity_id FROM platform_support_operators WHERE identity_id=$1 AND active FOR SHARE'])await assert.rejects(context(c=>c.query(sql,[actor])),denied);
  await assert.rejects(context(c=>c.query('SELECT case_id FROM platform_support_assignments WHERE case_id=$1 FOR SHARE',[caseId])),denied);
  await assert.rejects(context(c=>c.query('INSERT INTO platform_support_responses(request_key,case_id,operator_identity_id,body,resolves_case) VALUES($1,$2,$3,$4,false)',[randomUUID(),caseId,actor,'Pre-migration denied'])),denied);
  assert.equal((await context(c=>c.query("UPDATE platform_support_cases SET status='reviewing' WHERE id=$1 RETURNING id",[caseId]))).rowCount,0);
  console.log('PLATFORM_SUPPORT_OPERATOR_RUNTIME_BASELINE_REPRODUCED '+JSON.stringify({actualRestrictedLogin:true,identityRoleAssignmentLocks42501:true,responseInsert42501:true,caseUpdateRLSZero:true,beforeMigration0080:true}));
  await setup.query(readFileSync('packages/db/migrations/0080_platform_support_operator_runtime.sql','utf8'));
  await setup.query(`GRANT EXECUTE ON FUNCTION platform_support_lock_owner_identity(),platform_support_lock_operator(),platform_support_lock_assigned_case(uuid,boolean) TO ${role}`);
  for(const sql of ['UPDATE identities SET deactivated_at=NULL','UPDATE platform_support_operators SET active=true','UPDATE platform_support_assignments SET revoked_at=NULL','UPDATE platform_support_capability SET enabled=true','SELECT * FROM platform_support_administrators','SELECT * FROM public.sessions','SELECT * FROM platform_support_audit','UPDATE platform_support_cases SET owner_identity_id=owner_identity_id','DELETE FROM platform_support_responses'])await assert.rejects(db.transaction(c=>c.query(sql)),denied);
  stage='bounded-locks';await setup.query("SET lock_timeout='100ms'");
  try{await context(async c=>{
   assert.equal((await c.query('SELECT platform_support_lock_assigned_case($1,true) active',[caseId])).rows[0].active,true);
   for(const [sql,values]of [
    ['UPDATE identities SET deactivated_at=now() WHERE id=$1',[actor]],['UPDATE identities SET deactivated_at=now() WHERE id=$1',[owner]],
    ['UPDATE platform_support_operators SET active=false WHERE identity_id=$1',[actor]],['UPDATE platform_support_assignments SET revoked_at=now() WHERE case_id=$1',[caseId]],
    ["UPDATE platform_support_cases SET status='reviewing' WHERE id=$1",[caseId]]
   ] as [string,string[]][])await assert.rejects(setup.query(sql,values),(e:unknown)=>(e as {code:string}).code==='55P03');
   // The authorized lock is bounded to its case, not an entire queue.
   await setup.query("UPDATE platform_support_cases SET updated_at=now() WHERE id=$1",[foreignCase]);
  });}finally{await setup.query('SET lock_timeout=0');}
  stage='rls-independent-writes';
  assert.deepEqual((await context(c=>c.query('SELECT id FROM platform_support_cases'))).rows.map(r=>r.id),[caseId]);
  await assert.rejects(context(c=>c.query('INSERT INTO platform_support_responses(request_key,case_id,operator_identity_id,body,resolves_case) VALUES($1,$2,$3,$4,false)',[randomUUID(),foreignCase,actor,'Denied foreign response'])),denied);
  assert.equal((await context(c=>c.query("UPDATE platform_support_cases SET status='reviewing' WHERE id=$1 RETURNING id",[foreignCase]))).rowCount,0);
  await assert.rejects(context(c=>c.query('INSERT INTO platform_support_responses(request_key,case_id,operator_identity_id,body,resolves_case) VALUES($1,$2,$3,$4,false)',[randomUUID(),caseId,other,'Denied forged author'])),denied);
  stage='actual-operator-store';const store=new PlatformSupportOperatorStore(db);
  assert.equal((await store.detail(actor,caseId)).id,caseId);await assert.rejects(store.detail(other,caseId),/not_found/);
  assert.deepEqual((await store.list(actor,1,undefined)).items.map(r=>r.id),[caseId]);
  const reply={responseKey:randomUUID(),body:'Synthetic restricted reply',resolve:false};
  const pair=await Promise.all([store.respond(actor,caseId,reply),store.respond(actor,caseId,reply)]);assert.deepEqual(pair[0],pair[1]);
  assert.equal((await setup.query('SELECT count(*)::int n FROM platform_support_responses WHERE case_id=$1',[caseId])).rows[0]?.n,1);
  assert.equal((await setup.query("SELECT count(*)::int n FROM platform_support_audit WHERE case_id=$1 AND action='responded'",[caseId])).rows[0]?.n,1);
  await assert.rejects(store.respond(actor,caseId,{...reply,resolve:true}),/payload_conflict/);
  stage='audit-rollback';
  await setup.query(`CREATE FUNCTION ${fault}() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW.action='responded' THEN RAISE EXCEPTION 'synthetic_operator_runtime_audit_fault'; END IF; RETURN NEW; END $$`);
  await setup.query(`CREATE TRIGGER ${fault} BEFORE INSERT ON platform_support_audit FOR EACH ROW EXECUTE FUNCTION ${fault}()`);trigger=true;
  const closing={responseKey:randomUUID(),body:'Synthetic explicit resolution',resolve:true};
  await assert.rejects(store.respond(actor,caseId,closing),/synthetic_operator_runtime_audit_fault/);
  assert.equal((await setup.query('SELECT count(*)::int n FROM platform_support_responses WHERE request_key=$1',[closing.responseKey])).rows[0]?.n,0);
  assert.equal((await setup.query('SELECT status FROM platform_support_cases WHERE id=$1',[caseId])).rows[0]?.status,'reviewing');
  await setup.query(`DROP TRIGGER ${fault} ON platform_support_audit`);trigger=false;await setup.query(`DROP FUNCTION ${fault}()`);
  const resolved=await store.respond(actor,caseId,closing);assert.equal(resolved.resolvesCase,true);assert.deepEqual(await store.respond(actor,caseId,closing),resolved);
  await assert.rejects(store.respond(actor,caseId,{...reply,responseKey:randomUUID()}),/case_closed/);
  stage='revocation-and-shadowing';
  await setup.query('UPDATE platform_support_assignments SET revoked_at=now() WHERE case_id=$1',[caseId]);await assert.rejects(store.detail(actor,caseId),/not_found/);
  await context(async c=>{
   await c.query('CREATE TEMP TABLE platform_support_assignments(case_id uuid,operator_identity_id uuid,revoked_at timestamptz) ON COMMIT DROP');
   await c.query('INSERT INTO platform_support_assignments VALUES($1,$2,NULL)',[caseId,actor]);
   assert.equal((await c.query('SELECT platform_support_lock_assigned_case($1,true) active',[caseId])).rows[0].active,false);
  });
  await setup.query('UPDATE platform_support_assignments SET revoked_at=NULL WHERE case_id=$1',[caseId]);
  await setup.query('UPDATE platform_support_operators SET active=false WHERE identity_id=$1',[actor]);await assert.rejects(store.list(actor,1,undefined),/not_found/);
  await setup.query('UPDATE platform_support_operators SET active=true WHERE identity_id=$1',[actor]);
  await setup.query('UPDATE identities SET deactivated_at=now() WHERE id=$1',[owner]);await assert.rejects(store.detail(actor,caseId),/not_found/);
  await setup.query('UPDATE identities SET deactivated_at=NULL WHERE id=$1',[owner]);
  await setup.query('UPDATE identities SET deactivated_at=now() WHERE id=$1',[actor]);await assert.rejects(store.list(actor,1,undefined),/identity_required/);
  await setup.query('UPDATE identities SET deactivated_at=NULL WHERE id=$1',[actor]);
  assert.equal((await db.transaction(c=>c.query("SELECT NULLIF(current_setting('app.platform_support_identity',true),'') actor"))).rows[0]?.actor,null);
  console.log('PLATFORM_SUPPORT_OPERATOR_RUNTIME_PG_PASS '+JSON.stringify({actualDatabaseService:true,restrictedLoginNoSetRole:true,currentUserEqualsSessionUser:true,listDetailRespond:true,positiveReadWriteRLS:true,foreignAndForgedAuthorDenied:true,concurrentReplaySingleResponseAndAudit:true,auditFailureRollback:true,closedReplayOnly:true,revocationAndDeactivationDenied:true,locks55P03:true,boundedCaseLock:true,tempShadowingDenied:true,contextCleared:true,noIdentityRoleAssignmentCapabilityUpdateACL:true,adminRuntimeProof:false,operationalConfiguration:false,production:false}));
  stage='operator-http';await verifyPlatformSupportOperatorHTTP(setup,schema,databaseUrl,url.toString(),origin);
 }catch(e){console.error('PLATFORM_SUPPORT_OPERATOR_RUNTIME_DIAGNOSTIC '+JSON.stringify({stage,sqlstate:typeof(e as {code?:unknown})?.code==='string'?(e as {code:string}).code:null,assertion:e instanceof assert.AssertionError}));throw e;
 }finally{
  if(runtime)await runtime.onModuleDestroy();
  if(trigger){await setup.query(`DROP TRIGGER IF EXISTS ${fault} ON platform_support_audit`);await setup.query(`DROP FUNCTION IF EXISTS ${fault}()`);}
  await setup.query('DELETE FROM platform_support_audit WHERE actor_identity_id=ANY($1::uuid[]) OR case_id=ANY($2::uuid[])',[[actor,other,owner],[caseId,foreignCase]]);
  await setup.query('DELETE FROM platform_support_cases WHERE id=ANY($1::uuid[])',[[caseId,foreignCase]]);
  await setup.query('DELETE FROM platform_support_intents WHERE request_key=ANY($1::uuid[])',[[caseId,foreignCase]]);
  await setup.query('DELETE FROM platform_support_operators WHERE identity_id=ANY($1::uuid[])',[[actor,other]]);
  await setup.query('DELETE FROM identities WHERE id=ANY($1::uuid[])',[[actor,other,owner]]);
  if(created){await setup.query(`DROP OWNED BY ${role}`);await setup.query(`DROP ROLE ${role}`);assert.equal((await setup.query('SELECT count(*)::int n FROM pg_roles WHERE rolname=$1',[role])).rows[0]?.n,0);}
 }
 console.log('PLATFORM_SUPPORT_OPERATOR_RUNTIME_CLEANUP_PASS '+JSON.stringify({loginAndACLsDropped:true,syntheticPrivateRowsRemoved:true,noRealProvisioning:true,production:false}));
}
