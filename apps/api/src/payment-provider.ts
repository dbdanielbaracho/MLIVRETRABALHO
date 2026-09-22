export type PaymentEventType='authorized'|'captured'|'failed'|'refunded'|'chargeback'|'payout_sent'|'payout_paid'|'payout_failed';
export type VerifiedPaymentEvent={provider:string;tenantId:string;assignmentId:string;eventType:PaymentEventType;amountCents:number;providerReference?:string;idempotencyKey:string};
export interface PaymentProviderAdapter{readonly provider:string;verifyWebhook(input:{headers:Record<string,string|undefined>;rawBody:string}):Promise<VerifiedPaymentEvent>;}
