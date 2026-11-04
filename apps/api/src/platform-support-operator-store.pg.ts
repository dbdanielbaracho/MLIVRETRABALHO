import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import type {PoolClient} from 'pg';
import {PlatformSupportOperatorStore} from './platform-support-operator-store';
import type {PlatformSupportStore} from './platform-support-store';
// Invoked only inside the existing guarded disposable-schema fixture, never a live queue.
export async function verifyPlatformSupportOperator(setup:PoolClient,db:{transaction<T>(work:(c:PoolClient)=>Promise<T>):Promise<T>},store:PlatformSupportStore,owner:string,foreign:string,operator:string){
 await setup.query('UPDATE identities SET deactivated_at=NULL');await setup.query('UPDATE platform_support_operators SET active=true');
 const other=randomUUID();await setup.query('INSERT INTO identities(id) VALUES($1)',[other]);await setup.query('INSERT INTO platform_support_operators(identity_id,active) VALUES($1,true)',[other]);
 const request={category:'other',description:'Synthetic operator case'},prepared=await store.prepare(owner,request),caseId=(await store.submit(owner,prepared.requestKey,request)).id;
 const ops=new PlatformSupportOperatorStore(db),denied=(e:unknown)=>e instanceof Error&&e.message==='platform_support_not_found';
 await assert.rejects(ops.detail(operator,caseId),denied);await assert.rejects(ops.detail(foreign,caseId),denied);
 // Authorized administrative fixture only; production assignment authority remains unimplemented.
 await setup.query('INSERT INTO platform_support_assignments(case_id,operator_identity_id) VALUES($1,$2)',[caseId,operator]);
 await setup.query("INSERT INTO platform_support_audit(case_id,actor_identity_id,action) VALUES($1,$2,'assigned')",[caseId,operator]);
 const detail=await ops.detail(operator,caseId);assert.equal(detail.description,request.description);assert.ok(!JSON.stringify(detail).includes(owner));
 await assert.rejects(ops.detail(other,caseId),denied);await assert.rejects(ops.detail(operator,randomUUID()),denied);
 const response={responseKey:randomUUID(),body:'Synthetic reply',resolve:false};
 for(const value of [{...response,body:'\ud800'},{...response,tenantId:randomUUID()},{...response,resolve:'false'}])await assert.rejects(ops.respond(operator,caseId,value),/platform_support_response_invalid/);
 const replies=await Promise.all([ops.respond(operator,caseId,response),ops.respond(operator,caseId,response)]);assert.deepEqual(replies[0],replies[1]);
 assert.equal((await setup.query('SELECT count(*)::int n FROM platform_support_responses WHERE request_key=$1 AND case_id=$2',[response.responseKey,caseId])).rows[0].n,1);
 assert.equal((await setup.query("SELECT count(*)::int n FROM platform_support_audit WHERE case_id=$1 AND action='responded'",[caseId])).rows[0].n,1);
 assert.equal((await setup.query('SELECT status FROM platform_support_cases WHERE id=$1',[caseId])).rows[0].status,'reviewing');
 await assert.rejects(ops.respond(operator,caseId,{...response,resolve:true}),/platform_support_payload_conflict/);
 // Audit failure must roll back both the text and case state; the key remains retryable.
 await setup.query("CREATE FUNCTION operator_audit_fault() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW.action='responded' THEN RAISE EXCEPTION 'synthetic_operator_audit_fault'; END IF; RETURN NEW; END $$");
 await setup.query('CREATE TRIGGER operator_audit_fault BEFORE INSERT ON platform_support_audit FOR EACH ROW EXECUTE FUNCTION operator_audit_fault()');
 const closing={responseKey:randomUUID(),body:'Explicit synthetic closure',resolve:true};await assert.rejects(ops.respond(operator,caseId,closing));
 assert.equal((await setup.query('SELECT count(*)::int n FROM platform_support_responses WHERE request_key=$1',[closing.responseKey])).rows[0].n,0);
 assert.equal((await setup.query('SELECT status FROM platform_support_cases WHERE id=$1',[caseId])).rows[0].status,'reviewing');
 await setup.query('DROP TRIGGER operator_audit_fault ON platform_support_audit');
 const closed=await ops.respond(operator,caseId,closing);assert.equal(closed.resolvesCase,true);assert.deepEqual(await ops.respond(operator,caseId,closing),closed);
 await assert.rejects(ops.respond(operator,caseId,{...response,responseKey:randomUUID()}),/platform_support_case_closed/);
 await setup.query('UPDATE platform_support_assignments SET revoked_at=now() WHERE case_id=$1',[caseId]);
 await assert.rejects(ops.detail(operator,caseId),denied);await assert.rejects(ops.respond(operator,caseId,closing),denied);
 await setup.query("INSERT INTO platform_support_audit(case_id,actor_identity_id,action) VALUES($1,$2,'revoked')",[caseId,operator]);
 await setup.query('UPDATE platform_support_assignments SET revoked_at=NULL WHERE case_id=$1',[caseId]);
 await setup.query('UPDATE platform_support_operators SET active=false WHERE identity_id=$1',[operator]);await assert.rejects(ops.detail(operator,caseId),denied);
 await setup.query('UPDATE platform_support_operators SET active=true WHERE identity_id=$1',[operator]);
 await setup.query('UPDATE identities SET deactivated_at=now() WHERE id=$1',[owner]);await assert.rejects(ops.detail(operator,caseId),denied);
 await setup.query('UPDATE identities SET deactivated_at=NULL WHERE id=$1',[owner]);
 // A key on another case is independent; no global response-key existence oracle.
 const otherIntent=await store.prepare(foreign,request),otherCase=(await store.submit(foreign,otherIntent.requestKey,request)).id;
 await setup.query('INSERT INTO platform_support_assignments(case_id,operator_identity_id) VALUES($1,$2)',[otherCase,other]);
 const independent=await ops.respond(other,otherCase,response);assert.notEqual(independent.id,replies[0].id);
 assert.equal((await setup.query('SELECT status FROM platform_support_cases WHERE id=$1',[otherCase])).rows[0].status,'reviewing');
 console.log('PLATFORM_SUPPORT_OPERATOR_PG_PASS '+JSON.stringify({actualPostgreSQL:true,isolatedSchema:true,activeAssignedOperatorOnly:true,unassignedAndRevokedDenied:true,requesterDeactivationDenied:true,noOwnerIdentityInDetail:true,concurrentReplySingleReceiptAndAudit:true,resolveDecisionInReceiptComparison:true,auditFailureRollsBackReplyAndStatus:true,closedCaseNoNewReply:true,replyKeyScopedPerCase:true,http:false,administrativeAssignmentAuthority:false,positiveRuntimeRLSProof:false,production:false}));
}
