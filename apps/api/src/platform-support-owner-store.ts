import {platformSupportPage} from './platform-support-page';
import {PlatformSupportStore} from './platform-support-store';
const uuid=(v:unknown):v is string=>typeof v==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(v);
export class PlatformSupportOwnerStore extends PlatformSupportStore{
 async list(identityId:string,limitValue:unknown,cursorValue:unknown){
  const {limit,cursor}=platformSupportPage(limitValue,cursorValue);
  return this.owner(identityId,async db=>{
   const rows=(await db.query(`SELECT id,category,status,created_at AS "createdAt",updated_at AS "updatedAt",to_char(created_at AT TIME ZONE 'UTC','YYYY-MM-DD"T"HH24:MI:SS.US"Z"') AS "cursorAt"
    FROM platform_support_cases WHERE owner_identity_id=$1 AND ($2::timestamptz IS NULL OR (created_at,id)<($2::timestamptz,$3::uuid)) ORDER BY created_at DESC,id DESC LIMIT $4`,[identityId,cursor?.[0]??null,cursor?.[1]??null,limit+1])).rows;
   const page=rows.slice(0,limit),last=page.at(-1);
   for(const row of page)await db.query("INSERT INTO platform_support_audit(case_id,actor_identity_id,action) VALUES($1,$2,'read')",[row.id,identityId]);
   const acceptingRequests=(await db.query('SELECT platform_support_intake_available(false) AS enabled')).rows[0].enabled;
   return {items:page.map(({cursorAt,...row})=>row),nextCursor:rows.length>limit&&last?Buffer.from(JSON.stringify([last.cursorAt,last.id])).toString('base64url'):null,acceptingRequests};
  });
 }
 async detail(identityId:string,id:string){
  if(!uuid(id))throw Error('platform_support_not_found');
  return this.owner(identityId,async db=>{
   const row=(await db.query('SELECT id,category,description,status,created_at AS "createdAt",updated_at AS "updatedAt",closed_at AS "closedAt" FROM platform_support_cases WHERE id=$1 AND owner_identity_id=$2 FOR SHARE',[id,identityId])).rows[0];
   if(!row)throw Error('platform_support_not_found');
   const responses=(await db.query('SELECT id,body,created_at AS "createdAt",resolves_case AS "resolvesCase" FROM platform_support_responses WHERE case_id=$1 ORDER BY created_at,id',[id])).rows;
   await db.query("INSERT INTO platform_support_audit(case_id,actor_identity_id,action) VALUES($1,$2,'read')",[id,identityId]);return {...row,responses};
  });
 }
 async withdraw(identityId:string,id:string){
  if(!uuid(id))throw Error('platform_support_not_found');
  return this.owner(identityId,async db=>{
   const row=(await db.query('SELECT id,status,closed_at AS "closedAt" FROM platform_support_cases WHERE id=$1 AND owner_identity_id=$2 FOR UPDATE',[id,identityId])).rows[0];
   if(!row)throw Error('platform_support_not_found');if(row.status==='withdrawn')return row;
   if(!['open','reviewing'].includes(row.status))throw Error('platform_support_case_closed');
   const result=(await db.query("UPDATE platform_support_cases SET status='withdrawn',closed_at=now(),updated_at=now() WHERE id=$1 AND owner_identity_id=$2 RETURNING id,status,closed_at AS \"closedAt\"",[id,identityId])).rows[0];
   await db.query("INSERT INTO platform_support_audit(case_id,actor_identity_id,action) VALUES($1,$2,'withdrawn')",[id,identityId]);return result;
  });
 }
}
