export type Result<T>={status:'loading'}|{status:'error'}|{status:'ready';data:T};
export type Team={id:string;name:string;memberCount:number};
export type KnownProfessional={professionalId:string;professionalName:string};
export type TeamMember={professionalId:string;displayName:string;primaryRole?:string|null;homeCity?:string|null};
export type Job={id:string;title:string;status:string;workCity?:string|null;location?:string|null};
export type Allocation={professionalId:string;score:number;reasons:string[]};
export type TeamBase={teams:Result<Team[]>;active:Result<KnownProfessional[]>;completed:Result<KnownProfessional[]>;jobs:Result<Job[]>};
export type Request=(path:string,options?:{method:'POST'|'DELETE';body?:string})=>Promise<{ok:boolean;status?:number;json():Promise<unknown>}>;
const record=(x:unknown):x is Record<string,unknown>=>!!x&&typeof x==='object'&&!Array.isArray(x);
const nonempty=(x:unknown):x is string=>typeof x==='string'&&!!x.trim();
const text=(x:unknown)=>x==null||typeof x==='string';
const team=(x:unknown):x is Team=>record(x)&&nonempty(x.id)&&typeof x.name==='string'&&Number.isSafeInteger(x.memberCount)&&Number(x.memberCount)>=0;
const known=(x:unknown):x is KnownProfessional=>record(x)&&nonempty(x.professionalId)&&typeof x.professionalName==='string';
const member=(x:unknown):x is TeamMember=>record(x)&&nonempty(x.professionalId)&&typeof x.displayName==='string'&&text(x.primaryRole)&&text(x.homeCity);
const job=(x:unknown):x is Job=>record(x)&&nonempty(x.id)&&typeof x.title==='string'&&typeof x.status==='string'&&text(x.workCity)&&text(x.location);
const allocation=(x:unknown):x is Allocation=>record(x)&&nonempty(x.professionalId)&&typeof x.score==='number'&&Number.isFinite(x.score)&&x.score>=0&&x.score<=100&&Array.isArray(x.reasons)&&x.reasons.every(v=>typeof v==='string');
export const loadingTeamBase=():TeamBase=>({teams:{status:'loading'},active:{status:'loading'},completed:{status:'loading'},jobs:{status:'loading'}});
async function read<T>(request:Request,path:string,valid:(x:unknown)=>x is T):Promise<Result<T[]>>{try{const r=await request(path);if(!r.ok)return {status:'error'};const d:unknown=await r.json();return Array.isArray(d)&&d.every(valid)?{status:'ready',data:d}:{status:'error'};}catch{return {status:'error'};}}
export async function loadTeamBase(request:Request):Promise<TeamBase>{const [teams,active,completed,jobs]=await Promise.all([read(request,'/company/teams',team),read(request,'/company/dashboard/assignments',known),read(request,'/company/dashboard/completed',known),read(request,'/company/jobs',job)]);return {teams,active,completed,jobs:jobs.status==='ready'?{status:'ready',data:jobs.data.filter(j=>j.status==='open')}:jobs};}
export function knownProfessionals(base:TeamBase):KnownProfessional[]{const map=new Map<string,KnownProfessional>();for(const section of [base.active,base.completed])if(section.status==='ready')for(const item of section.data)map.set(item.professionalId,item);return [...map.values()].sort((a,b)=>a.professionalName.localeCompare(b.professionalName,'pt-BR'));}
export const loadMembers=(request:Request,id:string)=>read(request,'/company/teams/'+encodeURIComponent(id)+'/members',member);
export async function loadAllocation(request:Request,teamId:string,jobId:string):Promise<Result<Allocation[]>>{
 try{const r=await request('/company/teams/'+encodeURIComponent(teamId)+'/allocation/'+encodeURIComponent(jobId));if(!r.ok){const d:unknown=await r.json();return r.status===400&&record(d)&&d.message==='team_empty'?{status:'ready',data:[]}:{status:'error'};}const d:unknown=await r.json();return Array.isArray(d)&&d.every(allocation)?{status:'ready',data:d}:{status:'error'};}catch{return {status:'error'};}
}
export function sameTeamContext(current:Record<string,string>,displayed:Record<string,string>):boolean{return !!displayed.Authorization&&!!displayed['x-tenant-id']&&current['x-tenant-id']===displayed['x-tenant-id']&&current.Authorization===displayed.Authorization;}
export type CreatedTeam={id:string;name:string};
export type CreateResult={status:'created';team:CreatedTeam}|{status:'rejected'|'unknown'};
export async function createTeam(request:Request,name:string):Promise<CreateResult>{if(!name.trim())return {status:'rejected'};try{const r=await request('/company/teams',{method:'POST',body:JSON.stringify({name})});if(!r.ok)return {status:r.status!=null&&r.status>=400&&r.status<500?'rejected':'unknown'};const d:unknown=await r.json();return record(d)&&nonempty(d.id)&&d.name===name?{status:'created',team:{id:d.id,name}}:{status:'unknown'};}catch{return {status:'unknown'};}}
export async function changeTeamMember(request:Request,id:string,professionalId:string,remove:boolean):Promise<boolean>{if(!id.trim()||!professionalId.trim())return false;try{const prefix='/company/teams/'+encodeURIComponent(id)+'/members';const r=await request(remove?prefix+'/'+encodeURIComponent(professionalId):prefix,remove?{method:'DELETE'}:{method:'POST',body:JSON.stringify({professionalId})});if(!r.ok)return false;const d:unknown=await r.json();return record(d)&&(remove?d.removed===true:d.teamId===id&&d.professionalId===professionalId);}catch{return false;}}
