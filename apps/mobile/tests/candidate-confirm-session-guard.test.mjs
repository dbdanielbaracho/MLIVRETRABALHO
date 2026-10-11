import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('candidate confirmation revalidates active tenant and session at transport boundary',()=>{
 const src=fs.readFileSync(new URL('../app/candidatos.tsx',import.meta.url),'utf8');
 const start=src.indexOf('async function confirm('),end=src.indexOf('\n  return (',start);
 assert.ok(start>=0&&end>start);
 const handler=src.slice(start,end);
 assert.match(handler,/confirmCandidate\(async\(path,options\)=>\{const active=await authenticatedTenantHeaders\(\)/);
 assert.match(handler,/if\(controller\.signal\.aborted\|\|version!==generation\.current\|\|!sameCompanyContext\(active,headers\)\)throw Error\('company_context_changed'\)/);
 assert.ok(handler.indexOf("!sameCompanyContext(active,headers)")<handler.indexOf('return fetch(apiUrl(path)'),'context validation must precede the outgoing request');
 assert.match(handler,/headers:\{\.\.\.headers,'content-type':'application\/json'\}/,'confirmation must use original tenant-bound headers');
});
