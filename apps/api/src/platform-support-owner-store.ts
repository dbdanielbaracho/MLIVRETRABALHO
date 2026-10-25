import {PlatformSupportStore} from './platform-support-store';
const uuid=(v:unknown):v is string=>typeof v==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(v);
export class PlatformSupportOwnerStore extends PlatformSupportStore{
 async list(identityId:string,limitValue:unknown,cursorValue:unknown){
  const limit=limitValue===undefined?20:typeof limitValue==='string'&&/^[1-9]\d{0,2}$/.test(limitValue)?Number(limitValue):0;
  if(limit<1||limit>100)throw Error('platform_support_page_invalid');
  let cursor:[string,string]|null=null;
  if(cursorValue!==undefined){try{
   if(typeof cursorValue!=='string'||cursorValue.length>256||!/^[A-Za-z0-9_-]+$/.test(cursorValue))throw Error();
   const decoded=Buffer.from(cursorValue,'base64url');if(decoded.toString('base64url')!==cursorValue)throw Error();
   const x=JSON.parse(decoded.toString('utf8'));
   if(!Array.isArray(x)||x.length!==2||typeof x[0]!=='string'||x[0].startsWith('0000')||!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{6}Z$/.test(x[0])||!uuid(x[1])||new Date(x[0]).toISOString().slice(0,19)!==x[0].slice(0,19))throw Error();
   cursor=x as [string,string];
  }catch{throw Error('platform_support_page_invalid');}}
  return this.owner(identityId,async db=>{
   const rows=(await db.query(`SELECT id,category,status,created_at AS "createdAt",updated_at AS "updatedAt",to_char(created_at AT TIME ZONE 'UTC','YYYY-MM-DD"T"HH24:MI:SS.US"Z"') AS "cursorAt"
    FROM platform_support_cases WHERE owner_identity_id=$1 AND ($2::timestamptz IS NULL OR (created_at,id)<($2::timestamptz,$3::uuid)) ORDER BY created_at DESC,id DESC LIMIT $4`,[identityId,cursor?.[0]??null,cursor?.[1]??null,limit+1])).rows;
   const page=rows.slice(0,limit),last=page.at(-1);
   for(const row of page)await db.query("INSERT INTO platform_support_audit(case_id,actor_identity_id,action) VALUES($1,$2,'read')",[row.id,identityId]);
   const acceptingRequests=(await db.query(`SELECT EXISTS(SELECT 1 FROM platform_support_capability c WHERE c.singleton AND c.enabled AND EXISTS(SELECT 1 FROM platform_support_operators o JOIN identities i ON i.id=o.identity_id WHERE o.active AND i.deactivated_at IS NULL)) AS enabled`)).rows[0].enabled;
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
