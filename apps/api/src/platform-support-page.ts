const uuid=(v:unknown):v is string=>typeof v==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(v);
export function platformSupportPage(limitValue:unknown,cursorValue:unknown){
  const limit=limitValue===undefined?20:typeof limitValue==='string'&&/^[1-9]\d{0,2}$/.test(limitValue)?Number(limitValue):0;
  if(limit<1||limit>100)throw Error('platform_support_page_invalid');
  let cursor:[string,string]|null=null;
  if(cursorValue!==undefined){try{
   if(typeof cursorValue!=='string'||cursorValue.length>256||!/^[A-Za-z0-9_-]+$/.test(cursorValue))throw Error();
   const decoded=Buffer.from(cursorValue,'base64url');if(decoded.toString('base64url')!==cursorValue)throw Error();
   const x=JSON.parse(decoded.toString('utf8'));
   if(!Array.isArray(x)||x.length!==2||typeof x[0]!=='string'||x[0].startsWith('0000')||!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{6}Z$/.test(x[0])||!uuid(x[1])||new Date(x[0]).toISOString().slice(0,19)!==x[0].slice(0,19))throw Error();
   cursor=x as [string,string];
  }catch{throw Error('platform_support_page_invalid');}}
  return {limit,cursor};
}
