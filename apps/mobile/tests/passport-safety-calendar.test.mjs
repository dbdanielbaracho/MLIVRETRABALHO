import test from 'node:test';
import assert from 'node:assert/strict';
import {loadWorkPassport} from '../lib/professional-profile.ts';
import {loadSafety as loadProfessionalSafety,submitSafetyCase,submitSafetyAppeal} from '../lib/professional-safety.ts';
import {loadSafety as loadCompanySafety} from '../lib/company-safety.ts';

const impossible=['2026-02-30T12:00:00Z','2025-02-29T12:00:00-03:00','2026-04-31T12:00:00+02:00'];
const valid=['2024-02-29T12:00:00Z','2024-02-29T23:30:00-03:00','2026-04-30T12:00:00+02:00','1970-01-01T00:00:00Z'];
const at=valid[0];
const assignment={id:'work',tenantId:'tenant',title:'Fixture work',status:'confirmed',startsAt:at};
const report={id:'case',tenantId:'tenant',assignmentId:'work',category:'unsafe_work',description:'Fixture report',status:'resolved',createdAt:at,reportedByMe:true};
const appeal={id:'appeal',tenantId:'tenant',safetyCaseId:'case',appellantIdentityId:'professional',reason:'Fixture reason',status:'submitted',createdAt:at};
const work={id:'work',tenantId:'tenant',title:'Fixture work',completedAt:at};
const passport={displayName:'Fixture',completedWorkCount:1,averageRating:null,ratingCount:0,verifiedHistory:[work]};
const response=data=>({ok:true,status:200,json:async()=>data});
const professional=(patch={})=>async path=>response(path==='/assignments/mine'?[{...assignment,...patch.assignments}]:path==='/safety-cases/mine'?[{...report,...patch.cases}]:[{...appeal,...patch.appeals}]);
const company=(patch={})=>async path=>response(path==='/company/safety-cases'?[{...report,...patch.cases}]:[{...appeal,...patch.appeals}]);

test('Passport rejects impossible completion days instead of ready verified experience',async()=>{
 for(const completedAt of impossible)assert.deepEqual(await loadWorkPassport(async()=>response({...passport,verifiedHistory:[{...work,completedAt}]})),{status:'error'});
});
for(const [section,field] of [['assignments','startsAt'],['cases','createdAt'],['appeals','createdAt']])test(`professional safety rejects impossible ${section}.${field} without erasing valid sibling sections`,async()=>{
 for(const value of impossible){const data=await loadProfessionalSafety(professional({[section]:{[field]:value}}));assert.equal(data[section].status,'error');for(const sibling of ['assignments','cases','appeals'].filter(x=>x!==section))assert.equal(data[sibling].status,'ready');}
});
for(const [section,field] of [['cases','createdAt'],['cases','resolvedAt'],['appeals','createdAt']])test(`company safety rejects impossible ${section}.${field} without inventing empty sibling data`,async()=>{
 for(const value of impossible){const data=await loadCompanySafety(company({[section]:{[field]:value}}));assert.equal(data[section].status,'error');assert.equal(data[section==='cases'?'appeals':'cases'].status,'ready');}
});
test('impossible case creation ACK stays unknown after exactly one unchanged tenant-bound POST',async()=>{
 for(const createdAt of impossible){const calls=[];assert.deepEqual(await submitSafetyCase(async(...args)=>{calls.push(args);return response({id:report.id,category:report.category,status:'open',createdAt});},assignment,report.category,report.description),{status:'unknown'});assert.deepEqual(calls,[['/safety-cases',assignment.tenantId,{assignmentId:assignment.id,category:report.category,description:report.description}]]);}
});
for(const created of [true,false])test(`impossible appeal ${created?'created':'existing'} ACK stays unknown without retry or changing the selected case`,async()=>{
 for(const createdAt of impossible){const calls=[],before=JSON.stringify(report);assert.deepEqual(await submitSafetyAppeal(async(...args)=>{calls.push(args);return response({...appeal,createdAt,created});},report,appeal.reason),{status:'unknown'});assert.deepEqual(calls,[['/safety-appeals',report.tenantId,{safetyCaseId:report.id,reason:appeal.reason}]]);assert.equal(JSON.stringify(report),before);}
});
test('leap days, explicit offsets and epoch zero remain exact across all reads and actual helper confirmations',async()=>{
 for(const stamp of valid){
  const p={...passport,verifiedHistory:[{...work,completedAt:stamp}]};assert.deepEqual(await loadWorkPassport(async()=>response(p)),{status:'ready',data:p});
  const pro=await loadProfessionalSafety(professional({assignments:{startsAt:stamp},cases:{createdAt:stamp},appeals:{createdAt:stamp}}));for(const key of ['assignments','cases','appeals'])assert.equal(pro[key].status,'ready');assert.equal(pro.assignments.data[0].startsAt,stamp);assert.equal(pro.cases.data[0].createdAt,stamp);assert.equal(pro.appeals.data[0].createdAt,stamp);
  const co=await loadCompanySafety(company({cases:{createdAt:stamp,resolvedAt:stamp},appeals:{createdAt:stamp}}));assert.equal(co.cases.status,'ready');assert.equal(co.cases.data[0].createdAt,stamp);assert.equal(co.cases.data[0].resolvedAt,stamp);assert.equal(co.appeals.data[0].createdAt,stamp);
  assert.deepEqual(await submitSafetyCase(async()=>response({id:report.id,category:report.category,status:'open',createdAt:stamp}),assignment,report.category,report.description),{status:'created'});
  for(const created of [true,false])assert.deepEqual(await submitSafetyAppeal(async()=>response({...appeal,createdAt:stamp,created}),report,appeal.reason),{status:created?'created':'existing'});
 }
});
test('documented optional null/missing dates, profile absence and independently verified empty sections remain valid',async()=>{
 for(const missing of [null,undefined]){
  const p={...passport,verifiedHistory:[{...work,completedAt:missing}]};assert.deepEqual(await loadWorkPassport(async()=>response(p)),{status:'ready',data:p});
  assert.equal((await loadProfessionalSafety(professional({assignments:{startsAt:missing}}))).assignments.status,'ready');
  assert.equal((await loadCompanySafety(company({cases:{resolvedAt:missing}}))).cases.status,'ready');
 }
 assert.deepEqual(await loadWorkPassport(async()=>({ok:false,status:404,json:async()=>({message:'professional_profile_required'})})),{status:'ready',data:null});
 const pro=await loadProfessionalSafety(async()=>response([]));for(const key of ['assignments','cases','appeals'])assert.deepEqual(pro[key],{status:'ready',data:[]});
 const co=await loadCompanySafety(async()=>response([]));for(const key of ['cases','appeals'])assert.deepEqual(co[key],{status:'ready',data:[]});
});
