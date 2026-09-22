import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Controller('health')
export class HealthController {
  constructor(private readonly db:DatabaseService){}

  @Get('ready')
  async ready(): Promise<{ status: 'ok'; service: 'api'; version: string; database: 'ok' }> {
    try{
      await this.db.query('SELECT 1');
    }catch{
      throw new ServiceUnavailableException('database_unavailable');
    }
    return {
      status: 'ok',
      service: 'api',
      version: process.env.APP_VERSION ?? '0.1.0',
      database: 'ok',
    };
  }
}
