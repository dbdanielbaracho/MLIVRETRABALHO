import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('candidate selection ignores aborted read rejection after timeout or replacement',()=>{
 const source=fs.readFileSync(new URL('../app/candidatos.tsx',import.meta.url),'utf8');
 const start=source.indexOf('async function selectJob(');
 const end=source.indexOf('async function confirm(',start);
 assert.ok(start>=0&&end>start);
 const handler=source.slice(start,end);
 assert.match(handler,/setTimeout\(\(\)=>\{controller\.abort\(\)/);
 assert.match(handler,/catch\{if\(!controller\.signal\.aborted&&version===generation\.current&&selectedVersion===selection\.current\.version\)setData\(/);
});
