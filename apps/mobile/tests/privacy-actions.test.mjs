import test from 'node:test';
import assert from 'node:assert/strict';
import {createPrivacyRequest,exportPrivacyData,deactivatePrivacyAccount,samePrivacySession} from '../lib/privacy-actions.ts';
const response=(data,ok=true,status=ok?200:500)=>({ok,status,json:async()=>data});
const copy={requestId:'access',generatedAt:'2026-10-10T00:00:00Z',identity:{id:'identity',email:'test@example.test',createdAt:'2026-10-01T00:00:00Z'},memberships:[{tenantId:'t',role:'professional'}],professionalProfile:null,availability:[],assignments:[],earnings:[],verifications:[],notifications:[],authoredMessages:[],ratingsReceived:[],ratingsAuthored:[],trustEvents:[],safetyReports:[],safetyRelated:[],appeals:[],privacyRequests:[],notice:{scope:'authenticated identity',redaction:'third-party text omitted',excludes:['session tokens']}};
test('manual privacy request uses existing contract and requires matching submitted acknowledgement',async()=>{
 const calls=[];assert.deepEqual(await createPrivacyRequest(async(...args)=>{calls.push(args);return response({requestId:'r',requestType:'correction',status:'submitted'})},'correction','  Corrigir cidade  '),{status:'created',requestId:'r'});
 assert.deepEqual(calls,[['/privacy/requests','POST',{requestType:'correction',details:'Corrigir cidade'}]]);
 assert.deepEqual(await createPrivacyRequest(async()=>response({requestId:'r',requestType:'erasure',status:'submitted'}),'correction','cidade'),{status:'unknown'});
});
test('required details and the 2000 character limit prevent invalid requests before any call',async()=>{
 let count=0;const request=async()=>{count++;return response({})};assert.deepEqual(await createPrivacyRequest(request,'correction',' '),{status:'invalid',reason:'required'});assert.deepEqual(await createPrivacyRequest(request,'erasure','x'.repeat(2001)),{status:'invalid',reason:'too_long'});assert.equal(count,0);
});
test('privacy creation rejection differs from lost response or malformed acknowledgement and never retries',async()=>{
 assert.deepEqual(await createPrivacyRequest(async()=>response({message:'privacy_request_details_required'},false,400),'correction','cidade'),{status:'rejected',message:'privacy_request_details_required'});
 let calls=0;assert.deepEqual(await createPrivacyRequest(async()=>{calls++;throw Error('timeout')},'correction','cidade'),{status:'unknown'});assert.equal(calls,1);
 assert.deepEqual(await createPrivacyRequest(async()=>response({requestId:undefined}),'erasure',''),{status:'unknown'});
});
test('privacy actions require the authenticated session that provided the displayed requests',()=>{
 const h={Authorization:'Bearer a'};assert.equal(samePrivacySession({...h},h),true);assert.equal(samePrivacySession({Authorization:'Bearer b'},h),false);assert.equal(samePrivacySession({},{}),false);
});
test('explicit export uses one GET that creates an access DSAR and preserves the actual structured copy',async()=>{
 const calls=[];assert.deepEqual(await exportPrivacyData(async(...args)=>{calls.push(args);return response(copy)}),{status:'generated',data:copy});assert.deepEqual(calls,[['/privacy/export','GET']]);
});
test('malformed or lost export does not produce a copy or automatically repeat the access DSAR',async()=>{
 for(const data of [{...copy,requestId:''},{...copy,identity:null},{...copy,assignments:[{id:'a'}]},{...copy,assignments:[{id:'a',tenantId:'another-company'}]},{...copy,notice:null},{...copy,generatedAt:'invalid'}])assert.deepEqual(await exportPrivacyData(async()=>response(data)),{status:'unknown'});
 let count=0;assert.deepEqual(await exportPrivacyData(async()=>{count++;throw Error('offline')}),{status:'unknown'});assert.equal(count,1);
});
test('bodyless deactivation needs verified acknowledgement; existing human/backend rejection reasons survive',async()=>{
 const calls=[];assert.deepEqual(await deactivatePrivacyAccount(async(...args)=>{calls.push(args);return response({requestId:'d',deactivated:true,deactivatedAt:'2026-10-10T00:00:00Z'})}),{status:'deactivated',requestId:'d'});assert.deepEqual(calls,[['/privacy/deactivate','POST']]);
 for(const message of ['account_deactivation_active_assignment','account_deactivation_unsettled_earnings','account_deactivation_sole_tenant_owner'])assert.deepEqual(await deactivatePrivacyAccount(async()=>response({message},false,400)),{status:'rejected',message});
 assert.deepEqual(await deactivatePrivacyAccount(async()=>response({requestId:'d',deactivated:false})),{status:'unknown'});
});
test('deactivation timeout and invalid JSON remain unknown without an automatic second POST',async()=>{
 let count=0;assert.deepEqual(await deactivatePrivacyAccount(async()=>{count++;throw Error('timeout')}),{status:'unknown'});assert.equal(count,1);
 assert.deepEqual(await deactivatePrivacyAccount(async()=>({ok:true,status:200,json:async()=>{throw Error('JSON')}})),{status:'unknown'});
});
