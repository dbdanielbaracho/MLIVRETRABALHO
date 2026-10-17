import test from 'node:test';
import assert from 'node:assert/strict';
import {loadPrivacyRequests} from '../lib/privacy-requests.ts';
import {exportPrivacyData,deactivatePrivacyAccount} from '../lib/privacy-actions.ts';
import {runForSession} from '../lib/session-context.ts';
const ID='00000000-0000-4000-8000-000000000001',TENANT='00000000-0000-4000-8000-000000000002';
const valid='2024-02-29T12:00:00.000Z';
const invalid=['2026-02-30T12:00:00Z','2025-02-29T12:00:00-03:00','2026-04-31T12:00:00+02:00'];
const compatible=[valid,'1970-01-01T00:00:00.000Z','2026-10-17T23:30:00-03:00'];
const item={id:ID,requestType:'access',status:'completed',createdAt:valid,completedAt:null};
const copy={requestId:ID,generatedAt:valid,identity:{id:ID,email:'privacy-fixture@example.test',createdAt:valid},memberships:[{tenantId:TENANT,role:'professional'}],professionalProfile:null,availability:[],assignments:[],earnings:[],verifications:[],notifications:[],authoredMessages:[],ratingsReceived:[],ratingsAuthored:[],trustEvents:[],safetyReports:[],safetyRelated:[],appeals:[],privacyRequests:[{...item}],notice:{scope:'authenticated identity',redaction:'third-party text omitted',excludes:['session tokens']}};
const response=data=>({ok:true,status:200,json:async()=>data});
for(const field of ['createdAt','completedAt'])for(const value of invalid)test('privacy read rejects impossible '+field+' '+value,async()=>{
 const calls=[];const out=await loadPrivacyRequests(async(...args)=>{calls.push(args);return response([{...item,[field]:value}]);});
 assert.deepEqual(calls,[['/privacy/requests']]);assert.deepEqual(out,{status:'error'});
});
for(const field of ['generatedAt','identity.createdAt','privacyRequests.createdAt'])for(const value of invalid)test('privacy export rejects impossible '+field+' '+value+' after one GET',async()=>{
 const data=structuredClone(copy);if(field==='generatedAt')data.generatedAt=value;else if(field==='identity.createdAt')data.identity.createdAt=value;else data.privacyRequests[0].createdAt=value;
 const calls=[];const out=await exportPrivacyData(async(...args)=>{calls.push(args);return response(data);});
 assert.deepEqual(calls,[['/privacy/export','GET']]);assert.deepEqual(out,{status:'unknown'});assert.equal('data' in out,false);
});
for(const value of invalid)test('privacy deactivation keeps impossible ACK unknown '+value+' without another POST',async()=>{
 const calls=[];const out=await deactivatePrivacyAccount(async(...args)=>{calls.push(args);return response({requestId:ID,deactivated:true,deactivatedAt:value});});
 assert.deepEqual(calls,[['/privacy/deactivate','POST']]);assert.deepEqual(out,{status:'unknown'});
});
test('privacy list preserves leap day, epoch zero, local-offset calendar and optional completion',async()=>{
 for(const date of compatible)for(const completedAt of [null,undefined,date]){const data=[{...item,createdAt:date,completedAt}];assert.deepEqual(await loadPrivacyRequests(async()=>response(data)),{status:'ready',data});}
 assert.deepEqual(await loadPrivacyRequests(async()=>response([])),{status:'ready',data:[]});
});
test('privacy export preserves valid timestamp strings and all existing copy facts without normalization',async()=>{
 for(const date of compatible){const data=structuredClone(copy);data.generatedAt=date;data.identity.createdAt=date;data.privacyRequests[0].createdAt=date;assert.deepEqual(await exportPrivacyData(async()=>response(data)),{status:'generated',data});}
});
test('privacy deactivation preserves compatible instants and existing bodyless request',async()=>{
 for(const deactivatedAt of compatible){const calls=[];assert.deepEqual(await deactivatePrivacyAccount(async(...args)=>{calls.push(args);return response({requestId:ID,deactivated:true,deactivatedAt});}),{status:'deactivated',requestId:ID});assert.deepEqual(calls,[['/privacy/deactivate','POST']]);}
});
test('privacy required timestamp null or missing stays error or unknown, not normalized',async()=>{
 for(const date of [null,undefined]){
  assert.deepEqual(await loadPrivacyRequests(async()=>response([{...item,createdAt:date}])),{status:'error'});
  assert.deepEqual(await exportPrivacyData(async()=>response({...copy,generatedAt:date})),{status:'unknown'});
  assert.deepEqual(await deactivatePrivacyAccount(async()=>response({requestId:ID,deactivated:true,deactivatedAt:date})),{status:'unknown'});
 }
});
test('valid privacy ACK remains stale after identity or deadline change and cannot authorize acceptance',async()=>{
 for(const kind of ['identity','deadline']){let current=true,authorization='Bearer privacy-fixture',calls=0;
  const out=await runForSession(async()=>({Authorization:authorization}),()=>deactivatePrivacyAccount(async()=>{calls++;if(kind==='identity')authorization='Bearer different';else current=false;return response({requestId:ID,deactivated:true,deactivatedAt:valid});}),()=>current,'Bearer privacy-fixture');
  assert.deepEqual(out,{status:'stale'});assert.equal(calls,1);
 }
});
