export type Analytics = {
  jobsCreated: number; openJobs: number; jobsWithInterest: number; jobsWithConfirmation: number;
  completedAssignments: number; cancelledAssignments: number;
  interestToConfirmationRate: number | null; assignmentCompletionRate: number | null;
};
export type AnalyticsResult = {status:'loading'} | {status:'error'; forbidden?:boolean} | {status:'ready'; data:Analytics};
type Request = (path:string)=>Promise<{ok:boolean; status?:number; json():Promise<unknown>}>;
const record = (value:unknown):value is Record<string,unknown> => !!value && typeof value==='object' && !Array.isArray(value);
const counts = ['jobsCreated','openJobs','jobsWithInterest','jobsWithConfirmation','completedAssignments','cancelledAssignments'];
const rate = (value:unknown) => value===null || (typeof value==='number' && Number.isSafeInteger(value) && value>=0);
export function validAnalytics(value:unknown):value is Analytics {
  return record(value) && counts.every(key=>Number.isSafeInteger(value[key]) && Number(value[key])>=0)
    && rate(value.interestToConfirmationRate) && rate(value.assignmentCompletionRate)
    && (value.assignmentCompletionRate===null || Number(value.assignmentCompletionRate)<=100);
}
export async function loadAnalytics(request:Request):Promise<AnalyticsResult> {
  try {
    const response=await request('/company/analytics');
    if(!response.ok)return {status:'error',forbidden:response.status===403};
    const data:unknown=await response.json();
    return validAnalytics(data)?{status:'ready',data}:{status:'error'};
  } catch { return {status:'error'}; }
}
export const percentOrMissing = (value:number|null) => value===null ? 'Sem base suficiente' : `${value}%`;
