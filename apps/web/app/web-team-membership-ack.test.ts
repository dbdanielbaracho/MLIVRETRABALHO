import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';import {stripTypeScriptTypes} from 'node:module';
import {confirmsTeamMemberAddition,confirmsTeamMemberRemoval} from './team-membership-ack.ts';
import {isAdminRole,isCompanyRole,tenantHeaders} from './web-contract.ts';
const TEAM='11111111-2222-4333-8444-555555555555',PRO='abcdef12-2222-4333-8444-777777777777';
const source=fs.readFileSync(new URL('./page.tsx',import.meta.url),'utf8'),prefix=source.slice(0,source.indexOf('  if(!session)return <main')).replace(/^import .*;\n/gm,'').replace('export default function Home(){','function Home(){');
const js=stripTypeScriptTypes(prefix+'\nreturn {addTeamMember,removeTeamMember};\n}\nHome();',{mode:'strip'});
async function invoke(handler:string,ack:unknown,ok=true,status=201,failure?:'network'|'json'){
const values:any[]=[],calls:any[]=[];let cursor=0;
const session={accessToken:'token',identity:{id:'identity'},memberships:[{tenantId:'tenant',role:'owner'}]};
class Data{get(name:string){return name==='professionalId'?PRO:null}}
const useState=(initial:any)=>{const index=cursor++;const v=index===0?session:index===1?'tenant':index===12?TEAM:initial;values[index]=v;return[v,(next:any)=>values[index]=typeof next==='function'?next(values[index]):next];};
const h=vm.runInNewContext(js,{useState,useRef:(initial:any)=>({current:initial}),useLayoutEffect:(fn:()=>unknown)=>fn(),useMemo:(fn:()=>unknown)=>fn(),useEffect(){},setTimeout,clearTimeout,FormData:Data,confirmsTeamMemberAddition,confirmsTeamMemberRemoval,isAdminRole,isCompanyRole,tenantHeaders,process:{env:{}},fetch:async(url:string,options:any)=>{calls.push({url,options});if(failure==='network')throw new Error('lost transport');return{ok,status,json:async()=>{if(failure==='json')throw new Error('lost JSON');return ack}}}});
await(handler==='addTeamMember'?h[handler]({preventDefault(){},currentTarget:{}}):h[handler](PRO));return{values,calls};}
test('Web team add cannot refresh on missing mismatched or malformed canonical membership ACK',async()=>{
for(const ack of [{},{teamId:'fake',professionalId:PRO},{teamId:TEAM,professionalId:'other'},null,[]]){
const h=await invoke('addTeamMember',ack);assert.equal(h.values[23],0);assert.match(h.values[21],/não foi confirmada/);assert.equal(h.calls.length,1);assert.equal(h.values[12],TEAM);
}});
test('Web team removal cannot refresh without the API removed true ACK',async()=>{
for(const ack of [{},{removed:false},{removed:'true'},null,[]]){
const h=await invoke('removeTeamMember',ack,true,200);assert.equal(h.values[23],0);assert.match(h.values[21],/não foi confirmada/);assert.equal(h.calls.length,1);assert.equal(h.values[12],TEAM);
}});
test('Web canonical team add and removal preserve method payload headers and one refresh',async()=>{
const add=await invoke('addTeamMember',{teamId:TEAM,professionalId:PRO});assert.equal(add.values[23],1);assert.equal(add.values[21],'');assert.equal(add.calls.length,1);assert.equal(add.calls[0].options.method,'POST');assert.deepEqual(JSON.parse(add.calls[0].options.body),{professionalId:PRO});
const rem=await invoke('removeTeamMember',{removed:true},true,200);assert.equal(rem.values[23],1);assert.equal(rem.values[21],'');assert.equal(rem.calls.length,1);assert.equal(rem.calls[0].options.method,'DELETE');
for(const h of [add,rem]){assert.equal(h.calls[0].options.headers['x-tenant-id'],'tenant');assert.equal(h.calls[0].options.headers.Authorization,'Bearer token');assert.equal(h.values[12],TEAM);}
});

test('team membership ACKs preserve valid idempotent additions and removed true without inventing echoed IDs',()=>{
 assert.equal(confirmsTeamMemberAddition({teamId:TEAM,professionalId:PRO},TEAM,PRO),true);
 assert.equal(confirmsTeamMemberAddition({teamId:'fake',professionalId:PRO},'fake',PRO),false);
 assert.equal(confirmsTeamMemberAddition({teamId:TEAM,professionalId:'fake'},TEAM,'fake'),false);
 assert.equal(confirmsTeamMemberRemoval({removed:true}),true);assert.equal(confirmsTeamMemberRemoval({removed:false}),false);
});
test('team membership HTTP rejection preserves status and selection without refresh or retry',async()=>{
 for(const handler of ['addTeamMember','removeTeamMember'])for(const status of [400,401,403,404,409,429,500]){
  const h=await invoke(handler,{},false,status);assert.equal(h.values[23],0);assert.equal(h.values[21],'HTTP '+status);assert.equal(h.values[12],TEAM);assert.equal(h.calls.length,1);
 }
});
test('team membership lost transport or JSON remains uncertain with one call and no refresh',async()=>{
 for(const handler of ['addTeamMember','removeTeamMember'])for(const failure of ['network','json'] as const){
 const h=await invoke(handler,{},true,201,failure);assert.equal(h.values[23],0);assert.ok(h.values[21]);assert.equal(h.values[12],TEAM);assert.equal(h.calls.length,1);assert.equal(h.values[22],false);
 }
});

