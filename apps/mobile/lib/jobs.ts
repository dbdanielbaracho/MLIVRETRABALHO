export type Job={id:string;title:string;location?:string|null;workCity?:string|null;payCents?:number|null;companyAverageRating?:number|null;companyRatingCount?:number};
export type JobsState={status:'loading'}|{status:'error'}|{status:'ready';data:Job[]};
type Response={ok:boolean;json():Promise<unknown>};
type Request=(path:string,method?:'POST')=>Promise<Response>;
const record=(x:unknown):x is Record<string,unknown>=>!!x&&typeof x==='object'&&!Array.isArray(x);
const optionalText=(x:unknown)=>x==null||typeof x==='string';
const validJob=(x:unknown):x is Job=>record(x)&&typeof x.id==='string'&&typeof x.title==='string'&&optionalText(x.location)&&optionalText(x.workCity)&&(x.payCents==null||Number.isSafeInteger(x.payCents))&&(x.companyAverageRating==null||(typeof x.companyAverageRating==='number'&&Number.isFinite(x.companyAverageRating)&&x.companyAverageRating>=1&&x.companyAverageRating<=5))&&(x.companyRatingCount==null||(Number.isSafeInteger(x.companyRatingCount)&&Number(x.companyRatingCount)>=0));
export async function loadJobs(request:Request):Promise<JobsState>{
 try{const r=await request('/jobs');if(!r.ok)return {status:'error'};const data:unknown=await r.json();return Array.isArray(data)&&data.every(validJob)?{status:'ready',data}:{status:'error'};}catch{return {status:'error'};}
}
export async function sendInterest(request:Request,id:string):Promise<'interested'|'confirmed'|'error'>{
 if(!id.trim())return 'error';
 try{const r=await request('/jobs/'+encodeURIComponent(id)+'/interest','POST');if(!r.ok)return 'error';const data:unknown=await r.json();return record(data)&&data.jobId===id&&typeof data.professionalId==='string'&&!!data.professionalId.trim()&&(data.status==='interested'||data.status==='confirmed')?data.status:'error';}catch{return 'error';}
}
