import type {Passport,Resource,VerifiedWork} from './professional-profile';
export type PassportHistory={status:'loading'|'error'|'missing'|'unavailable'|'empty'}|{status:'ready';data:VerifiedWork[]};
// Missing detail is distinct from a successfully returned empty history.
export function passportHistory(resource:Resource<Passport|null>):PassportHistory{
 if(resource.status!=='ready')return {status:resource.status};
 if(resource.data===null)return {status:'missing'};
 if(resource.data.verifiedHistory===undefined)return {status:'unavailable'};
 return resource.data.verifiedHistory.length?{status:'ready',data:resource.data.verifiedHistory}:{status:'empty'};
}
export function completionDate(value?:string|null):string{
 if(!value)return 'Data de conclusão não informada';
 const date=new Date(value);
 return Number.isFinite(date.getTime())?'Concluído em '+date.toLocaleDateString('pt-BR'):'Data de conclusão não informada';
}
