import {createHash} from 'node:crypto';
import type {SupportInput} from './support-input';
// Optional legacy compatibility; an explicitly supplied key must be a UUID.
export function supportRequestKey(value:unknown):string|null|undefined{
 if(value===undefined)return undefined;
 return typeof value==='string'&&/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)?value.toLowerCase():null;
}
export function supportRequestDigest(input:SupportInput):string{
 return createHash('sha256').update(JSON.stringify([input.assignmentId?.toLowerCase()??null,input.category,input.description,input.priority])).digest('hex');
}
