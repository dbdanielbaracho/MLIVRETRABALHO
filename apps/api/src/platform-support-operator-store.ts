import type {PoolClient} from 'pg';
import {platformSupportInput} from './platform-support-input';
type Transactions={transaction<T>(work:(db:PoolClient)=>Promise<T>):Promise<T>};
type AssignedCase={id:string;category:string;description:string|null;status:string;createdAt:Date;closedAt:Date|null};
const uuid=(v:unknown):v is string=>typeof v==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(v);
// Internal service only: no route, automatic assignment, capability activation or role provisioning.
export class PlatformSupportOperatorStore{
 constructor(private readonly database:Transactions){}
 private assigned<T>(actor:string,caseId:string,work:(db:PoolClient,row:AssignedCase)=>Promise<T>){
  if(!uuid(caseId))throw Error('platform_support_not_found');
  return this.database.transaction(async db=>{
   await db.query("SELECT set_config('app.platform_support_identity',$1,true)",[actor]);
   // Locks make role/identity/assignment revocation serialize with this operation.
   if(!(await db.query('SELECT id FROM identities WHERE id=$1 AND deactivated_at IS NULL FOR SHARE',[actor])).rows[0])throw Error('platform_support_identity_required');
   if(!(await db.query('SELECT identity_id FROM platform_support_operators WHERE identity_id=$1 AND active FOR SHARE',[actor])).rows[0])throw Error('platform_support_not_found');
   const row=(await db.query<AssignedCase>(`SELECT c.id,c.category,c.description,c.status,c.created_at AS "createdAt",c.closed_at AS "closedAt"
    FROM platform_support_cases c JOIN platform_support_assignments a ON a.case_id=c.id
    JOIN identities requester ON requester.id=c.owner_identity_id
    WHERE c.id=$1 AND a.operator_identity_id=$2 AND a.revoked_at IS NULL AND requester.deactivated_at IS NULL
    FOR UPDATE OF c FOR SHARE OF a,requester`,[caseId,actor])).rows[0];
   if(!row)throw Error('platform_support_not_found');
   return work(db,row);
  });
 }
 detail(actor:string,caseId:string){return this.assigned(actor,caseId,async(db,row)=>{
  const responses=(await db.query('SELECT id,body,created_at AS "createdAt",resolves_case AS "resolvesCase" FROM platform_support_responses WHERE case_id=$1 ORDER BY created_at,id',[caseId])).rows;
  await db.query("INSERT INTO platform_support_audit(case_id,actor_identity_id,action) VALUES($1,$2,'read')",[caseId,actor]);
  return {...row,responses};
 });}
 respond(actor:string,caseId:string,value:unknown){
  const x=value&&typeof value==='object'&&!Array.isArray(value)?value as Record<string,unknown>:null;
  const text=x&&platformSupportInput({category:'other',description:x.body});
  if(!x||Object.keys(x).some(k=>!['responseKey','body','resolve'].includes(k))||!uuid(x.responseKey)||typeof x.resolve!=='boolean'||!text)throw Error('platform_support_response_invalid');
  const key=x.responseKey,resolve=x.resolve;
  return this.assigned(actor,caseId,async(db,row)=>{
   const replay=async()=>{
    const prior=(await db.query('SELECT id,body,resolves_case AS "resolvesCase",created_at AS "createdAt" FROM platform_support_responses WHERE request_key=$1 AND case_id=$2 AND operator_identity_id=$3',[key,caseId,actor])).rows[0];
    if(!prior)return null;
    if(prior.body!==text.description||prior.resolvesCase!==resolve)throw Error('platform_support_payload_conflict');
    return prior;
   };
   const prior=await replay();if(prior)return prior;
   if(!['open','reviewing'].includes(row.status))throw Error('platform_support_case_closed');
   const reply=(await db.query('INSERT INTO platform_support_responses(request_key,case_id,operator_identity_id,body,resolves_case) VALUES($1,$2,$3,$4,$5) ON CONFLICT(case_id,request_key) WHERE request_key IS NOT NULL DO NOTHING RETURNING id,body,resolves_case AS "resolvesCase",created_at AS "createdAt"',[key,caseId,actor,text.description,resolve])).rows[0];
   if(!reply){const same=await replay();if(same)return same;throw Error('platform_support_not_found');}
   await db.query("UPDATE platform_support_cases SET status=CASE WHEN $2 THEN 'resolved' ELSE 'reviewing' END,updated_at=now(),closed_at=CASE WHEN $2 THEN now() ELSE NULL END WHERE id=$1",[caseId,resolve]);
   await db.query("INSERT INTO platform_support_audit(case_id,actor_identity_id,action) VALUES($1,$2,'responded')",[caseId,actor]);
   return reply;
  });
 }
}
