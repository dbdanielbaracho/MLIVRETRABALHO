import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {readFileSync} from 'node:fs';
import type {PoolClient} from 'pg';
// Called only after the intake fixture's loopback peer/database checks.
// Role, read ACLs and all synthetic rows exist only inside a rolled-back transaction.
// app_runtime ACLs are never changed. This is SQL read-policy proof, NOT API runtime proof.
export async function verifyPlatformSupportReadPolicies(c:PoolClient,schema:string){
 assert.match(schema,/^support_fixture_[a-f0-9]{32}$/);
 async function probe(fixed:boolean){
  const role='support_read_probe_'+randomUUID().replaceAll('-','');
  const owner=randomUUID(),other=randomUUID(),operator=randomUUID(),outsider=randomUUID(),id=randomUUID(),foreignId=randomUUID(),response=randomUUID();
  await c.query('BEGIN');
  try{
   await c.query(`CREATE ROLE ${role} NOLOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT NOBYPASSRLS`);
   await c.query('INSERT INTO identities(id) VALUES($1),($2),($3),($4)',[owner,other,operator,outsider]);
   await c.query('INSERT INTO platform_support_operators(identity_id,active) VALUES($1,true)',[operator]);
   await c.query('INSERT INTO platform_support_intents(request_key,owner_identity_id) VALUES($1,$2),($3,$4)',[id,owner,foreignId,other]);
   await c.query("INSERT INTO platform_support_cases(id,owner_identity_id,category,description) VALUES($1,$2,'other','Synthetic private request'),($3,$4,'privacy','Foreign private request')",[id,owner,foreignId,other]);
   await c.query('INSERT INTO platform_support_assignments(case_id,operator_identity_id) VALUES($1,$2)',[id,operator]);
   await c.query("INSERT INTO platform_support_responses(id,case_id,operator_identity_id,body) VALUES($1,$2,$3,'Synthetic private response')",[response,id,operator]);
   await c.query(`GRANT USAGE ON SCHEMA ${schema} TO ${role}`);
   await c.query(`GRANT SELECT(id,deactivated_at) ON identities TO ${role}`);
   await c.query(`GRANT SELECT ON platform_support_intents,platform_support_cases,platform_support_assignments,platform_support_operators,platform_support_responses TO ${role}`);
   const attrs=(await c.query('SELECT rolsuper,rolbypassrls,rolcanlogin FROM pg_roles WHERE rolname=$1',[role])).rows[0];
   assert.deepEqual(attrs,{rolsuper:false,rolbypassrls:false,rolcanlogin:false});
   assert.equal((await c.query('SELECT count(*)::int n FROM pg_class r JOIN pg_namespace n ON n.oid=r.relnamespace JOIN pg_roles p ON p.oid=r.relowner WHERE n.nspname=$1 AND p.rolname=$2',[schema,role])).rows[0].n,0);
   async function visible(identity:string){
    await c.query(`SET LOCAL ROLE ${role}`);await c.query('SET LOCAL row_security=on');
    await c.query("SELECT set_config('app.platform_support_identity',$1,true)",[identity]);
    assert.equal((await c.query('SELECT current_user name')).rows[0].name,role);
    const cases=(await c.query('SELECT id FROM platform_support_cases ORDER BY id')).rows.map(r=>r.id);
    const responses=(await c.query('SELECT id FROM platform_support_responses ORDER BY id')).rows.map(r=>r.id);
    const intents=(await c.query('SELECT request_key FROM platform_support_intents ORDER BY request_key')).rows.map(r=>r.request_key);
    await c.query('RESET ROLE');return {cases,responses,intents};
   }
   assert.deepEqual(await visible(owner),{cases:[id],responses:[response],intents:[id]});
   assert.deepEqual(await visible(other),{cases:[foreignId],responses:[],intents:[foreignId]});
   assert.deepEqual(await visible(operator),{cases:[id],responses:[response],intents:[]});
   for(const actor of [outsider,''])assert.deepEqual(await visible(actor),{cases:[],responses:[],intents:[]});
   await c.query('UPDATE identities SET deactivated_at=now() WHERE id=$1',[owner]);
   const deactivatedOwner=await visible(owner),assignedOperator=await visible(operator);
   assert.deepEqual(deactivatedOwner,fixed?{cases:[],responses:[],intents:[]}:{cases:[id],responses:[response],intents:[id]});
   assert.deepEqual(assignedOperator,fixed?{cases:[],responses:[],intents:[]}:{cases:[id],responses:[response],intents:[]});
   await c.query('UPDATE identities SET deactivated_at=NULL WHERE id=$1',[owner]);
   await c.query('UPDATE platform_support_assignments SET revoked_at=now() WHERE case_id=$1',[id]);
   assert.deepEqual(await visible(operator),{cases:[],responses:[],intents:[]});
   await c.query('UPDATE platform_support_assignments SET revoked_at=NULL WHERE case_id=$1',[id]);
   await c.query('UPDATE platform_support_operators SET active=false WHERE identity_id=$1',[operator]);
   assert.deepEqual(await visible(operator),{cases:[],responses:[],intents:[]});
   await c.query('UPDATE platform_support_operators SET active=true WHERE identity_id=$1',[operator]);
   await c.query('UPDATE identities SET deactivated_at=now() WHERE id=$1',[operator]);
   assert.deepEqual(await visible(operator),{cases:[],responses:[],intents:[]});
   // Read probe receives no mutation or audit ACL; tenant role remains denied.
   await c.query('SAVEPOINT deny_write');await c.query(`SET LOCAL ROLE ${role}`);
   await assert.rejects(c.query("UPDATE platform_support_cases SET description='Denied'"),(e:unknown)=>(e as {code:string}).code==='42501');
   await c.query('ROLLBACK TO SAVEPOINT deny_write');await c.query('RESET ROLE');
   await c.query('SAVEPOINT deny_audit');await c.query(`SET LOCAL ROLE ${role}`);
   await assert.rejects(c.query('SELECT * FROM platform_support_audit'),(e:unknown)=>(e as {code:string}).code==='42501');
   await c.query('ROLLBACK TO SAVEPOINT deny_audit');await c.query('RESET ROLE');
   await c.query('SAVEPOINT deny_tenant');await c.query('SET LOCAL ROLE app_runtime');
   await assert.rejects(c.query('SELECT * FROM platform_support_cases'),(e:unknown)=>(e as {code:string}).code==='42501');
   await c.query('ROLLBACK TO SAVEPOINT deny_tenant');await c.query('RESET ROLE');
  }finally{await c.query('ROLLBACK');}
  assert.equal((await c.query('SELECT count(*)::int n FROM pg_roles WHERE rolname=$1',[role])).rows[0].n,0);
  assert.equal((await c.query('SELECT count(*)::int n FROM identities WHERE id=$1',[owner])).rows[0].n,0);
 }
 await probe(false);
 console.log('PLATFORM_SUPPORT_READ_RLS_BASELINE_REPRODUCED '+JSON.stringify({deactivatedOwnerAndAssignedOperatorRead:true,original0074Policies:true,syntheticOnly:true}));
 await c.query(readFileSync('packages/db/migrations/0078_platform_support_active_requester_rls.sql','utf8'));
 await probe(true);
 console.log('PLATFORM_SUPPORT_READ_RLS_PG_PASS '+JSON.stringify({actualPostgreSQL:true,actualMigrationPolicies:true,nonOwnerNoLoginNoBypassRole:true,ownerAndAssignedOperatorPositiveReads:true,foreignAndMissingContextDenied:true,deactivatedRequesterHidden:true,revokedAssignmentAndOperatorDenied:true,responseInheritsCaseIsolation:true,readOnlyNoAuditACL:true,tenantACLDeniedUnchanged:true,probeRoleAndACLAndRowsRolledBack:true,apiRuntimeProof:false,operationalActivation:false,production:false}));
}
