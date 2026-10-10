import test from 'node:test';
import assert from 'node:assert/strict';
import {passportHistory,completionDate} from '../lib/passport-history.ts';
const summary={displayName:'Fixture',completedWorkCount:8,averageRating:null,ratingCount:0};
test('experience distinguishes loading, failure, missing profile, missing detail and actual empty history',()=>{
 for(const status of ['loading','error'])assert.deepEqual(passportHistory({status}),{status});
 assert.deepEqual(passportHistory({status:'ready',data:null}),{status:'missing'});
 assert.deepEqual(passportHistory({status:'ready',data:summary}),{status:'unavailable'});
 assert.deepEqual(passportHistory({status:'ready',data:{...summary,verifiedHistory:[]}}),{status:'empty'});
});
test('experience displays only actual supplied verified work in server order without expanding summary count into invented entries',()=>{
 const data=[{id:'w',tenantId:'b',title:'B',completedAt:'2026-10-10T12:00:00Z'},{id:'w',tenantId:'a',title:'A',completedAt:null}];
 assert.deepEqual(passportHistory({status:'ready',data:{...summary,verifiedHistory:data}}),{status:'ready',data});
 assert.equal(data.length,2);assert.equal(summary.completedWorkCount,8);
});
test('experience completion date uses the real local date and explicitly identifies absent timestamps',()=>{
 const value='2026-10-11T01:30:00Z';
 assert.equal(completionDate(value),'Concluído em '+new Date(value).toLocaleDateString('pt-BR'));
 for(const value of [null,undefined,'','bad-date'])assert.equal(completionDate(value),'Data de conclusão não informada');
});
