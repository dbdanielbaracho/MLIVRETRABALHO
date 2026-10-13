const explicitIsoPattern=/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,3}))?(Z|([+-])(\d{2}):(\d{2}))$/;
type ParsedIso={date:Date;base:string;fraction:string|undefined;zone:string};
function daysInMonth(year:number,month:number){
 if(month===2)return year%4===0&&(year%100!==0||year%400===0)?29:28;
 return [4,6,9,11].includes(month)?30:31;
}
function parsedIso(value:string):ParsedIso|null{
 const match=explicitIsoPattern.exec(value);
 if(!match)return null;
 const year=Number(match[1]),month=Number(match[2]),day=Number(match[3]),hour=Number(match[4]),minute=Number(match[5]),second=Number(match[6]);
 if(year<1||month<1||month>12||day<1||day>daysInMonth(year,month)||hour>23||minute>59||second>59)return null;
 const zone=match[8] as string;
 if(zone!=='Z'&&(Number(match[10])>23||Number(match[11])>59))return null;
 const date=new Date(value);
 if(Number.isNaN(date.getTime()))return null;
 return {date,base:match[1]+'-'+match[2]+'-'+match[3]+'T'+match[4]+':'+match[5]+':'+match[6],fraction:match[7],zone};
}
export function parseExplicitIsoDateTime(value:string){
 return parsedIso(value)?.date??null;
}
export function parseCanonicalUtcDateTime(value:string){
 const parsed=parsedIso(value);
 if(!parsed||parsed.zone!=='Z')return null;
 const normalized=parsed.base+'.'+(parsed.fraction??'').padEnd(3,'0')+'Z';
 return parsed.date.toISOString()===normalized?parsed.date:null;
}
