import {test} from 'node:test';
import assert from 'node:assert/strict';
import {parseCanonicalUtcDateTime,parseExplicitIsoDateTime} from './iso-datetime';
test('explicit ISO parser rejects calendar rollover and timestamps without an explicit zone',()=>{
 for(const value of ['2026-02-30T18:00:00Z','2027-02-29T18:00:00-03:00','2026-10-10','2026-10-10T18:00:00','2026-10-10T18:00:00.1234Z','2026-10-10T24:00:00Z','2026-10-10T18:60:00Z'])assert.equal(parseExplicitIsoDateTime(value),null);
});
test('explicit ISO parser accepts real UTC and offset leap-day instants',()=>{
 assert.equal(parseExplicitIsoDateTime('2028-02-29T18:00:00-03:00')?.toISOString(),'2028-02-29T21:00:00.000Z');
 assert.equal(parseExplicitIsoDateTime('2028-02-29T21:00:00Z')?.toISOString(),'2028-02-29T21:00:00.000Z');
});
test('canonical UTC parser rejects offsets and canonicalizes supported fractions',()=>{
 assert.equal(parseCanonicalUtcDateTime('2028-02-29T18:00:00-03:00'),null);
 assert.equal(parseCanonicalUtcDateTime('2028-02-29T21:00:00.1Z')?.toISOString(),'2028-02-29T21:00:00.100Z');
 assert.equal(parseCanonicalUtcDateTime('2028-02-29T21:00:00.12Z')?.toISOString(),'2028-02-29T21:00:00.120Z');
});
