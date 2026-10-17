'use strict';
// Disposable CI-only PostgreSQL failure injection. No product/migration trigger.
const assert=require('node:assert/strict');
const {createRequire}=require('node:module');
const {resolve}=require('node:path');
const {randomUUID,createHash}=require('node:crypto');
const {localConfiguration,requireLocalDatabasePeer}=require('./professional-chronology-e2e.cjs');
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
function scopeFor(value){
 for(const key of ['stamp','tenantId','ownerId','oldId'])assert.match(value[key],uuid,'Own fixture UUID required');
 assert.equal(value.email,'invitation-atomicity-target-'+value.stamp+'@example.test');
 const prefix='inv_atomicity_'+value.stamp.replaceAll('-','');
 return{...value,sequence:prefix+'_seq',fn:prefix+'_fn',trigger:prefix+'_trg'};
}
function requireBinding(scope,row){
 scopeFor(scope);
 assert.ok(row,'Owned invitation row required');
 for(const [field,expected]of [['id',scope.oldId],['tenant_id',scope.tenantId],['invited_by_identity_id',scope.ownerId],['email',scope.email],['role','manager']])assert.equal(row[field],expected,'HTTP/Postgres binding '+field);
 assert.equal(row.accepted_at,null);assert.equal(row.revoked_at,null);assert.ok(row.expires_at instanceof Date);
}
async function cleanupHook(db,scope,owned){
 const expected=scopeFor(scope);for(const key of ['sequence','fn','trigger'])assert.equal(scope[key],expected[key],'Owned cleanup identifier');const errors=[];
 for(const [flag,sql]of [
  ['trigger','DROP TRIGGER '+scope.trigger+' ON public.company_member_invitations'],
  ['fn','DROP FUNCTION public.'+scope.fn+'()'],
  ['sequence','DROP SEQUENCE public.'+scope.sequence]
 ]){
  if(!owned[flag])continue;
  try{await db.query(sql);owned[flag]=false;}catch(error){errors.push(error);}
 }
 if(errors.length)throw Error('Owned hook cleanup failed');
}
module.exports={scopeFor,requireBinding,cleanupHook};
async function main(){
 const config=localConfiguration(process.env);
 const {Client}=createRequire(resolve('apps/api/package.json'))('pg');
 const db=new Client({connectionString:config.databaseUrl});await db.connect();
 let scope;const owned={sequence:false,fn:false,trigger:false};
 try{
  const server=(await db.query('SELECT current_database() name,inet_server_addr()::text address')).rows[0];
  requireLocalDatabasePeer(server,db.connection.stream.remoteAddress);
  const stamp=randomUUID(),password='InvitationAtomicity123!';
  async function call(path,{method='GET',token,tenant,body,status=200}={}){
   assert.ok(path.startsWith('/v1/'));
   const response=await fetch(config.origin+path,{method,redirect:'error',signal:AbortSignal.timeout(15000),headers:{...(token?{authorization:'Bearer '+token}:{}),...(tenant?{'x-tenant-id':tenant}:{}),...(body!==undefined?{'content-type':'application/json'}:{})},...(body===undefined?{}:{body:JSON.stringify(body)})});
   const data=await response.json();assert.equal(response.status,status,'Actual HTTP '+method+' '+path);return data;
  }
  async function account(label,type){
   const email='invitation-atomicity-'+label+'-'+stamp+'@example.test';
   const signup=await call('/v1/auth/signup',{method:'POST',body:{email,password,accountType:type,...(type==='company'?{workspaceName:'Invitation atomicity '+label}:{})},status:201});
   const auth=await call('/v1/auth/signin',{method:'POST',body:{email,password},status:201});
   assert.equal(auth.identity.id,signup.id);
   return {identity:signup.id,tenant:signup.tenantId,token:auth.accessToken,email};
  }
  const a=await account('owner-a','company'),b=await account('owner-b','company'),target=await account('target','professional');
  assert.notEqual(a.tenant,b.tenant);
  const body={email:target.email,role:'manager'};
  const invite=async owner=>call('/v1/company/members/invitations',{method:'POST',token:owner.token,tenant:owner.tenant,body,status:201});
  const old=await invite(a),foreign=await invite(b);
  scope=scopeFor({stamp,tenantId:a.tenant,ownerId:a.identity,oldId:old.invitationId,email:target.email});
  const binding=(await db.query('SELECT * FROM company_member_invitations WHERE id=$1 AND tenant_id=$2',[scope.oldId,scope.tenantId])).rows[0];
  requireBinding(scope,binding);
  assert.equal(binding.token_hash,createHash('sha256').update(old.inviteCode).digest('hex'));
  const foreignRow=(await db.query('SELECT id FROM company_member_invitations WHERE id=$1 AND tenant_id=$2 AND invited_by_identity_id=$3 AND email=$4',[foreign.invitationId,b.tenant,b.identity,target.email])).rows;
  assert.equal(foreignRow.length,1,'Foreign positive control must be persisted');
  const snapshot=async()=>({
   invitations:(await db.query('SELECT * FROM company_member_invitations WHERE tenant_id=ANY($1::uuid[]) ORDER BY id',[[a.tenant,b.tenant]])).rows,
   memberships:(await db.query('SELECT * FROM tenant_memberships WHERE tenant_id=ANY($1::uuid[]) ORDER BY tenant_id,identity_id',[[a.tenant,b.tenant]])).rows
  });
  const security=async()=>({
   classes:(await db.query('SELECT relname,relrowsecurity,relforcerowsecurity,relacl::text FROM pg_class WHERE oid=ANY($1::regclass[]) ORDER BY relname',[['company_member_invitations','tenant_memberships']])).rows,
   policies:(await db.query("SELECT * FROM pg_policies WHERE schemaname='public' AND tablename=ANY($1::text[]) ORDER BY tablename,policyname",[['company_member_invitations','tenant_memberships']])).rows
  });
  const before=await snapshot(),beforeSecurity=await security();
  await db.query('CREATE SEQUENCE public.'+scope.sequence);owned.sequence=true;
  // Validated UUIDs and a derived example.test email only; no interpolated external input.
  await db.query(`CREATE FUNCTION public.${scope.fn}() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path=pg_catalog,public AS $fixture$
   DECLARE visible_rows integer;
   BEGIN
    IF NEW.tenant_id='${scope.tenantId}'::uuid AND NEW.invited_by_identity_id='${scope.ownerId}'::uuid AND NEW.email='${scope.email}' THEN
     SELECT count(*) INTO visible_rows FROM public.company_member_invitations
      WHERE tenant_id=NEW.tenant_id AND email=NEW.email AND
       ((id='${scope.oldId}'::uuid AND revoked_at IS NOT NULL AND accepted_at IS NULL) OR
        (id=NEW.id AND revoked_at IS NULL AND accepted_at IS NULL));
     IF visible_rows<>2 THEN RAISE EXCEPTION 'fixture_precondition_old_revocation_and_new_insert'; END IF;
     PERFORM pg_catalog.nextval('public.${scope.sequence}'::regclass);
     RAISE EXCEPTION 'fixture_invitation_insert_failure';
    END IF;
    RETURN NEW;
   END $fixture$`);owned.fn=true;
  await db.query('REVOKE ALL ON FUNCTION public.'+scope.fn+'() FROM PUBLIC');
  await db.query('CREATE TRIGGER '+scope.trigger+' AFTER INSERT ON public.company_member_invitations FOR EACH ROW EXECUTE FUNCTION public.'+scope.fn+'()');owned.trigger=true;
  await call('/v1/company/members/invitations',{method:'POST',token:a.token,tenant:a.tenant,body,status:500});
  const witness=(await db.query('SELECT last_value,is_called FROM public.'+scope.sequence)).rows[0];
  assert.equal(witness.is_called,true);assert.equal(String(witness.last_value),'1','Exactly one owned failure reached after both writes were visible');
  assert.deepEqual(await snapshot(),before,'Failed renewal must roll back BOTH prior revocation and new insertion');
  assert.deepEqual(await security(),beforeSecurity);
  const actual=await call('/v1/company/members/invitations',{token:a.token,tenant:a.tenant});
  assert.equal(actual.length,1);assert.equal(actual[0].id,old.invitationId);assert.equal(actual[0].revokedAt,null);assert.equal(actual[0].acceptedAt,null);
  console.log('INVITATION_INSERT_ROLLBACK_PASS '+JSON.stringify({realHTTP500:true,priorRevocationAndNewRowWitness:2,nonRollbackWitness:1,allTwoTenantInvitationsMembershipsUnchanged:true,policiesACLUnchanged:true}));
  await cleanupHook(db,scope,owned);
  // Explicit positive recovery request, not an automatic business retry.
  const renewed=await invite(a);assert.notEqual(renewed.invitationId,old.invitationId);
  const after=await snapshot();assert.equal(after.invitations.length,before.invitations.length+1);assert.deepEqual(after.memberships,before.memberships);
  const oldAfter=after.invitations.find(x=>x.id===old.invitationId),newAfter=after.invitations.find(x=>x.id===renewed.invitationId);
  assert.ok(oldAfter.revoked_at instanceof Date);assert.deepEqual({...oldAfter,revoked_at:binding.revoked_at},binding);
  assert.ok(newAfter&&newAfter.revoked_at===null&&newAfter.accepted_at===null);
  assert.equal(newAfter.token_hash,createHash('sha256').update(renewed.inviteCode).digest('hex'));
  assert.deepEqual(after.invitations.filter(x=>x.tenant_id===b.tenant),before.invitations.filter(x=>x.tenant_id===b.tenant));
  await call('/v1/company/members/invitations/accept',{method:'POST',token:target.token,body:{inviteCode:old.inviteCode},status:400});
  const accepted=await call('/v1/company/members/invitations/accept',{method:'POST',token:target.token,body:{inviteCode:renewed.inviteCode},status:201});
  assert.deepEqual(accepted,{accepted:true,tenantId:a.tenant,role:'manager'});
  const member=(await db.query('SELECT role FROM tenant_memberships WHERE tenant_id=$1 AND identity_id=$2',[a.tenant,target.identity])).rows;
  assert.equal(member.length,1);assert.equal(member[0].role,'manager');
  const final=await snapshot();assert.equal(final.memberships.length,before.memberships.length+1);
  for(const row of before.memberships)assert.deepEqual(final.memberships.find(x=>x.tenant_id===row.tenant_id&&x.identity_id===row.identity_id),row);
  assert.deepEqual(final.invitations.filter(x=>x.tenant_id===b.tenant),before.invitations.filter(x=>x.tenant_id===b.tenant));
  assert.deepEqual(final.memberships.filter(x=>x.tenant_id===b.tenant),before.memberships.filter(x=>x.tenant_id===b.tenant));
  assert.deepEqual(await security(),beforeSecurity);
  assert.equal((await db.query('SELECT to_regclass($1) object',['public.'+scope.sequence])).rows[0].object,null);
  assert.equal((await db.query('SELECT to_regprocedure($1) object',['public.'+scope.fn+'()'])).rows[0].object,null);
  assert.equal((await db.query('SELECT count(*)::int n FROM pg_trigger WHERE tgrelid=$1::regclass AND tgname=$2',['public.company_member_invitations',scope.trigger])).rows[0].n,0);
  console.log('INVITATION_ATOMICITY_HTTP_PG_PASS '+JSON.stringify({rollback:true,explicitRecoveryACK201:true,oneNewInvitation:true,oldCodeRejected400:true,newCodeAccepted201:true,actualManagerMembership:true,foreignUnchanged:true,ownedHookRemoved:true,productionOrNativeUI:false}));
 }finally{
  try{if(scope)await cleanupHook(db,scope,owned);}finally{await db.end();}
 }
}
if(require.main===module)main().catch(error=>{console.error('INVITATION_ATOMICITY_FAIL '+error.message);process.exitCode=1;});

