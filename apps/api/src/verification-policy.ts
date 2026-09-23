export type VerificationStatus='pending'|'reviewing'|'verified'|'rejected'|'expired';
export function verificationAllowsRestrictedAction(status?:string|null):boolean{return status==='verified';}
export function canRetryVerification(status?:string|null):boolean{return status==null||status==='rejected'||status==='expired';}
