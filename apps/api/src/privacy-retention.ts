import { Pool } from 'pg';

const APPLY=process.argv.includes('--apply');
const GEO_DAYS=30;
const PROFILE_DAYS=30;

async function main(){
  if(!process.env.DATABASE_URL)throw new Error('DATABASE_URL_required');
  const pool=new Pool({connectionString:process.env.DATABASE_URL});
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

    if(APPLY){
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
        await pool.query('COMMIT');
      }catch(error){await pool.query('ROLLBACK');throw error;}
    }

    process.stdout.write(JSON.stringify({mode:APPLY?'apply':'dry-run',expiredSessions,geoCandidates,profileCandidates,geoDays:GEO_DAYS,profileDays:PROFILE_DAYS})+'\n');
  }finally{await pool.end();}
}

if(require.main===module){void main().catch(error=>{console.error(error);process.exitCode=1;});}
