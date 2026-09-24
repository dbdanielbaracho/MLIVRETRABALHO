import { createHmac, timingSafeEqual } from 'node:crypto';
import type { PaymentEventType, PaymentProviderAdapter, VerifiedPaymentEvent } from './payment-provider';
import { isFreshWebhookTimestamp } from './payment-webhook-security';

const eventTypes = new Set<PaymentEventType>([
  'authorized',
  'captured',
  'failed',
  'refunded',
  'chargeback',
  'payout_sent',
  'payout_paid',
  'payout_failed',
]);
const payoutTypes = new Set<PaymentEventType>(['payout_sent', 'payout_paid', 'payout_failed']);

export type PaymentWebhookVerificationCode =
  | 'webhook_timestamp_invalid'
  | 'webhook_signature_invalid'
  | 'payment_event_invalid';

export class PaymentWebhookVerificationError extends Error {
  constructor(readonly code: PaymentWebhookVerificationCode) {
    super(code);
  }
}

function validSignature(expectedHex: string, supplied?: string): boolean {
  if (!supplied) return false;
  const normalized = supplied.startsWith('sha256=') ? supplied.slice(7) : supplied;
  if (!/^[a-f0-9]{64}$/i.test(normalized)) return false;
  const expected = Buffer.from(expectedHex, 'hex');
  const actual = Buffer.from(normalized, 'hex');
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export class SignedJsonPaymentProviderAdapter implements PaymentProviderAdapter {
  constructor(
    readonly provider: string,
    private readonly secret: string,
    private readonly maxAgeSeconds = 300,
  ) {}

  async verifyWebhook(input: {
    headers: Record<string, string | undefined>;
    rawBody: string;
  }): Promise<VerifiedPaymentEvent> {
    const timestamp = input.headers['x-webhook-timestamp'];
    if (!isFreshWebhookTimestamp(timestamp, Date.now(), this.maxAgeSeconds)) {
      throw new PaymentWebhookVerificationError('webhook_timestamp_invalid');
    }

    const expected = createHmac('sha256', this.secret)
      .update(`${timestamp}.${input.rawBody}`)
      .digest('hex');
    if (!validSignature(expected, input.headers['x-webhook-signature'])) {
      throw new PaymentWebhookVerificationError('webhook_signature_invalid');
    }

    let payload: Record<string, unknown>;
    try {
      payload = JSON.parse(input.rawBody) as Record<string, unknown>;
    } catch {
      throw new PaymentWebhookVerificationError('payment_event_invalid');
    }

    const tenantId = payload.tenantId;
    const assignmentId = payload.assignmentId;
    const eventType = payload.eventType;
    const amountCents = payload.amountCents;
    const providerReference = payload.providerReference;
    const recipientProfessionalId = payload.recipientProfessionalId;
    const idempotencyKey = payload.idempotencyKey;

    if (
      typeof tenantId !== 'string' || !tenantId ||
      typeof assignmentId !== 'string' || !assignmentId ||
      typeof eventType !== 'string' || !eventTypes.has(eventType as PaymentEventType) ||
      typeof amountCents !== 'number' || !Number.isInteger(amountCents) || amountCents < 0 ||
      (providerReference !== undefined && typeof providerReference !== 'string') ||
      (recipientProfessionalId !== undefined && typeof recipientProfessionalId !== 'string') ||
      typeof idempotencyKey !== 'string' || !idempotencyKey
    ) {
      throw new PaymentWebhookVerificationError('payment_event_invalid');
    }

    const normalizedEventType = eventType as PaymentEventType;
    if (payoutTypes.has(normalizedEventType) && (typeof recipientProfessionalId !== 'string' || !recipientProfessionalId)) {
      throw new PaymentWebhookVerificationError('payment_event_invalid');
    }

    return {
      provider: this.provider,
      tenantId,
      assignmentId,
      eventType: normalizedEventType,
      amountCents,
      providerReference,
      recipientProfessionalId,
      idempotencyKey,
    };
  }
}
