import { BadRequestException, Body, Controller, ForbiddenException, Headers, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DatabaseService } from './database.service';
import { canRate, isValidRatingScore } from './rating-policy';

const record=(x:unknown):x is Record<string,unknown>=>!!x&&typeof x==='object'&&!Array.isArray(x);
const uuid=(x:string)=>/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(x);

@Controller('assignments')
export class RatingsController {
  constructor(private readonly db: DatabaseService, private readonly auth: AuthService) {}

  private validateScore(body: unknown) {
    if (!record(body) || !isValidRatingScore(body.score)) throw new BadRequestException('rating_score_invalid');
    return body.score;
  }

  private validateComment(body: unknown) {
    const comment=record(body)?body.comment:undefined;
    if (comment!=null && typeof comment!=='string') throw new BadRequestException('rating_comment_invalid');
    return typeof comment==='string'?comment.trim()||null:null;
  }

  private validateId(id: string) {
    if (!uuid(id)) throw new BadRequestException('rating_assignment_invalid');
  }

  @Post(':id/rating')
  async rateProfessional(
    @Param('id') id: string,
    @Body() body: unknown,
    @Headers('authorization') authorization?: string,
    @Headers('x-tenant-id') tenantId?: string
  ) {
    const identity = await this.auth.identityFromAuthorization(authorization);
    if (!tenantId) throw new BadRequestException('tenant_required');
    const membership = await this.auth.requireMembership(identity.id, tenantId);
    const score=this.validateScore(body);
    if (!canRate('professional', membership.role)) throw new ForbiddenException('company_role_required');
    const comment=this.validateComment(body);this.validateId(id);

    return this.db.tenant(tenantId, async db => {
      const assignment = (
        await db.query<{ professional_id: string }>(
          'SELECT professional_id FROM work_assignments WHERE id=$1 AND status=$2 AND tenant_id=$3',
          [id, 'completed', tenantId]
        )
      ).rows[0];
      if (!assignment) throw new BadRequestException('completed_assignment_required');
      const r = await db.query(
        'INSERT INTO work_ratings(tenant_id,assignment_id,rater_identity_id,professional_id,score,comment) VALUES($1,$2,$3,$4,$5,$6) ON CONFLICT(assignment_id,rater_identity_id) DO UPDATE SET score=EXCLUDED.score,comment=EXCLUDED.comment RETURNING id,score,comment,created_at AS "createdAt"',
        [tenantId, id, identity.id, assignment.professional_id, score, comment]
      );
      return r.rows[0];
    });
  }

  @Post(':id/company-rating')
  async rateCompany(
    @Param('id') id: string,
    @Body() body: unknown,
    @Headers('authorization') authorization?: string,
    @Headers('x-tenant-id') tenantId?: string
  ) {
    const identity = await this.auth.identityFromAuthorization(authorization);
    if (!tenantId) throw new BadRequestException('tenant_required');
    const membership = await this.auth.requireMembership(identity.id, tenantId);
    const score=this.validateScore(body);
    if (!canRate('company', membership.role)) throw new ForbiddenException('professional_role_required');
    const comment=this.validateComment(body);this.validateId(id);

    return this.db.tenant(tenantId, async db => {
      const assignment = (
        await db.query<{ professionalId: string }>(
          'SELECT wa.professional_id AS "professionalId" FROM work_assignments wa JOIN professional_profiles p ON p.id=wa.professional_id WHERE wa.id=$1 AND wa.status=$2 AND wa.tenant_id=$3 AND p.identity_id=$4',
          [id, 'completed', tenantId, identity.id]
        )
      ).rows[0];
      if (!assignment) throw new BadRequestException('completed_assignment_required');

      const r = await db.query(
        'INSERT INTO company_work_ratings(tenant_id,assignment_id,rater_identity_id,professional_id,score,comment) VALUES($1,$2,$3,$4,$5,$6) ON CONFLICT(assignment_id,rater_identity_id) DO UPDATE SET score=EXCLUDED.score,comment=EXCLUDED.comment,updated_at=now() RETURNING id,score,comment,created_at AS "createdAt",updated_at AS "updatedAt"',
        [tenantId, id, identity.id, assignment.professionalId, score, comment]
      );
      return r.rows[0];
    });
  }
}
