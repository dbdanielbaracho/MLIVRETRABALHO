export type CopilotRoute='/analytics'|'/candidatos'|'/planejamento'|'/ganhos'|'/agenda'|'/notificacoes'|'/empresa-notificacoes'|'/trabalhos';
export type Interpretation={accountType:'company'|'professional';intent:string;confidence:number;reasons:string[];suggestedRoute:CopilotRoute|null;mode:'assisted';executionAllowed:false;requiresHumanConfirmation:boolean;provider:string;providerConfigured:boolean;disclaimer:string};
export type InterpretResult={status:'ready';data:Interpretation}|{status:'invalid'|'error'};
type Request=(path:string,body:{text:string;mode:'assisted'})=>Promise<{ok:boolean;json():Promise<unknown>}>;
const record=(value:unknown):value is Record<string,unknown>=>!!value&&typeof value==='object'&&!Array.isArray(value);
const routes:Record<string,CopilotRoute|null>={find_jobs:'/trabalhos',show_schedule:'/agenda',show_earnings:'/ganhos',show_notifications:'/notificacoes',company_staffing:'/planejamento',company_candidates:'/candidatos',company_analytics:'/analytics',unknown:null};
export function validInterpretation(value:unknown):value is Interpretation {
 return record(value)&&typeof value.intent==='string'&&Object.prototype.hasOwnProperty.call(routes,value.intent)&&(value.accountType==='company'||value.accountType==='professional')
  &&value.suggestedRoute===(value.intent==='show_notifications'&&value.accountType==='company'?'/empresa-notificacoes':routes[value.intent])
  &&(!value.intent.startsWith('company_')||value.accountType==='company')
  &&typeof value.confidence==='number'&&Number.isFinite(value.confidence)&&value.confidence>=0&&value.confidence<=1
  &&Array.isArray(value.reasons)&&value.reasons.every(reason=>typeof reason==='string')
  &&value.mode==='assisted'&&value.executionAllowed===false&&typeof value.requiresHumanConfirmation==='boolean'
  &&typeof value.provider==='string'&&value.provider.length>0&&typeof value.providerConfigured==='boolean'
  &&typeof value.disclaimer==='string'&&value.disclaimer.length>0;
}
export async function interpretRequest(request:Request,text:string):Promise<InterpretResult>{
 const value=text.trim();if(!value||value.length>2000)return {status:'invalid'};
 try{const response=await request('/copilot/interpret',{text:value,mode:'assisted'});if(!response.ok)return {status:'error'};const data:unknown=await response.json();return validInterpretation(data)?{status:'ready',data}:{status:'error'};}catch{return {status:'error'};}
}
