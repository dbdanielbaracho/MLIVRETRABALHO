import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { JobsController } from './jobs.controller';
import { AuthController } from './auth.controller';
import { DatabaseService } from './database.service';
@Module({ controllers: [HealthController, JobsController, AuthController], providers:[DatabaseService] })
export class AppModule {}
