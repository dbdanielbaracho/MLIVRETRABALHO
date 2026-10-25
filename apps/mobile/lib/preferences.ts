export type Preferences={configured:boolean;preferredRoleIds:string[];preferredCities:string[];revision:number;updatedAt:string|null};
export type PreferencesWrite={preferredRoleIds:string[];preferredCities:string[];expectedRevision:number};
const strings=(x:unknown):x is string[]=>Array.isArray(x)&&x.every(y=>typeof y==='string');
export function preferencesDraft(roleIds:string[],cities:string[],revision:number):PreferencesWrite|null{
 if(roleIds.length>20||cities.length>10||!Number.isSafeInteger(revision)||revision<0||roleIds.some(x=>!/^[a-z0-9][a-z0-9_.-]{0,99}$/.test(x)))return null;
 const result:string[]=[],seen=new Set<string>();
 for(const x of cities){if(/[\p{Cc}\p{Cf}]/u.test(x))return null;const city=x.normalize('NFC').trim().replace(/\s+/gu,' ');if(!city||Array.from(city).length>100)return null;const key=city.toLocaleLowerCase('pt-BR');if(!seen.has(key)){seen.add(key);result.push(city);}}
 return {preferredRoleIds:[...new Set(roleIds)].sort(),preferredCities:result,expectedRevision:revision};
}
export function readPreferences(value:unknown):Preferences|null{
 if(!value||typeof value!=='object'||Array.isArray(value))return null;
 const p=value as Preferences;
 if(typeof p.configured!=='boolean'||!strings(p.preferredRoleIds)||!strings(p.preferredCities))return null;
 const canonical=preferencesDraft(p.preferredRoleIds,p.preferredCities,p.revision);
 if(!canonical||JSON.stringify(canonical.preferredRoleIds)!==JSON.stringify(p.preferredRoleIds)||JSON.stringify(canonical.preferredCities)!==JSON.stringify(p.preferredCities))return null;
 if(!p.configured)return p.revision===0&&p.updatedAt===null&&p.preferredRoleIds.length===0&&p.preferredCities.length===0?p:null;
 if(p.revision<1||typeof p.updatedAt!=='string'||!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/.test(p.updatedAt)||!Number.isFinite(Date.parse(p.updatedAt)))return null;
 if(new Date(p.updatedAt).toISOString().slice(0,19)!==p.updatedAt.slice(0,19))return null;
 return p;
}
export function confirmsPreferences(p:Preferences,input:PreferencesWrite){
 return p.configured&&p.revision===input.expectedRevision+1&&JSON.stringify(p.preferredRoleIds)===JSON.stringify(input.preferredRoleIds)&&JSON.stringify(p.preferredCities)===JSON.stringify(input.preferredCities);
}
type Response={ok:boolean;status:number;json():Promise<unknown>};
export type PreferenceResult={status:'saved';data:Preferences}|{status:'conflict'|'rejected'|'session'|'unknown'};
export async function writePreferences(request:()=>Promise<Response>,input:PreferencesWrite,isCurrent:()=>boolean):Promise<PreferenceResult>{
 try{if(!isCurrent())return {status:'unknown'};const response=await request();if(!isCurrent())return {status:'unknown'};
 if(response.status===409)return {status:'conflict'};if(response.status===401)return {status:'session'};if(response.status===400)return {status:'rejected'};
 if(!response.ok||response.status!==200)return {status:'unknown'};
 const data=readPreferences(await response.json());if(!isCurrent()||!data||!confirmsPreferences(data,input))return {status:'unknown'};
 return {status:'saved',data};
 }catch{return {status:'unknown'};}
}
