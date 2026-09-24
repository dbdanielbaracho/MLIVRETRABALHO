import { BadRequestException, ForbiddenException, NotFoundException, Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DatabaseService } from './database.service';

const types = ['no_show', 'late_arrival', 'incident', 'commendation'];
const causes = ['professional', 'company', 'force_majeure', 'platform', 'undetermined'];

@Controller('company/trust-events')
export class TrustEventsController {
  constructor(private readonly db: DatabaseService, private readonly auth: AuthService) {}

  private async ctx(a?: string, t?: string) {
    const identity = await this.auth.identityFromAuthorization(a);
    if (!t) throw new BadRequestException('tenant_required');
    const membership = await this.auth.requireMembership(identity.id, t);
    if (!['owner', 'admin', 'manager', 'company'].includes(membership.role)) {
      throw new ForbiddenException('company_role_required');
    }
    return { tenantId: t, identity };
  }

  @Get(':professionalId')
  async list(
    @Param('professionalId') professionalId: string,
    @Headers('authorization') a?: string,
    @Headers('x-tenant-id') t?: string,
  ) {
    const context = await this.ctx(a, t);
    return this.db.tenant(context.tenantId, async db => {
      const visible = (await db.query('SELECT 1 FROM work_assignments WHERE professional_id=$1 LIMIT 1', [professionalId])).rows[0];
      if (!visible) throw new NotFoundException('professional_not_found');
      return (
        await db.query(
          'SELECT id,assignment_id AS "assignmentId",event_type AS "eventType",cause,reported_by_identity_id AS "reportedByIdentityId",occurred_at AS "occurredAt",notes FROM trust_events WHERE professional_id=$1 ORDER BY occurred_at DESC',
          [professionalId],
        )
      ).rows;
    });
  }

  @Post()
  async create(
    @Body() body: { assignmentId?: string; professionalId?: string; eventType?: string; cause?: string; notes?: string },
    @Headers('authorization') a?: string,
    @Headers('x-tenant-id') t?: string,
  ) {
    const context = await this.ctx(a, t);
    if (!body.professionalId || !body.eventType || !types.includes(body.eventType)) {
      throw new BadRequestException('trust_event_invalid');
    }
    if (body.cause && !causes.includes(body.cause)) throw new BadRequestException('trust_cause_invalid');
    if (['no_show', 'late_arrival'].includes(body.eventType) && !body.assignmentId) {
      throw new BadRequestException('assignment_required');
    }
    const cause = body.eventType === 'commendation' ? (body.cause ?? 'undetermined') : (body.cause ?? 'undetermined');

    return this.db.tenant(context.tenantId, async db => {
      const visible = (await db.query('SELECT 1 FROM work_assignments WHERE professional_id=$1 LIMIT 1', [body.professionalId])).rows[0];
      if (!visible) throw new NotFoundException('professional_not_found');
      if (body.assignmentId) {
        const wa = (
          await db.query<{ professionalId: string }>('SELECT professional_id AS "professionalId" FROM work_assignments WHERE id=$1', [body.assignmentId])
        ).rows[0];
        if (!wa) throw new BadRequestException('assignment_not_found');
        if (wa.professionalId !== body.professionalId) throw new BadRequestException('assignment_professional_mismatch');
      }
      return (
        await db.query(
          'INSERT INTO trust_events(tenant_id,assignment_id,professional_id,event_type,cause,reported_by_identity_id,notes) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING id,event_type AS "eventType",cause,reported_by_identity_id AS "reportedByIdentityId",occurred_at AS "occurredAt"',
          [
            context.tenantId,
            body.assignmentId ?? null,
            body.professionalId,
            body.eventType,
            cause,
            context.identity.id,
            body.notes?.trim() || null,
          ],
        )
      ).rows[0];
    });
  }
}
