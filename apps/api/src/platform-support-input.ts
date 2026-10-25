import {createHash} from 'node:crypto';
export type PlatformSupportInput={category:string;description:string};
const categories=new Set(['app_access','profile','preferences','notifications','privacy','other']);
export function platformSupportInput(value:unknown):PlatformSupportInput|null{
 if(!value||typeof value!=='object'||Array.isArray(value))return null;
 const x=value as Record<string,unknown>;
 if(Object.keys(x).some(k=>!['category','description'].includes(k))||typeof x.category!=='string'||!categories.has(x.category)||typeof x.description!=='string')return null;
 const description=x.description.trim();if(!description||Array.from(description).length>4000||/[\u0000]/u.test(description))return null;
 return {category:x.category,description};
}
export const platformSupportDigest=(input:PlatformSupportInput)=>createHash('sha256').update(JSON.stringify([input.category,input.description])).digest('hex');
