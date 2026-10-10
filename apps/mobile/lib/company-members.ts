export type Result<T>={status:'loading'}|{status:'error';forbidden?:boolean}|{status:'ready';data:T[]};
export type Member={identityId:string;email:string;role:string;createdAt:string;deactivatedAt?:string|null};
export type Invitation={id:string;email:string;role:string;expiresAt:string;acceptedAt?:string|null;revokedAt?:string|null};
export type Management={members:Result<Member>;invitations:Result<Invitation>};
export type Request=(path:string,body?:Record<string,string>,method?:'POST')=>Promise<{ok:boolean;status?:number;json():Promise<unknown>}>;
const record=(x:unknown):x is Record<string,unknown>=>!!x&&typeof x==='object'&&!Array.isArray(x);
const nonempty=(x:unknown):x is string=>typeof x==='string'&&!!x.trim();
const date=(x:unknown)=>typeof x==='string'&&Number.isFinite(new Date(x).getTime());
const optionalDate=(x:unknown)=>x==null||date(x);
const member=(x:unknown):x is Member=>record(x)&&nonempty(x.identityId)&&typeof x.email==='string'&&typeof x.role==='string'&&date(x.createdAt)&&optionalDate(x.deactivatedAt);
const invitation=(x:unknown):x is Invitation=>record(x)&&nonempty(x.id)&&typeof x.email==='string'&&typeof x.role==='string'&&date(x.expiresAt)&&optionalDate(x.acceptedAt)&&optionalDate(x.revokedAt);
async function read<T>(request:Request,path:string,valid:(x:unknown)=>x is T):Promise<Result<T>>{try{const r=await request(path);if(!r.ok)return {status:'error',forbidden:r.status===403};const d:unknown=await r.json();return Array.isArray(d)&&d.every(valid)?{status:'ready',data:d}:{status:'error'};}catch{return {status:'error'};}}
export const loadingManagement=():Management=>({members:{status:'loading'},invitations:{status:'loading'}});
export async function loadManagement(request:Request):Promise<Management>{const [members,invitations]=await Promise.all([read(request,'/company/members',member),read(request,'/company/members/invitations',invitation)]);return {members,invitations};}
export function sameManagementContext(a:Record<string,string>,b:Record<string,string>):boolean{return !!b.Authorization&&!!b['x-tenant-id']&&a['x-tenant-id']===b['x-tenant-id']&&a.Authorization===b.Authorization;}
export type InviteResult={status:'created';inviteCode:string;email:string}|{status:'rejected'|'unknown'};
export async function generateInvitation(request:Request,tenantId:string,email:string,role:string):Promise<InviteResult>{
 if(!tenantId.trim())return {status:'rejected'};
 try{const r=await request('/company/members/invitations',{email,role});if(!r.ok)return {status:r.status!=null&&r.status>=400&&r.status<500?'rejected':'unknown'};const d:unknown=await r.json();return record(d)&&nonempty(d.invitationId)&&d.email===email&&d.role===role&&date(d.expiresAt)&&typeof d.inviteCode==='string'&&d.inviteCode.startsWith(tenantId+'.')&&!!d.inviteCode.slice(tenantId.length+1).trim()?{status:'created',inviteCode:d.inviteCode,email}:{status:'unknown'};}catch{return {status:'unknown'};}
}
export type AcceptResult={status:'accepted';tenantId:string;role:string}|{status:'error';message?:string};
export async function acceptInvitation(request:Request,inviteCode:string):Promise<AcceptResult>{
 if(!inviteCode.trim()||inviteCode.indexOf('.')<1||!inviteCode.slice(inviteCode.indexOf('.')+1).trim())return {status:'error'};
 try{const r=await request('/company/members/invitations/accept',{inviteCode});const d:unknown=await r.json();if(!r.ok)return {status:'error',message:record(d)&&typeof d.message==='string'?d.message:undefined};return record(d)&&d.accepted===true&&nonempty(d.tenantId)&&d.tenantId===inviteCode.split('.')[0]&&typeof d.role==='string'&&['owner','admin','manager'].includes(d.role)?{status:'accepted',tenantId:d.tenantId,role:d.role}:{status:'error'};}catch{return {status:'error'};}
}
export async function revokeInvitation(request:Request,id:string):Promise<boolean>{if(!id.trim())return false;try{const r=await request('/company/members/invitations/'+encodeURIComponent(id)+'/revoke',undefined,'POST');if(!r.ok)return false;const d:unknown=await r.json();return record(d)&&d.revoked===true&&d.invitationId===id;}catch{return false;}}
