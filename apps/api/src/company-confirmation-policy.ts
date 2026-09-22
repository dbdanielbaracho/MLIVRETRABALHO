export type ConfirmationDecision='create'|'return_existing'|'conflict';
export function confirmationDecision(existingStatus?:string|null):ConfirmationDecision{
  if(existingStatus==null)return 'create';
  return existingStatus==='confirmed'?'return_existing':'conflict';
}
