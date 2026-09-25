import { BadRequestException, Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DatabaseService } from './database.service';

type ManualPrivacyRequestType='correction'|'erasure'|'restriction'|'objection'|'consent_withdrawal'|'automated_decision_review'|'sharing_information'|'portability';
const MANUAL_REQUEST_TYPES=new Set<ManualPrivacyRequestType>(['correction','erasure','restriction','objection','consent_withdrawal','automated_decision_review','sharing_information','portability']);

@Controller('privacy')
export class PrivacyController {
  constructor(private readonly db:DatabaseService,private readonly auth:AuthService){}

  private async createRequest(identityId:string,requestType:string){
    return (await this.db.query<{id:string}>('INSERT INTO privacy_requests(identity_id,request_type,status) VALUES($1,$2,$3) RETURNING id',[identityId,requestType,'submitted'])).rows[0].id;
  }
  private async finishRequest(requestId:string,status:'completed'|'partially_completed'|'rejected',resolutionCode?:string){
    await this.db.query('UPDATE privacy_requests SET status=$2,resolution_code=$3,updated_at=now(),completed_at=now() WHERE id=$1',[requestId,status,resolutionCode??null]);
  }

  @Get('requests')
  async requests(@Headers('authorization') authorization?:string){
    const identity=await this.auth.identityFromAuthorization(authorization);
    return (await this.db.query('SELECT id,request_type AS "requestType",status,resolution_code AS "resolutionCode",created_at AS "createdAt",updated_at AS "updatedAt",completed_at AS "completedAt" FROM privacy_requests WHERE identity_id=$1 ORDER BY created_at DESC',[identity.id])).rows;
  }

  @Post('requests')
  async request(@Body() body:{requestType?:string},@Headers('authorization') authorization?:string){
    const identity=await this.auth.identityFromAuthorization(authorization);
    const requestType=String(body?.requestType??'') as ManualPrivacyRequestType;
    if(!MANUAL_REQUEST_TYPES.has(requestType))throw new BadRequestException('privacy_request_type_invalid');
    const requestId=await this.createRequest(identity.id,requestType);
    return {requestId,requestType,status:'submitted'};
  }

