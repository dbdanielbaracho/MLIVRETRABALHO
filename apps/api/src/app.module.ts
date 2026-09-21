import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { JobsController } from './jobs.controller';
import { AuthController } from './auth.controller';
import { MeController } from './me.controller';
import { DatabaseService } from './database.service';
import { AuthService } from './auth.service';
import { ProfessionalProfileController } from './professional-profile.controller';
import { WorkAssignmentsController } from './work-assignments.controller';
import { EarningsController } from './earnings.controller';
import { WorkPassportController } from './work-passport.controller';
import { RatingsController } from './ratings.controller';
import { CompanyJobsController } from './company-jobs.controller';
@Module({ controllers: [HealthController, JobsController, AuthController, MeController, ProfessionalProfileController, WorkAssignmentsController, EarningsController, WorkPassportController, RatingsController, CompanyJobsController], providers:[DatabaseService,AuthService] })
export class AppModule {}
