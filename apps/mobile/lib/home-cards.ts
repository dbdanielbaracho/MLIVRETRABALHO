import type {Section} from './professional-home';
export type HomeOpportunity={id:string;title:string;location?:string|null;workCity?:string|null;startsAt?:string|null;endsAt?:string|null;payCents?:number|null};
export type HomePassport={completedWorkCount:number;ratingCount:number;averageRating:number|null};
export type HomeCards={opportunities:Section<HomeOpportunity[]>;passport:Section<HomePassport|null>};
type Request=(path:string)=>Promise<{ok:boolean;status?:number;json():Promise<unknown>}>;
export const loadingHomeCards=():HomeCards=>({opportunities:{status:'loading'},passport:{status:'loading'}});
const record=(x:unknown):x is Record<string,unknown>=>!!x&&typeof x==='object'&&!Array.isArray(x);
const text=(x:unknown)=>x==null||typeof x==='string';
export async function loadHomeCards(request:Request):Promise<HomeCards>{
 async function opportunities():Promise<Section<HomeOpportunity[]>>{
  try{const r=await request('/jobs');if(!r.ok)return {status:'error'};const d:unknown=await r.json();
   if(!Array.isArray(d)||!d.every(x=>record(x)&&typeof x.id==='string'&&typeof x.title==='string'&&text(x.location)&&text(x.workCity)&&text(x.startsAt)&&text(x.endsAt)&&(x.payCents==null||Number.isSafeInteger(x.payCents))))return {status:'error'};
   return {status:'ready',data:d};
  }catch{return {status:'error'};}
 }
 async function passport():Promise<Section<HomePassport|null>>{
  try{const r=await request('/work-passport/mine'),d:unknown=await r.json();
   if(!r.ok)return r.status===404&&record(d)&&d.message==='professional_profile_required'?{status:'ready',data:null}:{status:'error'};
   if(!record(d)||!Number.isSafeInteger(d.completedWorkCount)||Number(d.completedWorkCount)<0||!Number.isSafeInteger(d.ratingCount)||Number(d.ratingCount)<0)return {status:'error'};
   if(d.averageRating!==null&&(typeof d.averageRating!=='number'||!Number.isFinite(d.averageRating)||d.averageRating<1||d.averageRating>5))return {status:'error'};
   if((d.ratingCount===0)!==(d.averageRating===null))return {status:'error'};
   return {status:'ready',data:d as HomePassport};
  }catch{return {status:'error'};}
 }
 const [jobs,p]=await Promise.all([opportunities(),passport()]);return {opportunities:jobs,passport:p};
}
