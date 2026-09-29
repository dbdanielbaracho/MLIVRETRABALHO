import { BadRequestException, Body, Controller, Headers, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DatabaseService } from './database.service';
import { CopilotMode, copilotPolicy } from './copilot';
import { allowedCopilotTools, requestedCopilotTool } from './copilot-tools';

const modes = new Set<CopilotMode>(['manual', 'assisted', 'automatic']);
const companyRoles = new Set(['owner', 'admin', 'manager', 'company']);

@Controller('copilot')
export class CopilotController {
  constructor(private readonly auth: AuthService, private readonly db: DatabaseService) {}

  @Post('read')
  async read(@Body() body:{tool?:string},@Headers('authorization') authorization?:string,@Headers('x-tenant-id') tenantId?:string){
    const identity=await this.auth.identityFromAuthorization(authorization);const memberships=await this.auth.memberships(identity.id);const accountType:'company'|'professional'=memberships.some(m=>companyRoles.has(m.role))?'company':'professional';const allowed=allowedCopilotTools(accountType);if(!body.tool||!allowed.includes(body.tool as any))throw new BadRequestException('copilot_tool_not_allowed');
    if(accountType==='company'){if(!tenantId)throw new BadRequestException('tenant_required');await this.auth.requireMembership(identity.id,tenantId);return this.db.tenant(tenantId,async db=>body.tool==='company_dashboard'?(await db.query("SELECT (SELECT count(*)::int FROM company_jobs WHERE tenant_id=$1 AND status='open') AS \"openJobs\",(SELECT count(*)::int FROM work_assignments WHERE tenant_id=$1 AND status='confirmed') AS \"confirmedWorkers\",(SELECT count(*)::int FROM work_assignments WHERE tenant_id=$1 AND status IN('checked_in','in_progress')) AS \"activeWorkers\"",[tenantId])).rows[0]:(await db.query('SELECT id,title,status,starts_at AS "startsAt",ends_at AS "endsAt" FROM company_jobs WHERE tenant_id=$1 ORDER BY starts_at ASC NULLS LAST LIMIT 50',[tenantId])).rows)}
    const p=(await this.db.query<{id:string}>('SELECT id FROM professional_profiles WHERE identity_id=$1',[identity.id])).rows[0];if(!p)throw new BadRequestException('professional_profile_required');if(body.tool==='my_support_cases'){const tenantIds=[...new Set(memberships.map(m=>m.tenant_id))];const out=[] as unknown[];for(const t of tenantIds)out.push(...await this.db.tenant(t,async db=>(await db.query('SELECT id,category,priority,status,created_at AS "createdAt" FROM support_cases WHERE tenant_id=$1 AND reporter_identity_id=$2 ORDER BY created_at DESC LIMIT 25',[t,identity.id])).rows));return out}return (await this.db.query('SELECT mj.job_id AS id,mj.title,mj.starts_at AS "startsAt",mj.ends_at AS "endsAt",mj.work_city AS "workCity" FROM marketplace_jobs mj WHERE mj.status=$2 AND mj.starts_at>=now() AND EXISTS(SELECT 1 FROM professional_availability_network pa WHERE pa.professional_id=$1 AND pa.starts_at<=mj.starts_at AND pa.ends_at>=mj.ends_at) ORDER BY mj.starts_at LIMIT 25',[p.id,'open'])).rows;
  }

  @Post('interpret')
  async interpret(
    @Body() body: { text?: string; mode?: CopilotMode },
    @Headers('authorization') authorization?: string,
  ) {
    const identity = await this.auth.identityFromAuthorization(authorization);
    const text = body.text?.trim();
    if (!text || text.length > 2000) throw new BadRequestException('copilot_text_invalid');
    if (body.mode && !modes.has(body.mode)) throw new BadRequestException('copilot_mode_invalid');

    const memberships = await this.auth.memberships(identity.id);
    const accountType: 'company'|'professional' = memberships.some(m => companyRoles.has(m.role)) ? 'company' : 'professional';

    return {
      ...copilotPolicy({ text, accountType, mode: body.mode ?? 'assisted' }),
      accountType,
      provider: 'deterministic_baseline',
      providerConfigured: false,
      allowedTools: allowedCopilotTools(accountType),
      suggestedTool: requestedCopilotTool(text,accountType),
      toolExecution: 'read_only_explicit',
      disclaimer: 'Sugestão assistida. Nenhuma ação crítica é executada automaticamente.'
    };
  }
}
