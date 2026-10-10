import test from 'node:test';
import assert from 'node:assert/strict';
import {loadCompanyDashboard,loadingCompany} from '../lib/company-dashboard.ts';
const dashboard={openJobs:2,confirmedWorkers:3,activeWorkers:1,completedAssignments:4};
const active={id:'assignment',professionalId:'worker',title:'Real work',professionalName:'Real person',status:'confirmed',location:null,startsAt:null};
const completed={id:'completed',professionalId:'worker',title:'Real work',professionalName:'Real person',ratingScore:4,completedAt:null};
const request=data=>async path=>({ok:true,json:async()=>data[path]});
test('all company sections begin loading; legitimate zero/empty is ready only after response',async()=>{
 assert.deepEqual(loadingCompany(),{dashboard:{status:'loading'},active:{status:'loading'},completed:{status:'loading'}});
 const result=await loadCompanyDashboard(request({'/company/dashboard':{openJobs:0,confirmedWorkers:0,activeWorkers:0,completedAssignments:0},'/company/dashboard/assignments':[],'/company/dashboard/completed':[]}));
 assert.equal(result.dashboard.status,'ready');assert.deepEqual(result.active,{status:'ready',data:[]});assert.deepEqual(result.completed,{status:'ready',data:[]});
});
test('one failed section never erases other confirmed company results',async()=>{
 const result=await loadCompanyDashboard(async path=>{
  if(path.endsWith('/assignments'))throw Error('offline');
  return {ok:true,json:async()=>path.endsWith('/completed')?[completed]:dashboard};
 });
 assert.deepEqual(result.dashboard,{status:'ready',data:dashboard});
 assert.deepEqual(result.active,{status:'error'});
 assert.deepEqual(result.completed,{status:'ready',data:[completed]});
});
test('HTTP, invalid JSON and malformed statistics/items remain errors rather than zero/empty',async()=>{
 const bad=await loadCompanyDashboard(async path=>path.endsWith('/assignments')?{ok:false,json:async()=>[]}:{ok:true,json:async()=>path.endsWith('/completed')?[null]:{...dashboard,openJobs:-1}});
 assert.deepEqual(bad,{dashboard:{status:'error'},active:{status:'error'},completed:{status:'error'}});
 const json=await loadCompanyDashboard(async()=>({ok:true,json:async()=>{throw Error('invalid JSON');}}));
 assert.deepEqual(json,bad);
});
test('retry preserves real assignment/profile/rating records from existing endpoints',async()=>{
 const calls=[];
 const result=await loadCompanyDashboard(async path=>{calls.push(path);return request({'/company/dashboard':dashboard,'/company/dashboard/assignments':[active],'/company/dashboard/completed':[completed]})(path);});
 assert.deepEqual(calls.sort(),['/company/dashboard','/company/dashboard/assignments','/company/dashboard/completed']);
 assert.deepEqual(result,{dashboard:{status:'ready',data:dashboard},active:{status:'ready',data:[active]},completed:{status:'ready',data:[completed]}});
});

test('expired company dashboard starts no endpoint request',async()=>{
 let calls=0;const result=await loadCompanyDashboard(async()=>{calls++;return {ok:true,json:async()=>[]}},()=>false);
 assert.deepEqual(result,{dashboard:{status:'error'},active:{status:'error'},completed:{status:'error'}});assert.equal(calls,0);
});
test('deadline during the last company section invalidates the whole expired snapshot, including earlier ready sections',async()=>{
 const controller=new AbortController();let resolve;const pending=new Promise(r=>{resolve=r});
 const result=loadCompanyDashboard(async path=>({ok:true,json:()=>path.endsWith('/completed')?pending:Promise.resolve(path.endsWith('/assignments')?[active]:dashboard)}),()=>!controller.signal.aborted);
 await Promise.resolve();await Promise.resolve();controller.abort();resolve([completed]);
 assert.deepEqual(await result,{dashboard:{status:'error'},active:{status:'error'},completed:{status:'error'}});
});
