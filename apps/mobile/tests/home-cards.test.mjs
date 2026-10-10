import test from 'node:test';
import assert from 'node:assert/strict';
import {loadProfessionalHome} from '../lib/professional-home.ts';
import {loadHomeCards} from '../lib/home-cards.ts';
test('canonical home cards use existing identity APIs without invented metrics',async()=>{
 const calls=[],job={id:'real',title:'Real work',location:null,workCity:'Real city',payCents:18000,startsAt:null,endsAt:null};
 const passport={completedWorkCount:8,ratingCount:4,averageRating:4.5};
 const result=await loadHomeCards(async path=>{calls.push(path);return {ok:true,json:async()=>path==='/jobs'?[job]:passport};});
 assert.deepEqual(calls,['/jobs','/work-passport/mine']);
 assert.deepEqual(result,{opportunities:{status:'ready',data:[job]},passport:{status:'ready',data:passport}});
});
test('successful empty opportunities and documented missing profile stay distinct from failures',async()=>{
 const result=await loadHomeCards(async path=>path==='/jobs'?{ok:true,json:async()=>[]}:{ok:false,status:404,json:async()=>({message:'professional_profile_required'})});
 assert.deepEqual(result,{opportunities:{status:'ready',data:[]},passport:{status:'ready',data:null}});
});
test('failed/malformed card sections do not become empty jobs or zero reputation',async()=>{
 const result=await loadHomeCards(async path=>path==='/jobs'?{ok:true,json:async()=>[null]}:{ok:true,json:async()=>({completedWorkCount:4,ratingCount:3,averageRating:null})});
 assert.deepEqual(result,{opportunities:{status:'error'},passport:{status:'error'}});
 const failure=await loadHomeCards(async()=>{throw Error('offline');});assert.deepEqual(failure,result);
});
test('partial success preserves opportunities while Passport fails, and retry recovers real values',async()=>{
 const job={id:'real',title:'Real work'};
 const partial=await loadHomeCards(async path=>path==='/jobs'?{ok:true,json:async()=>[job]}:{ok:false,status:403,json:async()=>({message:'forbidden'})});
 assert.deepEqual(partial.opportunities,{status:'ready',data:[job]});assert.equal(partial.passport.status,'error');
 const retry=await loadHomeCards(async path=>({ok:true,json:async()=>path==='/jobs'?[job]:{completedWorkCount:0,ratingCount:0,averageRating:null}}));
 assert.deepEqual(retry.passport,{status:'ready',data:{completedWorkCount:0,ratingCount:0,averageRating:null}});
});

test('next-work pay is an actual validated API field; missing value stays missing',async()=>{
 const item={id:'real-work',title:'Real work',status:'confirmed',payCents:28000};
 const request=items=>async path=>({ok:true,json:async()=>path==='/professional-profile'?null:path==='/assignments/mine'?items:[]});
 const real=await loadProfessionalHome(request([item]));assert.equal(real.assignments.data[0].payCents,28000);
 const missing=await loadProfessionalHome(request([{id:'missing',title:'Work',status:'confirmed'}]));assert.equal(missing.assignments.data[0].payCents,undefined);
 const invalid=await loadProfessionalHome(request([{...item,payCents:'280'}]));assert.equal(invalid.assignments.status,'error');
});
