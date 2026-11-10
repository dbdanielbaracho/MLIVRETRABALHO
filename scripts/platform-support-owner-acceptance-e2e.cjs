'use strict';
const assert=require('node:assert/strict'),{randomUUID}=require('node:crypto');
module.exports=async function({db,call,negative,account,company}){
 const actor=await account('platform-unlinked'),operator=await account('platform-fixture-operator'),input={category:'other',description:'Synthetic owned platform request'};
 const path='/v1/me/platform-support';
 assert.equal((await db.query('SELECT count(*)::int n FROM tenant_memberships WHERE identity_id=$1',[actor.id])).rows[0].n,0);
 assert.equal((await db.query('SELECT count(*)::int n FROM professional_profiles WHERE identity_id=$1',[actor.id])).rows[0].n,0);
 assert.deepEqual(await call(actor,'GET',path),{items:[],nextCursor:null,acceptingRequests:false});
 await negative(actor,'POST',path+'/intent',input,503);
 await db.query('INSERT INTO platform_support_operators(identity_id,active) VALUES($1,true)',[operator.id]);
 await db.query('UPDATE platform_support_capability SET enabled=true');
 try{
  const intent=await call(actor,'POST',path+'/intent',input);
  assert.deepEqual(await call(actor,'GET',path+'/recovery/'+intent.requestKey),{status:'prepared'});
  const submit=()=>call(actor,'POST',path,input,201,{'idempotency-key':intent.requestKey});
  const [one,two]=await Promise.all([submit(),submit()]);assert.deepEqual(one,two);
  assert.equal((await db.query("SELECT count(*)::int n FROM platform_support_audit WHERE case_id=$1 AND action='submitted'",[one.id])).rows[0].n,1);
  assert.deepEqual(await call(actor,'GET',path+'/recovery/'+intent.requestKey),one);
  const detail=await call(actor,'GET',path+'/'+one.id);assert.equal(detail.description,input.description);assert.deepEqual(detail.responses,[]);
  await db.query("INSERT INTO platform_support_responses(case_id,operator_identity_id,body) VALUES($1,$2,'Synthetic own-case response')",[one.id,operator.id]);
  const withResponse=await call(actor,'GET',path+'/'+one.id);assert.equal(withResponse.responses[0].body,'Synthetic own-case response');assert.equal(withResponse.responses[0].resolvesCase,false);assert.ok(!JSON.stringify(withResponse).includes(operator.id));
  await negative(company,'GET',path+'/'+one.id,undefined,404);await negative(company,'GET',path+'/recovery/'+intent.requestKey,undefined,404);
  await negative(company,'POST',path+'/'+one.id+'/withdraw',undefined,404);
  await negative(company,'GET',path+'/'+randomUUID(),undefined,404);
  await call(actor,'POST',path,{...input,description:'Different'},409,{'idempotency-key':intent.requestKey});
  await negative(actor,'POST',path+'/intent',{...input,owner_identity_id:company.id},400);
  const fault='platform_withdraw_'+randomUUID().replaceAll('-','');
  await db.query(`CREATE FUNCTION ${fault}() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW.case_id='${one.id}'::uuid AND NEW.action='withdrawn' THEN RAISE EXCEPTION 'synthetic_withdraw_audit_fault'; END IF; RETURN NEW; END $$`);
  await db.query(`CREATE TRIGGER ${fault} BEFORE INSERT ON platform_support_audit FOR EACH ROW EXECUTE FUNCTION ${fault}()`);
  try{await negative(actor,'POST',path+'/'+one.id+'/withdraw',undefined,500);assert.equal((await db.query('SELECT status FROM platform_support_cases WHERE id=$1',[one.id])).rows[0].status,'open');}
  finally{await db.query(`DROP TRIGGER ${fault} ON platform_support_audit`);await db.query(`DROP FUNCTION ${fault}()`);}
  const withdrawn=await call(actor,'POST',path+'/'+one.id+'/withdraw');assert.equal(withdrawn.status,'withdrawn');assert.deepEqual(await call(actor,'POST',path+'/'+one.id+'/withdraw'),withdrawn);
  assert.equal((await db.query("SELECT count(*)::int n FROM platform_support_audit WHERE case_id=$1 AND action='withdrawn'",[one.id])).rows[0].n,1);
  const fine=[];
  for(let i=1;i<=3;i++){const p=await call(actor,'POST',path+'/intent',input);const c=await call(actor,'POST',path,input,201,{'idempotency-key':p.requestKey});fine.push(c.id);await db.query("UPDATE platform_support_cases SET created_at='2026-01-01T00:00:00Z'::timestamptz+($2::int*interval '1 microsecond') WHERE id=$1",[c.id,i]);}
  const expected=(await db.query('SELECT id FROM platform_support_cases WHERE owner_identity_id=$1 ORDER BY created_at DESC,id DESC',[actor.id])).rows.map(r=>r.id),seen=[];
  let cursor=null;
  for(let i=0;i<10;i++){const page=await call(actor,'GET',path+'?limit=1'+(cursor?'&cursor='+encodeURIComponent(cursor):''));assert.equal(page.acceptingRequests,true);seen.push(...page.items.map(r=>r.id));cursor=page.nextCursor;if(cursor===null)break;}
  assert.deepEqual(seen,expected);assert.equal(new Set(seen).size,expected.length);assert.equal(seen.filter(id=>fine.includes(id)).length,3);
  assert.deepEqual((await call(company,'GET',path)).items,[]);
  for(const suffix of ['?limit=0','?limit=101','?limit=1&limit=2','?cursor=invalid'])await negative(actor,'GET',path+suffix,undefined,400);
  await db.query("UPDATE platform_support_intents SET created_at=now()-interval '2 days',expires_at=now()-interval '1 day' WHERE request_key=$1",[intent.requestKey]);
  await negative(actor,'GET',path+'/recovery/'+intent.requestKey,undefined,409);assert.equal((await call(actor,'GET',path+'/'+one.id)).id,one.id);
  await call(actor,'POST','/v1/auth/signout');await negative(actor,'GET',path,undefined,401);
 }finally{await db.query('UPDATE platform_support_capability SET enabled=false');await db.query('UPDATE platform_support_operators SET active=false WHERE identity_id=$1',[operator.id]);}
 console.log('PLATFORM_SUPPORT_OWNER_API_HTTP_PG_PASS '+JSON.stringify({actualHTTPPostgres:true,unlinkedWithoutProfile:true,capabilityDisabledByDefault:true,sessionRevocationDenied:true,companyAndForeignOwnerDenied:true,durableRecoveryNoResend:true,concurrentSubmitSingleCase:true,withdrawReplayAndAuditRollback:true,keysetMicrosecondsNoSkippedRows:true,operatorRoleAndCapabilityFixturesOnly:true,operationalActivation:false,production:false}));
};
