type Request=(path:string,body:Record<string,string|number>)=>Promise<{ok:boolean;status?:number;json():Promise<unknown>}>;
export type ActionResult={status:'confirmed'|'rejected'|'unknown'};
const record=(x:unknown):x is Record<string,unknown>=>!!x&&typeof x==='object'&&!Array.isArray(x);
const nonempty=(x:unknown):x is string=>typeof x==='string'&&!!x.trim();
const date=(value:unknown):value is string=>{
 if(typeof value!=='string')return false;
 const match=/^(\d{4})-(\d{2})-(\d{2})(?:T|$)/.exec(value);if(!match)return false;
 const calendar=new Date(0);calendar.setUTCHours(0,0,0,0);calendar.setUTCFullYear(Number(match[1]),Number(match[2])-1,Number(match[3]));
 return calendar.getUTCFullYear()===Number(match[1])&&calendar.getUTCMonth()===Number(match[2])-1&&calendar.getUTCDate()===Number(match[3])&&Number.isFinite(new Date(value).getTime());
};
export function sameCompanyContext(a:Record<string,string>,b:Record<string,string>):boolean{return !!b.Authorization&&!!b['x-tenant-id']&&a.Authorization===b.Authorization&&a['x-tenant-id']===b['x-tenant-id'];}
async function submit(request:Request,path:string,body:Record<string,string|number>,valid:(data:unknown)=>boolean,isCurrent:()=>boolean):Promise<ActionResult>{
 try{if(!isCurrent())return {status:'unknown'};const response=await request(path,body);if(!isCurrent())return {status:'unknown'};if(!response.ok)return {status:response.status!=null&&response.status>=400&&response.status<500?'rejected':'unknown'};const data=await response.json();if(!isCurrent())return {status:'unknown'};return {status:valid(data)?'confirmed':'unknown'};}catch{return {status:'unknown'};}
}
export async function rateCompletedAssignment(request:Request,assignmentId:string,score:number,isCurrent:()=>boolean=()=>true):Promise<ActionResult>{
 if(!nonempty(assignmentId)||!Number.isInteger(score)||score<1||score>5)return {status:'rejected'};
 return submit(request,'/assignments/'+encodeURIComponent(assignmentId)+'/rating',{score},x=>record(x)&&nonempty(x.id)&&x.score===score&&x.comment===null&&date(x.createdAt),isCurrent);
}
export async function preferProfessional(request:Request,professionalId:string,isCurrent:()=>boolean=()=>true):Promise<ActionResult>{
 if(!nonempty(professionalId))return {status:'rejected'};
 return submit(request,'/company/talent-pools',{professionalId,pool:'preferred'},x=>record(x)&&x.professionalId===professionalId&&x.pool==='preferred',isCurrent);
}
