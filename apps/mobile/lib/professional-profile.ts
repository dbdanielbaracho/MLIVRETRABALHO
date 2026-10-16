export type Profile = {id:string;displayName:string;homeCity?:string|null;primaryRole?:string|null};
export type VerifiedWork = {id:string;tenantId:string;title:string;location?:string|null;completedAt?:string|null};
export type Passport = {displayName:string;completedWorkCount:number;averageRating:number|null;ratingCount:number;verifiedHistory?:VerifiedWork[]};
export type Resource<T> = {status:'loading'} | {status:'error'} | {status:'ready';data:T};
type Response = {ok:boolean;status?:number;json():Promise<unknown>};
const date=(value:unknown):value is string=>{
 if(typeof value!=='string')return false;
 const match=/^(\d{4})-(\d{2})-(\d{2})(?:T|$)/.exec(value);if(!match)return false;
 const calendar=new Date(0);calendar.setUTCHours(0,0,0,0);calendar.setUTCFullYear(Number(match[1]),Number(match[2])-1,Number(match[3]));
 return calendar.getUTCFullYear()===Number(match[1])&&calendar.getUTCMonth()===Number(match[2])-1&&calendar.getUTCDate()===Number(match[3])&&Number.isFinite(new Date(value).getTime());
};
export async function loadProfessionalProfile(request:()=>Promise<Response>,isCurrent:()=>boolean=()=>true):Promise<Resource<Profile|null>>{
 try{
  if(!isCurrent())return {status:'error'};const response=await request();if(!isCurrent())return {status:'error'};if(!response.ok)return {status:'error'};
  const data:unknown=await response.json();if(!isCurrent())return {status:'error'};
  if(data===null)return {status:'ready',data:null};
  if(!data||typeof data!=='object'||Array.isArray(data)||!('id' in data)||typeof data.id!=='string'||!data.id||!('displayName' in data)||typeof data.displayName!=='string'||!data.displayName.trim())return {status:'error'};
  for(const key of ['homeCity','primaryRole'])if(key in data&&data[key as keyof typeof data]!=null&&typeof data[key as keyof typeof data]!=='string')return {status:'error'};
  return {status:'ready',data:data as Profile};
 }catch{return {status:'error'};}
}
export async function loadWorkPassport(request:()=>Promise<Response>,isCurrent:()=>boolean=()=>true):Promise<Resource<Passport|null>>{
 try{
  if(!isCurrent())return {status:'error'};const response=await request();if(!isCurrent())return {status:'error'};
  const data:unknown=await response.json();if(!isCurrent())return {status:'error'};
  if(!response.ok){
   if(response.status===404&&data&&typeof data==='object'&&'message' in data&&data.message==='professional_profile_required')return {status:'ready',data:null};
   return {status:'error'};
  }
  if(!data||typeof data!=='object'||Array.isArray(data))return {status:'error'};
  const p=data as Passport;
  if(typeof p.displayName!=='string'||!p.displayName.trim()||!Number.isInteger(p.completedWorkCount)||p.completedWorkCount<0||!Number.isInteger(p.ratingCount)||p.ratingCount<0)return {status:'error'};
  if(p.averageRating!==null&&(typeof p.averageRating!=='number'||!Number.isFinite(p.averageRating)||p.averageRating<1||p.averageRating>5))return {status:'error'};
  if((p.ratingCount===0)!==(p.averageRating===null))return {status:'error'};
  if(p.verifiedHistory!==undefined&&(!Array.isArray(p.verifiedHistory)||!p.verifiedHistory.every(w=>w&&typeof w==='object'&&!Array.isArray(w)&&typeof w.id==='string'&&!!w.id.trim()&&typeof w.tenantId==='string'&&!!w.tenantId.trim()&&typeof w.title==='string'&&!!w.title.trim()&&(w.location==null||typeof w.location==='string')&&(w.completedAt==null||date(w.completedAt)))))return {status:'error'};
  return {status:'ready',data:p};
 }catch{return {status:'error'};}
}

