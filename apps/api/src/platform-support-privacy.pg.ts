import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import type {PoolClient} from 'pg';
import {exportPlatformSupport,retainPlatformSupport} from './platform-support-privacy';
import type {PlatformSupportStore} from './platform-support-store';

// Shares only the already-guarded, disposable schema/connection of the intake fixture.
export async function verifyPlatformSupportPrivacy(setup:PoolClient,db:{transaction<T>(work:(c:PoolClient)=>Promise<T>):Promise<T>},store:PlatformSupportStore,owner:string,foreign:string,operator:string){
 await setup.query('CREATE TABLE privacy_legal_holds(id uuid PRIMARY KEY DEFAULT gen_random_uuid(),scope_type text,scope_id uuid,released_at timestamptz)');
 await setup.query('UPDATE identities SET deactivated_at=NULL');
 const inactive=randomUUID(),held=randomUUID(),retiredOperator=randomUUID(),recentInactive=randomUUID();await setup.query("INSERT INTO identities(id,deactivated_at) VALUES($1,now()-interval '31 days'),($2,now()-interval '31 days'),($3,now()-interval '31 days'),($4,now()-interval '29 days')",[inactive,held,retiredOperator,recentInactive]);
 await setup.query("INSERT INTO privacy_legal_holds(scope_type,scope_id) VALUES('identity',$1)",[held]);
 async function seed(who:string,closedDays:number|null=91,activityDays=0){
  const id=randomUUID();
  await setup.query("INSERT INTO platform_support_intents(request_key,owner_identity_id,payload_hash,created_at,expires_at,submitted_at) VALUES($1,$2,$3,now()-interval '500 days',now()-interval '499 days',now()-interval '500 days')",[id,who,'a'.repeat(64)]);
  await setup.query("INSERT INTO platform_support_cases(id,owner_identity_id,category,description,status,created_at,updated_at,closed_at) VALUES($1,$2,'other','Synthetic private request',CASE WHEN $3::int IS NULL THEN 'open' ELSE 'resolved' END,now()-interval '500 days',now()-($4::int*interval '1 day'),now()-($3::int*interval '1 day'))",[id,who,closedDays,activityDays]);
  await setup.query("INSERT INTO platform_support_responses(case_id,operator_identity_id,body) VALUES($1,$2,'Synthetic response')",[id,operator]);
  return id;
 }
 const closed=await seed(owner),boundary=await seed(owner,89),inactiveCase=await seed(inactive,null),heldCase=await seed(held,400),idle=await seed(owner,null,181),fresh=await seed(owner,null,179),old=await seed(owner,366),foreignCase=await seed(foreign,89);
 const authorHeldCase=await seed(owner),authorDeactivatedCase=await seed(owner,null),recentInactiveCase=await seed(recentInactive,null);
 await setup.query('UPDATE platform_support_responses SET operator_identity_id=$2 WHERE case_id=$1',[authorHeldCase,held]);
 await setup.query('UPDATE platform_support_responses SET operator_identity_id=$2 WHERE case_id=$1',[authorDeactivatedCase,retiredOperator]);
 await setup.query("INSERT INTO platform_support_audit(case_id,actor_identity_id,action,created_at) VALUES($1,$2,'read',now()-interval '366 days'),($3,$4,'read',now()-interval '366 days')",[old,owner,heldCase,held]);
 const before=(await setup.query('SELECT description FROM platform_support_cases WHERE id=$1',[closed])).rows[0].description;assert.equal(before,'Synthetic private request');
 const exported=await db.transaction(c=>exportPlatformSupport(c,owner));
 assert.ok(exported.some(c=>c.id===closed&&c.responses[0]?.body==='Synthetic response'));assert.ok(!exported.some(c=>[foreignCase,inactiveCase,heldCase].includes(c.id)));
 assert.ok(!JSON.stringify(exported).includes(operator));
 // Expunge this fixture read event so it does not intentionally reset the old-case audit horizon.
 await setup.query("DELETE FROM platform_support_audit WHERE case_id=$1 AND created_at>now()-interval '1 day'",[old]);
 await assert.rejects(db.transaction(c=>exportPlatformSupport(c,inactive)),/platform_support_identity_required/);
 const dry=await retainPlatformSupport(setup,false);assert.ok(dry.minimizedCases>=3);assert.equal((await setup.query('SELECT description FROM platform_support_cases WHERE id=$1',[closed])).rows[0].description,before);
 // A failed expiry audit must roll back status changes and every cleanup in the same transaction.
 await setup.query("CREATE FUNCTION privacy_audit_fault() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW.action='expired' THEN RAISE EXCEPTION 'synthetic_privacy_audit_failure'; END IF; RETURN NEW; END $$");
 await setup.query('CREATE TRIGGER privacy_audit_fault BEFORE INSERT ON platform_support_audit FOR EACH ROW EXECUTE FUNCTION privacy_audit_fault()');
 await assert.rejects(db.transaction(c=>retainPlatformSupport(c,true)));
 assert.equal((await setup.query('SELECT status FROM platform_support_cases WHERE id=$1',[idle])).rows[0].status,'open');
 assert.equal((await setup.query('SELECT description FROM platform_support_cases WHERE id=$1',[closed])).rows[0].description,before);
 await setup.query('DROP TRIGGER privacy_audit_fault ON platform_support_audit');
 const result=await db.transaction(c=>retainPlatformSupport(c,true));assert.equal(result.expiredCases,1);
 const rows=(await setup.query('SELECT id,status,description,closed_at FROM platform_support_cases WHERE id=ANY($1::uuid[])',[[closed,boundary,inactiveCase,heldCase,idle,fresh,old,authorHeldCase,authorDeactivatedCase,recentInactiveCase]])).rows;
 const find=(id:string)=>rows.find(c=>c.id===id);
 assert.equal(find(closed).description,null);assert.equal(find(boundary).description,before);assert.equal(find(inactiveCase).description,null);assert.equal(find(heldCase).description,before);
 assert.equal(find(authorHeldCase).description,before);assert.equal(find(authorDeactivatedCase).description,before);assert.equal(find(recentInactiveCase).description,before);
 assert.equal((await setup.query('SELECT body FROM platform_support_responses WHERE case_id=$1',[authorDeactivatedCase])).rows[0].body,null);
 assert.equal((await setup.query('SELECT body FROM platform_support_responses WHERE case_id=$1',[authorHeldCase])).rows[0].body,'Synthetic response');
 assert.equal(find(idle).status,'expired');assert.ok(find(idle).closed_at);assert.equal(find(idle).description,before);assert.equal(find(fresh).status,'open');assert.equal(find(old),undefined);
 assert.equal((await setup.query("SELECT count(*)::int n FROM platform_support_audit WHERE case_id=$1 AND action='expired'",[idle])).rows[0].n,1);
 assert.equal((await setup.query('SELECT body FROM platform_support_responses WHERE case_id=$1',[closed])).rows[0].body,null);
 assert.equal((await setup.query('SELECT body FROM platform_support_responses WHERE case_id=$1',[heldCase])).rows[0].body,'Synthetic response');
 assert.equal((await setup.query('SELECT payload_hash FROM platform_support_intents WHERE request_key=$1',[closed])).rows[0].payload_hash,null);
 assert.equal((await setup.query('SELECT payload_hash FROM platform_support_intents WHERE request_key=$1',[heldCase])).rows[0].payload_hash,'a'.repeat(64));
 assert.equal((await setup.query('SELECT count(*)::int n FROM platform_support_intents WHERE request_key=$1',[old])).rows[0].n,0);
 await assert.rejects(store.submit(owner,old,{category:'other',description:before}),/platform_support_not_found/);
 await assert.rejects(store.submit(owner,closed,{category:'other',description:before}),/platform_support_intent_expired/);
 const after=await db.transaction(c=>exportPlatformSupport(c,owner));assert.equal(after.find(c=>c.id===closed)?.description,null);assert.equal(after.find(c=>c.id===closed)?.responses[0]?.body,null);
 await setup.query('UPDATE privacy_legal_holds SET released_at=now() WHERE scope_id=$1',[held]);
 await db.transaction(c=>retainPlatformSupport(c,true));
 assert.equal((await setup.query('SELECT count(*)::int n FROM platform_support_cases WHERE id=$1',[heldCase])).rows[0].n,0);
 assert.equal((await setup.query('SELECT description FROM platform_support_cases WHERE id=$1',[authorHeldCase])).rows[0].description,null);
 const subjectCase=await seed(owner,400),subject=randomUUID();await setup.query('INSERT INTO identities(id) VALUES($1)',[subject]);
 await setup.query("INSERT INTO privacy_legal_holds(scope_type,scope_id) VALUES('identity',$1)",[subject]);
 const subjectAudit=(await setup.query("INSERT INTO platform_support_audit(case_id,actor_identity_id,subject_identity_id,action,created_at) VALUES($1,$2,$3,'assigned',now()-interval '366 days') RETURNING id",[subjectCase,owner,subject])).rows[0].id;
 await db.transaction(c=>retainPlatformSupport(c,true));assert.equal((await setup.query('SELECT count(*)::int n FROM platform_support_audit WHERE id=$1',[subjectAudit])).rows[0].n,1);assert.equal((await setup.query('SELECT count(*)::int n FROM platform_support_cases WHERE id=$1',[subjectCase])).rows[0].n,1);
 await setup.query('UPDATE privacy_legal_holds SET released_at=now() WHERE scope_id=$1',[subject]);await db.transaction(c=>retainPlatformSupport(c,true));assert.equal((await setup.query('SELECT count(*)::int n FROM platform_support_cases WHERE id=$1',[subjectCase])).rows[0].n,0);
 console.log('PLATFORM_SUPPORT_PRIVACY_PG_PASS '+JSON.stringify({actualPostgreSQL:true,isolatedSchema:true,ownedExport:true,operatorIdentityRedacted:true,dryRunNoWrites:true,closed90Days:true,inactive180DaysExpiresNotResolves:true,deactivated30Days:true,holdAndRelease:true,assignmentSubjectHoldAndRelease:true,audit365Days:true,digest24Hours:true,expiredKeyNeverRecreates:true,auditFailureRollsBack:true,http:false,production:false}));
}
