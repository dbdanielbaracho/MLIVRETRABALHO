'use strict';
const assert=require('node:assert/strict'),{randomUUID}=require('node:crypto');
module.exports=async function({db,call,negative,account,company,foreign}){
 const admin=await account('queue-admin-fixture'),operator=await account('queue-operator-a'),other=await account('queue-operator-b'),requester=await account('queue-requester');
 const path='/v1/platform-support/cases',root='/v1/platform-support/admin',own='/v1/me/platform-support',input={category:'other',description:'Synthetic private queue body'};
 await db.query('INSERT INTO platform_support_administrators(identity_id,active) VALUES($1,true)',[admin.id]);
 try{
  for(const op of [operator,other])await call(admin,'POST',root+'/operators/'+op.id,{active:true,expectedRevision:0});
  await db.query('UPDATE platform_support_capability SET enabled=true');
  assert.deepEqual(await call(operator,'GET',path),{items:[],nextCursor:null});
  for(const actor of [company,foreign,requester,admin])await negative(actor,'GET',path,undefined,404);
  const ids=[];
  async function create(target){const p=await call(requester,'POST',own+'/intent',input),c=await call(requester,'POST',own,input,201,{'idempotency-key':p.requestKey});if(target)await call(admin,'POST',root+'/cases/'+c.id+'/assignment',{targetOperatorId:target.id,expectedRevision:0});return c.id;}
  for(let i=0;i<22;i++){const id=await create(operator);ids.push(id);await db.query("UPDATE platform_support_cases SET created_at='2026-01-01T00:00:00Z'::timestamptz+($2::int*interval '1 microsecond') WHERE id=$1",[id,Math.floor(i/2)]);}
  const otherId=await create(other),unassigned=await create(null);
  await db.query('UPDATE platform_support_capability SET enabled=false');
  const expected=(await db.query('SELECT id FROM platform_support_cases WHERE id=ANY($1::uuid[]) ORDER BY created_at DESC,id DESC',[ids])).rows.map(x=>x.id);
  const initial=await call(operator,'GET',path);assert.equal(initial.items.length,20);assert.ok(initial.nextCursor);
  const all=await call(operator,'GET',path+'?limit=100');assert.deepEqual(all.items.map(x=>x.id),expected);assert.equal(all.nextCursor,null);
  assert.ok(all.items.every(x=>!Object.hasOwn(x,'description')&&!Object.hasOwn(x,'responses')&&!Object.hasOwn(x,'cursorAt')));
  for(const identity of [admin,operator,other,requester])assert.ok(!JSON.stringify(all).includes(identity.id));
  const seen=[];let cursor=null;
  for(let i=0;i<30;i++){const p=await call(operator,'GET',path+'?limit=1'+(cursor?'&cursor='+encodeURIComponent(cursor):''));seen.push(...p.items.map(x=>x.id));cursor=p.nextCursor;if(cursor===null)break;}
  assert.deepEqual(seen,expected);assert.equal(new Set(seen).size,22);assert.ok(!seen.includes(otherId)&&!seen.includes(unassigned));
  assert.deepEqual((await call(other,'GET',path)).items.map(x=>x.id),[otherId]);
  for(const suffix of ['?limit=0','?limit=101','?limit=1&limit=2','?cursor=invalid','?cursor='+Buffer.from(JSON.stringify(['2026-02-30T00:00:00.000000Z',randomUUID()])).toString('base64url')])await negative(operator,'GET',path+suffix,undefined,400);
  const before=(await db.query("SELECT count(*)::int n FROM platform_support_audit WHERE actor_identity_id=$1 AND action='read'",[operator.id])).rows[0].n,fault='queue_fault_'+randomUUID().replaceAll('-','');
  await db.query(`CREATE FUNCTION ${fault}() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW.case_id='${expected[1]}'::uuid AND NEW.actor_identity_id='${operator.id}'::uuid AND NEW.action='read' THEN RAISE EXCEPTION 'synthetic_queue_read_audit_fault'; END IF; RETURN NEW; END $$`);
  await db.query(`CREATE TRIGGER ${fault} BEFORE INSERT ON platform_support_audit FOR EACH ROW EXECUTE FUNCTION ${fault}()`);
  try{await negative(operator,'GET',path+'?limit=3',undefined,500);assert.equal((await db.query("SELECT count(*)::int n FROM platform_support_audit WHERE actor_identity_id=$1 AND action='read'",[operator.id])).rows[0].n,before);}
  finally{await db.query(`DROP TRIGGER ${fault} ON platform_support_audit`);await db.query(`DROP FUNCTION ${fault}()`);}
  const first=await call(operator,'GET',path+'?limit=1'),removed=expected[1];
  await call(admin,'POST',root+'/cases/'+removed+'/assignment',{targetOperatorId:null,expectedRevision:1});
  const remaining=await call(operator,'GET',path+'?limit=100&cursor='+encodeURIComponent(first.nextCursor));assert.deepEqual(remaining.items.map(x=>x.id),expected.slice(1).filter(id=>id!==removed));
  await db.query('UPDATE identities SET deactivated_at=now() WHERE id=$1',[requester.id]);assert.deepEqual(await call(operator,'GET',path),{items:[],nextCursor:null});
  await db.query('UPDATE identities SET deactivated_at=NULL WHERE id=$1',[requester.id]);
  await call(admin,'POST',root+'/operators/'+operator.id,{active:false,expectedRevision:1});await negative(operator,'GET',path,undefined,404);
  await call(admin,'POST',root+'/operators/'+operator.id,{active:true,expectedRevision:2});assert.deepEqual(await call(operator,'GET',path),{items:[],nextCursor:null});
  await db.query('UPDATE identities SET deactivated_at=now() WHERE id=$1',[operator.id]);await negative(operator,'GET',path,undefined,401);await db.query('UPDATE identities SET deactivated_at=NULL WHERE id=$1',[operator.id]);
  await call(operator,'POST','/v1/auth/signout');await negative(operator,'GET',path,undefined,401);
 }finally{await db.query('UPDATE platform_support_capability SET enabled=false');await db.query('UPDATE platform_support_administrators SET active=false WHERE identity_id=$1',[admin.id]);await db.query('UPDATE platform_support_operators SET active=false WHERE identity_id=ANY($1::uuid[])',[[operator.id,other.id]]);}
 console.log('PLATFORM_SUPPORT_OPERATOR_QUEUE_HTTP_PG_PASS '+JSON.stringify({actualHTTPPostgres:true,assignedActiveOperatorOnly:true,twoOperatorsAndCompaniesIsolated:true,default20Max100:true,microsecondAndUUIDTies22RowsNoLoss:true,unassignedHidden:true,noDescriptionOrIdentityInPage:true,auditFailureWholePageRollback:true,revocationBetweenPagesRespected:true,requesterDeactivationHidden:true,roleRevocationAndRegrantNoResurrection:true,operatorDeactivationAndSignoutDenied:true,capabilityDisabledReadsExistingOnly:true,bootstrapSyntheticOnly:true,positiveRuntimeRLSProof:false,operationalActivation:false,production:false}));
};
