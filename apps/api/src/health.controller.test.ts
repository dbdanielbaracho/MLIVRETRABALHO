import test from 'node:test';
import assert from 'node:assert/strict';
import { ServiceUnavailableException } from '@nestjs/common';
import { HealthController } from './health.controller';

test('readiness reports database ok when query succeeds',async()=>{
  const controller=new HealthController({query:async()=>({rows:[{ok:1}]})} as any);
  const result=await controller.ready();
  assert.equal(result.status,'ok');
  assert.equal(result.database,'ok');
});

test('readiness fails when database query fails',async()=>{
  const controller=new HealthController({query:async()=>{throw new Error('db down');}} as any);
  await assert.rejects(()=>controller.ready(),ServiceUnavailableException);
});
