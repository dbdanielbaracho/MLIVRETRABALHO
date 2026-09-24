import { BadRequestException, ForbiddenException, Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DatabaseService } from './database.service';
import { canAccessAssignmentSafetyCase } from './safety-access-policy';

const categories = ['harassment', 'violence', 'fraud', 'discrimination', 'unsafe_work', 'other'];

@Controller('safety-cases')
export class SafetyCasesController {
  constructor(private readonly db: DatabaseService, private readonly auth: AuthService) {}

  private async context(authorization?: string, tenantId?: string) {
    const identity = await this.auth.identityFromAuthorization(authorization);
    if (!tenantId) throw new BadRequestException('tenant_required');
    await this.auth.requireMembership(identity.id, tenantId);
    return { identity, tenantId };
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
          `SELECT sc.id,
                  sc.assignment_id AS "assignmentId",
                  sc.category,
                  sc.description,
                  sc.status,
                  sc.created_at AS "createdAt",
                  sc.resolved_at AS "resolvedAt",
                  (sc.reporter_identity_id=$1) AS "reportedByMe"
             FROM safety_cases sc
             LEFT JOIN work_assignments wa ON wa.id=sc.assignment_id AND wa.tenant_id=sc.tenant_id
             LEFT JOIN professional_profiles p ON p.id=wa.professional_id
            WHERE sc.tenant_id=$2
              AND (sc.reporter_identity_id=$1 OR p.identity_id=$1)
            ORDER BY sc.created_at DESC`,
          [identity.id, currentTenant]
        )
      ).rows);
      all.push(...rows.map(row => ({ ...row, tenantId: currentTenant })));
    }

    return all.sort((a, b) => String(b.createdAt ?? '').localeCompare(String(a.createdAt ?? '')));
  }

  @Post()
  async create(
    @Body() body: { assignmentId?: string; category?: string; description?: string },
    @Headers('authorization') authorization?: string,
    @Headers('x-tenant-id') tenantId?: string
  ) {
    const context = await this.context(authorization, tenantId);
    const description = body.description?.trim();
    if (!body.category || !categories.includes(body.category) || !description || description.length > 4000) {
      throw new BadRequestException('safety_case_invalid');
    }

    return this.db.tenant(context.tenantId, async db => {
      if (body.assignmentId) {
        const assignment = (
          await db.query<{ professionalIdentityId: string }>(
            'SELECT p.identity_id AS "professionalIdentityId" FROM work_assignments wa JOIN professional_profiles p ON p.id=wa.professional_id WHERE wa.id=$1 AND wa.tenant_id=$2',
            [body.assignmentId, context.tenantId]
          )
        ).rows[0];
        if (!assignment) throw new BadRequestException('assignment_not_found');

        const membership = await db.query<{ role: string }>(
          'SELECT role FROM tenant_memberships WHERE identity_id=$1 AND tenant_id=$2',
          [context.identity.id, context.tenantId]
        );
        if (!canAccessAssignmentSafetyCase(context.identity.id, assignment.professionalIdentityId, membership.rows[0]?.role)) {
          throw new ForbiddenException('assignment_access_denied');
        }
      }

      return (
        await db.query(
          'INSERT INTO safety_cases(tenant_id,reporter_identity_id,assignment_id,category,description) VALUES($1,$2,$3,$4,$5) RETURNING id,category,status,created_at AS "createdAt"',
          [context.tenantId, context.identity.id, body.assignmentId ?? null, body.category, description]
        )
      ).rows[0];
    });
  }
}