  @Get('export')
  async exportMine(@Headers('authorization') authorization?:string){
    const identity=await this.auth.identityFromAuthorization(authorization);
    const requestId=await this.createRequest(identity.id,'access');
    const identityRow=(await this.db.query<{id:string;email:string;createdAt:string}>(
      'SELECT id,email,created_at AS "createdAt" FROM identities WHERE id=$1',[identity.id]
    )).rows[0];
    const memberships=await this.auth.memberships(identity.id);
    const profile=(await this.db.query<{id:string;displayName:string;homeCity:string|null;primaryRole:string|null;createdAt:string;updatedAt:string}>(
      'SELECT id,display_name AS "displayName",home_city AS "homeCity",primary_role AS "primaryRole",created_at AS "createdAt",updated_at AS "updatedAt" FROM professional_profiles WHERE identity_id=$1',[identity.id]
    )).rows[0]??null;
    const availability=profile?(await this.db.query(
      'SELECT id,starts_at AS "startsAt",ends_at AS "endsAt",created_at AS "createdAt" FROM professional_availability_network WHERE professional_id=$1 ORDER BY starts_at',[profile.id]
    )).rows:[];

    const assignments:any[]=[],earnings:any[]=[],verifications:any[]=[],notifications:any[]=[],authoredMessages:any[]=[],ratingsReceived:any[]=[],ratingsAuthored:any[]=[],trustEvents:any[]=[],safetyReports:any[]=[],safetyRelated:any[]=[],appeals:any[]=[];
    for(const membership of memberships){
      const tenantId=membership.tenant_id;
      const tenantData=await this.db.tenant(tenantId,async db=>{
        const verificationRows=(await db.query('SELECT id,subject_type AS "subjectType",status,provider,provider_reference AS "providerReference",reason_code AS "reasonCode",created_at AS "createdAt",updated_at AS "updatedAt",verified_at AS "verifiedAt" FROM verification_cases WHERE tenant_id=$1 AND identity_id=$2 ORDER BY created_at',[tenantId,identity.id])).rows;
        const notificationRows=(await db.query('SELECT id,type,title,body,read_at AS "readAt",created_at AS "createdAt" FROM notifications WHERE tenant_id=$1 AND identity_id=$2 ORDER BY created_at',[tenantId,identity.id])).rows;
        const messageRows=(await db.query('SELECT id,conversation_id AS "conversationId",body,created_at AS "createdAt" FROM conversation_messages WHERE tenant_id=$1 AND sender_identity_id=$2 ORDER BY created_at',[tenantId,identity.id])).rows;
        const authoredProfessionalRatings=(await db.query('SELECT id,assignment_id AS "assignmentId",score,comment,created_at AS "createdAt",\'professional\'::text AS "ratingTarget" FROM work_ratings WHERE tenant_id=$1 AND rater_identity_id=$2 ORDER BY created_at',[tenantId,identity.id])).rows;
        const authoredCompanyRatings=(await db.query('SELECT id,assignment_id AS "assignmentId",score,comment,created_at AS "createdAt",\'company\'::text AS "ratingTarget" FROM company_work_ratings WHERE tenant_id=$1 AND rater_identity_id=$2 ORDER BY created_at',[tenantId,identity.id])).rows;
        const reportRows=(await db.query('SELECT id,assignment_id AS "assignmentId",category,description,status,created_at AS "createdAt",resolved_at AS "resolvedAt" FROM safety_cases WHERE tenant_id=$1 AND reporter_identity_id=$2 ORDER BY created_at',[tenantId,identity.id])).rows;
        const appealRows=(await db.query('SELECT id,safety_case_id AS "safetyCaseId",reason,created_at AS "createdAt" FROM safety_case_appeals WHERE tenant_id=$1 AND appellant_identity_id=$2 ORDER BY created_at',[tenantId,identity.id])).rows;
        if(!profile)return {assignmentRows:[],earningRows:[],receivedRatingRows:[],trustRows:[],relatedSafetyRows:[],verificationRows,notificationRows,messageRows,authoredRatingRows:[...authoredProfessionalRatings,...authoredCompanyRatings],reportRows,appealRows};
        const assignmentRows=(await db.query('SELECT id,job_id AS "jobId",status,confirmed_at AS "confirmedAt",checked_in_at AS "checkedInAt",checked_out_at AS "checkedOutAt",completed_at AS "completedAt" FROM work_assignments WHERE tenant_id=$1 AND professional_id=$2 ORDER BY confirmed_at',[tenantId,profile.id])).rows;
        const earningRows=(await db.query('SELECT id,assignment_id AS "assignmentId",amount_cents AS "amountCents",status,created_at AS "createdAt" FROM earnings_ledger WHERE tenant_id=$1 AND professional_id=$2 ORDER BY created_at',[tenantId,profile.id])).rows;
        const receivedRatingRows=(await db.query('SELECT id,assignment_id AS "assignmentId",score,created_at AS "createdAt" FROM work_ratings WHERE tenant_id=$1 AND professional_id=$2 ORDER BY created_at',[tenantId,profile.id])).rows;
        const trustRows=(await db.query('SELECT id,assignment_id AS "assignmentId",event_type AS "eventType",cause,occurred_at AS "occurredAt",created_at AS "createdAt",(reported_by_identity_id=$3) AS "reportedByMe",CASE WHEN reported_by_identity_id=$3 THEN notes ELSE NULL END AS "ownNotes" FROM trust_events WHERE tenant_id=$1 AND professional_id=$2 ORDER BY occurred_at',[tenantId,profile.id,identity.id])).rows;
        const relatedSafetyRows=(await db.query('SELECT sc.id,sc.assignment_id AS "assignmentId",sc.category,sc.status,sc.created_at AS "createdAt",sc.resolved_at AS "resolvedAt" FROM safety_cases sc JOIN work_assignments wa ON wa.id=sc.assignment_id WHERE sc.tenant_id=$1 AND wa.tenant_id=$1 AND wa.professional_id=$2 AND sc.reporter_identity_id<>$3 ORDER BY sc.created_at',[tenantId,profile.id,identity.id])).rows;
        return {assignmentRows,earningRows,receivedRatingRows,trustRows,relatedSafetyRows,verificationRows,notificationRows,messageRows,authoredRatingRows:[...authoredProfessionalRatings,...authoredCompanyRatings],reportRows,appealRows};
      });
      const addTenant=(rows:any[])=>rows.map(row=>({...row,tenantId}));
      assignments.push(...addTenant(tenantData.assignmentRows));
      earnings.push(...addTenant(tenantData.earningRows));
      verifications.push(...addTenant(tenantData.verificationRows));
      notifications.push(...addTenant(tenantData.notificationRows));
      authoredMessages.push(...addTenant(tenantData.messageRows));
      ratingsReceived.push(...addTenant(tenantData.receivedRatingRows));
      ratingsAuthored.push(...addTenant(tenantData.authoredRatingRows));
      trustEvents.push(...addTenant(tenantData.trustRows));
      safetyReports.push(...addTenant(tenantData.reportRows));
      safetyRelated.push(...addTenant(tenantData.relatedSafetyRows));
      appeals.push(...addTenant(tenantData.appealRows));
    }

    await this.finishRequest(requestId,'completed','access_export_generated');
    const privacyRequests=(await this.db.query('SELECT id,request_type AS "requestType",status,resolution_code AS "resolutionCode",created_at AS "createdAt",updated_at AS "updatedAt",completed_at AS "completedAt" FROM privacy_requests WHERE identity_id=$1 ORDER BY created_at',[identity.id])).rows;
    return {
      requestId,generatedAt:new Date().toISOString(),identity:identityRow,
      memberships:memberships.map(m=>({tenantId:m.tenant_id,role:m.role})),professionalProfile:profile,availability,
      assignments,earnings,verifications,notifications,authoredMessages,ratingsReceived,ratingsAuthored,trustEvents,safetyReports,safetyRelated,appeals,privacyRequests,
      notice:{scope:'data directly associated with or authored by the authenticated identity in the current MLIVRETRABALHO runtime baseline',redaction:'third-party free-text is omitted unless authored by the authenticated identity',excludes:['password hashes','session tokens','provider secrets','third-party rating comments','third-party safety descriptions','third-party trust notes']}
    };
  }

