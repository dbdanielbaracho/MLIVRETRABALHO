'use strict';
const assert=require('node:assert/strict'),{randomUUID}=require('node:crypto');
module.exports=async function({db,call,negative,account,company,foreign}){
 const admin=await account('platform-admin-fixture'),operator=await account('platform-role-target'),requester=await account('platform-admin-requester');
 const root='/v1/platform-support/admin',role=root+'/operators/'+operator.id,own='/v1/me/platform-support',input={category:'other',description:'Synthetic administrator journey'};
 const grant={active:true,expectedRevision:0};
 for(const actor of [company,foreign,operator,admin])await negative(actor,'POST',role,grant,403);
 // This one bootstrap row exists only in the guarded disposable CI database.
 await db.query('INSERT INTO platform_support_administrators(identity_id,active) VALUES($1,true)',[admin.id]);
 try{
  const [one,two]=await Promise.all([call(admin,'POST',role,grant),call(admin,'POST',role,grant)]);assert.deepEqual(one,two);assert.equal(one.active,true);assert.equal(one.revision,1);
  assert.equal((await db.query("SELECT count(*)::int n FROM platform_support_audit WHERE action='operator_granted' AND subject_identity_id=$1",[operator.id])).rows[0].n,1);
  await negative(operator,'POST',role,{active:false,expectedRevision:1},403);
  await negative(admin,'POST',root+'/operators/'+admin.id,grant,403);
  await negative(admin,'POST',role,{...grant,actor:company.id},400);
  await db.query('UPDATE platform_support_capability SET enabled=true');
  const intent=await call(requester,'POST',own+'/intent',input),created=await call(requester,'POST',own,input,201,{'idempotency-key':intent.requestKey});
  const assignment=root+'/cases/'+created.id+'/assignment',assign={targetOperatorId:operator.id,expectedRevision:0},detail='/v1/platform-support/cases/'+created.id;
  for(const actor of [company,foreign,operator])await negative(actor,'POST',assignment,assign,403);
  const assigned=await call(admin,'POST',assignment,assign);assert.equal(assigned.revision,1);assert.deepEqual(await call(admin,'POST',assignment,assign),assigned);
  assert.equal((await call(operator,'GET',detail)).id,created.id);
  await negative(admin,'POST',assignment,{targetOperatorId:null,expectedRevision:0},409);
  const fault='role_fault_'+randomUUID().replaceAll('-','');
  await db.query(`CREATE FUNCTION ${fault}() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW.action='operator_revoked' AND NEW.subject_identity_id='${operator.id}'::uuid THEN RAISE EXCEPTION 'synthetic_role_audit_fault'; END IF; RETURN NEW; END $$`);
  await db.query(`CREATE TRIGGER ${fault} BEFORE INSERT ON platform_support_audit FOR EACH ROW EXECUTE FUNCTION ${fault}()`);
  try{await negative(admin,'POST',role,{active:false,expectedRevision:1},500);assert.equal((await call(operator,'GET',detail)).id,created.id);assert.equal((await db.query('SELECT revision FROM platform_support_assignments WHERE case_id=$1',[created.id])).rows[0].revision,1);}
  finally{await db.query(`DROP TRIGGER ${fault} ON platform_support_audit`);await db.query(`DROP FUNCTION ${fault}()`);}
  const revoked=await call(admin,'POST',role,{active:false,expectedRevision:1});assert.equal(revoked.revision,2);assert.deepEqual(await call(admin,'POST',role,{active:false,expectedRevision:1}),revoked);
  await negative(operator,'GET',detail,undefined,404);
  await negative(operator,'POST',detail+'/responses',{responseKey:randomUUID(),body:'Denied',resolve:false},404);
  const regranted=await call(admin,'POST',role,{active:true,expectedRevision:2});assert.equal(regranted.revision,3);
  await negative(operator,'GET',detail,undefined,404); // Old assignment never resurrects.
  await negative(admin,'POST',role,{active:false,expectedRevision:1},409);
  assert.equal((await call(admin,'POST',assignment,{...assign,expectedRevision:2})).revision,3);
  assert.equal((await call(operator,'GET',detail)).id,created.id);
  const withdrawn=await call(admin,'POST',assignment,{targetOperatorId:null,expectedRevision:3});assert.equal(withdrawn.revision,4);await negative(operator,'GET',detail,undefined,404);
  const audits=(await db.query("SELECT actor_identity_id,subject_identity_id FROM platform_support_audit WHERE subject_identity_id=$1 AND action IN('operator_granted','operator_revoked')",[operator.id])).rows;assert.equal(audits.length,3);assert.ok(audits.every(x=>x.actor_identity_id===admin.id));
  await db.query('UPDATE platform_support_administrators SET active=false WHERE identity_id=$1',[admin.id]);await negative(admin,'POST',role,{active:false,expectedRevision:3},403);
  await db.query('UPDATE platform_support_administrators SET active=true WHERE identity_id=$1',[admin.id]);
  await db.query('UPDATE identities SET deactivated_at=now() WHERE id=$1',[admin.id]);await negative(admin,'POST',role,{active:false,expectedRevision:3},401);
  await db.query('UPDATE identities SET deactivated_at=NULL WHERE id=$1',[admin.id]);
  await call(admin,'POST','/v1/auth/signout');await negative(admin,'POST',role,{active:false,expectedRevision:3},401);
 }finally{await db.query('UPDATE platform_support_capability SET enabled=false');await db.query('UPDATE platform_support_administrators SET active=false WHERE identity_id=$1',[admin.id]);await db.query('UPDATE platform_support_operators SET active=false WHERE identity_id=$1',[operator.id]);}
 console.log('PLATFORM_SUPPORT_ADMIN_API_HTTP_PG_PASS '+JSON.stringify({actualHTTPPostgres:true,sessionBoundDedicatedAdministrator:true,twoCompaniesAndOperatorDenied:true,concurrentRoleGrantSingleAudit:true,assignmentCAS:true,roleRevocationAtomicAllAssignments:true,regrantDoesNotResurrect:true,auditFailureRollsBackRoleAndAssignment:true,actorAndSubjectAudit:true,revokedDeactivatedAndSignedOutDenied:true,bootstrapSyntheticOnly:true,positiveRuntimeRLSProof:false,operationalActivation:false,production:false}));
};
