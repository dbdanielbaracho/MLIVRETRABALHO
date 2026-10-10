export type ReadResult<T>={status:'loading'}|{status:'error';forbidden?:boolean}|{status:'ready';data:T[]};
export type Reconciliation={assignmentId:string;title:string;professionalName:string;payableCents?:number|null;earningStatus?:string|null;capturedCents:number;refundedCents:number;paidOutCents:number;reconciliationStatus:'no_earning'|'pending'|'reconciled'|'overpaid'};
export type PlannerItem={id:string;title:string;requiredRole?:string|null;jobStatus:string;location?:string|null;workCity?:string|null;startsAt?:string|null;endsAt?:string|null;payCents?:number|null;interestCount:number;confirmedCount:number;activeCount:number;completedCount:number;cancelledCount:number};
type Request=(path:string)=>Promise<{ok:boolean;status?:number;json():Promise<unknown>}>;
const record=(x:unknown):x is Record<string,unknown>=>!!x&&typeof x==='object'&&!Array.isArray(x);
const text=(x:unknown)=>x==null||typeof x==='string';
const date=(x:unknown)=>x==null||(typeof x==='string'&&Number.isFinite(new Date(x).getTime()));
const validReconciliation=(x:unknown):x is Reconciliation=>record(x)&&typeof x.assignmentId==='string'&&typeof x.title==='string'&&typeof x.professionalName==='string'&&(x.payableCents==null||Number.isSafeInteger(x.payableCents))&&text(x.earningStatus)&&['capturedCents','refundedCents','paidOutCents'].every(k=>Number.isSafeInteger(x[k]))&&typeof x.reconciliationStatus==='string'&&['no_earning','pending','reconciled','overpaid'].includes(x.reconciliationStatus);
const validPlanner=(x:unknown):x is PlannerItem=>record(x)&&typeof x.id==='string'&&typeof x.title==='string'&&typeof x.jobStatus==='string'&&text(x.requiredRole)&&text(x.location)&&text(x.workCity)&&date(x.startsAt)&&date(x.endsAt)&&(x.payCents==null||Number.isSafeInteger(x.payCents))&&['interestCount','confirmedCount','activeCount','completedCount','cancelledCount'].every(k=>Number.isSafeInteger(x[k])&&Number(x[k])>=0);
async function read<T>(request:Request,path:string,valid:(x:unknown)=>x is T):Promise<ReadResult<T>>{try{const r=await request(path);if(!r.ok)return {status:'error',forbidden:r.status===403};const d:unknown=await r.json();return Array.isArray(d)&&d.every(valid)?{status:'ready',data:d}:{status:'error'};}catch{return {status:'error'};}}
export const loadReconciliation=(request:Request)=>read(request,'/company/payment-events/reconciliation',validReconciliation);
export const loadPlanner=(request:Request)=>read(request,'/company/planner',validPlanner);
export const moneyOrMissing=(cents?:number|null)=>cents==null?'Não registrado':'R$ '+(cents/100).toFixed(2).replace('.',',');
