import test from 'node:test';import assert from 'node:assert/strict';import { scoreMatch } from './matching';
test('unavailable professional is not matched',()=>assert.equal(scoreMatch({availability:false,roleFit:1,reliability:1,distanceKm:1}).score,0));
test('strong fit is scored and explained',()=>{const r=scoreMatch({availability:true,roleFit:.9,reliability:.9,distanceKm:5});assert.ok(r.score>=80);assert.ok(r.reasons.length>=2);});
