import test from 'node:test';
import assert from 'node:assert/strict';
import {loadCompanyJobs,loadCandidates,orderedCandidates,sameCompanyContext,confirmCandidate} from '../lib/company-candidates.ts';
const response=(data,ok=true)=>({ok,json:async()=>data});
test('company open jobs distinguish actual empty from invalid or failed reads',async()=>{
 assert.deepEqual(await loadCompanyJobs(async()=>response([{id:'a',title:'Evento',status:'open'},{id:'b',title:'Limpeza',status:'closed'}])),{status:'ready',data:[{id:'a',title:'Evento',status:'open'}]});
 assert.deepEqual(await loadCompanyJobs(async()=>response([])),{status:'ready',data:[]});
 for(const r of [async()=>response({},true),async()=>response([],false),async()=>{throw Error('offline')}])assert.equal((await loadCompanyJobs(r)).status,'error');
});
test('recommendation failure preserves real candidates and is not presented as no recommendation',async()=>{
 const candidates=[{professionalId:'p',displayName:'Nome real',homeCity:null,status:'interested'}];
 const r=await loadCandidates(async path=>response(path.endsWith('/candidates')?candidates:{bad:true}),'j');
 assert.deepEqual(r.candidates,{status:'ready',data:candidates});assert.equal(r.recommendations.status,'error');assert.deepEqual(orderedCandidates(r),candidates);
});
test('only validated server recommendations reorder a copy of actual candidates',async()=>{
 const candidates=[{professionalId:'p1',displayName:'A',status:'interested'},{professionalId:'p2',displayName:'B',status:'confirmed'}];
 const r=await loadCandidates(async path=>response(path.endsWith('/candidates')?candidates:[{professionalId:'p2',score:90,reasons:['Disponível']},{professionalId:'p1',score:50,reasons:[]}]),'j');
 assert.deepEqual(orderedCandidates(r).map(x=>x.professionalId),['p2','p1']);assert.equal(candidates[0].professionalId,'p1');
 for(const data of [[{professionalId:'p',score:Infinity,reasons:[]}],[{professionalId:'p',score:101,reasons:[]}],[{professionalId:'p',score:50,reasons:[1]}]])assert.equal((await loadCandidates(async()=>response(data),'j')).recommendations.status,'error');
});
test('company context must retain both tenant and identity before acting on displayed data',()=>{
 const displayed={'x-tenant-id':'t',Authorization:'Bearer first'};
 assert.equal(sameCompanyContext({...displayed},displayed),true);
 assert.equal(sameCompanyContext({...displayed,'x-tenant-id':'other'},displayed),false);
 assert.equal(sameCompanyContext({...displayed,Authorization:'Bearer other'},displayed),false);
 assert.equal(sameCompanyContext({},{}),false);
});
test('confirmation requires exact job/professional/tenant ack and never fabricates success on timeout',async()=>{
 const data={id:'a',jobId:'j',professionalId:'p',tenantId:'t',status:'confirmed'},calls=[];
 assert.equal(await confirmCandidate(async(path,options)=>{calls.push([path,options]);return response(data)},'j','p','t'),true);
 assert.deepEqual(calls,[['/company/jobs/j/confirm',{method:'POST',body:JSON.stringify({professionalId:'p'})}]]);
 for(const bad of [{...data,tenantId:'other'},{...data,jobId:'other'},{...data,professionalId:'other'},{...data,status:'completed'},null])assert.equal(await confirmCandidate(async()=>response(bad),'j','p','t'),false);
 assert.equal(await confirmCandidate(async()=>{throw Error('timeout')},'j','p','t'),false);assert.equal(await confirmCandidate(async()=>response(data,false),'j','p','t'),false);
});
