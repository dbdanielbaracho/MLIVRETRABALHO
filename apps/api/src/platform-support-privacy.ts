import type {PoolClient} from 'pg';

// Call inside the caller's transaction. Never return operator identity, assignment or audit metadata.
export async function exportPlatformSupport(db:PoolClient,identityId:string){
 await db.query("SELECT set_config('app.platform_support_identity',$1,true)",[identityId]);
 if(!(await db.query('SELECT id FROM identities WHERE id=$1 AND deactivated_at IS NULL FOR SHARE',[identityId])).rows[0])throw Error('platform_support_identity_required');
 const cases=(await db.query(`SELECT c.id,c.category,c.description,c.status,c.created_at AS "createdAt",c.updated_at AS "updatedAt",c.closed_at AS "closedAt",
   COALESCE((SELECT jsonb_agg(jsonb_build_object('id',r.id,'body',r.body,'createdAt',r.created_at) ORDER BY r.created_at,r.id)
     FROM platform_support_responses r WHERE r.case_id=c.id),'[]'::jsonb) AS responses
   FROM platform_support_cases c WHERE c.owner_identity_id=$1 ORDER BY c.created_at,c.id FOR SHARE OF c`,[identityId])).rows;
 for(const row of cases)await db.query("INSERT INTO platform_support_audit(case_id,actor_identity_id,action) VALUES($1,$2,'read')",[row.id,identityId]);
 return cases;
}

// A hold on the requester or any response author preserves the whole case.
const caseHeld=`EXISTS(SELECT 1 FROM privacy_legal_holds h WHERE h.released_at IS NULL AND h.scope_type='identity'
 AND (h.scope_id=c.owner_identity_id OR EXISTS(SELECT 1 FROM platform_support_responses r WHERE r.case_id=c.id AND r.operator_identity_id=h.scope_id)))`;
const ownerHeld=`EXISTS(SELECT 1 FROM privacy_legal_holds h WHERE h.released_at IS NULL AND h.scope_type='identity' AND h.scope_id=i.owner_identity_id)`;
const deactivatedOwner=`EXISTS(SELECT 1 FROM identities o WHERE o.id=c.owner_identity_id AND o.deactivated_at<=now()-interval '30 days')`;
const closedContent=`c.closed_at<=now()-interval '90 days'`;

// Existing maintenance CLI owns authorization, advisory lock, BEGIN/COMMIT and the run receipt.
// Dry-run counts current candidates without writing. Product periods come from issue624, not law.
export async function retainPlatformSupport(db:Pick<PoolClient,'query'>,apply:boolean){
 const count=async(sql:string)=>(await db.query(sql)).rows[0]?.count??0;
 const inactive=`c.status IN('open','reviewing') AND c.updated_at<=now()-interval '180 days' AND NOT ${caseHeld}`;
 const contents=`c.description IS NOT NULL AND (${closedContent} OR ${deactivatedOwner}) AND NOT ${caseHeld}`;
 const responses=`r.body IS NOT NULL AND (${closedContent} OR ${deactivatedOwner} OR EXISTS(SELECT 1 FROM identities o WHERE o.id=r.operator_identity_id AND o.deactivated_at<=now()-interval '30 days')) AND NOT ${caseHeld}`;
 const audits=`a.created_at<=now()-interval '365 days'
  AND NOT EXISTS(SELECT 1 FROM privacy_legal_holds h WHERE h.released_at IS NULL AND h.scope_type='identity' AND h.scope_id=a.actor_identity_id)
  AND NOT EXISTS(SELECT 1 FROM platform_support_cases c WHERE c.id=a.case_id AND ${caseHeld})`;
 // Content-free case/assignment/response identifiers are removed after the separate audit horizon.
 const metadata=`c.closed_at<=now()-interval '365 days' AND NOT ${caseHeld}
  AND NOT EXISTS(SELECT 1 FROM platform_support_audit a WHERE a.case_id=c.id AND (a.created_at>now()-interval '365 days'
   OR EXISTS(SELECT 1 FROM privacy_legal_holds h WHERE h.released_at IS NULL AND h.scope_type='identity' AND h.scope_id=a.actor_identity_id)))`;
 const expired=`i.expires_at<=now() AND NOT ${ownerHeld}`;
 if(!apply)return {
  expiredCases:await count(`SELECT count(*)::int count FROM platform_support_cases c WHERE ${inactive}`),
  minimizedCases:await count(`SELECT count(*)::int count FROM platform_support_cases c WHERE ${contents}`),
  minimizedResponses:await count(`SELECT count(*)::int count FROM platform_support_responses r JOIN platform_support_cases c ON c.id=r.case_id WHERE ${responses}`),
  expiredDigests:await count(`SELECT count(*)::int count FROM platform_support_intents i WHERE i.payload_hash IS NOT NULL AND ${expired}`),
  deletedAudits:await count(`SELECT count(*)::int count FROM platform_support_audit a WHERE ${audits}`),
  deletedCases:await count(`SELECT count(*)::int count FROM platform_support_cases c WHERE ${metadata}`)
 };
 const expiredCases=await count(`WITH expired AS(UPDATE platform_support_cases c SET status='expired',closed_at=now(),updated_at=now() WHERE ${inactive} RETURNING id),
  events AS(INSERT INTO platform_support_audit(case_id,actor_identity_id,action) SELECT id,NULL,'expired' FROM expired RETURNING id) SELECT count(*)::int count FROM events`);
 const minimizedCases=await count(`WITH changed AS(UPDATE platform_support_cases c SET description=NULL WHERE ${contents} RETURNING id) SELECT count(*)::int count FROM changed`);
 const minimizedResponses=await count(`WITH changed AS(UPDATE platform_support_responses r SET body=NULL FROM platform_support_cases c WHERE c.id=r.case_id AND ${responses} RETURNING r.id) SELECT count(*)::int count FROM changed`);
 const expiredDigests=await count(`WITH changed AS(UPDATE platform_support_intents i SET payload_hash=NULL WHERE i.payload_hash IS NOT NULL AND ${expired} RETURNING request_key) SELECT count(*)::int count FROM changed`);
 const deletedAudits=await count(`WITH removed AS(DELETE FROM platform_support_audit a WHERE ${audits} RETURNING id) SELECT count(*)::int count FROM removed`);
 const deletedCases=await count(`WITH removed AS(DELETE FROM platform_support_cases c WHERE ${metadata} RETURNING id) SELECT count(*)::int count FROM removed`);
 // Removing expired preparations is terminal: submit never creates a missing key, even after cleanup.
 await db.query(`DELETE FROM platform_support_intents i WHERE ${expired} AND NOT EXISTS(SELECT 1 FROM platform_support_cases c WHERE c.id=i.request_key)`);
 return {expiredCases,minimizedCases,minimizedResponses,expiredDigests,deletedAudits,deletedCases};
}
