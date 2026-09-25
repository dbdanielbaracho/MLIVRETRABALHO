import { Pool } from 'pg';

const UUID_RE=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const connectionString=process.env.PRIVACY_MAINTENANCE_DATABASE_URL?.trim();

function required(value:string|undefined,name:string){const v=value?.trim();if(!v)throw new Error(`${name}_required`);return v;}
function bounded(value:string|undefined,name:string,max=2000){const v=required(value,name);if(v.length>max)throw new Error(`${name}_too_long`);return v;}

async function main(){
  if(!connectionString)throw new Error('PRIVACY_MAINTENANCE_DATABASE_URL_required');
  const [command,id,...rest]=process.argv.slice(2);
  const pool=new Pool({connectionString});
  try{
    if(command==='list'){
      const rows=(await pool.query(`SELECT id,identity_id AS "identityId",request_type AS "requestType",request_details AS "requestDetails",status,created_at AS "createdAt",updated_at AS "updatedAt"
        FROM privacy_requests WHERE status IN ('submitted','reviewing') ORDER BY created_at ASC LIMIT 100`)).rows;
      process.stdout.write(JSON.stringify(rows,null,2)+'\n');return;
    }
    if(!id||!UUID_RE.test(id))throw new Error('request_id_invalid');
    if(command==='start'){
      const evidenceRef=bounded(rest[0],'evidence_ref',500);
      const row=(await pool.query(`UPDATE privacy_requests SET status='reviewing',evidence_ref=$2,updated_at=now()
        WHERE id=$1 AND status='submitted' RETURNING id,status`,[id,evidenceRef])).rows[0];
      if(!row)throw new Error('privacy_request_not_startable');
      process.stdout.write(JSON.stringify(row)+'\n');return;
    }
    if(command==='complete'||command==='partial'||command==='reject'){
      const resolutionCode=bounded(rest[0],'resolution_code',200);
      const evidenceRef=bounded(rest[1],'evidence_ref',500);
      const operatorNote=rest.slice(2).join(' ').trim();
      if(operatorNote.length>2000)throw new Error('operator_note_too_long');
      const status=command==='complete'?'completed':command==='partial'?'partially_completed':'rejected';
      const row=(await pool.query(`UPDATE privacy_requests
        SET status=$2,resolution_code=$3,evidence_ref=$4,operator_note=$5,updated_at=now(),completed_at=now()
        WHERE id=$1 AND status IN ('submitted','reviewing') RETURNING id,status,resolution_code AS "resolutionCode",evidence_ref AS "evidenceRef"`,[id,status,resolutionCode,evidenceRef,operatorNote||null])).rows[0];
      if(!row)throw new Error('privacy_request_not_finishable');
      process.stdout.write(JSON.stringify(row)+'\n');return;
    }
    throw new Error('usage: privacy-requests-ops <list|start|complete|partial|reject> [requestId] [resolution/evidence/note]');
  }finally{await pool.end();}
}

void main().catch(error=>{console.error(error instanceof Error?error.message:error);process.exitCode=1;});
