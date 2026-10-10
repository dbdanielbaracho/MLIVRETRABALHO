import test from 'node:test';
import assert from 'node:assert/strict';
import {loadSupportCases,supportStatus} from '../lib/professional-support.ts';
const ticket={id:'ticket',assignmentId:'a',category:'schedule',priority:'normal',status:'open',description:'Texto real da fixture',resolutionNote:null,createdAt:'2026-10-10T10:00:00-03:00'};
const response=(data,status=200)=>async()=>({ok:status>=200&&status<300,json:async()=>data});
test('support reads only the selected assignment, retaining server order, literal notes and exact absence',async()=>{
 const other={...ticket,id:'other',assignmentId:'b'},general={...ticket,id:'general',assignmentId:null},actual={...ticket,id:'resolved',status:'resolved',resolutionNote:'Resposta real'};
 assert.deepEqual(await loadSupportCases(response([other,actual,general,ticket]),'a'),{status:'ready',data:[actual,ticket]});
 assert.deepEqual(await loadSupportCases(response([]),'a'),{status:'ready',data:[]});
 assert.deepEqual(await loadSupportCases(response([other,general]),'a'),{status:'ready',data:[]});
});
test('support rejects malformed facts anywhere in the response instead of showing empty history',async()=>{
 for(const data of [null,{},[null],[{...ticket,id:''}],[{...ticket,assignmentId:undefined}],[{...ticket,category:' '}],[{...ticket,priority:''}],[{...ticket,status:''}],[{...ticket,description:23}],[{...ticket,createdAt:'bad-date'}],[{...ticket,resolutionNote:42}],[ticket,{...ticket,id:'other',assignmentId:'b',createdAt:'bad-date'}]])assert.deepEqual(await loadSupportCases(response(data),'a'),{status:'error'});
});
test('support failure, unauthorized, offline and bad JSON do not confirm no requests',async()=>{
 for(const request of [response([],401),response([],403),response([],500),async()=>{throw Error('offline')},async()=>({ok:true,json:async()=>{throw Error('JSON')}})])assert.deepEqual(await loadSupportCases(request,'a'),{status:'error'});
 assert.deepEqual(await loadSupportCases(response([ticket]),'a'),{status:'ready',data:[ticket]});
});
test('support never starts an expired/empty selection or accepts JSON after deadline',async()=>{
 let calls=0;const request=async()=>{calls++;return {ok:true,json:async()=>[ticket]}};
 assert.deepEqual(await loadSupportCases(request,'a',()=>false),{status:'error'});
 assert.deepEqual(await loadSupportCases(request,' '),{status:'error'});assert.equal(calls,0);
 let current=true,resolve;const json=new Promise(r=>{resolve=r});
 const result=loadSupportCases(async()=>({ok:true,json:()=>json}),'a',()=>current);
 await Promise.resolve();current=false;resolve([ticket]);assert.deepEqual(await result,{status:'error'});
});
test('support preserves future nonblank values and optional response notes, and uses factual status labels',async()=>{
 const actual={...ticket,id:'opaque:ticket',category:'future-category',priority:'future-priority',status:'future-status',resolutionNote:undefined};
 assert.deepEqual(await loadSupportCases(response([actual]),'a'),{status:'ready',data:[actual]});
 assert.equal(supportStatus('resolved'),'Resolvida');assert.equal(supportStatus('future-status'),'future-status');assert.equal(supportStatus('constructor'),'constructor');
});

