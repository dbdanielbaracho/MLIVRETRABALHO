import { Pool } from 'pg';

const UUID_RE=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const connectionString=process.env.PRIVACY_MAINTENANCE_DATABASE_URL?.trim();
const operatorId=process.env.PRIVACY_OPERATOR_ID?.trim();
const SCOPE_TYPES=new Set(['identity','assignment','safety_case','financial_record']);

function required(value:string|undefined,name:string){const v=value?.trim();if(!v)throw new Error(`${name}_required`);return v;}
function bounded(value:string|undefined,name:string,max:number){const v=required(value,name);if(v.length>max)throw new Error(`${name}_too_long`);return v;}
function uuid(value:string|undefined,name:string){const v=required(value,name);if(!UUID_RE.test(v))throw new Error(`${name}_invalid`);return v;}
function futureDate(value:string|undefined,name:string){const raw=required(value,name);const d=new Date(raw);if(Number.isNaN(d.getTime()))throw new Error(`${name}_invalid`);if(d.getTime()<=Date.now())throw new Error(`${name}_must_be_future`);return d.toISOString();}

async function main(){
  if(!connectionString)throw new Error('PRIVACY_MAINTENANCE_DATABASE_URL_required');
  const [command,...args]=process.argv.slice(2);
  const pool=new Pool({connectionString});
  try{
    if(command==='list'){
      const rows=(await pool.query(`SELECT id,tenant_id AS "tenantId",scope_type AS "scopeType",scope_id AS "scopeId",reason,evidence_ref AS "evidenceRef",starts_at AS "startsAt",review_at AS "reviewAt",created_by AS "createdBy",reviewed_at AS "reviewedAt",reviewed_by AS "reviewedBy",review_note AS "reviewNote"
        FROM privacy_legal_holds WHERE released_at IS NULL ORDER BY COALESCE(review_at,'infinity'::timestamptz),created_at LIMIT 200`)).rows;
      process.stdout.write(JSON.stringify(rows,null,2)+'\n');return;
    }
    if(command==='history'){
      const holdId=uuid(args[0],'hold_id');
      const rows=(await pool.query(`SELECT id,legal_hold_id AS "legalHoldId",reviewed_by AS "reviewedBy",review_note AS "reviewNote",previous_review_at AS "previousReviewAt",next_review_at AS "nextReviewAt",created_at AS "createdAt"
        FROM privacy_legal_hold_reviews WHERE legal_hold_id=$1 ORDER BY created_at,id`,[holdId])).rows;
      process.stdout.write(JSON.stringify(rows,null,2)+'\n');return;
    }
    const handledBy=bounded(operatorId,'PRIVACY_OPERATOR_ID',200);
    if(command==='create'){
      const [scopeTypeRaw,scopeIdRaw,reasonRaw,evidenceRefRaw,reviewAtRaw]=args;
      const scopeType=required(scopeTypeRaw,'scope_type');
      if(!SCOPE_TYPES.has(scopeType))throw new Error('scope_type_invalid');
      const scopeId=uuid(scopeIdRaw,'scope_id');
      const reason=bounded(reasonRaw,'reason',1000);
      const evidenceRef=bounded(evidenceRefRaw,'evidence_ref',500);
      const reviewAt=futureDate(reviewAtRaw,'review_at');
      let tenantId:string|null=null;
      if(scopeType==='identity'){
        const target=(await pool.query('SELECT id FROM identities WHERE id=$1',[scopeId])).rows[0];
        if(!target)throw new Error('legal_hold_scope_not_found');
      }else if(scopeType==='assignment'){
        const target=(await pool.query<{tenantId:string}>('SELECT tenant_id AS "tenantId" FROM work_assignments WHERE id=$1',[scopeId])).rows[0];
        if(!target)throw new Error('legal_hold_scope_not_found');tenantId=target.tenantId;
      }else if(scopeType==='safety_case'){
        const target=(await pool.query<{tenantId:string}>('SELECT tenant_id AS "tenantId" FROM safety_cases WHERE id=$1',[scopeId])).rows[0];
        if(!target)throw new Error('legal_hold_scope_not_found');tenantId=target.tenantId;
      }else{
        const target=(await pool.query<{tenantId:string}>('SELECT tenant_id AS "tenantId" FROM earnings_ledger WHERE id=$1',[scopeId])).rows[0];
        if(!target)throw new Error('legal_hold_scope_not_found');tenantId=target.tenantId;
      }
      const row=(await pool.query(`INSERT INTO privacy_legal_holds(tenant_id,scope_type,scope_id,reason,evidence_ref,review_at,created_by)
        VALUES($1,$2,$3,$4,$5,$6,$7)
        RETURNING id,tenant_id AS "tenantId",scope_type AS "scopeType",scope_id AS "scopeId",reason,evidence_ref AS "evidenceRef",review_at AS "reviewAt",created_by AS "createdBy"`,[tenantId,scopeType,scopeId,reason,evidenceRef,reviewAt,handledBy])).rows[0];
      process.stdout.write(JSON.stringify(row)+'\n');return;
    }
    if(command==='review'){
      const holdId=uuid(args[0],'hold_id');
      const reviewNote=bounded(args[1],'review_note',2000);
      const nextReviewAt=futureDate(args[2],'next_review_at');
      const client=await pool.connect();
      try{
        await client.query('BEGIN');
        const hold=(await client.query<{reviewAt:string|null}>(`SELECT review_at AS "reviewAt" FROM privacy_legal_holds WHERE id=$1 AND released_at IS NULL FOR UPDATE`,[holdId])).rows[0];
        if(!hold)throw new Error('legal_hold_not_reviewable');
        const history=(await client.query<{id:string}>(`INSERT INTO privacy_legal_hold_reviews(legal_hold_id,reviewed_by,review_note,previous_review_at,next_review_at)
          VALUES($1,$2,$3,$4,$5) RETURNING id`,[holdId,handledBy,reviewNote,hold.reviewAt,nextReviewAt])).rows[0];
        if(!history)throw new Error('legal_hold_review_history_missing');
        const row=(await client.query(`UPDATE privacy_legal_holds SET reviewed_at=now(),reviewed_by=$2,review_note=$3,review_at=$4
          WHERE id=$1
          RETURNING id,reviewed_at AS "reviewedAt",reviewed_by AS "reviewedBy",review_note AS "reviewNote",review_at AS "reviewAt"`,[holdId,handledBy,reviewNote,nextReviewAt])).rows[0];
        await client.query('COMMIT');
        process.stdout.write(JSON.stringify({...row,reviewHistoryId:history.id})+'\n');return;
      }catch(error){await client.query('ROLLBACK').catch(()=>undefined);throw error;}finally{client.release();}
    }
    if(command==='release'){
      const holdId=uuid(args[0],'hold_id');
      const releaseReason=bounded(args.slice(1).join(' '),'release_reason',1000);
      const row=(await pool.query(`UPDATE privacy_legal_holds SET released_at=now(),released_by=$2,release_reason=$3
        WHERE id=$1 AND released_at IS NULL
        RETURNING id,released_at AS "releasedAt",released_by AS "releasedBy",release_reason AS "releaseReason"`,[holdId,handledBy,releaseReason])).rows[0];
      if(!row)throw new Error('legal_hold_not_releasable');
      process.stdout.write(JSON.stringify(row)+'\n');return;
    }
    throw new Error('usage: privacy-legal-holds-ops <list|history|create|review|release> ...');
  }finally{await pool.end();}
}

void main().catch(error=>{console.error(error instanceof Error?error.message:error);process.exitCode=1;});