  @Post('deactivate')
  async deactivate(@Headers('authorization') authorization?:string){
    const identity=await this.auth.identityFromAuthorization(authorization);
    const requestId=await this.createRequest(identity.id,'deactivation');
    try{
      const result=await this.db.transaction(async db=>{
        const orphanedOwnerTenant=(await db.query<{tenantId:string}>(`SELECT m.tenant_id AS "tenantId" FROM tenant_memberships m WHERE m.identity_id=$1 AND m.role='owner' AND NOT EXISTS (SELECT 1 FROM tenant_memberships other JOIN identities oi ON oi.id=other.identity_id AND oi.deactivated_at IS NULL WHERE other.tenant_id=m.tenant_id AND other.role='owner' AND other.identity_id<>$1) LIMIT 1`,[identity.id])).rows[0]??null;
        if(orphanedOwnerTenant)throw new BadRequestException('account_deactivation_sole_tenant_owner');
        const profile=(await db.query<{id:string}>('SELECT id FROM professional_profiles WHERE identity_id=$1 FOR UPDATE',[identity.id])).rows[0]??null;
        if(profile){
          const active=(await db.query<{count:number}>('SELECT count(*)::int AS count FROM work_assignments WHERE professional_id=$1 AND status IN (\'confirmed\',\'checked_in\',\'in_progress\')',[profile.id])).rows[0]?.count??0;
          if(active>0)throw new BadRequestException('account_deactivation_active_assignment');
          const unsettled=(await db.query<{count:number}>('SELECT count(*)::int AS count FROM earnings_ledger WHERE professional_id=$1 AND status IN (\'pending\',\'payable\')',[profile.id])).rows[0]?.count??0;
          if(unsettled>0)throw new BadRequestException('account_deactivation_unsettled_earnings');
        }
        const row=(await db.query<{deactivatedAt:string}>('UPDATE identities SET deactivated_at=COALESCE(deactivated_at,now()) WHERE id=$1 RETURNING deactivated_at AS "deactivatedAt"',[identity.id])).rows[0];
        await db.query('DELETE FROM sessions WHERE identity_id=$1',[identity.id]);
        if(profile){await db.query('DELETE FROM professional_availability_network WHERE professional_id=$1',[profile.id]);await db.query('DELETE FROM professional_availability WHERE professional_id=$1',[profile.id]);await db.query("UPDATE marketplace_interests SET status='withdrawn',updated_at=now() WHERE professional_id=$1 AND status='interested'",[profile.id]);}
        return {deactivated:true,deactivatedAt:row?.deactivatedAt};
      });
      await this.finishRequest(requestId,'completed','account_deactivated');return {requestId,...result};
    }catch(error){await this.finishRequest(requestId,'rejected','account_deactivation_blocked');throw error;}
  }
}
