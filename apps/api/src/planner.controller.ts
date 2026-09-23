import { BadRequestException, Controller, ForbiddenException, Get, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DatabaseService } from './database.service';

@Controller('company/planner')
export class PlannerController {
  constructor(private readonly db: DatabaseService, private readonly auth: AuthService) {}

  private async context(authorization?: string, tenantId?: string) {
    const identity = await this.auth.identityFromAuthorization(authorization);
    if (!tenantId) throw new BadRequestException('tenant_required');
    const membership = await this.auth.requireMembership(identity.id, tenantId);
    if (!['owner', 'admin', 'manager', 'company'].includes(membership.role)) {
      throw new ForbiddenException('company_role_required');
    }
    return tenantId;
  }

  @Get()
  async list(@Headers('authorization') authorization?: string, @Headers('x-tenant-id') tenantId?: string) {
    const tenant = await this.context(authorization, tenantId);
    return this.db.tenant(tenant, async db => (
      await db.query(
        `SELECT
           j.id,
           j.title,
           j.required_role AS "requiredRole",
           j.status AS "jobStatus",
           j.location,
           j.work_city AS "workCity",
           j.starts_at AS "startsAt",
           j.ends_at AS "endsAt",
           j.pay_cents AS "payCents",
           (SELECT count(*)::int
              FROM marketplace_interests mi
             WHERE mi.job_id=j.id
               AND mi.status IN ('interested','confirmed')) AS "interestCount",
           (SELECT count(*)::int
              FROM work_assignments wa
             WHERE wa.tenant_id=$1
               AND wa.job_id=j.id
               AND wa.status='confirmed') AS "confirmedCount",
           (SELECT count(*)::int
              FROM work_assignments wa
             WHERE wa.tenant_id=$1
               AND wa.job_id=j.id
               AND wa.status IN ('checked_in','in_progress','checked_out')) AS "activeCount",
           (SELECT count(*)::int
              FROM work_assignments wa
             WHERE wa.tenant_id=$1
               AND wa.job_id=j.id
               AND wa.status='completed') AS "completedCount",
           (SELECT count(*)::int
              FROM work_assignments wa
             WHERE wa.tenant_id=$1
               AND wa.job_id=j.id
               AND wa.status='cancelled') AS "cancelledCount"
         FROM company_jobs j
         WHERE j.tenant_id=$1
         ORDER BY j.starts_at ASC NULLS LAST, j.created_at DESC`,
        [tenant]
      )
    ).rows);
  }
}
