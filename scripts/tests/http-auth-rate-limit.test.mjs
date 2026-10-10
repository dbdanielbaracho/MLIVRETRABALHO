import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

// Execute the real hash command from the HTTP journey without creating accounts
// or touching a database; the random base64url token can start with a hyphen.
const source = readFileSync(new URL('../http-auth-rate-limit-e2e.sh', import.meta.url), 'utf8');
const hashCommand = source.split('\n').find(line => line.startsWith('FIRST_HASH='));
assert.ok(hashCommand, 'HTTP journey must contain its first-session hash check');

for (const token of ['fixture_base64url_token', '-fixture_base64url_token', '--help']) {
  test(`first-session hash treats ${token} as data rather than a Node option`, () => {
    const result = spawnSync('/bin/bash', ['--noprofile', '--norc', '-eu', '-c', `${hashCommand}\nprintf '%s' "$FIRST_HASH"`], {
      env: { ...process.env, BASH_ENV: '', ENV: '', FIRST_TOKEN: token }, encoding: 'utf8', timeout: 5000,
    });
    assert.equal(result.error, undefined);
    assert.equal(result.status, 0, result.stderr);
    assert.equal(result.stderr, '');
    assert.equal(result.stdout, createHash('sha256').update(token).digest('hex'));
  });
}
