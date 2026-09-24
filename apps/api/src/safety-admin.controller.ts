import { BadRequestException, ForbiddenException, NotFoundException, Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DatabaseService } from './database.service';

const statuses = ['open', 'reviewing', 'resolved', 'dismissed'];

@Controller('company/safety-cases')
export class SafetyAdminController {
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
        'SELECT id,assignment_id AS "assignmentId",category,description,status,created_at AS "createdAt",resolved_at AS "resolvedAt" FROM safety_cases WHERE tenant_id=$1 ORDER BY created_at DESC LIMIT 200',
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
      const safetyCase = (
        await db.query('SELECT id FROM safety_cases WHERE id=$1 AND tenant_id=$2', [id, context.tenantId])
      ).rows[0];
      if (!safetyCase) throw new NotFoundException('safety_case_not_found');

      return (
        await db.query(
          'SELECT id,actor_identity_id AS "actorIdentityId",from_status AS "fromStatus",to_status AS "toStatus",note,created_at AS "createdAt" FROM safety_case_events WHERE safety_case_id=$1 AND tenant_id=$2 ORDER BY created_at,id',
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
    if (!body.status || !statuses.includes(body.status)) throw new BadRequestException('safety_status_invalid');
    const note = body.note?.trim() || null;
    if (note && note.length > 2000) throw new BadRequestException('safety_note_invalid');

    return this.db.tenant(context.tenantId, async db => {
      const current = (
        await db.query<{ id: string; status: string; resolvedAt: string | null }>(
          'SELECT id,status,resolved_at AS "resolvedAt" FROM safety_cases WHERE id=$1 AND tenant_id=$2 FOR UPDATE',
          [id, context.tenantId]
        )
      ).rows[0];
      if (!current) throw new NotFoundException('safety_case_not_found');
      if (current.status === body.status) return { ...current, changed: false };

      const updated = (
        await db.query<{ id: string; status: string; resolvedAt: string | null }>(
          "UPDATE safety_cases SET status=$2,resolved_at=CASE WHEN $2 IN ('resolved','dismissed') THEN now() ELSE NULL END WHERE id=$1 AND tenant_id=$3 RETURNING id,status,resolved_at AS \"resolvedAt\"",
          [id, body.status, context.tenantId]
        )
      ).rows[0];

      await db.query(
        'INSERT INTO safety_case_events(tenant_id,safety_case_id,actor_identity_id,from_status,to_status,note) VALUES($1,$2,$3,$4,$5,$6)',
        [context.tenantId, id, context.identity.id, current.status, body.status, note]
      );

      return { ...updated, changed: true };
    });
  }
}
