import { Controller, Get, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DatabaseService } from './database.service';

@Controller('privacy')
export class PrivacyController {
  constructor(private readonly db:DatabaseService,private readonly auth:AuthService){}

  @Get('export')
  async exportMine(@Headers('authorization') authorization?:string){
    const identity=await this.auth.identityFromAuthorization(authorization);
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

    const assignments:any[]=[];
    const earnings:any[]=[];
    const verifications:any[]=[];
    for(const membership of memberships){
      const tenantId=membership.tenant_id;
      const tenantData=await this.db.tenant(tenantId,async db=>{
        const verificationRows=(await db.query(
          'SELECT id,subject_type AS "subjectType",status,provider,provider_reference AS "providerReference",reason_code AS "reasonCode",created_at AS "createdAt",updated_at AS "updatedAt",verified_at AS "verifiedAt" FROM verification_cases WHERE tenant_id=$1 AND identity_id=$2 ORDER BY created_at',[tenantId,identity.id]
        )).rows;
        if(!profile)return {assignmentRows:[],earningRows:[],verificationRows};
        const assignmentRows=(await db.query(
          'SELECT id,job_id AS "jobId",status,confirmed_at AS "confirmedAt",checked_in_at AS "checkedInAt",checked_out_at AS "checkedOutAt",completed_at AS "completedAt" FROM work_assignments WHERE tenant_id=$1 AND professional_id=$2 ORDER BY confirmed_at',[tenantId,profile.id]
        )).rows;
        const earningRows=(await db.query(
          'SELECT id,assignment_id AS "assignmentId",amount_cents AS "amountCents",status,created_at AS "createdAt" FROM earnings_ledger WHERE tenant_id=$1 AND professional_id=$2 ORDER BY created_at',[tenantId,profile.id]
        )).rows;
        return {assignmentRows,earningRows,verificationRows};
      });
      assignments.push(...tenantData.assignmentRows.map((row:any)=>({...row,tenantId})));
      earnings.push(...tenantData.earningRows.map((row:any)=>({...row,tenantId})));
      verifications.push(...tenantData.verificationRows.map((row:any)=>({...row,tenantId})));
    }

    return {
      generatedAt:new Date().toISOString(),
      identity:identityRow,
      memberships:memberships.map(m=>({tenantId:m.tenant_id,role:m.role})),
      professionalProfile:profile,
      availability,
      assignments,
      earnings,
      verifications,
      notice:{
        scope:'data directly associated with the authenticated identity in the current MLIVRETRABALHO runtime baseline',
        excludes:['password hashes','session tokens','provider secrets','unnecessary third-party personal data']
      }
    };
  }
}
