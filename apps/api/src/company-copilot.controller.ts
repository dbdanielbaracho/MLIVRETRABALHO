import { BadRequestException, Controller, ForbiddenException, Get, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DatabaseService } from './database.service';
import { buildOperationalAlerts } from './operational-copilot';

@Controller('company/copilot')
export class CompanyCopilotController {
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
  async get(
    @Headers('authorization') authorization?: string,
    @Headers('x-tenant-id') tenantId?: string
  ) {
    const tenant = await this.context(authorization, tenantId);
    return this.db.tenant(tenant, async db => {
      const jobs = (
        await db.query<{
          id: string;
          title: string;
          startsAt: string | null;
          interestCount: number;
          confirmedCount: number;
          activeCount: number;
        }>(
          `SELECT
             j.id,
             j.title,
             j.starts_at AS "startsAt",
             (SELECT count(*)::int FROM marketplace_interests mi WHERE mi.job_id=j.id AND mi.status IN ('interested','confirmed')) AS "interestCount",
             (SELECT count(*)::int FROM work_assignments wa WHERE wa.tenant_id=$1 AND wa.job_id=j.id AND wa.status='confirmed') AS "confirmedCount",
             (SELECT count(*)::int FROM work_assignments wa WHERE wa.tenant_id=$1 AND wa.job_id=j.id AND wa.status IN ('checked_in','in_progress','checked_out')) AS "activeCount"
           FROM company_jobs j
           WHERE j.tenant_id=$1 AND j.status='open'`,
          [tenant]
        )
      ).rows;

      const replacements = (
        await db.query<{ id: string; assignmentId: string; title: string }>(
          `SELECT rr.id,rr.assignment_id AS "assignmentId",j.title
             FROM replacement_requests rr
             JOIN work_assignments wa ON wa.id=rr.assignment_id AND wa.tenant_id=rr.tenant_id
             JOIN company_jobs j ON j.id=wa.job_id AND j.tenant_id=rr.tenant_id
            WHERE rr.tenant_id=$1 AND rr.status='open'`,
          [tenant]
        )
      ).rows;

      return {
        engine: 'deterministic_v1',
        generatedAt: new Date().toISOString(),
        alerts: buildOperationalAlerts(jobs, replacements)
      };
    });
  }
}
