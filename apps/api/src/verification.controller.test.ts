import test from 'node:test';
import assert from 'node:assert/strict';
import { VerificationController } from './verification.controller';
import type { DatabaseService } from './database.service';
import type { AuthService } from './auth.service';

const TENANT='11111111-1111-4111-8111-111111111111';
const IDENTITY='22222222-2222-4222-8222-222222222222';

function setup(){
  const cases:Array<Record<string,unknown>>=[];
  let reads=0;
  let releaseReads!:()=>void;
  const bothReads=new Promise<void>(resolve=>{releaseReads=resolve;});
  const auth={
    identityFromAuthorization:async()=>({id:IDENTITY,email:'owner@example.test'}),
    requireMembership:async()=>({role:'owner'})
  };
  const db={
    tenant:async(_tenant:string,operation:(client:any)=>Promise<unknown>)=>
      operation({query:async(sql:string,params:unknown[]=[])=>{
        if(sql.startsWith('SELECT id,subject_type')){
          reads+=1;
          if(reads===2)releaseReads();
          await bothReads;
          return {rows:[]};
        }
        if(sql.startsWith('INSERT INTO verification_cases')){
          const existing=cases[0];
          if(existing){
            if(sql.includes('ON CONFLICT'))return {rows:[existing]};
            throw Object.assign(new Error('duplicate key value violates unique constraint'),{code:'23505'});
          }
          const row={
            id:'33333333-3333-4333-8333-333333333333',
            subjectType:params[1],
            status:'pending',
            provider:null,
            reasonCode:null,
            createdAt:'2026-10-13T00:00:00.000Z',
            updatedAt:'2026-10-13T00:00:00.000Z',
            verifiedAt:null
          };
          cases.push(row);
          return {rows:[row]};
        }
        return {rows:[]};
      }});
  };
  return {controller:new VerificationController(db as unknown as DatabaseService,auth as unknown as AuthService),cases};
}

test('concurrent verification requests return the same pending case for identity and business',async()=>{
  for(const subject of ['identity','business'] as const){
    const {controller,cases}=setup();
    const call=()=>subject==='identity'
      ?controller.requestMine('Bearer fixture',TENANT)
      :controller.requestBusiness('Bearer fixture',TENANT);
    const results=await Promise.allSettled([call(),call()]);
    assert.deepEqual(results.map(result=>result.status),['fulfilled','fulfilled'],subject+' requests must both acknowledge the pending case');
    const values=results.map(result=>result.status==='fulfilled'?result.value:null);
    assert.equal(cases.length,1,subject+' must retain one case');
    assert.equal((values[0] as {id:string}).id,(values[1] as {id:string}).id);
    assert.equal((values[0] as {status:string}).status,'pending');
  }
});
