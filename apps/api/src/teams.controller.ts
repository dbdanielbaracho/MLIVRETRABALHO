import { BadRequestException, ForbiddenException, Body, Controller, Delete, Get, Headers, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DatabaseService } from './database.service';

@Controller('company/teams')
export class TeamsController {
  constructor(private readonly db: DatabaseService, private readonly auth: AuthService) {}

  private async ctx(a?: string, t?: string) {
    const identity = await this.auth.identityFromAuthorization(a);
    if (!t) throw new BadRequestException('tenant_required');
    const membership = await this.auth.requireMembership(identity.id, t);
    if (!['owner', 'admin', 'manager', 'company'].includes(membership.role)) throw new ForbiddenException('company_role_required');
    return t;
  }

  private async requireTeam(db: { query: (sql: string, params?: unknown[]) => Promise<{ rows: unknown[] }> }, tenant: string, id: string) {
    const team = (await db.query('SELECT 1 FROM workforce_teams WHERE tenant_id=$1 AND id=$2', [tenant, id])).rows[0];
    if (!team) throw new BadRequestException('team_not_found');
  }

  @Get()
  async list(@Headers('authorization') a?: string, @Headers('x-tenant-id') t?: string) {
    const tenant = await this.ctx(a, t);
    return this.db.tenant(tenant, async db => (
      await db.query(
        `SELECT wt.id,wt.name,count(wtm.professional_id)::int AS "memberCount"
         FROM workforce_teams wt
         LEFT JOIN workforce_team_members wtm ON wtm.team_id=wt.id AND wtm.tenant_id=wt.tenant_id
         WHERE wt.tenant_id=$1
         GROUP BY wt.id
         ORDER BY wt.name`,
        [tenant]
      )
    ).rows);
  }

  @Get(':id/members')
  async members(@Param('id') id: string, @Headers('authorization') a?: string, @Headers('x-tenant-id') t?: string) {
    const tenant = await this.ctx(a, t);
    return this.db.tenant(tenant, async db => {
      await this.requireTeam(db, tenant, id);
      return (await db.query(
        `SELECT wtm.professional_id AS "professionalId",
                p.display_name AS "displayName",
                p.primary_role AS "primaryRole",
                p.home_city AS "homeCity"
           FROM workforce_team_members wtm
           JOIN professional_profiles p ON p.id=wtm.professional_id
          WHERE wtm.tenant_id=$1 AND wtm.team_id=$2
          ORDER BY p.display_name`,
        [tenant, id]
      )).rows;
    });
  }

  @Post()
  async create(@Body() body: { name?: string }, @Headers('authorization') a?: string, @Headers('x-tenant-id') t?: string) {
    const tenant = await this.ctx(a, t);
    const name = body.name?.trim();
    if (!name) throw new BadRequestException('team_name_required');
    return this.db.tenant(tenant, async db => (
      await db.query('INSERT INTO workforce_teams(tenant_id,name) VALUES($1,$2) RETURNING id,name', [tenant, name])
    ).rows[0]);
  }

  @Post(':id/members')
  async add(
    @Param('id') id: string,
    @Body() body: { professionalId?: string },
    @Headers('authorization') a?: string,
    @Headers('x-tenant-id') t?: string
  ) {
    const tenant = await this.ctx(a, t);
    if (!body.professionalId) throw new BadRequestException('professional_required');
    return this.db.tenant(tenant, async db => {
      await this.requireTeam(db, tenant, id);

      const professional = (await db.query(
        'SELECT 1 FROM work_assignments WHERE tenant_id=$1 AND professional_id=$2 LIMIT 1',
        [tenant, body.professionalId]
      )).rows[0];
      if (!professional) throw new BadRequestException('professional_not_found');

      return (await db.query(
        `INSERT INTO workforce_team_members(team_id,professional_id,tenant_id)
         VALUES($1,$2,$3)
         ON CONFLICT DO NOTHING
         RETURNING team_id AS "teamId",professional_id AS "professionalId"`,
        [id, body.professionalId, tenant]
      )).rows[0] ?? { teamId: id, professionalId: body.professionalId };
    });
  }

  @Delete(':id/members/:professionalId')
  async remove(
    @Param('id') id: string,
    @Param('professionalId') professionalId: string,
    @Headers('authorization') a?: string,
    @Headers('x-tenant-id') t?: string
  ) {
    const tenant = await this.ctx(a, t);
    return this.db.tenant(tenant, async db => {
      await this.requireTeam(db, tenant, id);
      await db.query(
        'DELETE FROM workforce_team_members WHERE tenant_id=$1 AND team_id=$2 AND professional_id=$3',
        [tenant, id, professionalId]
      );
      return { removed: true };
    });
  }
}
