import { BadRequestException, Body, Controller, Headers, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CopilotMode, copilotPolicy } from './copilot';

const modes = new Set<CopilotMode>(['manual', 'assisted', 'automatic']);
const companyRoles = new Set(['owner', 'admin', 'manager', 'company']);

@Controller('copilot')
export class CopilotController {
  constructor(private readonly auth: AuthService) {}

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
    const accountType = memberships.some(m => companyRoles.has(m.role)) ? 'company' : 'professional';

    return {
      ...copilotPolicy({ text, accountType, mode: body.mode ?? 'assisted' }),
      accountType,
      provider: 'deterministic_baseline',
      providerConfigured: false,
      disclaimer: 'Sugestão assistida. Nenhuma ação crítica é executada automaticamente.'
    };
  }
}
