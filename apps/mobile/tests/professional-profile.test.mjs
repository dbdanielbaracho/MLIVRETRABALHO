import test from 'node:test';
import assert from 'node:assert/strict';
import {loadProfessionalProfile,loadWorkPassport} from '../lib/professional-profile.ts';
const response=(data,status=200)=>async()=>({ok:status>=200&&status<300,status,json:async()=>data});
test('profile absence is a successful state, distinct from failure or invalid data',async()=>{
 assert.deepEqual(await loadProfessionalProfile(response(null)),{status:'ready',data:null});
 const real={id:'profile',displayName:'Real name',homeCity:null,primaryRole:'Real role'};
 assert.deepEqual(await loadProfessionalProfile(response(real)),{status:'ready',data:real});
 for(const request of [response(null,401),response({error:'failure'},500),response([]),response({displayName:23}),response({displayName:'Name',homeCity:42}),async()=>{throw Error('offline');},async()=>({ok:true,json:async()=>{throw Error('bad JSON');}})])assert.deepEqual(await loadProfessionalProfile(request),{status:'error'});
});
test('only the documented missing-profile response makes Passport empty',async()=>{
 assert.deepEqual(await loadWorkPassport(response({message:'professional_profile_required'},404)),{status:'ready',data:null});
 for(const request of [response({message:'unrelated'},404),response({message:'professional_profile_required'},401),response(null),async()=>{throw Error('offline');}])assert.deepEqual(await loadWorkPassport(request),{status:'error'});
});
test('verified zero work and no ratings are preserved only after a successful response',async()=>{
 const data={displayName:'New person',completedWorkCount:0,averageRating:null,ratingCount:0};
 assert.deepEqual(await loadWorkPassport(response(data)),{status:'ready',data});
 assert.deepEqual(await loadWorkPassport(response(data,503)),{status:'error'});
});
test('Passport retains actual counts/rating and rejects malformed or inconsistent statistics',async()=>{
 const data={displayName:'Experienced',completedWorkCount:6,averageRating:4.25,ratingCount:4};
 assert.deepEqual(await loadWorkPassport(response(data)),{status:'ready',data});
 for(const patch of [{completedWorkCount:-1},{completedWorkCount:1.5},{ratingCount:-1},{ratingCount:'4'},{ratingCount:0},{averageRating:null},{averageRating:NaN},{averageRating:6},{averageRating:0},{displayName:null}])assert.deepEqual(await loadWorkPassport(response({...data,...patch})),{status:'error'});
});
test('retry recovers server data after profile/Passport failures',async()=>{
 assert.equal((await loadProfessionalProfile(response({},500))).status,'error');
 assert.deepEqual(await loadProfessionalProfile(response({id:'profile',displayName:'Recovered'})),{status:'ready',data:{id:'profile',displayName:'Recovered'}});
 const p={displayName:'Recovered',completedWorkCount:2,averageRating:5,ratingCount:1};
 assert.equal((await loadWorkPassport(response(p,500))).status,'error');
 assert.deepEqual(await loadWorkPassport(response(p)),{status:'ready',data:p});
});

test('profile and Passport responses decoded after deadline never become ready, including missing profile',async()=>{
 for(const [load,data,status] of [[loadProfessionalProfile,{id:'p',displayName:'Fixture'},200],[loadProfessionalProfile,null,200],[loadWorkPassport,{displayName:'Fixture',completedWorkCount:0,averageRating:null,ratingCount:0},200],[loadWorkPassport,{message:'professional_profile_required'},404]]){
  const controller=new AbortController();let resolve;const pending=new Promise(r=>{resolve=r});
  const result=load(async()=>({ok:status===200,status,json:()=>pending}),()=>!controller.signal.aborted);
  await Promise.resolve();controller.abort();resolve(data);assert.deepEqual(await result,{status:'error'});
 }
});
test('profile and Passport requests do not start after their context expires',async()=>{
 for(const load of [loadProfessionalProfile,loadWorkPassport]){
  let calls=0;assert.deepEqual(await load(async()=>{calls++;return {ok:true,json:async()=>null}},()=>false),{status:'error'});assert.equal(calls,0);
 }
});

test('Passport rejects blank displayed identity and malformed verified history instead of presenting real-looking experience',async()=>{
 const p={displayName:'Fixture',completedWorkCount:1,averageRating:null,ratingCount:0},work={id:'work',tenantId:'company',title:'Actual fixture',completedAt:'2026-10-10T12:00:00Z',location:null};
 for(const patch of [{displayName:''},{displayName:' '},{verifiedHistory:null},{verifiedHistory:{}},{verifiedHistory:[null]},{verifiedHistory:[{...work,id:''}]},{verifiedHistory:[{...work,tenantId:' '}]},{verifiedHistory:[{...work,title:''}]},{verifiedHistory:[{...work,completedAt:'bad-date'}]},{verifiedHistory:[{...work,location:42}]}])assert.deepEqual(await loadWorkPassport(response({...p,...patch})),{status:'error'});
});
test('Passport preserves real multi-company history, optional dates/null and opaque identifiers without normalization',async()=>{
 const data={displayName:'Fixture',completedWorkCount:2,averageRating:4.5,ratingCount:2,verifiedHistory:[{id:'opaque:1',tenantId:'a',title:'A',completedAt:'2026-10-10T18:00:00-03:00',location:'Local A'},{id:'opaque:1',tenantId:'b',title:'B',completedAt:null,location:null}]};
 assert.deepEqual(await loadWorkPassport(response(data)),{status:'ready',data});
 assert.deepEqual(await loadWorkPassport(response({...data,verifiedHistory:[]})),{status:'ready',data:{...data,verifiedHistory:[]}});
});
