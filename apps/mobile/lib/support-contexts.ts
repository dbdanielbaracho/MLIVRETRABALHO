export type SupportContext={tenantId:string;displayName:string};
export type ContextResult={status:'loading'}|{status:'error'}|{status:'ready';data:SupportContext[]};
type Response={ok:boolean;json():Promise<unknown>};
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export async function loadSupportContexts(request:()=>Promise<Response>,isCurrent:()=>boolean=()=>true):Promise<ContextResult>{
 try{
  if(!isCurrent())return {status:'error'};
  const response=await request();if(!isCurrent()||!response.ok)return {status:'error'};
  const data:unknown=await response.json();if(!isCurrent()||!Array.isArray(data))return {status:'error'};
  const rows:SupportContext[]=[],seen=new Set<string>();
  for(const item of data){
   if(!item||typeof item!=='object'||Array.isArray(item))return {status:'error'};
   const row=item as Record<string,unknown>;
   if(typeof row.tenantId!=='string'||!uuid.test(row.tenantId)||typeof row.displayName!=='string'||!row.displayName.trim())return {status:'error'};
   const tenantId=row.tenantId.toLowerCase();if(seen.has(tenantId))return {status:'error'};seen.add(tenantId);
   rows.push({tenantId,displayName:row.displayName});
  }
  return {status:'ready',data:rows};
 }catch{return {status:'error'};}
}
