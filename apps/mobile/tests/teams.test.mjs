import test from 'node:test';
import assert from 'node:assert/strict';
import {loadingTeamBase,loadTeamBase,knownProfessionals,loadMembers,loadAllocation,sameTeamContext,createTeam,changeTeamMember} from '../lib/teams.ts';
const response=(data,ok=true,status=ok?200:500)=>({ok,status,json:async()=>data});
test('team base separates failed sections from verified empty and preserves known professionals from successful sources',async()=>{
 const base=await loadTeamBase(async path=>path==='/company/teams'?response([{id:'t',name:'Equipe',memberCount:0}]):path.endsWith('/assignments')?response([{professionalId:'p',professionalName:'Nome real'}]):path.endsWith('/completed')?response([],false):response([{id:'j',title:'Evento',status:'open'},{id:'closed',title:'Antigo',status:'closed'}]));
 assert.equal(base.teams.status,'ready');assert.equal(base.completed.status,'error');assert.deepEqual(knownProfessionals(base),[{professionalId:'p',professionalName:'Nome real'}]);assert.deepEqual(base.jobs.data.map(j=>j.id),['j']);
 assert.equal(loadingTeamBase().teams.status,'loading');assert.equal((await loadTeamBase(async()=>response([]))).teams.status,'ready');
});
test('invalid counts/members and network rejection stay error instead of pretending no members',async()=>{
 assert.equal((await loadTeamBase(async()=>response([{id:'t',name:'Equipe',memberCount:-1}]))).teams.status,'error');
 assert.equal((await loadMembers(async()=>response([{professionalId:'p',displayName:42}]),'t')).status,'error');
 assert.equal((await loadMembers(async()=>{throw Error('offline')},'t')).status,'error');
 assert.deepEqual(await loadMembers(async()=>response([]),'t'),{status:'ready',data:[]});
});
test('only documented team_empty at HTTP400 makes allocation empty; ranking is real and validated',async()=>{
 assert.deepEqual(await loadAllocation(async()=>response({message:'team_empty'},false,400),'t','j'),{status:'ready',data:[]});
 for(const r of [async()=>response({message:'team_empty'},false,403),async()=>response({message:'team_not_found'},false,400),async()=>response([{professionalId:'p',score:NaN,reasons:[]}])])assert.equal((await loadAllocation(r,'t','j')).status,'error');
 const d=[{professionalId:'p',score:80,reasons:['Disponível']}];assert.deepEqual((await loadAllocation(async()=>response(d),'t','j')).data,d);
});
test('team context retains displayed tenant and identity, rejecting changed or missing tenant',()=>{
 const h={'x-tenant-id':'t',Authorization:'Bearer a'};assert.equal(sameTeamContext({...h},h),true);assert.equal(sameTeamContext({...h,'x-tenant-id':'other'},h),false);assert.equal(sameTeamContext({...h,Authorization:'Bearer b'},h),false);assert.equal(sameTeamContext({},{}),false);
});
test('non-idempotent creation distinguishes verified creation, rejected input and unknown result without automatic retry',async()=>{
 let calls=0;assert.deepEqual(await createTeam(async(path,options)=>{calls++;assert.equal(path,'/company/teams');assert.deepEqual(options,{method:'POST',body:JSON.stringify({name:'Equipe'})});return response({id:'t',name:'Equipe'})},'Equipe'),{status:'created',team:{id:'t',name:'Equipe'}});assert.equal(calls,1);
 assert.deepEqual(await createTeam(async()=>response({},false,400),'Equipe'),{status:'rejected'});
 for(const r of [async()=>{throw Error('timeout')},async()=>response({},false,500),async()=>response({id:'t',name:'different'})])assert.deepEqual(await createTeam(r,'Equipe'),{status:'unknown'});
});
test('member changes use existing add/delete contracts and require a matching acknowledgement',async()=>{
 const calls=[];assert.equal(await changeTeamMember(async(path,options)=>{calls.push([path,options]);return response({teamId:'t',professionalId:'p'})},'t','p',false),true);
 assert.deepEqual(calls,[['/company/teams/t/members',{method:'POST',body:JSON.stringify({professionalId:'p'})}]]);
 assert.equal(await changeTeamMember(async()=>response({removed:true}),'t','p',true),true);
 assert.equal(await changeTeamMember(async()=>response({teamId:'other',professionalId:'p'}),'t','p',false),false);
 assert.equal(await changeTeamMember(async()=>{throw Error('offline')},'t','p',true),false);
});
