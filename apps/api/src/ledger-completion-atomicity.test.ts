import test from 'node:test';
import assert from 'node:assert/strict';
const {scopeFor,requireBinding,failureFunctionSQL,cleanupHook,consumeEarningsJSON}=require('../../../scripts/ledger-completion-atomicity-e2e.cjs');
const input={stamp:'00000000-0000-4000-8000-000000000001',tenantId:'00000000-0000-4000-8000-000000000002',assignmentId:'00000000-0000-4000-8000-000000000003',jobId:'00000000-0000-4000-8000-000000000004',professionalId:'00000000-0000-4000-8000-000000000005',identityId:'00000000-0000-4000-8000-000000000006',amountCents:23456};
const row={id:input.assignmentId,tenant_id:input.tenantId,job_id:input.jobId,professional_id:input.professionalId,identity_id:input.identityId,job_tenant_id:input.tenantId,job_title:'Ledger rollback a '+input.stamp,pay_cents:23456,status:'checked_out',completed_at:null,checked_in_at:new Date('2026-10-17T12:00:00Z'),checked_out_at:new Date('2026-10-17T20:00:00Z')};
test('ledger fixture scope uses bounded UUID-owned names and exact non-production fixture amount',()=>{
 const s=scopeFor(input);for(const key of ['sequence','fn','trigger']){assert.match(s[key],/^ledger_atomicity_[a-f0-9]{32}_(seq|fn|trg)$/);assert.ok(s[key].length<63);}
 for(const key of ['stamp','tenantId','assignmentId','jobId','professionalId','identityId'])for(const invalid of [undefined,'foreign',input.stamp+"';--"])assert.throws(()=>scopeFor({...input,[key]:invalid}));
 for(const amountCents of [0,23457,'23456',null,NaN,Infinity])assert.throws(()=>scopeFor({...input,amountCents}));
});
test('ledger hook requires exact HTTP PG tenant assignment profile identity job and lifecycle binding',()=>{
 const scope=scopeFor(input);assert.doesNotThrow(()=>requireBinding(scope,row,[]));
 for(const key of ['id','tenant_id','job_id','professional_id','identity_id','job_tenant_id','job_title','pay_cents','status'])assert.throws(()=>requireBinding(scope,{...row,[key]:'foreign'},[]));
 assert.throws(()=>requireBinding(scope,{...row,completed_at:new Date()},[]));
 for(const key of ['checked_in_at','checked_out_at'])assert.throws(()=>requireBinding(scope,{...row,[key]:'2026-10-17T12:00:00Z'},[]));
 assert.throws(()=>requireBinding(scope,row,[{assignment_id:input.assignmentId}]));
});
test('ledger witness SQL observes completed assignment and exact payable row before sequence and forced error',()=>{
 const scope=scopeFor(input),sql=failureFunctionSQL(scope);
 for(const value of [input.tenantId,input.assignmentId,input.professionalId,input.jobId])assert.ok(sql.includes(value));
 for(const text of ['public.work_assignments','public.earnings_ledger',"status='completed'",'completed_at IS NOT NULL',"status='payable'",'amount_cents=23456','completed_rows<>1 OR ledger_rows<>1','SECURITY DEFINER SET search_path=pg_catalog,public'])assert.ok(sql.includes(text));
 assert.ok(sql.indexOf('completed_rows<>1')<sql.indexOf('pg_catalog.nextval'));assert.ok(sql.indexOf('pg_catalog.nextval')<sql.indexOf("RAISE EXCEPTION 'fixture_ledger_insert_failure'"));
 assert.doesNotMatch(sql,/CREATE OR REPLACE|GRANT|CASCADE|BYPASSRLS|DISABLE ROW LEVEL/i);
 for(const key of ['sequence','fn','trigger'])assert.throws(()=>failureFunctionSQL({...scope,[key]:'foreign'}));
});
test('ledger cleanup refuses forged identifiers and never drops pre-existing unowned objects',async()=>{
 const scope=scopeFor(input),calls:string[]=[],db={query:async(sql:string)=>{calls.push(sql);}};
 await cleanupHook(db,scope,{sequence:false,fn:false,trigger:false});assert.deepEqual(calls,[]);
 for(const key of ['sequence','fn','trigger'])await assert.rejects(cleanupHook(db,{...scope,[key]:'foreign_object'},{sequence:true,fn:true,trigger:true}));
 assert.deepEqual(calls,[]);
});
test('ledger cleanup drops only owned hook in dependency order and clears successful flags',async()=>{
 const scope=scopeFor(input),calls:string[]=[],owned={sequence:true,fn:true,trigger:true};
 await cleanupHook({query:async(sql:string)=>{calls.push(sql);}},scope,owned);
 assert.deepEqual(calls,['DROP TRIGGER '+scope.trigger+' ON public.earnings_ledger','DROP FUNCTION public.'+scope.fn+'()','DROP SEQUENCE public.'+scope.sequence]);
 assert.deepEqual(owned,{sequence:false,fn:false,trigger:false});
});
test('ledger partial cleanup drains remaining owned objects but keeps failure sticky',async()=>{
 const scope=scopeFor(input),calls:string[]=[],owned={sequence:true,fn:true,trigger:true};
 await assert.rejects(cleanupHook({query:async(sql:string)=>{calls.push(sql);if(sql.startsWith('DROP TRIGGER'))throw Error('fixture');}},scope,owned),/Owned ledger hook cleanup failed/);
 assert.equal(calls.length,3);assert.deepEqual(owned,{sequence:false,fn:false,trigger:true});
});

