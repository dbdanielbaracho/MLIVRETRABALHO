export type WebRole='owner'|'admin'|'manager'|'company'|string;
export const companyRoles=['owner','admin','manager','company'];
export function isCompanyRole(role:string){return companyRoles.includes(role);}
export function isAdminRole(role?:string){return role==='owner'||role==='admin';}
export function tenantHeaders(accessToken:string,tenantId?:string){
 const headers:Record<string,string>={Authorization:`Bearer ${accessToken}`};
 if(tenantId)headers['x-tenant-id']=tenantId;
 return headers;
}
export function clearTenantData<T>(empty:T):T{return empty;}

export function reaisToCents(value:FormDataEntryValue|null){
 if(typeof value!=='string'||!/^(?:0|[1-9]\d*)(?:\.\d{1,2})?$/.test(value))return NaN;
 const [whole,fraction='']=value.split('.');
 const cents=Number(whole)*100+Number(fraction.padEnd(2,'0'));
 return Number.isSafeInteger(cents)?cents:NaN;
}
export function localDateTimeToIso(value:FormDataEntryValue|null){
 if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value))return '';
 const date=new Date(value);
 if(Number.isNaN(date.getTime()))return '';
 const local=[String(date.getFullYear()).padStart(4,'0'),String(date.getMonth()+1).padStart(2,'0'),String(date.getDate()).padStart(2,'0')].join('-')+'T'+String(date.getHours()).padStart(2,'0')+':'+String(date.getMinutes()).padStart(2,'0');
 return local===value?date.toISOString():'';
}

export function validateCompanyJobPreflight(body:{startsAt:string;endsAt:string;payCents:number}):string|null{
 if(!Number.isSafeInteger(body.payCents)||body.payCents<0)return 'Informe um valor válido em reais, com até duas casas decimais.';
 const start=Date.parse(body.startsAt),end=Date.parse(body.endsAt);
 if(!body.startsAt||!body.endsAt||!Number.isFinite(start)||!Number.isFinite(end))return 'Informe datas e horários válidos para a vaga.';
 if(end<=start)return 'O horário de término deve ser posterior ao início.';
 return null;
}
