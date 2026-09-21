import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { JobsController } from './jobs.controller';
import { AuthController } from './auth.controller';
@Module({ controllers: [HealthController, JobsController, AuthController] })
export class AppModule {}
