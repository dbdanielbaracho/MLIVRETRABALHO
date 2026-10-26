import type {PoolClient} from 'pg';
type Transactions={transaction<T>(work:(db:PoolClient)=>Promise<T>):Promise<T>};
type Role={identityId:string;active:boolean;revision:number};
const uuid=(v:unknown):v is string=>typeof v==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(v);
export class PlatformSupportRoleStore{
 constructor(private readonly database:Transactions){}
 async change(actor:string,target:string,active:boolean,expectedRevision:number){
  if(!uuid(actor)||!uuid(target)||typeof active!=='boolean'||!Number.isSafeInteger(expectedRevision)||expectedRevision<0||expectedRevision>=2147483647)throw Error('platform_support_role_invalid');
  return this.database.transaction(async db=>{
   await db.query("SELECT set_config('app.platform_support_identity',$1,true)",[actor]);
   if(!(await db.query('SELECT platform_support_lock_owner_identity() AS active')).rows[0]?.active)throw Error('platform_support_identity_required');
   if(!(await db.query('SELECT platform_support_lock_administrator() AS active')).rows[0]?.active||actor===target)throw Error('platform_support_dispatch_denied');
   // Lock the identity even before its first role row exists: concurrent grants serialize.
   if(!(await db.query('SELECT platform_support_lock_role_target($1,$2) AS active',[target,active])).rows[0]?.active)throw Error('platform_support_not_found');
   const prior=(await db.query<Role>('SELECT identity_id AS "identityId",active,revision FROM platform_support_operators WHERE identity_id=$1 FOR UPDATE',[target])).rows[0];
   if(prior?.revision===expectedRevision+1&&prior.active===active)return prior;
   if((prior?.revision??0)!==expectedRevision)throw Error('platform_support_role_conflict');
   if(prior?.active===active)return prior;
   if(!prior&&!active)throw Error('platform_support_not_found');
   if(!active){
    // Revocation invalidates every assignment. Regranting the role never resurrects them.
    const cases=(await db.query('SELECT c.id FROM platform_support_cases c JOIN platform_support_assignments a ON a.case_id=c.id WHERE a.operator_identity_id=$1 AND a.revoked_at IS NULL ORDER BY c.id FOR UPDATE OF c',[target])).rows;
    for(const row of cases){await db.query('UPDATE platform_support_assignments SET revoked_at=now(),revision=revision+1 WHERE case_id=$1 AND operator_identity_id=$2 AND revoked_at IS NULL',[row.id,target]);await db.query("INSERT INTO platform_support_audit(case_id,actor_identity_id,subject_identity_id,action) VALUES($1,$2,$3,'revoked')",[row.id,actor,target]);}
   }
   const next=(await db.query<Role>('INSERT INTO platform_support_operators(identity_id,active,revision) VALUES($1,$2,1) ON CONFLICT(identity_id) DO UPDATE SET active=$2,revision=platform_support_operators.revision+1 RETURNING identity_id AS "identityId",active,revision',[target,active])).rows[0];
   if(!next)throw Error('platform_support_not_found');
   await db.query("INSERT INTO platform_support_audit(actor_identity_id,subject_identity_id,action) VALUES($1,$2,$3)",[actor,target,active?'operator_granted':'operator_revoked']);
   return next;
  });
 }
}
