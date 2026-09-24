import test from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import {
  PaymentWebhookVerificationError,
  SignedJsonPaymentProviderAdapter,
} from './signed-json-payment-provider';

const secret = 'test-payment-secret';
const adapter = new SignedJsonPaymentProviderAdapter('sandbox_hmac', secret);

function signed(rawBody: string, timestamp = String(Math.floor(Date.now() / 1000))) {
  const signature = createHmac('sha256', secret).update(`${timestamp}.${rawBody}`).digest('hex');
  return {
    rawBody,
    headers: {
      'x-webhook-timestamp': timestamp,
      'x-webhook-signature': `sha256=${signature}`,
    },
  };
}

test('signed payment adapter verifies raw-body HMAC and normalizes provider provenance', async () => {
  const rawBody = JSON.stringify({
    tenantId: 'tenant-1',
    assignmentId: 'assignment-1',
    eventType: 'captured',
    amountCents: 25000,
    providerReference: 'provider-123',
    idempotencyKey: 'evt-123',
  });
  const event = await adapter.verifyWebhook(signed(rawBody));
  assert.equal(event.provider, 'sandbox_hmac');
  assert.equal(event.tenantId, 'tenant-1');
  assert.equal(event.assignmentId, 'assignment-1');
  assert.equal(event.eventType, 'captured');
  assert.equal(event.amountCents, 25000);
  assert.equal(event.providerReference, 'provider-123');
  assert.equal(event.idempotencyKey, 'evt-123');
});

test('signed payment adapter rejects body tampering', async () => {
  const original = JSON.stringify({
    tenantId: 'tenant-1', assignmentId: 'assignment-1', eventType: 'captured', amountCents: 25000, idempotencyKey: 'evt-1',
  });
  const input = signed(original);
  input.rawBody = original.replace('25000', '99000');
  await assert.rejects(
    adapter.verifyWebhook(input),
    (error: unknown) => error instanceof PaymentWebhookVerificationError && error.code === 'webhook_signature_invalid',
  );
});

test('signed payment adapter rejects stale signed events before parsing payload', async () => {
  const timestamp = String(Math.floor(Date.now() / 1000) - 301);
  const rawBody = JSON.stringify({
    tenantId: 'tenant-1', assignmentId: 'assignment-1', eventType: 'captured', amountCents: 1, idempotencyKey: 'evt-stale',
  });
  await assert.rejects(
    adapter.verifyWebhook(signed(rawBody, timestamp)),
    (error: unknown) => error instanceof PaymentWebhookVerificationError && error.code === 'webhook_timestamp_invalid',
  );
});

test('signed payment adapter rejects invalid financial payload after signature verification', async () => {
  const rawBody = JSON.stringify({
    tenantId: 'tenant-1', assignmentId: 'assignment-1', eventType: 'captured', amountCents: -1, idempotencyKey: 'evt-invalid',
  });
  await assert.rejects(
    adapter.verifyWebhook(signed(rawBody)),
    (error: unknown) => error instanceof PaymentWebhookVerificationError && error.code === 'payment_event_invalid',
  );
});
