export type AvailabilityWindow={startsAt:string;endsAt:string};
export type AvailabilityResult={status:'saved';id:string}|{status:'invalid'}|{status:'rejected';profileRequired:boolean}|{status:'unknown'};
type Request=(path:string,body:AvailabilityWindow)=>Promise<{ok:boolean;status:number;json():Promise<unknown>}>;
const record=(value:unknown):value is Record<string,unknown>=>!!value&&typeof value==='object'&&!Array.isArray(value);
const date=(value:unknown):value is string=>{
 if(typeof value!=='string')return false;
 const match=/^(\d{4})-(\d{2})-(\d{2})(?:T|$)/.exec(value);if(!match)return false;
 const calendar=new Date(0);calendar.setUTCHours(0,0,0,0);calendar.setUTCFullYear(Number(match[1]),Number(match[2])-1,Number(match[3]));
 return calendar.getUTCFullYear()===Number(match[1])&&calendar.getUTCMonth()===Number(match[2])-1&&calendar.getUTCDate()===Number(match[3])&&Number.isFinite(new Date(value).getTime());
};
const instant=(value:unknown)=>typeof value==='string'?new Date(value).getTime():NaN;
export async function submitAvailability(request:Request,window:AvailabilityWindow,isCurrent:()=>boolean=()=>true):Promise<AvailabilityResult>{
 const starts=instant(window.startsAt),ends=instant(window.endsAt);if(!Number.isFinite(starts)||!Number.isFinite(ends)||ends<=starts)return {status:'invalid'};
 try{if(!isCurrent())return {status:'unknown'};const response=await request('/availability/mine',window);if(!isCurrent())return {status:'unknown'};
  if(!response.ok){if(response.status>=400&&response.status<500){let profileRequired=false;try{const data:unknown=await response.json();profileRequired=record(data)&&data.message==='professional_profile_required';}catch{/* Keep rejection without inventing a backend reason. */}if(!isCurrent())return {status:'unknown'};return {status:'rejected',profileRequired};}return {status:'unknown'};}
  const data:unknown=await response.json();if(!isCurrent())return {status:'unknown'};return record(data)&&typeof data.id==='string'&&/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(data.id)&&date(data.startsAt)&&date(data.endsAt)&&instant(data.startsAt)===starts&&instant(data.endsAt)===ends?{status:'saved',id:data.id}:{status:'unknown'};
 }catch{return {status:'unknown'};}
}

