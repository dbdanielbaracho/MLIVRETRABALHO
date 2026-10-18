type Timestamp=Date|string|null|undefined;
// pg returns Date objects before JSON serialization; weekday strings are not sortable timestamps.
export function compareTimestamp(left:Timestamp,right:Timestamp,direction:'asc'|'desc'):number{
 const millis=(value:Timestamp)=>value instanceof Date?value.getTime():typeof value==='string'?Date.parse(value):NaN;
 const a=millis(left),b=millis(right),validA=Number.isFinite(a),validB=Number.isFinite(b);
 if(!validA)return validB?1:0;
 if(!validB)return -1;
 return direction==='asc'?a-b:b-a;
}
