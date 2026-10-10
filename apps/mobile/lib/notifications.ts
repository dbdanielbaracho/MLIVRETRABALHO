export type Notification = { id: string; tenantId: string; title: string; body: string; readAt?: string | null; createdAt: string };
export type NotificationResult = {status:'ready';data:Notification[]} | {status:'error'};
type Response = {ok:boolean;json():Promise<unknown>};
export async function loadNotifications(request:()=>Promise<Response>):Promise<NotificationResult>{
 try{
  const response=await request();if(!response.ok)return {status:'error'};
  const data:unknown=await response.json();
  if(!Array.isArray(data)||!data.every(n=>n&&typeof n==='object'&&typeof n.id==='string'&&typeof n.tenantId==='string'&&typeof n.title==='string'&&typeof n.body==='string'&&typeof n.createdAt==='string'&&(n.readAt==null||typeof n.readAt==='string')))return {status:'error'};
  return {status:'ready',data};
 }catch{return {status:'error'};}
}
