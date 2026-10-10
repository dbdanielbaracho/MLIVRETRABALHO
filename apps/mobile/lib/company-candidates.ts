export type CompanyJob={id:string;title:string;status:string;location?:string|null;workCity?:string|null};
export type Candidate={professionalId:string;displayName:string;homeCity?:string|null;status:string};
export type Recommendation={professionalId:string;score:number;reasons:string[]};
export type Result<T>={status:'loading'}|{status:'error'}|{status:'ready';data:T};
export type CandidateData={candidates:Result<Candidate[]>;recommendations:Result<Recommendation[]>};
type Request=(path:string,options?:{method:'POST';body:string})=>Promise<{ok:boolean;json():Promise<unknown>}>;
const record=(x:unknown):x is Record<string,unknown>=>!!x&&typeof x==='object'&&!Array.isArray(x);
const nonempty=(x:unknown):x is string=>typeof x==='string'&&!!x.trim();
const text=(x:unknown)=>x==null||typeof x==='string';
const validJob=(x:unknown):x is CompanyJob=>record(x)&&nonempty(x.id)&&typeof x.title==='string'&&typeof x.status==='string'&&text(x.location)&&text(x.workCity);
const validCandidate=(x:unknown):x is Candidate=>record(x)&&nonempty(x.professionalId)&&typeof x.displayName==='string'&&typeof x.status==='string'&&text(x.homeCity);
const validRecommendation=(x:unknown):x is Recommendation=>record(x)&&nonempty(x.professionalId)&&typeof x.score==='number'&&Number.isFinite(x.score)&&x.score>=0&&x.score<=100&&Array.isArray(x.reasons)&&x.reasons.every(v=>typeof v==='string');
async function read<T>(request:Request,path:string,valid:(x:unknown)=>x is T):Promise<Result<T[]>>{try{const r=await request(path);if(!r.ok)return {status:'error'};const d:unknown=await r.json();return Array.isArray(d)&&d.every(valid)?{status:'ready',data:d}:{status:'error'};}catch{return {status:'error'};}}
export async function loadCompanyJobs(request:Request):Promise<Result<CompanyJob[]>>{const r=await read(request,'/company/jobs',validJob);return r.status==='ready'?{status:'ready',data:r.data.filter(j=>j.status==='open')}:r;}
export const loadingCandidates=():CandidateData=>({candidates:{status:'loading'},recommendations:{status:'loading'}});
export async function loadCandidates(request:Request,id:string):Promise<CandidateData>{const prefix='/company/jobs/'+encodeURIComponent(id);const [candidates,recommendations]=await Promise.all([read(request,prefix+'/candidates',validCandidate),read(request,prefix+'/recommendations',validRecommendation)]);return {candidates,recommendations};}
export function orderedCandidates(data:CandidateData):Candidate[]{if(data.candidates.status!=='ready')return [];const result=[...data.candidates.data];if(data.recommendations.status==='ready'){const scores=new Map(data.recommendations.data.map(x=>[x.professionalId,x.score]));result.sort((a,b)=>(scores.get(b.professionalId)??-1)-(scores.get(a.professionalId)??-1));}return result;}
export function sameCompanyContext(current:Record<string,string>,displayed:Record<string,string>):boolean{return !!displayed.Authorization&&!!displayed['x-tenant-id']&&current['x-tenant-id']===displayed['x-tenant-id']&&current.Authorization===displayed.Authorization;}
export async function confirmCandidate(request:Request,jobId:string,professionalId:string,tenantId:string):Promise<boolean>{
 if(!jobId.trim()||!professionalId.trim()||!tenantId.trim())return false;
 try{const r=await request('/company/jobs/'+encodeURIComponent(jobId)+'/confirm',{method:'POST',body:JSON.stringify({professionalId})});if(!r.ok)return false;const d:unknown=await r.json();return record(d)&&nonempty(d.id)&&d.jobId===jobId&&d.professionalId===professionalId&&d.tenantId===tenantId&&d.status==='confirmed';}catch{return false;}
}
