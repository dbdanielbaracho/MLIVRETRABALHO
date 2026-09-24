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
    return tenantId;
  }

  @Get()
  async list(
    @Headers('authorization') authorization?: string,
    @Headers('x-tenant-id') tenantId?: string
  ) {
    const tenant = await this.context(authorization, tenantId);
    return this.db.tenant(tenant, async db => (
      await db.query(
        'SELECT id,assignment_id AS "assignmentId",category,description,status,created_at AS "createdAt",resolved_at AS "resolvedAt" FROM safety_cases WHERE tenant_id=$1 ORDER BY created_at DESC LIMIT 200',
        [tenant]
      )
    ).rows);
  }

  @Post(':id/status')
  async status(
    @Param('id') id: string,
    @Body() body: { status?: string },
    @Headers('authorization') authorization?: string,
    @Headers('x-tenant-id') tenantId?: string
  ) {
    const tenant = await this.context(authorization, tenantId);
    if (!body.status || !statuses.includes(body.status)) throw new BadRequestException('safety_status_invalid');

    return this.db.tenant(tenant, async db => {
      const updated = (
        await db.query(
          "UPDATE safety_cases SET status=$2,resolved_at=CASE WHEN $2 IN ('resolved','dismissed') THEN now() ELSE NULL END WHERE id=$1 AND tenant_id=$3 RETURNING id,status,resolved_at AS \"resolvedAt\"",
          [id, body.status, tenant]
        )
      ).rows[0];
      if (!updated) throw new NotFoundException('safety_case_not_found');
      return updated;
    });
  }
}
