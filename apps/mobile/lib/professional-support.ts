export type SupportCase={id:string;assignmentId:string|null;category:string;priority:string;status:string;description:string;resolutionNote?:string|null;createdAt:string};
export type SupportResult={status:'loading'}|{status:'error'}|{status:'ready';data:SupportCase[]};
type Response={ok:boolean;json():Promise<unknown>};
const nonempty=(value:unknown):value is string=>typeof value==='string'&&!!value.trim();
const valid=(value:unknown):value is SupportCase=>{
 if(!value||typeof value!=='object'||Array.isArray(value))return false;
 const c=value as SupportCase;
 return nonempty(c.id)&&(c.assignmentId===null||nonempty(c.assignmentId))&&nonempty(c.category)&&nonempty(c.priority)&&nonempty(c.status)&&typeof c.description==='string'&&(c.resolutionNote==null||typeof c.resolutionNote==='string')&&typeof c.createdAt==='string'&&Number.isFinite(new Date(c.createdAt).getTime());
};
export async function loadSupportCases(request:()=>Promise<Response>,assignmentId:string|null,isCurrent:()=>boolean=()=>true):Promise<SupportResult>{
 try{
  if((assignmentId!==null&&!nonempty(assignmentId))||!isCurrent())return {status:'error'};
  const response=await request();if(!isCurrent()||!response.ok)return {status:'error'};
  const data:unknown=await response.json();if(!isCurrent())return {status:'error'};
  if(!Array.isArray(data)||!data.every(valid))return {status:'error'};
  return {status:'ready',data:data.filter(c=>c.assignmentId===assignmentId)};
 }catch{return {status:'error'};}
}
export function supportStatus(status:string):string{
 const labels:Record<string,string>={open:'Aberta',reviewing:'Em análise',resolved:'Resolvida',dismissed:'Encerrada'};
 return Object.prototype.hasOwnProperty.call(labels,status)?labels[status]??status:status;
}

