import type {Profile} from './professional-profile';
type Input={displayName:string;homeCity:string;primaryRole:string};
type Request=(path:string,body:Input)=>Promise<{ok:boolean;status:number;json():Promise<unknown>}>;
export type ProfileSaveResult={status:'saved';data:Profile}|{status:'invalid'|'rejected'|'unknown'};
const record=(value:unknown):value is Record<string,unknown>=>!!value&&typeof value==='object'&&!Array.isArray(value);
export async function submitProfile(request:Request,input:Input,expectedId?:string):Promise<ProfileSaveResult>{
 const body={displayName:input.displayName.trim(),homeCity:input.homeCity.trim(),primaryRole:input.primaryRole.trim()};if(!body.displayName)return {status:'invalid'};
 try{const response=await request('/professional-profile',body);if(!response.ok)return {status:response.status>=400&&response.status<500?'rejected':'unknown'};const data:unknown=await response.json();
  return record(data)&&typeof data.id==='string'&&data.id.length>0&&(!expectedId||data.id===expectedId)&&data.displayName===body.displayName&&data.homeCity===(body.homeCity||null)&&data.primaryRole===(body.primaryRole||null)?{status:'saved',data:data as Profile}:{status:'unknown'};
 }catch{return {status:'unknown'};}
}
