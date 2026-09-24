import { BadRequestException, Controller, ForbiddenException, Headers, Post, Req } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { samePaymentEvent } from './payment-webhook-security';
import {
  PaymentWebhookVerificationError,
  SignedJsonPaymentProviderAdapter,
} from './signed-json-payment-provider';

type RawRequest = { rawBody?: Buffer };

@Controller('payments')
export class PaymentWebhookController {
  constructor(private readonly db: DatabaseService) {}

  @Post('webhook')
  async webhook(
    @Req() request: RawRequest,
    @Headers('x-webhook-signature') signature?: string,
    @Headers('x-webhook-timestamp') timestamp?: string,
  ) {
    const secret = process.env.PAYMENT_WEBHOOK_SECRET;
    if (!secret) throw new ForbiddenException('webhook_unauthorized');

    const rawBody = request.rawBody?.toString('utf8');
    if (!rawBody) throw new BadRequestException('payment_event_invalid');

    const adapter = new SignedJsonPaymentProviderAdapter('internal_hmac_v1', secret);
    let event;
    try {
      event = await adapter.verifyWebhook({
        rawBody,
        headers: {
          'x-webhook-signature': signature,
          'x-webhook-timestamp': timestamp,
        },
      });
    } catch (error) {
      if (error instanceof PaymentWebhookVerificationError) {
        if (error.code === 'webhook_signature_invalid' || error.code === 'webhook_timestamp_invalid') {
          throw new ForbiddenException(error.code);
        }
        throw new BadRequestException(error.code);
      }
      throw error;
    }

    return this.db.tenant(event.tenantId, async db => {
      const assignment = (
        await db.query('SELECT 1 FROM work_assignments WHERE id=$1', [event.assignmentId])
      ).rows[0];
      if (!assignment) throw new BadRequestException('assignment_not_found');

      const existing = (
        await db.query(
          'SELECT id,provider,assignment_id AS "assignmentId",event_type AS "eventType",amount_cents AS "amountCents",provider_reference AS "providerReference",idempotency_key AS "idempotencyKey",created_at AS "createdAt" FROM payment_events WHERE idempotency_key=$1',
          [event.idempotencyKey],
        )
      ).rows[0];
      if (existing) {
        if (!samePaymentEvent(existing, event)) throw new BadRequestException('idempotency_conflict');
        return existing;
      }

      return (
        await db.query(
          'INSERT INTO payment_events(tenant_id,provider,assignment_id,event_type,amount_cents,provider_reference,idempotency_key) VALUES($1,$2,$3,$4,$5,$6,$7) ON CONFLICT(tenant_id,idempotency_key) DO NOTHING RETURNING id,provider,assignment_id AS "assignmentId",event_type AS "eventType",amount_cents AS "amountCents",provider_reference AS "providerReference",idempotency_key AS "idempotencyKey",created_at AS "createdAt"',
          [
            event.tenantId,
            event.provider,
            event.assignmentId,
            event.eventType,
            event.amountCents,
            event.providerReference ?? null,
            event.idempotencyKey,
          ],
        )
      ).rows[0];
    });
  }
}
