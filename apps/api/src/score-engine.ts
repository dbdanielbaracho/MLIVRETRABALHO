export type Confidence='low'|'medium'|'high';
export type ProfessionalScoreInput={completed:number;averageRating?:number|null;ratingCount:number;reliability:number;roleExperience:number;recentCompleted?:number};
export type CompanyScoreInput={completedAssignments:number;averageRating?:number|null;ratingCount:number;cancellations:number;paymentIncidents:number;repeatHires:number};
const clamp=(n:number)=>Math.max(0,Math.min(100,n));
export function confidence(samples:number):Confidence{return samples>=20?'high':samples>=5?'medium':'low'}
export function professionalScore(x:ProfessionalScoreInput){
 const rating=x.averageRating==null?50:clamp((x.averageRating/5)*100);
 const experience=clamp(Math.log2(1+Math.max(0,x.roleExperience))*20);
 const recency=clamp(Math.log2(1+Math.max(0,x.recentCompleted??0))*25);
 const score=Math.round(clamp(x.reliability*.4+rating*.3+experience*.2+recency*.1));
 return {score,confidence:confidence(Math.max(x.completed,x.ratingCount)),components:{reliability:clamp(x.reliability),rating,experience,recency}};
}
export function companyScore(x:CompanyScoreInput){
 const rating=x.averageRating==null?50:clamp((x.averageRating/5)*100);
 const volume=Math.max(1,x.completedAssignments+x.cancellations);
 const completion=clamp((x.completedAssignments/volume)*100);
 const payment=clamp(100-(x.paymentIncidents/volume)*100);
 const repeat=clamp((x.repeatHires/Math.max(1,x.completedAssignments))*100);
 const score=Math.round(clamp(rating*.35+completion*.3+payment*.25+repeat*.1));
 return {score,confidence:confidence(Math.max(x.completedAssignments,x.ratingCount)),components:{rating,completion,payment,repeat}};
}
