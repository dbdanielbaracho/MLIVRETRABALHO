export type PreferencesInput={preferredRoleIds:string[];preferredCities:string[];expectedRevision:number};
export function preferencesInput(value:unknown):PreferencesInput|null{
 if(!value||typeof value!=='object'||Array.isArray(value))return null;
 const b=value as Record<string,unknown>;
 if(Object.keys(b).some(k=>!['preferredRoleIds','preferredCities','expectedRevision'].includes(k)))return null;
 if(!Number.isSafeInteger(b.expectedRevision)||(b.expectedRevision as number)<0)return null;
 if(!Array.isArray(b.preferredRoleIds)||b.preferredRoleIds.length>20||!b.preferredRoleIds.every(x=>typeof x==='string'&&/^[a-z0-9][a-z0-9_.-]{0,99}$/.test(x)))return null;
 if(!Array.isArray(b.preferredCities)||b.preferredCities.length>10)return null;
 const cities:string[]=[],seen=new Set<string>();
 for(const x of b.preferredCities){
  if(typeof x!=='string'||/[\p{Cc}\p{Cf}]/u.test(x))return null;
  const city=x.normalize('NFC').trim().replace(/\s+/gu,' ');
  if(!city||Array.from(city).length>100)return null;
  const key=city.toLocaleLowerCase('pt-BR');if(!seen.has(key)){seen.add(key);cities.push(city);}
 }
 return {preferredRoleIds:[...new Set(b.preferredRoleIds as string[])].sort(),preferredCities:cities,expectedRevision:b.expectedRevision as number};
}
