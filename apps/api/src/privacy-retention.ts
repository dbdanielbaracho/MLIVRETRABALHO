import { Pool } from 'pg';

const APPLY=process.argv.includes('--apply');
const GEO_DAYS=30;
const PROFILE_DAYS=30;
const CHAT_DAYS=730;

function errorCode(error:unknown){return (error instanceof Error?error.message:String(error)).slice(0,500);}

async function main(){
  const maintenanceUrl=process.env.PRIVACY_MAINTENANCE_DATABASE_URL?.trim();
  const defaultUrl=process.env.DATABASE_URL?.trim();
  const operatorId=process.env.PRIVACY_OPERATOR_ID?.trim();
  if(APPLY&&!maintenanceUrl)throw new Error('PRIVACY_MAINTENANCE_DATABASE_URL_required_for_apply');
  if(APPLY&&!operatorId)throw new Error('PRIVACY_OPERATOR_ID_required_for_apply');
  if(operatorId&&operatorId.length>200)throw new Error('PRIVACY_OPERATOR_ID_too_long');
  const connectionString=maintenanceUrl||defaultUrl;
  if(!connectionString)throw new Error('DATABASE_URL_required');
  const pool=new Pool({connectionString});
  try{
    const expiredSessions=(await pool.query<{count:number}>('SELECT count(*)::int AS count FROM sessions WHERE expires_at<=now()')).rows[0]?.count??0;
    const geoCandidates=(await pool.query<{count:number}>(`SELECT count(*)::int AS count
      FROM work_assignments wa
      JOIN professional_profiles p ON p.id=wa.professional_id
      WHERE wa.status IN ('completed','cancelled')
        AND COALESCE(wa.completed_at,wa.checked_out_at,wa.confirmed_at) < now()-($1::int * interval '1 day')
        AND (wa.check_in_lat IS NOT NULL OR wa.check_in_lng IS NOT NULL OR wa.check_out_lat IS NOT NULL OR wa.check_out_lng IS NOT NULL)
        AND NOT EXISTS (SELECT 1 FROM privacy_legal_holds h WHERE h.released_at IS NULL AND h.scope_type='assignment' AND h.scope_id=wa.id)
        AND NOT EXISTS (SELECT 1 FROM privacy_legal_holds h WHERE h.released_at IS NULL AND h.scope_type='identity' AND h.scope_id=p.identity_id)`,[GEO_DAYS])).rows[0]?.count??0;
    const profileCandidates=(await pool.query<{count:number}>(`SELECT count(*)::int AS count
      FROM professional_profiles p
      JOIN identities i ON i.id=p.identity_id
      WHERE i.deactivated_at IS NOT NULL
        AND i.deactivated_at < now()-($1::int * interval '1 day')
        AND (p.display_name<>'Deleted professional' OR p.home_city IS NOT NULL OR p.primary_role IS NOT NULL)
        AND NOT EXISTS (SELECT 1 FROM privacy_legal_holds h WHERE h.released_at IS NULL AND h.scope_type='identity' AND h.scope_id=i.id)`,[PROFILE_DAYS])).rows[0]?.count??0;
    const chatCandidates=(await pool.query<{count:number}>(`SELECT count(*)::int AS count
      FROM conversation_messages m
      JOIN conversations c ON c.id=m.conversation_id
      JOIN work_assignments wa ON wa.id=c.assignment_id
      JOIN professional_profiles p ON p.id=wa.professional_id
      WHERE wa.status IN ('completed','cancelled')
        AND COALESCE(wa.completed_at,wa.checked_out_at,wa.confirmed_at) < now()-($1::int * interval '1 day')
        AND NOT EXISTS (SELECT 1 FROM privacy_legal_holds h WHERE h.released_at IS NULL AND h.scope_type='assignment' AND h.scope_id=wa.id)
        AND NOT EXISTS (SELECT 1 FROM privacy_legal_holds h WHERE h.released_at IS NULL AND h.scope_type='identity' AND h.scope_id=p.identity_id)
        AND NOT EXISTS (
          SELECT 1
          FROM conversation_messages participant
          JOIN privacy_legal_holds h ON h.released_at IS NULL AND h.scope_type='identity' AND h.scope_id=participant.sender_identity_id
          WHERE participant.conversation_id=c.id
        )`,[CHAT_DAYS])).rows[0]?.count??0;

    let runId:string|null=null;
    if(APPLY){
      runId=(await pool.query<{id:string}>(`INSERT INTO privacy_retention_runs(operator_id,status,expired_sessions,geo_candidates,profile_candidates,chat_candidates)
        VALUES($1,'running',$2,$3,$4,$5) RETURNING id`,[operatorId,expiredSessions,geoCandidates,profileCandidates,chatCandidates])).rows[0].id;
      await pool.query('BEGIN');
      try{
        await pool.query('DELETE FROM sessions WHERE expires_at<=now()');
        await pool.query(`UPDATE work_assignments wa
          SET check_in_lat=NULL,check_in_lng=NULL,check_out_lat=NULL,check_out_lng=NULL
          FROM professional_profiles p
          WHERE p.id=wa.professional_id
            AND wa.status IN ('completed','cancelled')
            AND COALESCE(wa.completed_at,wa.checked_out_at,wa.confirmed_at) < now()-($1::int * interval '1 day')
            AND (wa.check_in_lat IS NOT NULL OR wa.check_in_lng IS NOT NULL OR wa.check_out_lat IS NOT NULL OR wa.check_out_lng IS NOT NULL)
            AND NOT EXISTS (SELECT 1 FROM privacy_legal_holds h WHERE h.released_at IS NULL AND h.scope_type='assignment' AND h.scope_id=wa.id)
            AND NOT EXISTS (SELECT 1 FROM privacy_legal_holds h WHERE h.released_at IS NULL AND h.scope_type='identity' AND h.scope_id=p.identity_id)`,[GEO_DAYS]);
        await pool.query(`UPDATE professional_profiles p
          SET display_name='Deleted professional',home_city=NULL,primary_role=NULL,updated_at=now()
          FROM identities i
          WHERE i.id=p.identity_id
            AND i.deactivated_at IS NOT NULL
            AND i.deactivated_at < now()-($1::int * interval '1 day')
            AND NOT EXISTS (SELECT 1 FROM privacy_legal_holds h WHERE h.released_at IS NULL AND h.scope_type='identity' AND h.scope_id=i.id)`,[PROFILE_DAYS]);
        await pool.query(`DELETE FROM conversation_messages m
          USING conversations c, work_assignments wa, professional_profiles p
          WHERE c.id=m.conversation_id
            AND wa.id=c.assignment_id
            AND p.id=wa.professional_id
            AND wa.status IN ('completed','cancelled')
            AND COALESCE(wa.completed_at,wa.checked_out_at,wa.confirmed_at) < now()-($1::int * interval '1 day')
            AND NOT EXISTS (SELECT 1 FROM privacy_legal_holds h WHERE h.released_at IS NULL AND h.scope_type='assignment' AND h.scope_id=wa.id)
            AND NOT EXISTS (SELECT 1 FROM privacy_legal_holds h WHERE h.released_at IS NULL AND h.scope_type='identity' AND h.scope_id=p.identity_id)
            AND NOT EXISTS (
              SELECT 1
              FROM conversation_messages participant
              JOIN privacy_legal_holds h ON h.released_at IS NULL AND h.scope_type='identity' AND h.scope_id=participant.sender_identity_id
              WHERE participant.conversation_id=c.id
            )`,[CHAT_DAYS]);
        await pool.query(`DELETE FROM conversations c
          USING work_assignments wa, professional_profiles p
          WHERE wa.id=c.assignment_id
            AND p.id=wa.professional_id
            AND wa.status IN ('completed','cancelled')
            AND COALESCE(wa.completed_at,wa.checked_out_at,wa.confirmed_at) < now()-($1::int * interval '1 day')
            AND NOT EXISTS (SELECT 1 FROM conversation_messages m WHERE m.conversation_id=c.id)
            AND NOT EXISTS (SELECT 1 FROM privacy_legal_holds h WHERE h.released_at IS NULL AND h.scope_type='assignment' AND h.scope_id=wa.id)
            AND NOT EXISTS (SELECT 1 FROM privacy_legal_holds h WHERE h.released_at IS NULL AND h.scope_type='identity' AND h.scope_id=p.identity_id)`,[CHAT_DAYS]);
        await pool.query('COMMIT');
        await pool.query("UPDATE privacy_retention_runs SET status='completed',completed_at=now() WHERE id=$1",[runId]);
      }catch(error){
        await pool.query('ROLLBACK');
        await pool.query("UPDATE privacy_retention_runs SET status='failed',error_code=$2,completed_at=now() WHERE id=$1",[runId,errorCode(error)]).catch(()=>undefined);
        throw error;
      }
    }

    process.stdout.write(JSON.stringify({mode:APPLY?'apply':'dry-run',runId,operatorId:APPLY?operatorId:null,expiredSessions,geoCandidates,profileCandidates,chatCandidates,geoDays:GEO_DAYS,profileDays:PROFILE_DAYS,chatDays:CHAT_DAYS})+'\n');
  }finally{await pool.end();}
}

if(require.main===module){void main().catch(error=>{console.error(error);process.exitCode=1;});}
