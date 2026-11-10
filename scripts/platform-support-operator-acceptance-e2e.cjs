'use strict';
const assert=require('node:assert/strict'),{randomUUID}=require('node:crypto');
// Only called after the established backend journey's local database/peer guards.
// Role and assignment rows below are synthetic setup, not an administrative API.
module.exports=async function({db,call,negative,account,company,foreign}){
 const requester=await account('platform-operator-requester'),operator=await account('platform-http-operator'),other=await account('platform-http-unassigned');
 const ownerPath='/v1/me/platform-support',operatorPath='/v1/platform-support/cases';
 const input={category:'app_access',description:'Synthetic operator API request'};
 const reply={responseKey:randomUUID(),body:'Synthetic platform answer',resolve:false};
 await db.query('INSERT INTO platform_support_operators(identity_id,active) VALUES($1,true),($2,true)',[operator.id,other.id]);
 await db.query('UPDATE platform_support_capability SET enabled=true');
 try{
  const intent=await call(requester,'POST',ownerPath+'/intent',input);
  const created=await call(requester,'POST',ownerPath,input,201,{'idempotency-key':intent.requestKey});
  const path=operatorPath+'/'+created.id;
  // Even a real company owner, another company and the requester lack platform authority.
  for(const actor of [company,foreign,requester,operator,other]){
   await negative(actor,'GET',path,undefined,404);
   await negative(actor,'POST',path+'/responses',reply,404);
  }
  await db.query('INSERT INTO platform_support_assignments(case_id,operator_identity_id) VALUES($1,$2)',[created.id,operator.id]);
  await db.query("INSERT INTO platform_support_audit(case_id,actor_identity_id,action) VALUES($1,$2,'assigned')",[created.id,operator.id]);
  const detail=await call(operator,'GET',path);assert.equal(detail.id,created.id);assert.equal(detail.description,input.description);assert.deepEqual(detail.responses,[]);
  assert.ok(!JSON.stringify(detail).includes(requester.id));assert.ok(!JSON.stringify(detail).includes(operator.id));
  await negative(other,'GET',path,undefined,404);await negative(other,'POST',path+'/responses',reply,404);
  await negative(operator,'GET',operatorPath+'/'+randomUUID(),undefined,404);
  await negative(operator,'GET',operatorPath+'/not-a-uuid',undefined,404);
  await negative(operator,'POST',path+'/responses',{...reply,operatorIdentityId:other.id},400);
  await negative(operator,'POST',path+'/responses',{...reply,body:'\ud800'},400);
  // Synthetic revocations must invalidate the next real HTTP request, including replay.
  await db.query('UPDATE platform_support_assignments SET revoked_at=now() WHERE case_id=$1',[created.id]);
  await negative(operator,'GET',path,undefined,404);await negative(operator,'POST',path+'/responses',reply,404);
  await db.query('UPDATE platform_support_assignments SET revoked_at=NULL WHERE case_id=$1',[created.id]);
  await db.query('UPDATE platform_support_operators SET active=false WHERE identity_id=$1',[operator.id]);
  await negative(operator,'GET',path,undefined,404);await negative(operator,'POST',path+'/responses',reply,404);
  await db.query('UPDATE platform_support_operators SET active=true WHERE identity_id=$1',[operator.id]);
  await db.query('UPDATE identities SET deactivated_at=now() WHERE id=$1',[requester.id]);
  await negative(operator,'GET',path,undefined,404);await negative(operator,'POST',path+'/responses',reply,404);
  await db.query('UPDATE identities SET deactivated_at=NULL WHERE id=$1',[requester.id]);
  const fault='platform_reply_'+randomUUID().replaceAll('-','');
  await db.query(`CREATE FUNCTION ${fault}() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW.case_id='${created.id}'::uuid AND NEW.action='responded' THEN RAISE EXCEPTION 'synthetic_reply_audit_fault'; END IF; RETURN NEW; END $$`);
  await db.query(`CREATE TRIGGER ${fault} BEFORE INSERT ON platform_support_audit FOR EACH ROW EXECUTE FUNCTION ${fault}()`);
  try{
   await negative(operator,'POST',path+'/responses',reply,500);
   assert.equal((await db.query('SELECT count(*)::int n FROM platform_support_responses WHERE case_id=$1',[created.id])).rows[0].n,0);
   assert.equal((await db.query('SELECT status FROM platform_support_cases WHERE id=$1',[created.id])).rows[0].status,'open');
  }finally{await db.query(`DROP TRIGGER ${fault} ON platform_support_audit`);await db.query(`DROP FUNCTION ${fault}()`);}
  const [one,two]=await Promise.all([call(operator,'POST',path+'/responses',reply),call(operator,'POST',path+'/responses',reply)]);assert.deepEqual(one,two);
  assert.equal(one.body,reply.body);assert.equal(one.resolvesCase,false);
  assert.equal((await db.query("SELECT count(*)::int n FROM platform_support_audit WHERE case_id=$1 AND action='responded'",[created.id])).rows[0].n,1);
  assert.equal((await call(requester,'GET',ownerPath+'/'+created.id)).responses[0].body,reply.body);
  assert.equal((await call(operator,'GET',path)).status,'reviewing');
  await negative(operator,'POST',path+'/responses',{...reply,body:'Different'},409);
  await negative(operator,'POST',path+'/responses',{...reply,resolve:true},409);
  const resolve={responseKey:randomUUID(),body:'Explicit synthetic resolution',resolve:true};
  const resolved=await call(operator,'POST',path+'/responses',resolve);assert.equal(resolved.resolvesCase,true);
  assert.deepEqual(await call(operator,'POST',path+'/responses',resolve),resolved);
  const closed=await call(operator,'GET',path);assert.equal(closed.status,'resolved');assert.ok(closed.closedAt);assert.equal(closed.responses.length,2);
  assert.deepEqual(await call(operator,'POST',path+'/responses',reply),one);
  await negative(operator,'POST',path+'/responses',{...reply,responseKey:randomUUID()},409);
  await db.query('UPDATE platform_support_assignments SET revoked_at=now() WHERE case_id=$1',[created.id]);
  await negative(operator,'POST',path+'/responses',resolve,404);
  await db.query('UPDATE platform_support_assignments SET revoked_at=NULL WHERE case_id=$1',[created.id]);
  await db.query('UPDATE identities SET deactivated_at=now() WHERE id=$1',[operator.id]);
  await negative(operator,'GET',path,undefined,401);
  await db.query('UPDATE identities SET deactivated_at=NULL WHERE id=$1',[operator.id]);
  await call(operator,'POST','/v1/auth/signout');await negative(operator,'GET',path,undefined,401);await negative(operator,'POST',path+'/responses',reply,401);
 }finally{
  await db.query('UPDATE platform_support_capability SET enabled=false');
  await db.query('UPDATE platform_support_operators SET active=false WHERE identity_id=ANY($1::uuid[])',[[operator.id,other.id]]);
 }
 console.log('PLATFORM_SUPPORT_OPERATOR_API_HTTP_PG_PASS '+JSON.stringify({actualHTTPPostgres:true,sessionBoundActor:true,companyAndForeignDenied:true,requesterNotOperator:true,unassignedRevokedInactiveDenied:true,requesterDeactivationDenied:true,sessionSignoutDenied:true,concurrentIdempotentResponse:true,explicitResolutionAndClosedReplay:true,auditFailureAtomicRollback:true,operatorRoleAndAssignmentFixturesOnly:true,administrativeAssignmentAuthority:false,positiveRuntimeRLSProof:false,operationalActivation:false,production:false}));
};
