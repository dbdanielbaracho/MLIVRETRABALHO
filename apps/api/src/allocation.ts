import { scoreMatch, MatchInput } from './matching';
export type AllocationCandidate={professionalId:string;match:MatchInput};
export function rankCandidates(candidates:AllocationCandidate[]){return candidates.map(c=>({professionalId:c.professionalId,...scoreMatch(c.match)})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score||a.professionalId.localeCompare(b.professionalId));}
