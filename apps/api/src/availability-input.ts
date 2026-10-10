export type AvailabilityInput={startsAt:string;endsAt:string};
export function availabilityInput(value:unknown):AvailabilityInput|null{
 if(!value||typeof value!=='object'||Array.isArray(value))return null;
 const body=value as Record<string,unknown>;
 if(typeof body.startsAt!=='string'||typeof body.endsAt!=='string'||!body.startsAt||!body.endsAt)return null;
 const starts=new Date(body.startsAt),ends=new Date(body.endsAt);
 if(!Number.isFinite(starts.getTime())||!Number.isFinite(ends.getTime())||ends<=starts)return null;
 return {startsAt:body.startsAt,endsAt:body.endsAt};
}
