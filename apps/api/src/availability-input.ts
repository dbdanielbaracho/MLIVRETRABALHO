import {parseExplicitIsoDateTime} from './iso-datetime';
export type AvailabilityInput={startsAt:string;endsAt:string};
export function availabilityInput(value:unknown):AvailabilityInput|null{
 if(!value||typeof value!=='object'||Array.isArray(value))return null;
 const body=value as Record<string,unknown>;
 if(typeof body.startsAt!=='string'||typeof body.endsAt!=='string'||!body.startsAt||!body.endsAt)return null;
 const starts=parseExplicitIsoDateTime(body.startsAt),ends=parseExplicitIsoDateTime(body.endsAt);
 if(!starts||!ends||ends<=starts)return null;
 return {startsAt:body.startsAt,endsAt:body.endsAt};
}
