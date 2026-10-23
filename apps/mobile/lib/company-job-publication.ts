export type JobPayload={title:string;location:string;workCity:string;startsAt:string;endsAt:string;payCents:number};
export type Publication={status:'created';id:string}|{status:'rejected'|'unknown'};
type Request=(body:JobPayload)=>Promise<{ok:boolean;status:number;json():Promise<unknown>}>;
const record=(x:unknown):x is Record<string,unknown>=>!!x&&typeof x==='object'&&!Array.isArray(x);
const date=(value:unknown):value is string=>{
 if(typeof value!=='string')return false;
 const match=/^(\d{4})-(\d{2})-(\d{2})(?:T|$)/.exec(value);if(!match)return false;
 const calendar=new Date(0);calendar.setUTCHours(0,0,0,0);calendar.setUTCFullYear(Number(match[1]),Number(match[2])-1,Number(match[3]));
 return calendar.getUTCFullYear()===Number(match[1])&&calendar.getUTCMonth()===Number(match[2])-1&&calendar.getUTCDate()===Number(match[3])&&Number.isFinite(new Date(value).getTime());
};
export async function publishJob(request:Request,body:JobPayload):Promise<Publication>{
 try{const r=await request(body);if(!r.ok)return {status:r.status>=400&&r.status<500?'rejected':'unknown'};
 const d:unknown=await r.json();return record(d)&&typeof d.id==='string'&&/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(d.id)&&d.title===body.title.trim()&&d.workCity===body.workCity.trim()&&d.location===(body.location.trim()||null)&&d.status==='open'&&d.payCents===body.payCents&&date(d.startsAt)&&date(d.endsAt)&&new Date(d.startsAt).getTime()===new Date(body.startsAt).getTime()&&new Date(d.endsAt).getTime()===new Date(body.endsAt).getTime()?{status:'created',id:d.id}:{status:'unknown'};
 }catch{return {status:'unknown'};}
}

