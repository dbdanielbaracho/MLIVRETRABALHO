import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {stripTypeScriptTypes} from 'node:module';
import {confirmsReplacementCreation,confirmsReplacementSelection} from './replacement-ack.ts';
import {isAdminRole,isCompanyRole,tenantHeaders} from './web-contract.ts';
const REQUEST='11111111-2222-4333-8444-555555555555',ORIGINAL='aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee',PRO='abcdef12-2222-4333-8444-777777777777',NEW='99999999-8888-4777-8666-555555555555';
const source=fs.readFileSync(new URL('./page.tsx',import.meta.url),'utf8');
const prefix=source.slice(0,source.indexOf('  if(!session)return <main')).replace(/^import .*;\n/gm,'').replace('export default function Home(){','function Home(){');
const js=stripTypeScriptTypes(prefix+'\nreturn {requestReplacement,selectReplacement};\n}\nHome();',{mode:'strip'});
async function invoke(handler:string,ack:unknown,ok=true,status=201,failure?:'network'|'json'){
 const values:any[]=[],calls:any[]=[];let cursor=0;
 const session={accessToken:'token',identity:{id:'identity',email:'fixture'},memberships:[{tenantId:'tenant',role:'owner'}]};
 const useState=(initial:any)=>{const index=cursor++;values[index]=initial;const value=index===0?session:index===1?'tenant':index===14?[{id:REQUEST,assignmentId:ORIGINAL,status:'open'}]:index===15?REQUEST:initial;values[index]=value;return [value,(next:any)=>{values[index]=typeof next==='function'?next(values[index]):next}];};
 const h=vm.runInNewContext(js,{useState,useRef:(initial:any)=>({current:initial}),useLayoutEffect:(fn:()=>unknown)=>fn(),useMemo:(fn:()=>unknown)=>fn(),useEffect(){},setTimeout,clearTimeout,process:{env:{}},confirmsReplacementCreation,confirmsReplacementSelection,isAdminRole,isCompanyRole,tenantHeaders,fetch:async(url:string,options:any)=>{calls.push({url,options});if(failure==='network')throw new Error('lost transport');return {ok,status,json:async()=>{if(failure==='json')throw new Error('lost JSON');return ack}}}});
 await h[handler](handler==='requestReplacement'?ORIGINAL:PRO);
 return {values,calls};
}
test('Web request cannot select a fabricated replacement ACK or refresh on unknown result',async()=>{
 for(const ack of [{id:'fake'},{id:REQUEST,assignmentId:'other',status:'open'},{id:REQUEST,assignmentId:ORIGINAL,status:'matched'}]){
  const h=await invoke('requestReplacement',ack);assert.equal(h.values[15],REQUEST);assert.equal(h.values[23],0);assert.match(h.values[21],/não foi confirmada/);assert.equal(h.calls.length,1);
 }
});
test('Web selection cannot clear the request or refresh without exact canonical matched assignment ACK',async()=>{
 const ack={replacementRequestId:REQUEST,assignmentId:NEW,replacedAssignmentId:ORIGINAL,professionalId:PRO,status:'matched'};
 for(const delta of [{assignmentId:'fake'},{assignmentId:ORIGINAL},{replacementRequestId:'other'},{replacedAssignmentId:'other'},{professionalId:'other'},{status:'open'}]){
  const h=await invoke('selectReplacement',{...ack,...delta});assert.equal(h.values[15],REQUEST);assert.equal(h.values[23],0);assert.match(h.values[21],/não foi confirmada/);assert.equal(h.calls.length,1);
 }
});
test('Web legitimate replacement creation and selection preserve payloads and publish exactly one refresh',async()=>{
 const created=await invoke('requestReplacement',{id:REQUEST,assignmentId:ORIGINAL,status:'open'});assert.equal(created.values[15],REQUEST);assert.equal(created.values[23],1);assert.equal(created.values[21],'');assert.equal(created.calls.length,1);assert.deepEqual(JSON.parse(created.calls[0].options.body),{reason:'Solicitação operacional via console Web'});
 const selected=await invoke('selectReplacement',{replacementRequestId:REQUEST,assignmentId:NEW,replacedAssignmentId:ORIGINAL,professionalId:PRO,status:'matched'});assert.equal(selected.values[15],'');assert.equal(selected.values[23],1);assert.equal(selected.values[21],'');assert.equal(selected.calls.length,1);assert.deepEqual(JSON.parse(selected.calls[0].options.body),{professionalId:PRO});
});

test('replacement ACK predicates enforce UUID and exact original/request/professional binding without invented fields',()=>{
 for(const id of ['fake',' '+REQUEST+' ',null,123])assert.equal(confirmsReplacementCreation({id,assignmentId:ORIGINAL,status:'open'},ORIGINAL),false);
 assert.equal(confirmsReplacementCreation({id:REQUEST,assignmentId:ORIGINAL,status:'open'},ORIGINAL),true);
 const ack={replacementRequestId:REQUEST,assignmentId:NEW,replacedAssignmentId:ORIGINAL,professionalId:PRO,status:'matched'};
 assert.equal(confirmsReplacementSelection(ack,REQUEST,ORIGINAL,PRO),true);
 assert.equal(confirmsReplacementSelection({...ack,assignmentId:ORIGINAL.toUpperCase()},REQUEST,ORIGINAL,PRO),false);
 assert.equal(confirmsReplacementSelection(ack,REQUEST,undefined,PRO),false);
 for(const item of [null,[],{},true]){assert.equal(confirmsReplacementCreation(item,ORIGINAL),false);assert.equal(confirmsReplacementSelection(item,REQUEST,ORIGINAL,PRO),false);}
});
test('HTTP rejections keep replacement selection and no refresh, preserve explicit status and never retry',async()=>{
 for(const handler of ['requestReplacement','selectReplacement'])for(const status of [400,401,403,409,429,500]){
  const h=await invoke(handler,{},false,status);assert.equal(h.values[15],REQUEST);assert.equal(h.values[23],0);assert.equal(h.values[21],'HTTP '+status);assert.equal(h.calls.length,1);
 }
});

test('lost replacement transport or JSON preserves request and refresh and sends no automatic retry',async()=>{
 for(const handler of ['requestReplacement','selectReplacement'])for(const failure of ['network','json'] as const){
  const h=await invoke(handler,{},true,201,failure);assert.equal(h.values[15],REQUEST);assert.equal(h.values[23],0);assert.equal(h.calls.length,1);assert.ok(h.values[21]);assert.equal(h.values[22],false);
 }
});

