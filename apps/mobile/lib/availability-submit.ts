export type AvailabilityWindow={startsAt:string;endsAt:string};
export type AvailabilityResult={status:'saved';id:string}|{status:'invalid'}|{status:'rejected';profileRequired:boolean}|{status:'unknown'};
type Request=(path:string,body:AvailabilityWindow)=>Promise<{ok:boolean;status:number;json():Promise<unknown>}>;
const record=(value:unknown):value is Record<string,unknown>=>!!value&&typeof value==='object'&&!Array.isArray(value);
const instant=(value:unknown)=>typeof value==='string'?new Date(value).getTime():NaN;
export async function submitAvailability(request:Request,window:AvailabilityWindow):Promise<AvailabilityResult>{
 const starts=instant(window.startsAt),ends=instant(window.endsAt);if(!Number.isFinite(starts)||!Number.isFinite(ends)||ends<=starts)return {status:'invalid'};
 try{const response=await request('/availability/mine',window);
  if(!response.ok){if(response.status>=400&&response.status<500){let profileRequired=false;try{const data:unknown=await response.json();profileRequired=record(data)&&data.message==='professional_profile_required';}catch{/* Keep rejection without inventing a backend reason. */}return {status:'rejected',profileRequired};}return {status:'unknown'};}
  const data:unknown=await response.json();return record(data)&&typeof data.id==='string'&&data.id.length>0&&instant(data.startsAt)===starts&&instant(data.endsAt)===ends?{status:'saved',id:data.id}:{status:'unknown'};
 }catch{return {status:'unknown'};}
}
