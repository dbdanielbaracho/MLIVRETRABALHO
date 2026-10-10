import test from 'node:test';
import assert from 'node:assert/strict';
import {loadAnalytics,percentOrMissing,validAnalytics} from '../lib/company-analytics.ts';
const empty={jobsCreated:0,openJobs:0,jobsWithInterest:0,jobsWithConfirmation:0,completedAssignments:0,cancelledAssignments:0,interestToConfirmationRate:null,assignmentCompletionRate:null};
const response=(data,ok=true,status=ok?200:500)=>({ok,status,json:async()=>data});
test('verified zero events preserve absent rates instead of inventing a zero conversion',async()=>{
 const result=await loadAnalytics(async()=>response(empty));assert.deepEqual(result,{status:'ready',data:empty});
 assert.equal(percentOrMissing(null),'Sem base suficiente');assert.equal(percentOrMissing(0),'0%');
});
test('real analytics retains backend counts and rates, including confirmation ratio above 100',async()=>{
 const data={...empty,jobsCreated:3,openJobs:1,jobsWithInterest:1,jobsWithConfirmation:2,completedAssignments:2,cancelledAssignments:1,interestToConfirmationRate:200,assignmentCompletionRate:67};
 assert.deepEqual(await loadAnalytics(async()=>response(data)),{status:'ready',data});assert.equal(percentOrMissing(200),'200%');
});
test('malformed counts or missing, invalid rates are errors rather than a fabricated empty operation',async()=>{
 for(const bad of [{...empty,jobsCreated:-1},{...empty,openJobs:0.5},{...empty,completedAssignments:'0'},{...empty,interestToConfirmationRate:undefined},{...empty,interestToConfirmationRate:NaN},{...empty,assignmentCompletionRate:101},{...empty,assignmentCompletionRate:-1},[],null]){
  assert.equal(validAnalytics(bad),false);assert.deepEqual(await loadAnalytics(async()=>response(bad)),{status:'error'});
 }
});
test('forbidden analytics is distinct from network and server failure',async()=>{
 assert.deepEqual(await loadAnalytics(async()=>response({},false,403)),{status:'error',forbidden:true});
 assert.deepEqual(await loadAnalytics(async()=>response({},false,500)),{status:'error',forbidden:false});
 assert.deepEqual(await loadAnalytics(async()=>{throw Error('offline')}),{status:'error'});
});
test('invalid JSON stays error and a later explicit read can recover verified data',async()=>{
 assert.deepEqual(await loadAnalytics(async()=>({ok:true,json:async()=>{throw Error('invalid JSON')}})),{status:'error'});
 assert.equal((await loadAnalytics(async()=>response(empty))).status,'ready');
});
test('analytics uses only the existing read endpoint and does not execute any mutation',async()=>{
 const paths=[];await loadAnalytics(async path=>{paths.push(path);return response(empty)});
 assert.deepEqual(paths,['/company/analytics']);
});
