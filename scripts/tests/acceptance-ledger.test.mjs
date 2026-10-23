import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { verifyLedger, sourcePath } = require('../verify-acceptance-ledger.cjs');
const root = process.cwd();
const data = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const options = { root };
test('whole thirteen-area reconciliation preserves originals and 55 historical requirement IDs', () => {
  const r = verifyLedger(data, options);
  assert.deepEqual(r.accepted, [2,3,4,5,6,7,8,9,10,12]);
  assert.deepEqual(r.pending, [1,11,13]);
  assert.equal(r.productChains, 9);
  assert.equal(r.normativePrefixes, 6);
});
test('rejects Activity Watch, borrowed literal SHA, unsupported approval, and unmatched artifact digest', () => {
  const mutations = [
    d => { d.proofs[0].ownCI.name = 'Project Activity Watch'; },
    d => { d.proofs[0].postCI.checkout = d.proofs[0].head; },
    d => { const a = d.areas.find(a => a.id === 11); a.state = 'APPROVED_INTERNAL'; a.acceptance = { kind: 'historical_product', proofArea: 11 }; d.accepted.push(11); d.accepted.sort((a,b) => a-b); d.pending = d.pending.filter(n => n !== 11); },
    d => { d.proofs[0].apk.post.artifacts[0].digest = 'sha256:' + '0'.repeat(64); },
    d => { d.requirements.find(r => r.id === 'FIN-EVENT-001').implementation[0].sha = '0'.repeat(40); }
  ];
  for (const mutate of mutations) { const d = structuredClone(data); mutate(d); assert.throws(() => verifyLedger(d, options)); }
});
test('rejects omission of a legacy requirement and loss of the original memory prefix', () => {
  const d = structuredClone(data); d.requirements = d.requirements.filter(r => r.id !== 'SEC-001');
  assert.throws(() => verifyLedger(d, options));
  const memory = data.normativePrefixes.find(e => e.path.includes('MEMORIA_CONSOLIDADA'));
  assert.throws(() => verifyLedger(data, { ...options, read: p => { const b = fs.readFileSync(path.join(root, p)); return p === memory.path ? b.subarray(1) : b; } }));
});
