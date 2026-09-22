import test from 'node:test';
import assert from 'node:assert/strict';
import { checksum, migrationBody } from './migrate';

test('removes only outer migration transaction wrapper',()=>{
  assert.equal(migrationBody('BEGIN;\nCREATE TABLE x(id int);\nCOMMIT;'),'CREATE TABLE x(id int);');
  assert.equal(migrationBody('BEGIN;CREATE TABLE x(id int);COMMIT;'),'CREATE TABLE x(id int);');
});

test('migration checksum is deterministic and changes with content',()=>{
  assert.equal(checksum('abc'),checksum('abc'));
  assert.notEqual(checksum('abc'),checksum('abcd'));
});
