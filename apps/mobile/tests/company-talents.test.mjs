import test from 'node:test';
import assert from 'node:assert/strict';
import {loadTalents,sameTalentContext,removeTalent} from '../lib/company-talents.ts';
const item={professionalId:'p',pool:'preferred',displayName:'Nome real'};
const response=(data,ok=true,status=ok?200:500)=>({ok,status,json:async()=>data});
test('talent pools retain actual names and pool membership; verified empty is a successful read',async()=>{
 const calls=[];assert.deepEqual(await loadTalents(async(...args)=>{calls.push(args);return response([item])}),{status:'ready',data:[item]});assert.deepEqual(calls,[['/company/talent-pools','GET']]);assert.deepEqual(await loadTalents(async()=>response([])),{status:'ready',data:[]});
});
test('failed and forbidden talent reads cannot be presented as an empty company list',async()=>{
 assert.deepEqual(await loadTalents(async()=>response([],false,403)),{status:'error',forbidden:true});assert.equal((await loadTalents(async()=>{throw Error('offline')})).status,'error');
});
test('unknown pools and malformed identities or names fail schema; retry recovers the real list',async()=>{
 for(const data of [{items:[]},[{...item,pool:'__proto__'}],[{...item,professionalId:''}],[{...item,displayName:null}]])assert.equal((await loadTalents(async()=>response(data))).status,'error');
 assert.deepEqual((await loadTalents(async()=>response([item]))).data,[item]);
});
test('talent removal requires the company and identity that provided the displayed list',()=>{
 const h={'x-tenant-id':'t',Authorization:'Bearer a'};assert.equal(sameTalentContext({...h},h),true);assert.equal(sameTalentContext({...h,'x-tenant-id':'other'},h),false);assert.equal(sameTalentContext({...h,Authorization:'Bearer b'},h),false);assert.equal(sameTalentContext({},{}),false);
});
test('talent removal preserves the bodyless DELETE contract, encoded identity and verified acknowledgement',async()=>{
 const calls=[];assert.equal(await removeTalent(async(...args)=>{calls.push(args);return response({removed:true})},{...item,professionalId:'p/x'}),true);assert.deepEqual(calls,[['/company/talent-pools/preferred/p%2Fx','DELETE']]);assert.equal(await removeTalent(async()=>response({removed:false}),item),false);assert.equal(await removeTalent(async()=>response({}),item),false);
});
test('rejection and lost DELETE response never imply success or automatically repeat the operation',async()=>{
 assert.equal(await removeTalent(async()=>response({removed:true},false,403),item),false);let calls=0;assert.equal(await removeTalent(async()=>{calls++;throw Error('timeout')},item),false);assert.equal(calls,1);
});
test('missing talent identities and unknown pools are rejected before DELETE transport',async()=>{
 let calls=0;for(const bad of [{...item,professionalId:''},{...item,professionalId:' '},{...item,pool:'other'}])assert.equal(await removeTalent(async()=>{calls++;return response({removed:true})},bad),false);assert.equal(calls,0);
 assert.equal((await loadTalents(async()=>response([{...item,professionalId:' '}]))).status,'error');
});
