import { BadRequestException,ForbiddenException,Controller,Get,Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DatabaseService } from './database.service';

@Controller('company/payment-events')
export class PaymentEventsController {
  constructor(private readonly db:DatabaseService,private readonly auth:AuthService){}

  private async ctx(a?:string,t?:string){
    const i=await this.auth.identityFromAuthorization(a);
    if(!t)throw new BadRequestException('tenant_required');
    const m=await this.auth.requireMembership(i.id,t);
    if(!['owner','admin'].includes(m.role))throw new ForbiddenException('payment_role_required');
    return t;
  }

  @Get('reconciliation')
  async reconciliation(@Headers('authorization')a?:string,@Headers('x-tenant-id')t?:string){
    const tenant=await this.ctx(a,t);
    return this.db.tenant(tenant,async db=>(await db.query(
      `SELECT wa.id AS "assignmentId",
              j.title,
              p.display_name AS "professionalName",
              el.amount_cents AS "payableCents",
              el.status AS "earningStatus",
              COALESCE(sum(pe.amount_cents) FILTER(WHERE pe.event_type='captured'),0)::int AS "capturedCents",
              COALESCE(sum(pe.amount_cents) FILTER(WHERE pe.event_type='refunded'),0)::int AS "refundedCents",
              COALESCE(sum(pe.amount_cents) FILTER(WHERE pe.event_type='payout_paid'),0)::int AS "paidOutCents",
              CASE
                WHEN el.amount_cents IS NULL THEN 'no_earning'
                WHEN COALESCE(sum(pe.amount_cents) FILTER(WHERE pe.event_type='payout_paid'),0)=el.amount_cents THEN 'reconciled'
                WHEN COALESCE(sum(pe.amount_cents) FILTER(WHERE pe.event_type='payout_paid'),0)>el.amount_cents THEN 'overpaid'
                ELSE 'pending'
              END AS "reconciliationStatus"
         FROM work_assignments wa
         JOIN company_jobs j ON j.id=wa.job_id AND j.tenant_id=wa.tenant_id
         JOIN professional_profiles p ON p.id=wa.professional_id
    LEFT JOIN earnings_ledger el ON el.assignment_id=wa.id AND el.tenant_id=wa.tenant_id
    LEFT JOIN payment_events pe ON pe.assignment_id=wa.id AND pe.tenant_id=wa.tenant_id
        WHERE wa.tenant_id=$1
     GROUP BY wa.id,j.title,p.display_name,el.amount_cents,el.status
     ORDER BY wa.confirmed_at DESC`,
      [tenant]
    )).rows);
  }

  @Get()
  async list(@Headers('authorization')a?:string,@Headers('x-tenant-id')t?:string){
    const tenant=await this.ctx(a,t);
    return this.db.tenant(tenant,async db=>(await db.query(
      'SELECT id,provider,assignment_id AS "assignmentId",event_type AS "eventType",amount_cents AS "amountCents",provider_reference AS "providerReference",recipient_professional_id AS "recipientProfessionalId",idempotency_key AS "idempotencyKey",created_at AS "createdAt" FROM payment_events WHERE tenant_id=$1 ORDER BY created_at DESC LIMIT 200',
      [tenant]
    )).rows);
  }
}
