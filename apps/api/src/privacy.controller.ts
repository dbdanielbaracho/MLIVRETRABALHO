import { BadRequestException, Controller, Get, Headers, Post } from '@nestjs/common';
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
      notice:{scope:'data directly associated with the authenticated identity in the current MLIVRETRABALHO runtime baseline',excludes:['password hashes','session tokens','provider secrets','unnecessary third-party personal data']}
    };
  }

  @Post('deactivate')
  async deactivate(@Headers('authorization') authorization?:string){
    const identity=await this.auth.identityFromAuthorization(authorization);
    return this.db.transaction(async db=>{
      const orphanedOwner=(await db.query<{tenantId:string}>(`SELECT tm.tenant_id AS "tenantId"
        FROM tenant_memberships tm
        WHERE tm.identity_id=$1 AND tm.role='owner'
          AND NOT EXISTS (
            SELECT 1
            FROM tenant_memberships tm2
            JOIN identities i2 ON i2.id=tm2.identity_id AND i2.deactivated_at IS NULL
            WHERE tm2.tenant_id=tm.tenant_id
              AND tm2.role='owner'
              AND tm2.identity_id<>$1
          )
        LIMIT 1`,[identity.id])).rows[0];
      if(orphanedOwner)throw new BadRequestException('account_deactivation_owner_transfer_required');

      const profile=(await db.query<{id:string}>('SELECT id FROM professional_profiles WHERE identity_id=$1 FOR UPDATE',[identity.id])).rows[0]??null;
      if(profile){
        const active=(await db.query<{count:number}>('SELECT count(*)::int AS count FROM work_assignments WHERE professional_id=$1 AND status IN (\'confirmed\',\'checked_in\',\'in_progress\')',[profile.id])).rows[0]?.count??0;
        if(active>0)throw new BadRequestException('account_deactivation_active_assignment');
        const unsettled=(await db.query<{count:number}>('SELECT count(*)::int AS count FROM earnings_ledger WHERE professional_id=$1 AND status IN (\'pending\',\'payable\')',[profile.id])).rows[0]?.count??0;
        if(unsettled>0)throw new BadRequestException('account_deactivation_unsettled_earnings');
      }
      const row=(await db.query<{deactivatedAt:string}>('UPDATE identities SET deactivated_at=COALESCE(deactivated_at,now()) WHERE id=$1 RETURNING deactivated_at AS "deactivatedAt"',[identity.id])).rows[0];
      await db.query('DELETE FROM sessions WHERE identity_id=$1',[identity.id]);
      if(profile){
        await db.query('DELETE FROM professional_availability_network WHERE professional_id=$1',[profile.id]);
        await db.query('DELETE FROM professional_availability WHERE professional_id=$1',[profile.id]);
        await db.query("UPDATE marketplace_interests SET status='withdrawn',updated_at=now() WHERE professional_id=$1 AND status='interested'",[profile.id]);
      }
      return {deactivated:true,deactivatedAt:row?.deactivatedAt};
    });
  }
}
