import test from 'node:test';
import assert from 'node:assert/strict';
import {preferencesDraft,readPreferences,confirmsPreferences,writePreferences} from '../lib/preferences.ts';
const input={preferredRoleIds:['hospitality.waiter'],preferredCities:['São Paulo'],expectedRevision:2};
const saved={configured:true,preferredRoleIds:input.preferredRoleIds,preferredCities:input.preferredCities,revision:3,updatedAt:'2026-10-25T12:30:00.000Z'};
test('actual preference parser distinguishes missing configuration, saved empty, and malformed acknowledgements',()=>{
 assert.ok(readPreferences({configured:false,preferredRoleIds:[],preferredCities:[],revision:0,updatedAt:null}));
 assert.ok(readPreferences({...saved,preferredRoleIds:[],preferredCities:[]}));
 for(const x of [null,[],{}, {...saved,configured:false},{...saved,revision:'3'},{...saved,revision:0},{...saved,updatedAt:'2026-02-30T12:30:00Z'},{...saved,preferredCities:['  São Paulo']},{...saved,preferredRoleIds:['role','role']}])assert.equal(readPreferences(x),null);
});
test('draft preserves accents and validates limits instead of inferring geographic equivalents',()=>{
 assert.deepEqual(preferencesDraft(['hospitality.waiter','hospitality.waiter'],[' Sa\u0303o   Paulo ','SÃO PAULO','Sao Paulo'],2),{...input,preferredCities:['São Paulo','Sao Paulo']});
 assert.equal(preferencesDraft([],['City\u200b'],0),null);assert.equal(preferencesDraft([],Array(11).fill('City'),0),null);assert.equal(preferencesDraft([],['😀'.repeat(101)],0),null);
});
test('success requires exact content, expected next revision, valid timestamp, current session and HTTP200',async()=>{
 assert.ok(confirmsPreferences(saved,input));let calls=0;
 const run=(data,ok=true,status=200,current=()=>true)=>writePreferences(async()=>{calls++;return {ok,status,json:async()=>data};},input,current);
 assert.equal((await run(saved)).status,'saved');
 for(const data of [{...saved,preferredCities:[]},{...saved,revision:2},{...saved,revision:4},{...saved,updatedAt:null},null])assert.equal((await run(data)).status,'unknown');
 assert.equal((await run(saved,true,201)).status,'unknown');const before=calls;assert.equal((await run(saved,true,200,()=>false)).status,'unknown');assert.equal(calls,before);
 let current=true;assert.equal((await writePreferences(async()=>({ok:true,status:200,json:async()=>{current=false;return saved;}}),input,()=>current)).status,'unknown');
});
test('conflict, rejection, session expiry and lost response never retry a write',async()=>{
 for(const [status,expected] of [[409,'conflict'],[400,'rejected'],[401,'session'],[500,'unknown']]){let n=0;assert.equal((await writePreferences(async()=>{n++;return{ok:false,status,json:async()=>({})};},input,()=>true)).status,expected);assert.equal(n,1);}
 let n=0;assert.equal((await writePreferences(async()=>{n++;throw Error('response_lost');},input,()=>true)).status,'unknown');assert.equal(n,1);
 assert.equal(confirmsPreferences({...saved,preferredCities:['Other']},input),false);assert.equal(confirmsPreferences(saved,input),true);
});
