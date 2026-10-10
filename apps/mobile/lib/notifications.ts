export type Notification = { id: string; tenantId: string; title: string; body: string; readAt?: string | null; createdAt: string };
export type NotificationResult = {status:'ready';data:Notification[]} | {status:'error'};
type Headers=Record<string,string>;
type Response = {ok:boolean;status?:number;json():Promise<unknown>};
const record=(x:unknown):x is Record<string,unknown>=>!!x&&typeof x==='object'&&!Array.isArray(x);
const nonempty=(x:unknown):x is string=>typeof x==='string'&&!!x.trim();
const date=(x:unknown)=>nonempty(x)&&Number.isFinite(new Date(x).getTime());
export function notificationContextHeaders(getHeaders:()=>Promise<Headers>,company:boolean,expectedTenantId?:string):()=>Promise<Headers>{
 let tenantId=expectedTenantId;
 return async()=>{
  const headers=await getHeaders();
  if(company){const selected=headers['x-tenant-id'];if(!nonempty(selected))throw Error('tenant_required');if(tenantId!==undefined&&selected!==tenantId)throw Error('tenant_changed');tenantId=selected;}
  return headers;
 };
}
export async function loadNotifications(request:()=>Promise<Response>,expectedTenantId?:string):Promise<NotificationResult>{
 try{
  const response=await request();if(!response.ok)return {status:'error'};
  const data:unknown=await response.json();
  if(!Array.isArray(data)||!data.every(n=>record(n)&&nonempty(n.id)&&nonempty(n.tenantId)&&(expectedTenantId===undefined||n.tenantId===expectedTenantId)&&typeof n.title==='string'&&typeof n.body==='string'&&date(n.createdAt)&&(n.readAt==null||date(n.readAt))))return {status:'error'};
  return {status:'ready',data};
 }catch{return {status:'error'};}
}
export async function markNotificationRead(request:(path:string,tenantId:string)=>Promise<Response>,notification:Notification):Promise<{status:'confirmed';readAt:string}|{status:'rejected'|'unknown'}>{
 if(!nonempty(notification.id)||!nonempty(notification.tenantId))return {status:'rejected'};
 try{
  const response=await request('/notifications/'+encodeURIComponent(notification.id)+'/read',notification.tenantId);
  if(!response.ok)return {status:response.status!=null&&response.status>=400&&response.status<500?'rejected':'unknown'};
  const data:unknown=await response.json();
  return record(data)&&data.id===notification.id&&date(data.readAt)?{status:'confirmed',readAt:data.readAt as string}:{status:'unknown'};
 }catch{return {status:'unknown'};}
}
