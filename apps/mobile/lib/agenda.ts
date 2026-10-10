import type {Section} from './professional-home';
export type Assignment={id:string;tenantId:string;status:string;title:string;location?:string|null;startsAt?:string|null;endsAt?:string|null;payCents?:number|null;companyRatingScore?:number|null};
type Response={ok:boolean;json():Promise<unknown>};
export async function loadAgenda(request:()=>Promise<Response>):Promise<Section<Assignment[]>>{
 try{
  const response=await request();if(!response.ok)return {status:'error'};const data:unknown=await response.json();
  if(!Array.isArray(data)||!data.every(a=>a&&typeof a==='object'&&typeof a.id==='string'&&typeof a.tenantId==='string'&&typeof a.status==='string'&&typeof a.title==='string'&&(a.location==null||typeof a.location==='string')&&(a.startsAt==null||typeof a.startsAt==='string')&&(a.endsAt==null||typeof a.endsAt==='string')&&(a.payCents==null||Number.isSafeInteger(a.payCents))&&(a.companyRatingScore==null||(Number.isInteger(a.companyRatingScore)&&a.companyRatingScore>=1&&a.companyRatingScore<=5))))return {status:'error'};
  return {status:'ready',data};
 }catch{return {status:'error'};}
}
export function assignmentState(status:string){
 const states:Record<string,{label:string;endpoint:string|null;action:string|null;canRate:boolean}>={
  confirmed:{label:'Trabalho confirmado',endpoint:'check-in',action:'Fazer check-in',canRate:false},
  checked_in:{label:'Check-in realizado',endpoint:'start',action:'Iniciar trabalho',canRate:false},
  in_progress:{label:'Em andamento',endpoint:'check-out',action:'Fazer check-out',canRate:false},
  checked_out:{label:'Check-out realizado',endpoint:'complete',action:'Concluir trabalho',canRate:false},
  completed:{label:'Trabalho concluído',endpoint:null,action:null,canRate:true},
  cancelled:{label:'Trabalho cancelado',endpoint:null,action:null,canRate:false}
 };
 return Object.prototype.hasOwnProperty.call(states,status)?states[status]:{label:'Status não informado',endpoint:null,action:null,canRate:false};
}
