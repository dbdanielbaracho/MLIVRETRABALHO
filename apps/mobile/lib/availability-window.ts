export function availabilityWindow(dateText:string,startText:string,endText:string){
  const date=dateText.trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  const start=startText.trim().match(/^(\d{2}):(\d{2})$/);
  const end=endText.trim().match(/^(\d{2}):(\d{2})$/);
  if(!date||!start||!end)return null;
  const day=Number(date[1]),month=Number(date[2]),year=Number(date[3]);
  const sh=Number(start[1]),sm=Number(start[2]),eh=Number(end[1]),em=Number(end[2]);
  if(month<1||month>12||day<1||day>31||sh>23||eh>23||sm>59||em>59)return null;
  const startsAt=new Date(year,month-1,day,sh,sm,0,0);
  if(startsAt.getFullYear()!==year||startsAt.getMonth()!==month-1||startsAt.getDate()!==day)return null;
  const endsAt=new Date(year,month-1,day,eh,em,0,0);
  if(endsAt<=startsAt)endsAt.setDate(endsAt.getDate()+1);
  return {startsAt:startsAt.toISOString(),endsAt:endsAt.toISOString()};
}
