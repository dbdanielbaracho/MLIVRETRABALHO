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
import { CompanyDashboardController } from './company-dashboard.controller';
import { CompanyAnalyticsController } from './company-analytics.controller';
import { AvailabilityController } from './availability.controller';
import { ReplacementController } from './replacement.controller';
import { TeamsController } from './teams.controller';
import { NotificationsController } from './notifications.controller';
import { ConversationsController } from './conversations.controller';
import { TrustEventsController } from './trust-events.controller';
import { PaymentEventsController } from './payment-events.controller';
import { TalentPoolsController } from './talent-pools.controller';
import { TeamAllocationController } from './team-allocation.controller';
import { PlannerController } from './planner.controller';
import { PaymentWebhookController } from './payment-webhook.controller';
import { SafetyCasesController } from './safety-cases.controller';
import { SafetyAdminController } from './safety-admin.controller';
import { SafetyAppealsAdminController, SafetyAppealsController } from './safety-appeals.controller';
import { CompanyJobCreateController } from './company-job-create.controller';
import { VerificationController } from './verification.controller';
import { CopilotController } from './copilot.controller';
import { PrivacyController } from './privacy.controller';
import { CompanyMembersController } from './company-members.controller';
import { TermsController } from './terms.controller';
import { TaxonomyController } from './taxonomy.controller';
import { WorkGraphController } from './work-graph.controller';
import { CareerConversionController } from './career-conversion.controller';
import { ProfessionalPlannerController } from './professional-planner.controller';
import { ProfessionalCapabilitiesController } from './professional-capabilities.controller';
import { IntegrityController } from './integrity.controller';
import { SupportController } from './support.controller';
import { CareerController } from './career.controller';
import { VerticalPacksController } from './vertical-packs.controller';
import { CancellationController } from './cancellation.controller';

@Module({
  controllers: [
    HealthController,
    JobsController,
    AuthController,
    MeController,
    ProfessionalProfileController,
    WorkAssignmentsController,
    EarningsController,
    WorkPassportController,
    RatingsController,
    CompanyJobsController,
    CompanyJobCreateController,
    CompanyDashboardController,
    CompanyAnalyticsController,
    CompanyMembersController,
    PlannerController,
    AvailabilityController,
    ReplacementController,
    TeamsController,
    NotificationsController,
    ConversationsController,
    TrustEventsController,
    PaymentEventsController,
    TalentPoolsController,
    TeamAllocationController,
    PaymentWebhookController,
    SafetyCasesController,
    SafetyAdminController,
    SafetyAppealsController,
    SafetyAppealsAdminController,
    VerificationController,
    CopilotController,
    PrivacyController,
    TermsController,
    TaxonomyController,
    WorkGraphController,
    CareerConversionController,
    ProfessionalPlannerController,
    ProfessionalCapabilitiesController,
    IntegrityController,
    SupportController,
    CareerController,
    VerticalPacksController,
    CancellationController
  ],
  providers: [DatabaseService, AuthService]
})
export class AppModule {}
