'use strict';
// Offline consistency of a dated GitHub audit; never an online approval oracle.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { execFileSync } = require('node:child_process');
const assert = require('node:assert/strict');
const sourcePath = 'docs/requirements/acceptance-ledger.json';
const marker = '## AREA12_TRUTH_RECONCILIATION_2026_10_23';
const hooks = 'node scripts/verify-acceptance-ledger.cjs\nnode --test scripts/tests/acceptance-ledger.test.mjs\n';
const sha = bytes => { const b = Buffer.from(bytes); return crypto.createHash('sha1').update(`blob ${b.length}\0`).update(b).digest('hex'); };
function gitTree(root) {
  return execFileSync('git', ['ls-tree', '-r', '--full-tree', 'HEAD'], { cwd: root, encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 }).trim().split('\n').map(line => {
    const m = line.match(/^(\d+) (\w+) ([a-f0-9]{40})\t(.+)$/);
    assert(m, 'malformed committed Git tree');
    return { mode: m[1], type: m[2], sha: m[3], path: m[4] };
  });
}
function verifyLedger(d, { root = process.cwd(), read = p => fs.readFileSync(path.join(root, p)), tree = gitTree(root) } = {}) {
  const same = (a, b, why) => assert.deepEqual(a, b, why);
  const known = new Map(tree.map(e => [e.path, e]));
  const bytes = p => Buffer.from(read(p));
  const text = p => bytes(p).toString('utf8');
  const exactSource = e => { const actual = known.get(e.path); assert(actual, `missing committed source ${e.path}`); same([actual.sha, actual.mode], [e.sha, e.mode], `source drift ${e.path}; reconcile evidence`); };
  same(d.repository, 'dbdanielbaracho/MLIVRETRABALHO', 'exclusive repository');
  same(d.version, 1);
  same(d.areas.map(a => a.id), Array.from({ length: 13 }, (_, i) => i + 1), '13 distinct ordered areas');
  same(d.accepted, d.areas.filter(a => a.state === 'APPROVED_INTERNAL').map(a => a.id), 'accepted counter must follow actual decisions');
  same(d.pending, d.areas.filter(a => a.state === 'PENDING').map(a => a.id), 'pending counter must follow actual gaps');
  assert(d.accepted.length + d.pending.length === 13);
  for (const a of d.areas) {
    assert(a.name && a.originalCriterion);
    if (a.state === 'PENDING') assert(a.gap.length > 40 && a.acceptance === null, 'pending needs explicit gap and no acceptance');
    else if (a.id !== 12) assert(a.acceptance?.kind === 'historical_product' && a.acceptance.proofArea === a.id && d.proofs.some(p => p.area === a.id), 'accepted area needs complete product proof');
  }
  same(d.proofs.map(p => p.area), [2,3,4,5,6,7,8,9,10], 'all nine historical whole journeys reconciled');
  const doc = d.areas.find(a => a.id === 12).acceptance;
  same(doc?.kind, 'this_package');
  same(doc.prerequisites, d.proofs.map(p => p.area));
  assert(doc.ownFullCIRequired && doc.literalPostCIRequired && doc.publication === 'conditional_until_both_full_gates', 'no advance claim of future own/post runs');
  const ci = (r, head, event) => {
    same([r.name, r.path, r.status, r.conclusion, r.head_sha, r.event], ['CI', '.github/workflows/ci.yml', 'completed', 'success', head, event], 'real CI, own head or literal main, never Activity Watch');
    assert(Number.isSafeInteger(r.id) && Number.isSafeInteger(r.job) && r.checkoutLine.includes(r.checkout));
    assert(/^[a-f0-9]{40}$/.test(r.checkout) && /^[a-f0-9]{40}$/.test(r.checkoutTree));
    same(r.unitFailures, []); assert(r.counts.length === 5 && r.counts.every(n => Number.isInteger(n) && n > 0));
    assert(r.witnesses.some(l => l.includes('PASS: Production Truth Gate health/readiness contract')), 'primary Production Truth');
  };
  for (const p of d.proofs) {
    const receipt = text(p.receipt.path);
    same(sha(bytes(p.receipt.path)), p.receipt.sha, 'canonical acceptance receipt remains intact');
    assert(receipt.includes(String(p.ownCI.id)) && receipt.includes(String(p.postCI.id)), 'receipt must name both CI runs');
    ci(p.ownCI, p.head, 'pull_request'); ci(p.postCI, p.merge, 'push');
    assert(p.ownCI.checkoutParents.includes(p.head), 'actual own synthetic checkout must contain candidate');
    same(p.ownCI.checkoutTree, p.postCI.checkoutTree, 'own synthetic tree equals literal merged tree');
    same(p.postCI.checkout, p.merge, 'post CI must checkout literal merge SHA');
    same([p.ancestry.base, p.ancestry.head, p.ancestry.behind], [p.merge, d.auditBase, 0], 'product is ancestor of audited main');
    assert(p.implementation.length && p.tests.length, 'requirement needs code and integrated tests');
    for (const e of [...p.implementation, ...p.tests]) if (e.path !== 'scripts/http-journey-e2e.sh') exactSource(e);
    if (p.apk.applicable) for (const [r, c, event] of [[p.apk.own, p.ownCI, 'pull_request'], [p.apk.post, p.postCI, 'push']]) {
      same([r.name, r.path, r.status, r.conclusion, r.head_sha, r.event], ['Standalone Pilot APK', '.github/workflows/standalone-pilot-apk.yml', 'completed', 'success', c.head_sha, event], 'own and literal standalone provenance');
      same([r.checkout, r.checkoutTree], [c.checkout, c.checkoutTree]);
      assert(r.witnesses.some(l => /DEVICE_SMOKE_OK.*metro_required=false/.test(l)), 'actual emulator smoke without Metro');
      assert(r.freshMetadataOnly === true, 'no claim of newly downloaded bytes');
      assert(r.artifacts.length > 0);
      for (const a of r.artifacts) {
        assert(/^sha256:[a-f0-9]{64}$/.test(a.digest) && !a.expired && a.size_in_bytes > 1000000 && a.expires_at);
        assert(receipt.includes(a.digest.slice(7)), 'artifact digest must match previous canonical byte receipt');
      }
    } else assert(p.apk.reason.length > 40, 'N/A needs actual applicability rationale');
  }
  same(d.normativePrefixes.length, 6);
  const normativeNames = new Set();
  for (const e of d.normativePrefixes) {
    assert(!normativeNames.has(e.path)); normativeNames.add(e.path);
    const b = bytes(e.path); assert(b.length > e.bytes);
    same(sha(b.subarray(0, e.bytes)), e.sha, `original FULL prefix preserved ${e.path}`);
    const appendix = b.subarray(e.bytes).toString('utf8'); assert(appendix.includes(marker));
    const rows = appendix.split('\n').filter(l => /^\|\d+\. /.test(l));
    same(rows.length, 13, 'current table must enumerate all 13, not a historical snapshot');
    for (const a of d.areas) {
      const row = rows.find(l => l.startsWith(`|${a.id}. `));
      assert(row && row.includes(a.state === 'PENDING' ? '|PENDENTE|' : '|APROVADO INTERNO'), 'current table and decision disagree');
    }
  }
  const originalMatrix = text('docs/evidencias/13_AREAS_ACCEPTANCE_MATRIX_2026-10-13.md');
  for (const a of d.areas) assert(originalMatrix.includes(a.originalCriterion), 'original criterion cannot disappear from its canonical matrix');
  same(sha(bytes(d.legacy.path)), d.legacy.sha, 'historical ledger FULL unchanged');
  const legacyRows = text(d.legacy.path).split('\n').filter(l => /^\| [A-Z][A-Z0-9-]+ \|/.test(l) && !l.startsWith('| ID |'));
  const ids = legacyRows.map(l => l.split('|')[1].trim()); same(ids.length, 55); same(new Set(ids).size, 55); same(d.legacy.ids, ids);
  same(d.requirements.length, 58);
  same(d.requirements.filter(r => r.legacyRow).map(r => r.legacyRow), legacyRows, 'no requirement dropped or rewritten');
  same(new Set(d.requirements.map(r => r.id)).size, d.requirements.length);
  for (const r of d.requirements) {
    assert(r.requirement && d.areas.some(a => a.id === r.area));
    assert(['COVERED_INTERNAL', 'PARTIAL', 'PENDING', 'EXTERNAL'].includes(r.state));
    if (r.state !== 'COVERED_INTERNAL') assert(r.gap?.length > 30, `explicit gap ${r.id}`);
    if (r.proofArea) assert(d.proofs.some(p => p.area === r.proofArea), 'internal coverage needs whole-journey receipt');
    for (const p of [...(r.evidence || []), ...(r.code || [])]) assert(known.has(p), `missing current contract source ${p}`);
  }
  same(d.protectedInputs.length, 185); assert(d.protectedInputs.filter(e => e.path.startsWith('apps/mobile/')).length === 173);
  d.protectedInputs.forEach(exactSource);
  same(d.externalIssues.map(e => e.number), [215,219,220,224,228]); assert(d.externalIssues.every(e => e.state === 'open'));
  same(d.openDrafts.map(p => p.number), [574,565]); assert(d.openDrafts.every(p => p.draft));
  const hookText = text('scripts/http-journey-e2e.sh'); assert(hookText.includes(hooks));
  const originalHook = hookText.replace(hooks, '');
  const entry = d.proofs.flatMap(p => p.tests).find(e => e.path === 'scripts/http-journey-e2e.sh');
  same(sha(Buffer.from(originalHook)), entry.sha, 'only two gate lines added to original journey; all guards/journeys intact');
  for (const name of ['authentication-acceptance-e2e.cjs','company-acceptance-e2e.cjs','matching-acceptance-e2e.cjs','ledger-completion-atomicity-e2e.cjs','tenant-boundary-acceptance-e2e.cjs','security-acceptance-e2e.cjs','notification-atomicity-e2e.cjs','backend-contract-acceptance-e2e.cjs']) assert(hookText.includes(name), `existing whole journey ${name} remains mandatory`);
  same(d.currentRegression.sha, d.auditBase); same(d.currentRegression.checkout, d.auditBase);
  assert(d.currentRegression.markers.some(l => l.includes('OPENAPI_REAL_HTTP_JSON_CONTRACT_PASS')) && d.currentRegression.markers.some(l => l.includes('status=0')) && d.currentRegression.markers.some(l => l.includes('PASS: Production Truth')));
  return { areas: 13, accepted: d.accepted, pending: d.pending, legacyRequirements: 55, requirements: 58, productChains: 9, CIReceipts: 18, APKReceipts: 12, normativePrefixes: 6, protectedInputs: 185, scope: 'dated audit consistency; own/post publication gates and external certification are not inferred' };
}
module.exports = { verifyLedger, sourcePath, sha, gitTree };
if (require.main === module) {
  try { console.log('DOCUMENT_TRUTH_RECONCILIATION_PASS', JSON.stringify(verifyLedger(JSON.parse(fs.readFileSync(sourcePath, 'utf8'))))); }
  catch (error) { console.error('DOCUMENT_TRUTH_RECONCILIATION_FAIL', error instanceof Error ? error.message : 'invalid ledger'); process.exitCode = 1; }
}
