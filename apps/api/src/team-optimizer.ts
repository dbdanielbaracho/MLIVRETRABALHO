export type TeamCandidate={professionalId:string;score:number;available:boolean;roles:string[];startsAt?:string;endsAt?:string};
export type TeamRequirement={role:string;count:number};
export type TeamPlan={selected:TeamCandidate[];unfilled:TeamRequirement[];score:number;reasons:string[]};
const norm=(s:string)=>s.trim().toLowerCase();
export function optimizeTeam(candidates:TeamCandidate[],requirements:TeamRequirement[]):TeamPlan{
 const available=candidates.filter(c=>c.available).sort((a,b)=>b.score-a.score||a.professionalId.localeCompare(b.professionalId));const used=new Set<string>(),selected:TeamCandidate[]=[],unfilled:TeamRequirement[]=[];
 for(const req of requirements){let remaining=Math.max(0,Math.trunc(req.count));for(const c of available){if(!remaining)break;if(used.has(c.professionalId)||!c.roles.some(r=>norm(r)===norm(req.role)))continue;used.add(c.professionalId);selected.push(c);remaining--}if(remaining)unfilled.push({role:req.role,count:remaining})}
 const score=selected.length?Math.round(selected.reduce((s,c)=>s+c.score,0)/selected.length):0;
 return {selected,unfilled,score,reasons:[`${selected.length} profissionais disponíveis selecionados por função e score`,...(unfilled.length?['há posições sem candidato elegível']:[])]};
}
