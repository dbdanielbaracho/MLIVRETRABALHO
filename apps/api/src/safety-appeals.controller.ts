import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  ForbiddenException,
  Get,
  Headers,
  NotFoundException,
  Param,
  Post
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { DatabaseService } from './database.service';
import { SafetyAppealStatus, safetyAppealTransition } from './safety-appeal-policy';

const appealStatuses: SafetyAppealStatus[] = ['submitted', 'reviewing', 'upheld', 'modified', 'reversed'];

@Controller('safety-appeals')
export class SafetyAppealsController {
  constructor(private readonly db: DatabaseService, private readonly auth: AuthService) {}

  private async context(authorization?: string, tenantId?: string) {
    const identity = await this.auth.identityFromAuthorization(authorization);
    if (!tenantId) throw new BadRequestException('tenant_required');
    const membership = await this.auth.requireMembership(identity.id, tenantId);
    return { identity, tenantId, membership };
  }

  @Get('mine')
  async mine(
    @Headers('authorization') authorization?: string,
    @Headers('x-tenant-id') tenantId?: string
  ) {
    const identity = await this.auth.identityFromAuthorization(authorization);
    const tenantIds = tenantId
      ? [tenantId]
      : [...new Set((await this.auth.memberships(identity.id)).map(membership => membership.tenant_id))];

    if (tenantId) await this.auth.requireMembership(identity.id, tenantId);

    const all: Array<Record<string, unknown>> = [];
    for (const currentTenant of tenantIds) {
      const rows = await this.db.tenant(currentTenant, async db => (
        await db.query(
          `SELECT a.id,
                  a.safety_case_id AS "safetyCaseId",
                  a.reason,
                  COALESCE(e.to_status, 'submitted') AS status,
                  a.created_at AS "createdAt",
                  e.created_at AS "statusUpdatedAt"
             FROM safety_case_appeals a
             LEFT JOIN LATERAL (
               SELECT to_status, created_at
                 FROM safety_case_appeal_events
                WHERE appeal_id=a.id AND tenant_id=$2
                ORDER BY created_at DESC, id DESC
                LIMIT 1
             ) e ON true
            WHERE a.appellant_identity_id=$1 AND a.tenant_id=$2
            ORDER BY a.created_at DESC`,
          [identity.id, currentTenant]
        )
      ).rows);
      all.push(...rows.map(row => ({ ...row, tenantId: currentTenant })));
    }

    return all.sort((a, b) => String(b.createdAt ?? '').localeCompare(String(a.createdAt ?? '')));
  }

  @Post()
  async create(
    @Body() body: { safetyCaseId?: string; reason?: string },
    @Headers('authorization') authorization?: string,
    @Headers('x-tenant-id') tenantId?: string
  ) {
    const context = await this.context(authorization, tenantId);
    const reason = body.reason?.trim();
    if (!body.safetyCaseId || !reason || reason.length > 4000) {
      throw new BadRequestException('safety_appeal_invalid');
    }

    return this.db.tenant(context.tenantId, async db => {
      const safetyCase = (
        await db.query<{
          id: string;
          reporterIdentityId: string;
          professionalIdentityId: string | null;
        }>(
          `SELECT sc.id,
                  sc.reporter_identity_id AS "reporterIdentityId",
                  p.identity_id AS "professionalIdentityId"
             FROM safety_cases sc
             LEFT JOIN work_assignments wa ON wa.id=sc.assignment_id AND wa.tenant_id=sc.tenant_id
             LEFT JOIN professional_profiles p ON p.id=wa.professional_id
            WHERE sc.id=$1 AND sc.tenant_id=$2`,
          [body.safetyCaseId, context.tenantId]
        )
      ).rows[0];
      if (!safetyCase) throw new NotFoundException('safety_case_not_found');

      const canAppeal =
        safetyCase.reporterIdentityId === context.identity.id ||
        safetyCase.professionalIdentityId === context.identity.id ||
        ['owner', 'admin'].includes(context.membership.role);
      if (!canAppeal) throw new ForbiddenException('safety_appeal_access_denied');

      const inserted = (
        await db.query<{
          id: string;
          safetyCaseId: string;
          reason: string;
          createdAt: string;
        }>(
          `INSERT INTO safety_case_appeals(tenant_id,safety_case_id,appellant_identity_id,reason)
           VALUES($1,$2,$3,$4)
           ON CONFLICT (safety_case_id,appellant_identity_id) DO NOTHING
           RETURNING id,safety_case_id AS "safetyCaseId",reason,created_at AS "createdAt"`,
          [context.tenantId, safetyCase.id, context.identity.id, reason]
        )
      ).rows[0];

      if (inserted) return { ...inserted, status: 'submitted', created: true };

      const existing = (
        await db.query<{
          id: string;
          safetyCaseId: string;
          reason: string;
          createdAt: string;
          status: SafetyAppealStatus;
        }>(
          `SELECT a.id,
                  a.safety_case_id AS "safetyCaseId",
                  a.reason,
                  a.created_at AS "createdAt",
                  COALESCE((
                    SELECT to_status
                      FROM safety_case_appeal_events
                     WHERE appeal_id=a.id AND tenant_id=$3
                     ORDER BY created_at DESC, id DESC
                     LIMIT 1
                  ), 'submitted') AS status
             FROM safety_case_appeals a
            WHERE a.safety_case_id=$1 AND a.appellant_identity_id=$2 AND a.tenant_id=$3`,
          [safetyCase.id, context.identity.id, context.tenantId]
        )
      ).rows[0];
      return { ...existing, created: false };
    });
  }
}

