import type {Section} from './professional-home';
export type Assignment={id:string;tenantId:string;status:string;title:string;location?:string|null;startsAt?:string|null;endsAt?:string|null;payCents?:number|null;companyRatingScore?:number|null};
type Response={ok:boolean;json():Promise<unknown>};
const nonempty=(value:unknown):value is string=>typeof value==='string'&&!!value.trim();
const optionalDate=(value:unknown)=>value==null||(typeof value==='string'&&Number.isFinite(new Date(value).getTime()));
export async function loadAgenda(request:()=>Promise<Response>,isCurrent:()=>boolean=()=>true):Promise<Section<Assignment[]>>{
 try{
  if(!isCurrent())return {status:'error'};const response=await request();if(!isCurrent())return {status:'error'};if(!response.ok)return {status:'error'};const data:unknown=await response.json();if(!isCurrent())return {status:'error'};
  if(!Array.isArray(data)||!data.every(a=>a&&typeof a==='object'&&!Array.isArray(a)&&nonempty(a.id)&&nonempty(a.tenantId)&&nonempty(a.status)&&nonempty(a.title)&&(a.location==null||typeof a.location==='string')&&optionalDate(a.startsAt)&&optionalDate(a.endsAt)&&(a.payCents==null||Number.isSafeInteger(a.payCents))&&(a.companyRatingScore==null||(Number.isInteger(a.companyRatingScore)&&a.companyRatingScore>=1&&a.companyRatingScore<=5))))return {status:'error'};
  return {status:'ready',data};
 }catch{return {status:'error'};}
}
type Coordinates={lat:number;lng:number};
type Request=(path:string,body?:Record<string,number>)=>Promise<{ok:boolean;status?:number;json():Promise<unknown>}>;
export type AgendaActionResult={status:'confirmed';endpoint:string;coordinatesSent:boolean}|{status:'rejected'|'unknown'};
const record=(x:unknown):x is Record<string,unknown>=>!!x&&typeof x==='object'&&!Array.isArray(x);
const date=(x:unknown)=>typeof x==='string'&&Number.isFinite(new Date(x).getTime());
export async function submitAgendaAction(request:Request,assignment:Assignment,score?:number,coordinates:Coordinates|null=null,isCurrent:()=>boolean=()=>true):Promise<AgendaActionResult>{
 const state=assignmentState(assignment.status),endpoint=score!==undefined?(state.canRate?'company-rating':null):state.endpoint;
 if(!assignment.id.trim()||!assignment.tenantId.trim()||!endpoint||(score!==undefined&&(!Number.isInteger(score)||score<1||score>5)))return {status:'rejected'};
 const wantsLocation=endpoint==='check-in'||endpoint==='check-out';
 if(wantsLocation&&coordinates&&(!Number.isFinite(coordinates.lat)||coordinates.lat < -90||coordinates.lat > 90||!Number.isFinite(coordinates.lng)||coordinates.lng < -180||coordinates.lng > 180))return {status:'rejected'};
 const body:Record<string,number>|undefined=score!==undefined?{score}:wantsLocation?(coordinates?{lat:coordinates.lat,lng:coordinates.lng}:{}):undefined;
 try{
  if(!isCurrent())return {status:'unknown'};const response=await request('/assignments/'+encodeURIComponent(assignment.id)+'/'+endpoint,body);if(!isCurrent())return {status:'unknown'};
  if(!response.ok)return {status:response.status!=null&&response.status>=400&&response.status<500?'rejected':'unknown'};
  const data:unknown=await response.json();if(!isCurrent())return {status:'unknown'};let valid=false;
  if(record(data)){
   if(score!==undefined)valid=typeof data.id==='string'&&!!data.id.trim()&&data.score===score&&data.comment===null&&date(data.createdAt);
   else{const expected:Record<string,{status:string;stamp?:string}>={'check-in':{status:'checked_in',stamp:'checkedInAt'},start:{status:'in_progress'},'check-out':{status:'checked_out',stamp:'checkedOutAt'},complete:{status:'completed',stamp:'completedAt'}};const target=expected[endpoint];valid=!!target&&data.id===assignment.id&&data.status===target.status&&(!target.stamp||date(data[target.stamp]));}
  }
  return valid?{status:'confirmed',endpoint,coordinatesSent:wantsLocation&&coordinates!==null}:{status:'unknown'};
 }catch{return {status:'unknown'};}
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