const expectation={tenantId:input.tenantId,assignmentId:input.assignmentId,ledgerId:'00000000-0000-4000-8000-000000000007',amountCents:23456};
const earning={id:expectation.ledgerId,tenantId:input.tenantId,assignmentId:input.assignmentId,title:'Ledger rollback a '+input.stamp,amountCents:23456,status:'payable',createdAt:'2026-10-18T00:00:00.000Z'};
test('ledger mobile consumer preserves real loader verified empty JSON without a transport request',async()=>{
 const data:any[]=[];const result=await consumeEarningsJSON(data,null);assert.equal(result.status,'ready');assert.equal(result.data,data);assert.deepEqual(data,[]);
});
test('ledger mobile consumer preserves exact positive tenant assignment ledger and amount JSON',async()=>{
 const data=[{...earning}];const result=await consumeEarningsJSON(data,expectation);assert.equal(result.status,'ready');assert.equal(result.data,data);assert.deepEqual(data,[earning]);
});
test('ledger mobile consumer refuses wrong tenant assignment ledger amount status and forged expectations',async()=>{
 for(const [key,value]of [['tenantId',input.jobId],['assignmentId',input.jobId],['id',input.jobId],['amountCents',34567],['status','paid']])await assert.rejects(consumeEarningsJSON([{...earning,[key]:value}],expectation));
 for(const key of ['tenantId','assignmentId','ledgerId'])await assert.rejects(consumeEarningsJSON([earning],{...expectation,[key]:'forged'}));
 await assert.rejects(consumeEarningsJSON([earning],{...expectation,amountCents:34567}));
 await assert.rejects(consumeEarningsJSON([earning],undefined));
 await assert.rejects(consumeEarningsJSON([],expectation));await assert.rejects(consumeEarningsJSON([earning],null));
});
test('ledger mobile consumer cannot turn incompatible schema or date into verified empty or positive',async()=>{
 for(const data of [null,{},[null],[{...earning,createdAt:'2026-02-30T12:00:00Z'}],[{...earning,amountCents:1.5}],[{...earning,title:null}]])for(const expected of [null,expectation])await assert.rejects(consumeEarningsJSON(data,expected));
});
