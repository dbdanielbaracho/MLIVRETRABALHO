export type Result<T>={status:'loading'}|{status:'error';forbidden?:boolean}|{status:'ready';data:T[]};
export type SafetyCase={id:string;assignmentId?:string|null;category:string;description:string;status:string;createdAt:string;resolvedAt?:string|null};
export type SafetyAppeal={id:string;safetyCaseId:string;appellantIdentityId:string;reason:string;status:string;createdAt:string};
export type SafetyData={cases:Result<SafetyCase>;appeals:Result<SafetyAppeal>};
export type CaseStatus='reviewing'|'resolved'|'dismissed';
export type AppealStatus='reviewing'|'upheld'|'modified'|'reversed';
export type Request=(path:string,body?:{status:string;note?:string})=>Promise<{ok:boolean;status?:number;json():Promise<unknown>}>;
const record=(x:unknown):x is Record<string,unknown>=>!!x&&typeof x==='object'&&!Array.isArray(x);
const nonempty=(x:unknown):x is string=>typeof x==='string'&&!!x.trim();
const date=(x:unknown)=>typeof x==='string'&&Number.isFinite(new Date(x).getTime());
const validCase=(x:unknown):x is SafetyCase=>record(x)&&nonempty(x.id)&&(x.assignmentId==null||nonempty(x.assignmentId))&&typeof x.category==='string'&&['unsafe_work','harassment','violence','discrimination','fraud','other'].includes(x.category)&&typeof x.description==='string'&&typeof x.status==='string'&&['open','reviewing','resolved','dismissed'].includes(x.status)&&date(x.createdAt)&&(x.resolvedAt==null||date(x.resolvedAt));
const validAppeal=(x:unknown):x is SafetyAppeal=>record(x)&&nonempty(x.id)&&nonempty(x.safetyCaseId)&&nonempty(x.appellantIdentityId)&&typeof x.reason==='string'&&typeof x.status==='string'&&['submitted','reviewing','upheld','modified','reversed'].includes(x.status)&&date(x.createdAt);
async function read<T>(request:Request,path:string,valid:(x:unknown)=>x is T):Promise<Result<T>>{try{const r=await request(path);if(!r.ok)return {status:'error',forbidden:r.status===403};const d:unknown=await r.json();return Array.isArray(d)&&d.every(valid)?{status:'ready',data:d}:{status:'error'};}catch{return {status:'error'};}}
export const loadingSafety=():SafetyData=>({cases:{status:'loading'},appeals:{status:'loading'}});
export async function loadSafety(request:Request):Promise<SafetyData>{const [cases,appeals]=await Promise.all([read(request,'/company/safety-cases',validCase),read(request,'/company/safety-appeals',validAppeal)]);return {cases,appeals};}
export function sameSafetyContext(a:Record<string,string>,b:Record<string,string>):boolean{return !!b.Authorization&&!!b['x-tenant-id']&&a['x-tenant-id']===b['x-tenant-id']&&a.Authorization===b.Authorization;}
const notes:Record<AppealStatus,string>={reviewing:'Revisão humana iniciada pelo administrador.',upheld:'Decisão mantida após revisão humana.',modified:'Decisão modificada após revisão humana.',reversed:'Decisão revertida após revisão humana.'};
export async function changeCase(request:Request,id:string,status:CaseStatus):Promise<boolean>{return change(request,'/company/safety-cases/'+encodeURIComponent(id)+'/status',id,{status});}
export async function changeAppeal(request:Request,id:string,status:AppealStatus):Promise<boolean>{return change(request,'/company/safety-appeals/'+encodeURIComponent(id)+'/status',id,{status,note:notes[status]});}
async function change(request:Request,path:string,id:string,body:{status:string;note?:string}):Promise<boolean>{if(!id.trim())return false;try{const r=await request(path,body);if(!r.ok)return false;const d:unknown=await r.json();return record(d)&&d.id===id&&d.status===body.status;}catch{return false;}}
