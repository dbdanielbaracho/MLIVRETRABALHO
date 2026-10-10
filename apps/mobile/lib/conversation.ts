export type Message={id:string;body:string;senderIdentityId:string;createdAt:string};
export type Messages={status:'loading'}|{status:'error';forbidden?:boolean;missing?:boolean}|{status:'ready';data:Message[]};
export type Request=(path:string,body?:{body:string})=>Promise<{ok:boolean;status?:number;json():Promise<unknown>}>;
export type Sent={status:'sent';id:string}|{status:'rejected'|'unknown'};
const record=(x:unknown):x is Record<string,unknown>=>!!x&&typeof x==='object'&&!Array.isArray(x);
const id=(x:unknown)=>typeof x==='string'&&x.length>0;
const date=(x:unknown)=>typeof x==='string'&&Number.isFinite(new Date(x).getTime());
const valid=(x:unknown):x is Message=>record(x)&&id(x.id)&&typeof x.body==='string'&&id(x.senderIdentityId)&&date(x.createdAt);
export const routeId=(x:unknown):string=>typeof x==='string'&&x.trim().length>0?x:'';
export const messagePath=(assignmentId:string)=>'/conversations/'+encodeURIComponent(assignmentId)+'/messages';
export async function loadMessages(request:Request,assignmentId:string):Promise<Messages>{try{const r=await request(messagePath(assignmentId));if(!r.ok)return {status:'error',forbidden:r.status===403,missing:r.status===404};const data:unknown=await r.json();return Array.isArray(data)&&data.every(valid)?{status:'ready',data}:{status:'error'};}catch{return {status:'error'};}}
export function sameConversationSession(a:Record<string,string>,b:Record<string,string>):boolean{return !!b.Authorization&&a.Authorization===b.Authorization;}
export async function sendMessage(request:Request,assignmentId:string,body:string):Promise<Sent>{try{const r=await request(messagePath(assignmentId),{body});if(!r.ok)return {status:r.status!=null&&r.status>=400&&r.status<500?'rejected':'unknown'};const d:unknown=await r.json();return record(d)&&id(d.id)&&d.body===body.trim()&&date(d.createdAt)?{status:'sent',id:d.id as string}:{status:'unknown'};}catch{return {status:'unknown'};}}
