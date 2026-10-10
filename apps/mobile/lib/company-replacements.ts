export type Result<T>={status:'loading'}|{status:'error';forbidden?:boolean}|{status:'ready';data:T[]};
export type Assignment={id:string;status:string;title:string;professionalName:string;replacementOpen:boolean;location?:string|null;startsAt?:string|null;endsAt?:string|null};
export type Replacement={id:string;assignmentId:string;status:'open'|'matched'|'resolved'|'cancelled';reason?:string|null};
export type Recommendation={replacementRequestId:string;recommendedProfessionalId:string;recommendedProfessionalName:string;score:number;reasons:string[]};
export type ReplacementData={assignments:Result<Assignment>;replacements:Result<Replacement>};
export type Request=(path:string,method:'GET'|'POST',body?:{reason?:string;professionalId?:string})=>Promise<{ok:boolean;status?:number;json():Promise<unknown>}>;
export type MatchResult={status:'ready';data:Recommendation}|{status:'empty'|'error'};
const record=(x:unknown):x is Record<string,unknown>=>!!x&&typeof x==='object'&&!Array.isArray(x);
const id=(x:unknown)=>typeof x==='string'&&x.length>0;
const text=(x:unknown)=>x==null||typeof x==='string';
const date=(x:unknown)=>x==null||(typeof x==='string'&&Number.isFinite(new Date(x).getTime()));
const validAssignment=(x:unknown):x is Assignment=>record(x)&&id(x.id)&&typeof x.status==='string'&&['confirmed','checked_in','in_progress','checked_out'].includes(x.status)&&typeof x.title==='string'&&typeof x.professionalName==='string'&&typeof x.replacementOpen==='boolean'&&text(x.location)&&date(x.startsAt)&&date(x.endsAt);
const validReplacement=(x:unknown):x is Replacement=>record(x)&&id(x.id)&&id(x.assignmentId)&&typeof x.status==='string'&&['open','matched','resolved','cancelled'].includes(x.status)&&text(x.reason);
async function read<T>(request:Request,path:string,valid:(x:unknown)=>x is T):Promise<Result<T>>{try{const r=await request(path,'GET');if(!r.ok)return {status:'error',forbidden:r.status===403};const d:unknown=await r.json();return Array.isArray(d)&&d.every(valid)?{status:'ready',data:d}:{status:'error'};}catch{return {status:'error'};}}
export const loadingReplacements=():ReplacementData=>({assignments:{status:'loading'},replacements:{status:'loading'}});
export async function loadReplacements(request:Request):Promise<ReplacementData>{const [assignments,replacements]=await Promise.all([read(request,'/company/dashboard/assignments',validAssignment),read(request,'/company/replacements',validReplacement)]);return {assignments,replacements};}
export const replaceable=(status:string)=>['confirmed','checked_in','in_progress'].includes(status);
export function sameReplacementContext(a:Record<string,string>,b:Record<string,string>):boolean{return !!b['x-tenant-id']&&!!b.Authorization&&a['x-tenant-id']===b['x-tenant-id']&&a.Authorization===b.Authorization;}
const prefix=(id:string)=>'/company/replacements/'+encodeURIComponent(id);
export async function requestReplacement(request:Request,assignmentId:string,reason?:string):Promise<boolean>{try{const r=await request(prefix(assignmentId),'POST',{reason});if(!r.ok)return false;const d:unknown=await r.json();return record(d)&&id(d.id)&&d.assignmentId===assignmentId&&d.status==='open';}catch{return false;}}
export async function matchReplacement(request:Request,replacementId:string):Promise<MatchResult>{try{const r=await request(prefix(replacementId)+'/auto-match','POST');const d:unknown=await r.json();if(!r.ok)return r.status===400&&record(d)&&d.message==='no_replacement_available'?{status:'empty'}:{status:'error'};
 return record(d)&&d.replacementRequestId===replacementId&&id(d.recommendedProfessionalId)&&typeof d.recommendedProfessionalName==='string'&&typeof d.score==='number'&&Number.isFinite(d.score)&&d.score>=0&&d.score<=100&&Array.isArray(d.reasons)&&d.reasons.every(x=>typeof x==='string')?{status:'ready',data:d as Recommendation}:{status:'error'};}catch{return {status:'error'};}}
export async function selectReplacement(request:Request,replacement:Replacement,professionalId:string):Promise<boolean>{try{const r=await request(prefix(replacement.id)+'/select','POST',{professionalId});if(!r.ok)return false;const d:unknown=await r.json();return record(d)&&d.replacementRequestId===replacement.id&&d.professionalId===professionalId&&d.replacedAssignmentId===replacement.assignmentId&&id(d.assignmentId)&&d.status==='matched';}catch{return false;}}
