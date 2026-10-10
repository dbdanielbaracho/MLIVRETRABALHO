export type DeclaredCapability = {roleId:string;vertical:string;family:string;role:string;skills:string[];certifications:string[];provenLevel:'entry'|'proven'|'advanced'|'expert'|null};
export type CapabilityResult = {status:'loading'|'error'|'profile_required'} | {status:'ready';data:DeclaredCapability[]};
type Response = {ok:boolean;status?:number;json():Promise<unknown>};
const record=(x:unknown):x is Record<string,unknown>=>x!==null&&typeof x==='object'&&!Array.isArray(x);
const name=(x:unknown):x is string=>typeof x==='string'&&!!x.trim();
const names=(x:unknown):x is string[]=>Array.isArray(x)&&x.every(name);
function capability(x:unknown):x is DeclaredCapability {
  return record(x)&&['roleId','vertical','family','role'].every(k=>name(x[k]))&&names(x.skills)&&names(x.certifications)&&(x.provenLevel===null||(typeof x.provenLevel==='string'&&['entry','proven','advanced','expert'].includes(x.provenLevel)));
}
export async function loadDeclaredCapabilities(request:()=>Promise<Response>,isCurrent:()=>boolean=()=>true):Promise<CapabilityResult> {
  try {
    if(!isCurrent())return {status:'error'};
    const response=await request();if(!isCurrent())return {status:'error'};
    const data:unknown=await response.json();if(!isCurrent())return {status:'error'};
    if(!response.ok)return response.status===400&&record(data)&&data.message==='professional_profile_required'?{status:'profile_required'}:{status:'error'};
    if(!Array.isArray(data)||!data.every(capability)||new Set(data.map(x=>x.roleId)).size!==data.length)return {status:'error'};
    return {status:'ready',data};
  } catch { return {status:'error'}; }
}
// Display existing catalog text; this does not create or alter canonical identifiers.
export const capabilityLabel=(value:string)=>value.replaceAll('_',' ');
