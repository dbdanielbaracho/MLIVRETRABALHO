import {platformSupportPage} from './platform-support-page';
import type {PoolClient} from 'pg';
import {platformSupportInput} from './platform-support-input';
type Transactions={transaction<T>(work:(db:PoolClient)=>Promise<T>):Promise<T>};
type AssignedCase={id:string;category:string;description:string|null;status:string;createdAt:Date;closedAt:Date|null};
const uuid=(v:unknown):v is string=>typeof v==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(v);
// Session-bound controller supplies the actor; this store never activates intake or provisions roles.
export class PlatformSupportOperatorStore{
 constructor(private readonly database:Transactions){}
 private operator<T>(actor:string,work:(db:PoolClient)=>Promise<T>){
  return this.database.transaction(async db=>{
   await db.query("SELECT set_config('app.platform_support_identity',$1,true)",[actor]);
   // Locks make role/identity/assignment revocation serialize with this operation.
   if(!(await db.query('SELECT platform_support_lock_owner_identity() AS active')).rows[0]?.active)throw Error('platform_support_identity_required');
   if(!(await db.query('SELECT platform_support_lock_operator() AS active')).rows[0]?.active)throw Error('platform_support_not_found');
   return work(db);
  });
 }
 private assigned<T>(actor:string,caseId:string,work:(db:PoolClient,row:AssignedCase)=>Promise<T>){
  if(!uuid(caseId))throw Error('platform_support_not_found');
  return this.operator(actor,async db=>{
   if(!(await db.query('SELECT platform_support_lock_assigned_case($1,true) AS active',[caseId])).rows[0]?.active)throw Error('platform_support_not_found');
   const row=(await db.query<AssignedCase>(`SELECT c.id,c.category,c.description,c.status,c.created_at AS "createdAt",c.closed_at AS "closedAt"
    FROM platform_support_cases c JOIN platform_support_assignments a ON a.case_id=c.id
    JOIN identities requester ON requester.id=c.owner_identity_id
    WHERE c.id=$1 AND a.operator_identity_id=$2 AND a.revoked_at IS NULL AND requester.deactivated_at IS NULL
    `,[caseId,actor])).rows[0];
   if(!row)throw Error('platform_support_not_found');
   return work(db,row);
  });
 }
 async list(actor:string,limitValue:unknown,cursorValue:unknown){
  const {limit,cursor}=platformSupportPage(limitValue,cursorValue);
  return this.operator(actor,async db=>{
   const rows=(await db.query(`SELECT c.id,c.category,c.status,c.created_at AS "createdAt",c.updated_at AS "updatedAt",to_char(c.created_at AT TIME ZONE 'UTC','YYYY-MM-DD"T"HH24:MI:SS.US"Z"') AS "cursorAt"
    FROM platform_support_cases c JOIN platform_support_assignments a ON a.case_id=c.id JOIN identities requester ON requester.id=c.owner_identity_id
    WHERE a.operator_identity_id=$1 AND a.revoked_at IS NULL AND requester.deactivated_at IS NULL
    AND ($2::timestamptz IS NULL OR (c.created_at,c.id)<($2::timestamptz,$3::uuid))
    ORDER BY c.created_at DESC,c.id DESC LIMIT $4`,[actor,cursor?.[0]??null,cursor?.[1]??null,limit+1])).rows;
   // Revalidate and lock every selected row before releasing any private page data.
   for(const row of rows)if(!(await db.query('SELECT platform_support_lock_assigned_case($1,false) AS active',[row.id])).rows[0]?.active)throw Error('platform_support_not_found');
   const page=rows.slice(0,limit),last=page.at(-1);
   for(const row of page)await db.query("INSERT INTO platform_support_audit(case_id,actor_identity_id,action) VALUES($1,$2,'read')",[row.id,actor]);
   return {items:page.map(({cursorAt,...row})=>row),nextCursor:rows.length>limit&&last?Buffer.from(JSON.stringify([last.cursorAt,last.id])).toString('base64url'):null};
  });
 }
 async detail(actor:string,caseId:string){return this.assigned(actor,caseId,async(db,row)=>{
  const responses=(await db.query('SELECT id,body,created_at AS "createdAt",resolves_case AS "resolvesCase" FROM platform_support_responses WHERE case_id=$1 ORDER BY created_at,id',[caseId])).rows;
  await db.query("INSERT INTO platform_support_audit(case_id,actor_identity_id,action) VALUES($1,$2,'read')",[caseId,actor]);
  return {...row,responses};
 });}
 async respond(actor:string,caseId:string,value:unknown){
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
