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
    if (typeof professionalId !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(professionalId)) throw new BadRequestException('trust_event_invalid');
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
    @Body() body: unknown,
    @Headers('authorization') a?: string,
    @Headers('x-tenant-id') t?: string,
  ) {
    const context = await this.ctx(a, t);
    const input = body && typeof body === 'object' && !Array.isArray(body) ? body as Record<string, unknown> : null;
    const professionalId = input?.professionalId;
    const eventType = input?.eventType;
    if (typeof professionalId !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(professionalId) || typeof eventType !== 'string' || !types.includes(eventType)) {
      throw new BadRequestException('trust_event_invalid');
    }
    if (input?.cause != null && (typeof input.cause !== 'string' || !causes.includes(input.cause))) throw new BadRequestException('trust_cause_invalid');
    const assignmentId = input?.assignmentId;
    if (['no_show', 'late_arrival'].includes(eventType) && !assignmentId) {
      throw new BadRequestException('assignment_required');
    }
    if (assignmentId != null && (typeof assignmentId !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(assignmentId))) throw new BadRequestException('trust_assignment_invalid');
    if (input?.notes != null && typeof input.notes !== 'string') throw new BadRequestException('trust_notes_invalid');
    const cause = input?.cause ?? 'undetermined';
    const notes = typeof input?.notes === 'string' ? input.notes.trim() || null : null;

    return this.db.tenant(context.tenantId, async db => {
      const visible = (await db.query('SELECT 1 FROM work_assignments WHERE professional_id=$1 LIMIT 1', [professionalId])).rows[0];
      if (!visible) throw new NotFoundException('professional_not_found');
      if (assignmentId) {
        const wa = (
          await db.query<{ professionalId: string }>('SELECT professional_id AS "professionalId" FROM work_assignments WHERE id=$1', [assignmentId])
        ).rows[0];
        if (!wa) throw new BadRequestException('assignment_not_found');
        if (wa.professionalId !== professionalId) throw new BadRequestException('assignment_professional_mismatch');
      }
      return (
        await db.query(
          'INSERT INTO trust_events(tenant_id,assignment_id,professional_id,event_type,cause,reported_by_identity_id,notes) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING id,event_type AS "eventType",cause,reported_by_identity_id AS "reportedByIdentityId",occurred_at AS "occurredAt"',
          [
            context.tenantId,
            assignmentId ?? null,
            professionalId,
            eventType,
            cause,
            context.identity.id,
            notes,
          ],
        )
      ).rows[0];
    });
  }
}
