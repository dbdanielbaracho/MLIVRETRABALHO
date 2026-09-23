import { BadRequestException, ForbiddenException, Controller, Get, Headers, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DatabaseService } from './database.service';
import { rankCandidates } from './allocation';
import { reliabilityScore } from './reliability-score';
import { roleFit } from './role-fit';
import { cityDistanceKm } from './city-proximity';

@Controller('company/teams')
export class TeamAllocationController {
  constructor(private readonly db: DatabaseService, private readonly auth: AuthService) {}

  private async ctx(a?: string, t?: string) {
    const identity = await this.auth.identityFromAuthorization(a);
    if (!t) throw new BadRequestException('tenant_required');
    const membership = await this.auth.requireMembership(identity.id, t);
    if (!['owner', 'admin', 'manager', 'company'].includes(membership.role)) throw new ForbiddenException('company_role_required');
    return t;
  }

  @Get(':teamId/allocation/:jobId')
  async allocation(
    @Param('teamId') teamId: string,
    @Param('jobId') jobId: string,
    @Headers('authorization') a?: string,
    @Headers('x-tenant-id') t?: string
  ) {
    const tenant = await this.ctx(a, t);
    return this.db.tenant(tenant, async db => {
      const job = (await db.query<{
        requiredRole: string | null;
        title: string;
        workCity: string | null;
      }>(
        'SELECT required_role AS "requiredRole",title,work_city AS "workCity" FROM company_jobs WHERE tenant_id=$1 AND id=$2',
        [tenant, jobId]
      )).rows[0];
      if (!job) throw new BadRequestException('job_not_found');

      const team = (await db.query('SELECT 1 FROM workforce_teams WHERE tenant_id=$1 AND id=$2', [tenant, teamId])).rows[0];
      if (!team) throw new BadRequestException('team_not_found');

      const rows = (await db.query<{
        professionalId: string;
        primaryRole: string | null;
        homeCity: string | null;
        available: boolean;
        completed: number;
        cancelled: number;
        noShows: number;
        lateArrivals: number;
      }>(
        `SELECT
           wtm.professional_id AS "professionalId",
           p.primary_role AS "primaryRole",
           p.home_city AS "homeCity",
           EXISTS(
             SELECT 1
             FROM professional_availability_network pa
             JOIN company_jobs j ON j.tenant_id=$3 AND j.id=$2
             WHERE pa.professional_id=wtm.professional_id
               AND pa.starts_at<=j.starts_at
               AND pa.ends_at>=j.ends_at
           ) AS available,
           (SELECT count(*)::int FROM work_assignments wa WHERE wa.professional_id=wtm.professional_id AND wa.status='completed') completed,
           (SELECT count(*)::int FROM work_assignments wa WHERE wa.professional_id=wtm.professional_id AND wa.status='cancelled') cancelled,
           (SELECT count(*)::int FROM trust_events te WHERE te.professional_id=wtm.professional_id AND te.event_type='no_show') AS "noShows",
           (SELECT count(*)::int FROM trust_events te WHERE te.professional_id=wtm.professional_id AND te.event_type='late_arrival') AS "lateArrivals"
         FROM workforce_team_members wtm
         JOIN professional_profiles p ON p.id=wtm.professional_id
         WHERE wtm.tenant_id=$3 AND wtm.team_id=$1`,
        [teamId, jobId, tenant]
      )).rows;

      if (!rows.length) throw new BadRequestException('team_empty');

      return rankCandidates(rows.map(candidate => {
        const reliability = reliabilityScore({
          completed: candidate.completed,
          cancelled: candidate.cancelled,
          noShows: candidate.noShows,
          lateArrivals: candidate.lateArrivals
        });
        const distanceKm = cityDistanceKm(job.workCity, candidate.homeCity);
        return {
          professionalId: candidate.professionalId,
          match: {
            availability: candidate.available,
            roleFit: roleFit(job.requiredRole ?? job.title, candidate.primaryRole),
            reliability: reliability.score / 100,
            ...(distanceKm == null ? {} : { distanceKm })
          }
        };
      }));
    });
  }
}
