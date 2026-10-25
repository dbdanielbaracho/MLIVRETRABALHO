import type {PoolClient} from 'pg';
type Transactions={transaction<T>(work:(db:PoolClient)=>Promise<T>):Promise<T>};
const uuid=(v:unknown):v is string=>typeof v==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(v);
type Assignment={operatorId:string;revision:number;revokedAt:Date|null};
// Internal administrative authority. No signup, tenant role or database role is an administrator.
export class PlatformSupportDispatchStore{
 constructor(private readonly database:Transactions){}
 async change(actor:string,caseId:string,target:string|null,expectedRevision:number){
  if(!uuid(actor)||!uuid(caseId)||(target!==null&&!uuid(target))||!Number.isSafeInteger(expectedRevision)||expectedRevision<0||expectedRevision>=2147483647)throw Error('platform_support_dispatch_invalid');
  return this.database.transaction(async db=>{
   await db.query("SELECT set_config('app.platform_support_identity',$1,true)",[actor]);
   if(!(await db.query('SELECT id FROM identities WHERE id=$1 AND deactivated_at IS NULL FOR SHARE',[actor])).rows[0])throw Error('platform_support_identity_required');
   if(!(await db.query('SELECT identity_id FROM platform_support_administrators WHERE identity_id=$1 AND active FOR SHARE',[actor])).rows[0])throw Error('platform_support_dispatch_denied');
   if(target!==null){
    if(actor===target)throw Error('platform_support_dispatch_denied');
    if(!(await db.query('SELECT o.identity_id FROM platform_support_operators o JOIN identities i ON i.id=o.identity_id WHERE o.identity_id=$1 AND o.active AND i.deactivated_at IS NULL FOR SHARE OF o,i',[target])).rows[0])throw Error('platform_support_not_found');
   }
   const row=(await db.query('SELECT c.status,c.owner_identity_id AS owner FROM platform_support_cases c JOIN identities i ON i.id=c.owner_identity_id WHERE c.id=$1 AND i.deactivated_at IS NULL FOR UPDATE OF c FOR SHARE OF i',[caseId])).rows[0];
   if(!row)throw Error('platform_support_not_found');
   if(row.owner===actor)throw Error('platform_support_dispatch_denied');
   const prior=(await db.query<Assignment>('SELECT operator_identity_id AS "operatorId",revision,revoked_at AS "revokedAt" FROM platform_support_assignments WHERE case_id=$1 FOR UPDATE',[caseId])).rows[0];
   const ack=(x:Assignment)=>({caseId,operatorId:x.operatorId,revision:x.revision,revokedAt:x.revokedAt});
   // A retry can return only the exact next revision and desired state.
   if(prior?.revision===expectedRevision+1&&((target===null&&prior.revokedAt!==null)||(target===prior.operatorId&&prior.revokedAt===null)))return ack(prior);
   if((prior?.revision??0)!==expectedRevision)throw Error('platform_support_assignment_conflict');
   if(target!==null&&!['open','reviewing'].includes(row.status))throw Error('platform_support_case_closed');
   if(target===null&&!prior)throw Error('platform_support_not_found');
   if(prior&&((target===null&&prior.revokedAt!==null)||(target===prior.operatorId&&prior.revokedAt===null)))return ack(prior);
   if(prior&&prior.revokedAt===null)await db.query("INSERT INTO platform_support_audit(case_id,actor_identity_id,subject_identity_id,action) VALUES($1,$2,$3,'revoked')",[caseId,actor,prior.operatorId]);
   const next=(target===null?await db.query<Assignment>('UPDATE platform_support_assignments SET revoked_at=now(),revision=revision+1 WHERE case_id=$1 RETURNING operator_identity_id AS "operatorId",revision,revoked_at AS "revokedAt"',[caseId]):await db.query<Assignment>('INSERT INTO platform_support_assignments(case_id,operator_identity_id,revision) VALUES($1,$2,1) ON CONFLICT(case_id) DO UPDATE SET operator_identity_id=$2,assigned_at=now(),revoked_at=NULL,revision=platform_support_assignments.revision+1 RETURNING operator_identity_id AS "operatorId",revision,revoked_at AS "revokedAt"',[caseId,target])).rows[0];
   if(target!==null)await db.query("INSERT INTO platform_support_audit(case_id,actor_identity_id,subject_identity_id,action) VALUES($1,$2,$3,'assigned')",[caseId,actor,target]);
   return ack(next);
  });
 }
}
