import { BadRequestException, Controller, ForbiddenException, Get, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DatabaseService } from './database.service';

@Controller('company/analytics')
export class CompanyAnalyticsController {
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
  async get(@Headers('authorization') authorization?: string, @Headers('x-tenant-id') tenantId?: string) {
    const tenant = await this.context(authorization, tenantId);
    return this.db.tenant(tenant, async db => {
      const row = (await db.query<{
        jobsCreated: number;
        openJobs: number;
        jobsWithInterest: number;
        jobsWithConfirmation: number;
        completedAssignments: number;
        cancelledAssignments: number;
      }>(
        `SELECT
           (SELECT count(*)::int FROM company_jobs j WHERE j.tenant_id=$1) AS "jobsCreated",
           (SELECT count(*)::int FROM company_jobs j WHERE j.tenant_id=$1 AND j.status='open') AS "openJobs",
           (SELECT count(*)::int
              FROM company_jobs j
             WHERE j.tenant_id=$1
               AND EXISTS (SELECT 1 FROM marketplace_interests mi WHERE mi.job_id=j.id)) AS "jobsWithInterest",
           (SELECT count(*)::int
              FROM company_jobs j
             WHERE j.tenant_id=$1
               AND EXISTS (
                 SELECT 1 FROM work_assignments wa
                  WHERE wa.tenant_id=$1
                    AND wa.job_id=j.id
                    AND wa.status IN ('confirmed','checked_in','in_progress','checked_out','completed')
               )) AS "jobsWithConfirmation",
           (SELECT count(*)::int FROM work_assignments wa WHERE wa.tenant_id=$1 AND wa.status='completed') AS "completedAssignments",
           (SELECT count(*)::int FROM work_assignments wa WHERE wa.tenant_id=$1 AND wa.status='cancelled') AS "cancelledAssignments"`,
        [tenant]
      )).rows[0] ?? {
        jobsCreated: 0,
        openJobs: 0,
        jobsWithInterest: 0,
        jobsWithConfirmation: 0,
        completedAssignments: 0,
        cancelledAssignments: 0
      };

      const interestToConfirmationRate = row.jobsWithInterest > 0
        ? Math.round((row.jobsWithConfirmation / row.jobsWithInterest) * 100)
        : null;
      const resolvedAssignments = row.completedAssignments + row.cancelledAssignments;
      const assignmentCompletionRate = resolvedAssignments > 0
        ? Math.round((row.completedAssignments / resolvedAssignments) * 100)
        : null;

      return {
        ...row,
        interestToConfirmationRate,
        assignmentCompletionRate,
        definitions: {
          interestToConfirmationRate: 'jobsWithConfirmation / jobsWithInterest',
          assignmentCompletionRate: 'completedAssignments / (completedAssignments + cancelledAssignments)'
        }
      };
    });
  }
}