@Controller('company/safety-appeals')
export class SafetyAppealsAdminController {
  constructor(private readonly db: DatabaseService, private readonly auth: AuthService) {}

  private async context(authorization?: string, tenantId?: string) {
    const identity = await this.auth.identityFromAuthorization(authorization);
    if (!tenantId) throw new BadRequestException('tenant_required');
    const membership = await this.auth.requireMembership(identity.id, tenantId);
    if (!['owner', 'admin'].includes(membership.role)) throw new ForbiddenException('safety_admin_required');
    return { identity, tenantId };
  }

  @Get()
  async list(
    @Headers('authorization') authorization?: string,
    @Headers('x-tenant-id') tenantId?: string
  ) {
    const context = await this.context(authorization, tenantId);
    return this.db.tenant(context.tenantId, async db => (
      await db.query(
        `SELECT a.id,
                a.safety_case_id AS "safetyCaseId",
                a.appellant_identity_id AS "appellantIdentityId",
                a.reason,
                COALESCE(e.to_status, 'submitted') AS status,
                a.created_at AS "createdAt",
                e.created_at AS "statusUpdatedAt"
           FROM safety_case_appeals a
           LEFT JOIN LATERAL (
             SELECT to_status, created_at
               FROM safety_case_appeal_events
              WHERE appeal_id=a.id AND tenant_id=$1
              ORDER BY created_at DESC, id DESC
              LIMIT 1
           ) e ON true
          WHERE a.tenant_id=$1
          ORDER BY a.created_at DESC
          LIMIT 200`,
        [context.tenantId]
      )
    ).rows);
  }

  @Get(':id/events')
  async events(
    @Param('id') id: string,
    @Headers('authorization') authorization?: string,
    @Headers('x-tenant-id') tenantId?: string
  ) {
    const context = await this.context(authorization, tenantId);
    return this.db.tenant(context.tenantId, async db => {
      const appeal = (
        await db.query<{ id: string }>(
          'SELECT id FROM safety_case_appeals WHERE id=$1 AND tenant_id=$2',
          [id, context.tenantId]
        )
      ).rows[0];
      if (!appeal) throw new NotFoundException('safety_appeal_not_found');

      return (
        await db.query(
          `SELECT id,
                  actor_identity_id AS "actorIdentityId",
                  from_status AS "fromStatus",
                  to_status AS "toStatus",
                  note,
                  created_at AS "createdAt"
             FROM safety_case_appeal_events
            WHERE appeal_id=$1 AND tenant_id=$2
            ORDER BY created_at, id`,
          [id, context.tenantId]
        )
      ).rows;
    });
  }

  @Post(':id/status')
  async status(
    @Param('id') id: string,
    @Body() body: { status?: string; note?: string },
    @Headers('authorization') authorization?: string,
    @Headers('x-tenant-id') tenantId?: string
  ) {
    const context = await this.context(authorization, tenantId);
    if (!body.status || !appealStatuses.includes(body.status as SafetyAppealStatus)) {
      throw new BadRequestException('safety_appeal_status_invalid');
    }
    const next = body.status as SafetyAppealStatus;
    const note = body.note?.trim() || null;
    if (note && note.length > 2000) throw new BadRequestException('safety_appeal_note_invalid');

    return this.db.tenant(context.tenantId, async db => {
      const appeal = (
        await db.query<{ id: string }>(
          'SELECT id FROM safety_case_appeals WHERE id=$1 AND tenant_id=$2 FOR UPDATE',
          [id, context.tenantId]
        )
      ).rows[0];
      if (!appeal) throw new NotFoundException('safety_appeal_not_found');

      const current = (
        await db.query<{ status: SafetyAppealStatus }>(
          `SELECT COALESCE((
             SELECT to_status
               FROM safety_case_appeal_events
              WHERE appeal_id=$1 AND tenant_id=$2
              ORDER BY created_at DESC, id DESC
              LIMIT 1
           ), 'submitted') AS status`,
          [id, context.tenantId]
        )
      ).rows[0]?.status ?? 'submitted';

      const transition = safetyAppealTransition(current, next);
      if (transition === 'same') return { id, status: current, changed: false };
      if (transition === 'conflict') throw new ConflictException('safety_appeal_transition_invalid');

      await db.query(
        `INSERT INTO safety_case_appeal_events(
           tenant_id,appeal_id,actor_identity_id,from_status,to_status,note
         ) VALUES($1,$2,$3,$4,$5,$6)`,
        [context.tenantId, id, context.identity.id, current, next, note]
      );

      return { id, status: next, changed: true };
    });
  }
}
