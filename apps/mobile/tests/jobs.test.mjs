import test from 'node:test';
import assert from 'node:assert/strict';
import {loadJobs,sendInterest} from '../lib/jobs.ts';
const response=(data,ok=true)=>({ok,json:async()=>data});
const JOB='aaaaaaaa-1111-4222-8333-444444444444',OTHER_JOB='bbbbbbbb-1111-4222-8333-444444444444',PRO='cccccccc-1111-4222-8333-444444444444';
test('jobs loading failures and invalid data never appear as a successful empty catalog',async()=>{
 assert.deepEqual(await loadJobs(async()=>response([])),{status:'ready',data:[]});
 for(const request of [async()=>response([],false),async()=>{throw Error('offline')},async()=>({ok:true,json:async()=>{throw Error('bad json')}}),async()=>response({jobs:[]}),async()=>response([{id:'j',title:'Atendimento',payCents:'200'}]),async()=>response([{id:'j',title:'Limpeza',companyAverageRating:Infinity}])])assert.equal((await loadJobs(request)).status,'error');
});
test('jobs preserve actual fields, absent compensation and backend ordering without invented matching',async()=>{
 const data=[{id:JOB,title:'Limpeza',location:null,payCents:null,companyAverageRating:null,companyRatingCount:0},{id:OTHER_JOB,title:'Evento',workCity:'Recife',payCents:5000,companyAverageRating:4.5,companyRatingCount:2}];
 const paths=[];assert.deepEqual(await loadJobs(async p=>{paths.push(p);return response(data)}),{status:'ready',data});assert.deepEqual(paths,['/jobs']);
});
test('interest only confirms a matching documented server acknowledgement, including prior confirmation',async()=>{
 const calls=[];const request=async(p,m)=>{calls.push([p,m]);return response({jobId:JOB,professionalId:PRO,status:'interested'})};
 assert.equal(await sendInterest(request,JOB),'interested');assert.deepEqual(calls,[['/jobs/'+JOB+'/interest','POST']]);
 assert.equal(await sendInterest(async()=>response({jobId:JOB,professionalId:PRO,status:'confirmed'}),JOB),'confirmed');
 for(const data of [null,{}, {jobId:OTHER_JOB,professionalId:PRO,status:'interested'},{jobId:JOB,professionalId:PRO,status:'unknown'}])assert.equal(await sendInterest(async()=>response(data),JOB),'error');
});
test('failed interest stays unconfirmed and the existing idempotent endpoint can be retried',async()=>{
 assert.equal(await sendInterest(async()=>{throw Error('timeout')},JOB),'error');
 assert.equal(await sendInterest(async()=>response({},false),JOB),'error');
 assert.equal(await sendInterest(async()=>response({jobId:JOB,professionalId:PRO,status:'interested'}),JOB),'interested');
});
test('missing job identity prevents interest POST instead of calling a malformed route',async()=>{let calls=0;for(const id of ['',' '])assert.equal(await sendInterest(async()=>{calls++;return response({})},id),'error');assert.equal(calls,0);});
test('successful HTTP cannot confirm interest without the actual professional identifier',async()=>{for(const professionalId of ['',' ',null])assert.equal(await sendInterest(async()=>response({jobId:'j',professionalId,status:'interested'}),'j'),'error');});

test('malformed backend job UUIDs are rejected before catalog display or interest transport',async()=>{
 const malformed={id:'job-real',title:'Broken catalog row',location:null,workCity:null,payCents:null,companyAverageRating:null,companyRatingCount:0};
 assert.deepEqual(await loadJobs(async()=>response([malformed])),{status:'error'});
 let calls=0;assert.equal(await sendInterest(async()=>{calls++;return response({})},'job-real'),'error');assert.equal(calls,0);
});
