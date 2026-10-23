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
 assert.ok(value.phase===undefined||value.phase==='accept'||value.phase==='promote','Known owned failure phase required');
 if(value.phase==='accept'||value.phase==='promote')assert.match(value.targetId,uuid,'HTTP acceptor UUID required');
 if(value.phase==='promote')assert.equal(value.priorRole,'manager','Exact HTTP-established prior role required');
 const prefix=(value.phase==='promote'?'inv_promote_':value.phase==='accept'?'inv_accept_':'inv_atomicity_')+value.stamp.replaceAll('-','');
 return{...value,sequence:prefix+'_seq',fn:prefix+'_fn',trigger:prefix+'_trg'};
}
function requireBinding(scope,row){
 scopeFor(scope);
 assert.ok(row,'Owned invitation row required');
 for(const [field,expected]of [['id',scope.oldId],['tenant_id',scope.tenantId],['invited_by_identity_id',scope.ownerId],['email',scope.email],['role',scope.phase==='promote'?'owner':'manager']])assert.equal(row[field],expected,'HTTP/Postgres binding '+field);
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
function requireAcceptanceBinding(scope,row,memberships){
 assert.equal(scope.phase,'accept');scopeFor(scope);requireBinding(scope,row);
 assert.equal(row.accepted_by_identity_id,null);
 assert.deepEqual(memberships,[],'No prior owned target membership before INSERT case');
}
function acceptanceFunctionSQL(scope){
 assert.equal(scope.phase,'accept');const expected=scopeFor(scope);
 for(const key of ['sequence','fn','trigger'])assert.equal(scope[key],expected[key],'Owned accept identifier');
 return `CREATE FUNCTION public.${scope.fn}() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path=pg_catalog,public AS $fixture$
  DECLARE visible_members integer; visible_invitations integer;
  BEGIN
   IF NEW.id='${scope.oldId}'::uuid AND NEW.tenant_id='${scope.tenantId}'::uuid AND NEW.invited_by_identity_id='${scope.ownerId}'::uuid AND NEW.email='${scope.email}' AND OLD.accepted_at IS NULL AND NEW.accepted_at IS NOT NULL AND NEW.accepted_by_identity_id='${scope.targetId}'::uuid THEN
    SELECT count(*) INTO visible_members FROM public.tenant_memberships
     WHERE tenant_id=NEW.tenant_id AND identity_id='${scope.targetId}'::uuid AND subject_id='${scope.targetId}'::uuid AND role='manager';
    SELECT count(*) INTO visible_invitations FROM public.company_member_invitations
     WHERE id=NEW.id AND tenant_id=NEW.tenant_id AND accepted_at IS NOT NULL AND accepted_by_identity_id='${scope.targetId}'::uuid AND revoked_at IS NULL;
    IF visible_members<>1 OR visible_invitations<>1 THEN RAISE EXCEPTION 'fixture_precondition_member_and_acceptance'; END IF;
    PERFORM pg_catalog.nextval('public.${scope.sequence}'::regclass);
    RAISE EXCEPTION 'fixture_invitation_accept_update_failure';
   END IF;
   RETURN NEW;
  END $fixture$`;
}
function requirePromotionBinding(scope,row,memberships){
 assert.equal(scope.phase,'promote');scopeFor(scope);requireBinding(scope,row);
 assert.equal(row.accepted_by_identity_id,null);assert.equal(memberships.length,1,'Exactly one existing HTTP-created manager membership required');
 const member=memberships[0];
 for(const [field,expected]of [['tenant_id',scope.tenantId],['identity_id',scope.targetId],['subject_id',scope.targetId],['role','manager']])assert.equal(member[field],expected,'Prior promotion membership binding '+field);
}
function promotionFunctionSQL(scope){
 assert.equal(scope.phase,'promote');const expected=scopeFor(scope);
 for(const key of ['sequence','fn','trigger'])assert.equal(scope[key],expected[key],'Owned promotion identifier');
 return `CREATE FUNCTION public.${scope.fn}() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path=pg_catalog,public AS $fixture$
  DECLARE visible_members integer; visible_invitations integer;
  BEGIN
   IF NEW.id='${scope.oldId}'::uuid AND NEW.tenant_id='${scope.tenantId}'::uuid AND NEW.invited_by_identity_id='${scope.ownerId}'::uuid AND NEW.email='${scope.email}' AND NEW.role='owner' AND OLD.accepted_at IS NULL AND NEW.accepted_at IS NOT NULL AND NEW.accepted_by_identity_id='${scope.targetId}'::uuid THEN
    SELECT count(*) INTO visible_members FROM public.tenant_memberships
     WHERE tenant_id=NEW.tenant_id AND identity_id='${scope.targetId}'::uuid AND subject_id='${scope.targetId}'::uuid AND role='owner';
    SELECT count(*) INTO visible_invitations FROM public.company_member_invitations
     WHERE id=NEW.id AND tenant_id=NEW.tenant_id AND role='owner' AND accepted_at IS NOT NULL AND accepted_by_identity_id='${scope.targetId}'::uuid AND revoked_at IS NULL;
    IF visible_members<>1 OR visible_invitations<>1 THEN RAISE EXCEPTION 'fixture_precondition_owner_and_acceptance'; END IF;
    PERFORM pg_catalog.nextval('public.${scope.sequence}'::regclass);
    RAISE EXCEPTION 'fixture_invitation_owner_promotion_failure';
   END IF;
   RETURN NEW;
  END $fixture$`;
}
module.exports={scopeFor,requireBinding,cleanupHook,requireAcceptanceBinding,acceptanceFunctionSQL,requirePromotionBinding,promotionFunctionSQL};
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
  const renewalScope=scope;
  // Explicit positive recovery request, not an automatic business retry.
  const renewed=await invite(a);assert.notEqual(renewed.invitationId,old.invitationId);
  const after=await snapshot();assert.equal(after.invitations.length,before.invitations.length+1);assert.deepEqual(after.memberships,before.memberships);
  const oldAfter=after.invitations.find(x=>x.id===old.invitationId),newAfter=after.invitations.find(x=>x.id===renewed.invitationId);
  assert.ok(oldAfter.revoked_at instanceof Date);assert.deepEqual({...oldAfter,revoked_at:binding.revoked_at},binding);
  assert.ok(newAfter&&newAfter.revoked_at===null&&newAfter.accepted_at===null);
  assert.equal(newAfter.token_hash,createHash('sha256').update(renewed.inviteCode).digest('hex'));
  assert.deepEqual(after.invitations.filter(x=>x.tenant_id===b.tenant),before.invitations.filter(x=>x.tenant_id===b.tenant));
  await call('/v1/company/members/invitations/accept',{method:'POST',token:target.token,body:{inviteCode:old.inviteCode},status:400});
  // A distinct late-write case: membership INSERT and accepted_at UPDATE must BOTH roll back.
  scope=scopeFor({stamp,tenantId:a.tenant,ownerId:a.identity,oldId:renewed.invitationId,email:target.email,phase:'accept',targetId:target.identity});
  const acceptBinding=(await db.query('SELECT * FROM company_member_invitations WHERE id=$1 AND tenant_id=$2',[scope.oldId,scope.tenantId])).rows[0];
  const priorTarget=(await db.query('SELECT * FROM tenant_memberships WHERE tenant_id=$1 AND identity_id=$2',[a.tenant,target.identity])).rows;
  requireAcceptanceBinding(scope,acceptBinding,priorTarget);
  assert.equal(acceptBinding.token_hash,createHash('sha256').update(renewed.inviteCode).digest('hex'));
  const beforeAccept=await snapshot();
  await db.query('CREATE SEQUENCE public.'+scope.sequence);owned.sequence=true;
  await db.query(acceptanceFunctionSQL(scope));owned.fn=true;
  await db.query('REVOKE ALL ON FUNCTION public.'+scope.fn+'() FROM PUBLIC');
  await db.query('CREATE TRIGGER '+scope.trigger+' AFTER UPDATE OF accepted_at ON public.company_member_invitations FOR EACH ROW EXECUTE FUNCTION public.'+scope.fn+'()');owned.trigger=true;
  await call('/v1/company/members/invitations/accept',{method:'POST',token:target.token,body:{inviteCode:renewed.inviteCode},status:500});
  const acceptWitness=(await db.query('SELECT last_value,is_called FROM public.'+scope.sequence)).rows[0];
  assert.equal(acceptWitness.is_called,true);assert.equal(String(acceptWitness.last_value),'1');
  assert.deepEqual(await snapshot(),beforeAccept,'Late accepted_at failure must undo membership AND invitation acceptance across full two-tenant snapshots');
  assert.deepEqual(await security(),beforeSecurity);
  const activeAfterFailure=await call('/v1/company/members/invitations',{token:a.token,tenant:a.tenant});
  const active=activeAfterFailure.find(x=>x.id===renewed.invitationId);
  assert.ok(active);assert.equal(active.acceptedAt,null);assert.equal(active.revokedAt,null);
  console.log('INVITATION_ACCEPT_UPDATE_ROLLBACK_PASS '+JSON.stringify({realHTTP500:true,membershipInsertAndAcceptedUpdateWitness:2,nonRollbackWitness:1,allTwoTenantRowsUnchanged:true,invitationStillActive:true,policiesACLUnchanged:true}));
  await cleanupHook(db,scope,owned);
  // One explicit accept after owned-hook removal, never an implicit client retry.
  const accepted=await call('/v1/company/members/invitations/accept',{method:'POST',token:target.token,body:{inviteCode:renewed.inviteCode},status:201});
  assert.deepEqual(accepted,{accepted:true,tenantId:a.tenant,role:'manager'});
  const member=(await db.query('SELECT role FROM tenant_memberships WHERE tenant_id=$1 AND identity_id=$2',[a.tenant,target.identity])).rows;
  assert.equal(member.length,1);assert.equal(member[0].role,'manager');
  const final=await snapshot();assert.equal(final.memberships.length,before.memberships.length+1);
  for(const row of before.memberships)assert.deepEqual(final.memberships.find(x=>x.tenant_id===row.tenant_id&&x.identity_id===row.identity_id),row);
  assert.deepEqual(final.invitations.filter(x=>x.tenant_id===b.tenant),before.invitations.filter(x=>x.tenant_id===b.tenant));
  assert.deepEqual(final.memberships.filter(x=>x.tenant_id===b.tenant),before.memberships.filter(x=>x.tenant_id===b.tenant));
  assert.deepEqual(await security(),beforeSecurity);
  const acceptedRow=final.invitations.find(x=>x.id===renewed.invitationId);
  assert.ok(acceptedRow.accepted_at instanceof Date);assert.equal(acceptedRow.accepted_by_identity_id,target.identity);
  assert.deepEqual({...acceptedRow,accepted_at:acceptBinding.accepted_at,accepted_by_identity_id:acceptBinding.accepted_by_identity_id},acceptBinding);
  for(const row of beforeAccept.invitations.filter(x=>x.id!==renewed.invitationId))assert.deepEqual(final.invitations.find(x=>x.id===row.id),row);
  await call('/v1/company/members/invitations/accept',{method:'POST',token:target.token,body:{inviteCode:renewed.inviteCode},status:400});
  assert.deepEqual(await snapshot(),final,'Consumed-code rejection may not add a second membership');
  assert.equal((await db.query('SELECT to_regclass($1) object',['public.'+scope.sequence])).rows[0].object,null);
  assert.equal((await db.query('SELECT to_regprocedure($1) object',['public.'+scope.fn+'()'])).rows[0].object,null);
  assert.equal((await db.query('SELECT count(*)::int n FROM pg_trigger WHERE tgrelid=$1::regclass AND tgname=$2',['public.company_member_invitations',scope.trigger])).rows[0].n,0);
  assert.equal((await db.query('SELECT to_regclass($1) object',['public.'+renewalScope.sequence])).rows[0].object,null);
  assert.equal((await db.query('SELECT to_regprocedure($1) object',['public.'+renewalScope.fn+'()'])).rows[0].object,null);
  assert.equal((await db.query('SELECT count(*)::int n FROM pg_trigger WHERE tgrelid=$1::regclass AND tgname=$2',['public.company_member_invitations',renewalScope.trigger])).rows[0].n,0);
  console.log('INVITATION_ACCEPT_ATOMICITY_HTTP_PG_PASS '+JSON.stringify({lateUpdateRollback:true,explicitSameCodeRecovery201:true,exactlyOneManagerMembership:true,consumedCodeRejected400:true,foreignUnchanged:true,bothOwnedHooksRemoved:true,productionOrNativeUI:false}));
  console.log('INVITATION_ATOMICITY_HTTP_PG_PASS '+JSON.stringify({rollback:true,explicitRecoveryACK201:true,oneNewInvitation:true,oldCodeRejected400:true,newCodeAccepted201:true,actualManagerMembership:true,foreignUnchanged:true,ownedHookRemoved:true,productionOrNativeUI:false}));
  // Independent UPDATE-membership path: existing manager was created by the HTTP accept above.
  const ownerInvite=await call('/v1/company/members/invitations',{method:'POST',token:a.token,tenant:a.tenant,body:{email:target.email,role:'owner'},status:201});
  assert.equal(ownerInvite.role,'owner');assert.notEqual(ownerInvite.invitationId,renewed.invitationId);
  scope=scopeFor({stamp,tenantId:a.tenant,ownerId:a.identity,oldId:ownerInvite.invitationId,email:target.email,phase:'promote',targetId:target.identity,priorRole:'manager'});
  const promotionBinding=(await db.query('SELECT * FROM company_member_invitations WHERE id=$1 AND tenant_id=$2',[scope.oldId,scope.tenantId])).rows[0];
  const managerRows=(await db.query('SELECT * FROM tenant_memberships WHERE tenant_id=$1 AND identity_id=$2',[a.tenant,target.identity])).rows;
  requirePromotionBinding(scope,promotionBinding,managerRows);
  assert.equal(promotionBinding.token_hash,createHash('sha256').update(ownerInvite.inviteCode).digest('hex'));
  const beforePromote=await snapshot();
  await db.query('CREATE SEQUENCE public.'+scope.sequence);owned.sequence=true;
  await db.query(promotionFunctionSQL(scope));owned.fn=true;
  await db.query('REVOKE ALL ON FUNCTION public.'+scope.fn+'() FROM PUBLIC');
  await db.query('CREATE TRIGGER '+scope.trigger+' AFTER UPDATE OF accepted_at ON public.company_member_invitations FOR EACH ROW EXECUTE FUNCTION public.'+scope.fn+'()');owned.trigger=true;
  await call('/v1/company/members/invitations/accept',{method:'POST',token:target.token,body:{inviteCode:ownerInvite.inviteCode},status:500});
  const promotionWitness=(await db.query('SELECT last_value,is_called FROM public.'+scope.sequence)).rows[0];
  assert.equal(promotionWitness.is_called,true);assert.equal(String(promotionWitness.last_value),'1');
  assert.deepEqual(await snapshot(),beforePromote,'Late acceptance failure must undo owner promotion and acceptance across all two-tenant rows');
  assert.deepEqual(await security(),beforeSecurity);
  const managerAfterFailure=(await call('/v1/company/members',{token:a.token,tenant:a.tenant})).find(x=>x.identityId===target.identity);
  assert.ok(managerAfterFailure);assert.equal(managerAfterFailure.role,'manager');
  const ownerStillActive=(await call('/v1/company/members/invitations',{token:a.token,tenant:a.tenant})).find(x=>x.id===scope.oldId);
  assert.ok(ownerStillActive);assert.equal(ownerStillActive.acceptedAt,null);assert.equal(ownerStillActive.revokedAt,null);
  console.log('INVITATION_PROMOTION_UPDATE_ROLLBACK_PASS '+JSON.stringify({realHTTP500:true,ownerAndAcceptedUpdateWitness:2,nonRollbackWitness:1,allTwoTenantRowsUnchanged:true,managerRoleRestored:true,ownerInvitationStillActive:true,policiesACLUnchanged:true}));
  await cleanupHook(db,scope,owned);
  // One explicitly separate recovery with the SAME code, never automatic retry or role seeding.
  const promoted=await call('/v1/company/members/invitations/accept',{method:'POST',token:target.token,body:{inviteCode:ownerInvite.inviteCode},status:201});
  assert.deepEqual(promoted,{accepted:true,tenantId:a.tenant,role:'owner'});
  const afterPromote=await snapshot();assert.equal(afterPromote.memberships.length,beforePromote.memberships.length);
  const promotedMember=afterPromote.memberships.find(x=>x.tenant_id===a.tenant&&x.identity_id===target.identity);
  assert.ok(promotedMember);assert.equal(promotedMember.role,'owner');assert.deepEqual({...promotedMember,role:'manager'},managerRows[0]);
  for(const row of beforePromote.memberships.filter(x=>!(x.tenant_id===a.tenant&&x.identity_id===target.identity)))assert.deepEqual(afterPromote.memberships.find(x=>x.id===row.id),row);
  const promotedInvitation=afterPromote.invitations.find(x=>x.id===scope.oldId);
  assert.ok(promotedInvitation.accepted_at instanceof Date);assert.equal(promotedInvitation.accepted_by_identity_id,target.identity);
  assert.deepEqual({...promotedInvitation,accepted_at:promotionBinding.accepted_at,accepted_by_identity_id:promotionBinding.accepted_by_identity_id},promotionBinding);
  for(const row of beforePromote.invitations.filter(x=>x.id!==scope.oldId))assert.deepEqual(afterPromote.invitations.find(x=>x.id===row.id),row);
  assert.equal(afterPromote.invitations.length,beforePromote.invitations.length);
  await call('/v1/company/members/invitations/accept',{method:'POST',token:target.token,body:{inviteCode:ownerInvite.inviteCode},status:400});
  assert.deepEqual(await snapshot(),afterPromote);assert.deepEqual(await security(),beforeSecurity);
  assert.equal((await db.query('SELECT to_regclass($1) object',['public.'+scope.sequence])).rows[0].object,null);
  assert.equal((await db.query('SELECT to_regprocedure($1) object',['public.'+scope.fn+'()'])).rows[0].object,null);
  assert.equal((await db.query('SELECT count(*)::int n FROM pg_trigger WHERE tgrelid=$1::regclass AND tgname=$2',['public.company_member_invitations',scope.trigger])).rows[0].n,0);
  console.log('INVITATION_PROMOTION_ATOMICITY_HTTP_PG_PASS '+JSON.stringify({existingManagerPromotionRollback:true,explicitSameCodeRecovery201:true,oneMembershipRoleDelta:true,consumedCodeRejected400:true,foreignAndOldRowsUnchanged:true,ownedHookRemoved:true,adminPathOrNativeUIOrProduction:false}));
 }finally{
  try{if(scope)await cleanupHook(db,scope,owned);}finally{await db.end();}
 }
}
if(require.main===module)main().catch(error=>{console.error('INVITATION_ATOMICITY_FAIL '+error.message);process.exitCode=1;});

