import test from 'node:test';
import assert from 'node:assert/strict';
import {readSettledSection,failedSectionCount} from './independent-reads.ts';

test('one rejected dashboard endpoint does not erase unrelated fulfilled data',async()=>{
 const settled=await Promise.allSettled([Promise.resolve({openJobs:4}),Promise.reject(new Error('analytics unavailable')),Promise.resolve([{id:'job-1'}])]);
 assert.deepEqual(readSettledSection(settled,0,null),{openJobs:4});
 assert.equal(readSettledSection(settled,1,null),null);
 assert.deepEqual(readSettledSection(settled,2,[]),[{id:'job-1'}]);
 assert.equal(failedSectionCount(settled),1);
});
test('all failures retain explicit empty fallback and count failures',async()=>{
 const settled=await Promise.allSettled([Promise.reject(new Error('403')),Promise.reject(new Error('timeout'))]);
 assert.deepEqual(readSettledSection(settled,0,[]),[]);
 assert.equal(readSettledSection(settled,1,null),null);
 assert.equal(readSettledSection(settled,3,null),null);
 assert.equal(failedSectionCount(settled),2);
});

test('candidate results remain available when recommendations fail',async()=>{
 const results=await Promise.allSettled([Promise.resolve([{professionalId:'p-1'}]),Promise.reject(new Error('recommendations offline'))]);
 assert.deepEqual(readSettledSection(results,0,[]),[{professionalId:'p-1'}]);
 assert.deepEqual(readSettledSection(results,1,[]),[]);
 assert.equal(failedSectionCount(results),1);
});
test('recommendations remain available when candidates fail',async()=>{
 const results=await Promise.allSettled([Promise.reject(new Error('candidates offline')),Promise.resolve([{professionalId:'p-1',score:80}])]);
 assert.deepEqual(readSettledSection(results,0,[]),[]);
 assert.deepEqual(readSettledSection(results,1,[]),[{professionalId:'p-1',score:80}]);
 assert.equal(failedSectionCount(results),1);
});
