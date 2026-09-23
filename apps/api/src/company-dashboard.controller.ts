import { BadRequestException, ForbiddenException, Controller, Get, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DatabaseService } from './database.service';

@Controller('company/dashboard')
export class CompanyDashboardController {
  constructor(private readonly db: DatabaseService, private readonly auth: AuthService) {}

  private async context(authorization?: string, tenantId?: string) {
    const identity = await this.auth.identityFromAuthorization(authorization);
    if (!tenantId) throw new BadRequestException('tenant_required');
    const membership = await this.auth.requireMembership(identity.id, tenantId);
    if (!['owner', 'admin', 'manager', 'company'].includes(membership.role)) {
      throw new ForbiddenException('company_role_required');
    }
    return { identity, tenantId };
  }

  @Get()
  async get(@Headers('authorization') authorization?: string, @Headers('x-tenant-id') tenantId?: string) {
    const c = await this.context(authorization, tenantId);
    return this.db.tenant(c.tenantId, async db => {
      const r = await db.query<{ open: string; confirmed: string; active: string; completed: string }>(
        "SELECT (SELECT count(*) FROM company_jobs WHERE status='open')::text open,(SELECT count(*) FROM work_assignments WHERE status='confirmed')::text confirmed,(SELECT count(*) FROM work_assignments WHERE status IN('checked_in','in_progress'))::text active,(SELECT count(*) FROM work_assignments WHERE status='completed')::text completed"
      );
      const x = r.rows[0] ?? { open: '0', confirmed: '0', active: '0', completed: '0' };
      return {
        openJobs: Number(x.open),
        confirmedWorkers: Number(x.confirmed),
        activeWorkers: Number(x.active),
        completedAssignments: Number(x.completed)
      };
    });
  }

  @Get('completed')
  async completed(@Headers('authorization') authorization?: string, @Headers('x-tenant-id') tenantId?: string) {
    const c = await this.context(authorization, tenantId);
    return this.db.tenant(c.tenantId, async db => {
      const r = await db.query(
        `SELECT wa.id,
                j.title,
                j.location,
                p.display_name AS "professionalName",
                wa.completed_at AS "completedAt",
                wr.score AS "ratingScore",
                wr.comment AS "ratingComment"
           FROM work_assignments wa
           JOIN company_jobs j ON j.id=wa.job_id
           JOIN professional_profiles p ON p.id=wa.professional_id
      LEFT JOIN work_ratings wr ON wr.assignment_id=wa.id AND wr.rater_identity_id=$1
          WHERE wa.status='completed'
       ORDER BY wa.completed_at DESC NULLS LAST, wa.confirmed_at DESC
          LIMIT 25`,
        [c.identity.id]
      );
      return r.rows;
    });
  }
}
