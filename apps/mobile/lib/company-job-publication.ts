export type JobPayload={title:string;location:string;workCity:string;startsAt:string;endsAt:string;payCents:number};
export type Publication={status:'created';id:string}|{status:'rejected'|'unknown'};
type Request=(body:JobPayload)=>Promise<{ok:boolean;status:number;json():Promise<unknown>}>;
const record=(x:unknown):x is Record<string,unknown>=>!!x&&typeof x==='object'&&!Array.isArray(x);
export async function publishJob(request:Request,body:JobPayload):Promise<Publication>{
 try{const r=await request(body);if(!r.ok)return {status:r.status>=400&&r.status<500?'rejected':'unknown'};
 const d:unknown=await r.json();return record(d)&&typeof d.id==='string'&&d.id.length>0&&d.title===body.title.trim()&&d.workCity===body.workCity.trim()&&d.status==='open'&&d.payCents===body.payCents&&typeof d.startsAt==='string'&&typeof d.endsAt==='string'&&new Date(d.startsAt).getTime()===new Date(body.startsAt).getTime()&&new Date(d.endsAt).getTime()===new Date(body.endsAt).getTime()?{status:'created',id:d.id}:{status:'unknown'};
 }catch{return {status:'unknown'};}
}
