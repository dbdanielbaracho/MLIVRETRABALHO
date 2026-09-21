import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { JobsController } from './jobs.controller';
import { AuthController } from './auth.controller';
import { MeController } from './me.controller';
import { DatabaseService } from './database.service';
import { AuthService } from './auth.service';
@Module({ controllers: [HealthController, JobsController, AuthController, MeController], providers:[DatabaseService,AuthService] })
export class AppModule {}
