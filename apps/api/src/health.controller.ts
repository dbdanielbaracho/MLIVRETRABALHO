import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get('ready')
  ready(): { status: 'ok'; service: 'api'; version: string } {
    return {
      status: 'ok',
      service: 'api',
      version: process.env.APP_VERSION ?? '0.1.0',
    };
  }
}
