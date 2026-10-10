import type {Section} from './professional-home';
export type Dashboard={openJobs:number;confirmedWorkers:number;activeWorkers:number;completedAssignments:number};
export type ActiveAssignment={id:string;professionalId:string;status:string;title:string;location?:string|null;startsAt?:string|null;professionalName:string};
export type CompletedAssignment={id:string;professionalId:string;title:string;location?:string|null;professionalName:string;completedAt?:string|null;ratingScore?:number|null};
export type CompanyData={dashboard:Section<Dashboard>;active:Section<ActiveAssignment[]>;completed:Section<CompletedAssignment[]>};
type Request=(path:string)=>Promise<{ok:boolean;json():Promise<unknown>}>;
export const loadingCompany=():CompanyData=>({dashboard:{status:'loading'},active:{status:'loading'},completed:{status:'loading'}});
const record=(x:unknown):x is Record<string,unknown>=>!!x&&typeof x==='object'&&!Array.isArray(x);
const text=(x:unknown)=>x==null||typeof x==='string';
const assignment=(x:unknown):x is Record<string,unknown>=>record(x)&&typeof x.id==='string'&&typeof x.professionalId==='string'&&typeof x.title==='string'&&typeof x.professionalName==='string'&&text(x.location);
export async function loadCompanyDashboard(request:Request):Promise<CompanyData>{
 async function read<T>(path:string,valid:(data:unknown)=>data is T):Promise<Section<T>>{
  try{const response=await request(path);if(!response.ok)return {status:'error'};const data=await response.json();return valid(data)?{status:'ready',data}:{status:'error'};}
  catch{return {status:'error'};}
 }
 const [dashboard,active,completed]=await Promise.all([
  read('/company/dashboard',(x):x is Dashboard=>record(x)&&['openJobs','confirmedWorkers','activeWorkers','completedAssignments'].every(k=>Number.isSafeInteger(x[k])&&Number(x[k])>=0)),
  read('/company/dashboard/assignments',(x):x is ActiveAssignment[]=>Array.isArray(x)&&x.every(a=>assignment(a)&&typeof a.status==='string'&&text(a.startsAt))),
  read('/company/dashboard/completed',(x):x is CompletedAssignment[]=>Array.isArray(x)&&x.every(a=>assignment(a)&&text(a.completedAt)&&(a.ratingScore==null||(Number.isInteger(a.ratingScore)&&Number(a.ratingScore)>=1&&Number(a.ratingScore)<=5))))
 ]);
 return {dashboard,active,completed};
}
