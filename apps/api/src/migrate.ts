import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { Pool, PoolClient } from 'pg';

const MIGRATION_LOCK_KEY = 781245901;

function migrationBody(sql:string):string {
  return sql.replace(/^\s*BEGIN;\s*/i,'').replace(/\s*COMMIT;\s*$/i,'').trim();
}
function checksum(sql:string):string {
  return createHash('sha256').update(sql).digest('hex');
}
async function ensureLedger(client:PoolClient){
  await client.query(`CREATE TABLE IF NOT EXISTS schema_migrations(
    filename text PRIMARY KEY,
    checksum text NOT NULL,
    applied_at timestamptz NOT NULL DEFAULT now()
  )`);
}
async function applyMigration(client:PoolClient,filename:string,sql:string){
  const hash=checksum(sql);
  const existing=await client.query<{checksum:string}>('SELECT checksum FROM schema_migrations WHERE filename=$1',[filename]);
  if(existing.rows[0]){
    if(existing.rows[0].checksum!==hash)throw new Error(`migration_checksum_mismatch:${filename}`);
    process.stdout.write(`skip ${filename}\n`);
    return;
  }
  await client.query('BEGIN');
  try{
    await client.query(migrationBody(sql));
    await client.query('INSERT INTO schema_migrations(filename,checksum) VALUES($1,$2)',[filename,hash]);
    await client.query('COMMIT');
    process.stdout.write(`applied ${filename}\n`);
  }catch(error){
    await client.query('ROLLBACK');
    throw error;
  }
}

async function main(){
  if(!process.env.DATABASE_URL)throw new Error('DATABASE_URL_required');
  const repoRoot=resolve(__dirname,'../../..');
  const migrationsDir=resolve(repoRoot,'packages/db/migrations');
  const rolesSql=await readFile(resolve(repoRoot,'packages/db/infra/roles.sql'),'utf8');
  const filenames=(await readdir(migrationsDir)).filter(x=>/^\d+.*\.sql$/.test(x)).sort();
  const pool=new Pool({connectionString:process.env.DATABASE_URL});
  const client=await pool.connect();
  try{
    await client.query('SELECT pg_advisory_lock($1)',[MIGRATION_LOCK_KEY]);
    await client.query(rolesSql);
    await ensureLedger(client);
    for(const filename of filenames){
      const sql=await readFile(resolve(migrationsDir,filename),'utf8');
      await applyMigration(client,filename,sql);
    }
  }finally{
    try{await client.query('SELECT pg_advisory_unlock($1)',[MIGRATION_LOCK_KEY]);}catch{}
    client.release();
    await pool.end();
  }
}

if(require.main===module){void main().catch(error=>{console.error(error);process.exitCode=1;});}

export { migrationBody, checksum };
