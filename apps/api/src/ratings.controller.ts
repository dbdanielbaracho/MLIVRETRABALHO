import { BadRequestException, Body, Controller, ForbiddenException, Headers, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DatabaseService } from './database.service';

@Controller('assignments')
export class RatingsController {
  constructor(private readonly db: DatabaseService, private readonly auth: AuthService) {}

  @Post(':id/rating')
  async rate(
    @Param('id') id: string,
    @Body() body: { score?: number; comment?: string },
    @Headers('authorization') authorization?: string,
    @Headers('x-tenant-id') tenantId?: string
  ) {
    const identity = await this.auth.identityFromAuthorization(authorization);
    if (!tenantId) throw new BadRequestException('tenant_required');
    const membership = await this.auth.requireMembership(identity.id, tenantId);
    if (!Number.isInteger(body.score) || body.score! < 1 || body.score! > 5) {
      throw new BadRequestException('rating_score_invalid');
    }
    if (!['owner', 'admin', 'manager', 'company'].includes(membership.role)) {
      throw new ForbiddenException('company_role_required');
    }
    return this.db.tenant(tenantId, async db => {
      const assignment = (
        await db.query<{ professional_id: string }>(
          'SELECT professional_id FROM work_assignments WHERE id=$1 AND status=$2',
          [id, 'completed']
        )
      ).rows[0];
      if (!assignment) throw new BadRequestException('completed_assignment_required');
      const r = await db.query(
        'INSERT INTO work_ratings(tenant_id,assignment_id,rater_identity_id,professional_id,score,comment) VALUES($1,$2,$3,$4,$5,$6) ON CONFLICT(assignment_id,rater_identity_id) DO UPDATE SET score=EXCLUDED.score,comment=EXCLUDED.comment RETURNING id,score,comment,created_at AS "createdAt"',
        [tenantId, id, identity.id, assignment.professional_id, body.score, body.comment?.trim() || null]
      );
      return r.rows[0];
    });
  }
}
