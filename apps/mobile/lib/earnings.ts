import type {Earning as HomeEarning,Section} from './professional-home';
export type Earning=HomeEarning & {id:string;tenantId:string;title:string};
type Response={ok:boolean;json():Promise<unknown>};
export async function loadEarnings(request:()=>Promise<Response>):Promise<Section<Earning[]>>{
 try{
  const response=await request();if(!response.ok)return {status:'error'};
  const data:unknown=await response.json();
  if(!Array.isArray(data)||!data.every(e=>e&&typeof e==='object'&&typeof e.id==='string'&&typeof e.tenantId==='string'&&typeof e.title==='string'&&Number.isSafeInteger(e.amountCents)&&typeof e.status==='string'&&typeof e.createdAt==='string'&&Number.isFinite(new Date(e.createdAt).getTime())))return {status:'error'};
  return {status:'ready',data};
 }catch{return {status:'error'};}
}
export function earningsWeek(items:Earning[],now=new Date()){
 const start=new Date(now);start.setHours(0,0,0,0);start.setDate(start.getDate()-((start.getDay()+6)%7));
 const daily=[0,0,0,0,0,0,0];
 for(const item of items){
  const date=new Date(item.createdAt);
  if(['payable','paid'].includes(item.status)&&Number.isSafeInteger(item.amountCents)&&date>=start&&date<=now)daily[(date.getDay()+6)%7]+=item.amountCents;
 }
 return {total:daily.reduce((sum,value)=>sum+value,0),daily};
}
export function earningStatus(status:string){
 return ({pending:'Em processamento',payable:'A receber',paid:'Pago',reversed:'Estornado'} as Record<string,string>)[status]??'Status não identificado';
}
