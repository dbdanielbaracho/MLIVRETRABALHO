import {test} from 'node:test';
import assert from 'node:assert/strict';
import {BadRequestException,NotFoundException,UnauthorizedException} from '@nestjs/common';
import {JobsController} from './jobs.controller';
import type {AuthService} from './auth.service';
import type {DatabaseService} from './database.service';
const JOB='aaaaaaaa-1111-2222-3333-444444444444',PRO='bbbbbbbb-1111-2222-3333-444444444444';
function setup(options:{auth?:boolean;profile?:boolean;job?:boolean;interest?:boolean;status?:string;error?:Error;failSqlPrefix?:string;sqlFailure?:Error}={}){
 const calls:{sql:string;params:unknown[]}[]=[],identityCalls:string[]=[];
 const row={jobId:JOB,professionalId:PRO,status:options.status??'interested'};
 const auth={identityFromAuthorization:async()=>{identityCalls.push('auth');if(options.auth===false)throw new UnauthorizedException();return{id:'trusted-identity'};}};
 const db={query:async(sql:string,params:unknown[]=[])=>{calls.push({sql,params});if(options.error)throw options.error;if(options.failSqlPrefix&&sql.startsWith(options.failSqlPrefix)){if(!options.sqlFailure)throw new Error('fixture_sql_failure_required');throw options.sqlFailure;}if(sql.startsWith('SELECT id FROM professional_profiles'))return{rows:options.profile===false?[]:[{id:PRO}]};if(sql.startsWith('SELECT job_id FROM marketplace_jobs'))return{rows:options.job===false?[]:[{job_id:JOB}]};if(sql.startsWith('SELECT mi.job_id'))return{rows:options.interest===false?[]:[row]};if(sql.startsWith('INSERT'))return{rows:[row]};return{rows:[]};}};
 return{controller:new JobsController(db as unknown as DatabaseService,auth as unknown as AuthService),calls,identityCalls,row};
}
const bad=(e:unknown)=>e instanceof BadRequestException&&e.message==='job_invalid';
test('marketplace interest write rejects malformed job UUID after trusted profile lookup without writing',async()=>{
 for(const id of ['invalid','',null,false,[JOB]]){const h=setup();await assert.rejects(h.controller.expressInterest(id as never,'Bearer fixture'),bad);assert.equal(h.calls.length,1);assert.deepEqual(h.calls[0]?.params,['trusted-identity']);assert.equal(h.calls.some(x=>x.sql.startsWith('INSERT')),false);}
});
test('marketplace interest read rejects malformed UUID after auth before SQL',async()=>{
 for(const id of ['invalid','',null,false,[JOB]]){const h=setup();await assert.rejects(h.controller.getInterest(id as never,'Bearer fixture'),bad);assert.equal(h.calls.length,0);}
});
test('marketplace malformed job UUID cannot bypass auth and preserves required professional profile priority',async()=>{
 for(const method of ['expressInterest','getInterest'] as const){const h=setup({auth:false});await assert.rejects(h.controller[method]('invalid'),(e:unknown)=>e instanceof UnauthorizedException);assert.equal(h.calls.length,0);}
 const h=setup({profile:false});await assert.rejects(h.controller.expressInterest('invalid','Bearer fixture'),(e:unknown)=>e instanceof NotFoundException&&e.message==='professional_profile_required');assert.equal(h.calls.length,1);
});
test('marketplace valid interest retains real owner ACK confirmed status guard scoped read and absence semantics',async()=>{
 for(const status of ['interested','confirmed']){const h=setup({status});assert.deepEqual(await h.controller.expressInterest(JOB,'Bearer fixture'),h.row);assert.deepEqual(h.calls.map(x=>x.params),[['trusted-identity'],[JOB,'open'],[JOB,PRO,'interested','confirmed']]);assert.deepEqual(await h.controller.getInterest(JOB,'Bearer fixture'),h.row);assert.deepEqual(h.calls[3]?.params,[JOB,'trusted-identity']);}
 const absent=setup({interest:false});assert.equal(await absent.controller.getInterest(JOB,'Bearer fixture'),null);
 const missing=setup({job:false});await assert.rejects(missing.controller.expressInterest(JOB,'Bearer fixture'),(e:unknown)=>e instanceof NotFoundException&&e.message==='job_not_found');assert.equal(missing.calls.some(x=>x.sql.startsWith('INSERT')),false);
});
test('marketplace database failure rejects without fake interest ACK and valid list remains authenticated',async()=>{
 const error=new Error('database unavailable');for(const method of ['expressInterest','getInterest'] as const){const h=setup({error});await assert.rejects(h.controller[method](JOB,'Bearer fixture'),e=>e===error);}
 const h=setup();assert.deepEqual(await h.controller.list('Bearer fixture'),[]);assert.deepEqual(h.calls[0]?.params,['open']);assert.deepEqual(h.identityCalls,['auth']);
});

const interestFailureBoundaries=[
 {prefix:'SELECT job_id FROM marketplace_jobs',count:2,label:'open job lookup'},
 {prefix:'INSERT INTO marketplace_interests',count:3,label:'interest insert'},
] as const;
for(const {prefix,count,label}of interestFailureBoundaries)test('marketplace interest propagates '+label+' error without ACK retry or later SQL',async()=>{
 const error=new Error('explicit interest query failure'),h=setup({failSqlPrefix:prefix,sqlFailure:error});let result:unknown;
 await assert.rejects(async()=>{result=await h.controller.expressInterest(JOB,'Bearer fixture');},e=>e===error);
 assert.equal(result,undefined);assert.deepEqual(h.identityCalls,['auth']);assert.equal(h.calls.length,count);
 assert.equal(h.calls.filter(c=>c.sql.startsWith(prefix)).length,1);assert.ok(h.calls.at(-1)?.sql.startsWith(prefix));
 assert.deepEqual(h.calls.map(c=>c.params),count===2?[['trusted-identity'],[JOB,'open']]:[['trusted-identity'],[JOB,'open'],[JOB,PRO,'interested','confirmed']]);
 assert.equal(h.calls.some(c=>/^(UPDATE|DELETE)\b/.test(c.sql)),false);
});
