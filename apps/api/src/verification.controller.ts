import { BadRequestException, Controller, ForbiddenException, Get, Headers, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DatabaseService } from './database.service';
import { canRetryVerification } from './verification-policy';

@Controller('verification')
export class VerificationController{
  constructor(private readonly db:DatabaseService,private readonly auth:AuthService){}
  private async ctx(a?:string,t?:string){const identity=await this.auth.identityFromAuthorization(a);if(!t)throw new BadRequestException('tenant_required');const membership=await this.auth.requireMembership(identity.id,t);return {identity,tenantId:t,membership};}
  private async getCase(db:any,subjectType:'identity'|'business',identityId?:string){return (await db.query('SELECT id,subject_type AS "subjectType",status,provider,reason_code AS "reasonCode",created_at AS "createdAt",updated_at AS "updatedAt",verified_at AS "verifiedAt" FROM verification_cases WHERE subject_type=$1 AND ($2::uuid IS NULL OR identity_id=$2) ORDER BY created_at DESC LIMIT 1',[subjectType,identityId??null])).rows[0]??null;}
  private async requestCase(db:any,tenantId:string,subjectType:'identity'|'business',identityId?:string){const current=await this.getCase(db,subjectType,identityId);if(current&&!canRetryVerification(current.status))return current;if(current){return (await db.query("UPDATE verification_cases SET status='pending',provider=NULL,provider_reference=NULL,reason_code=NULL,updated_at=now(),verified_at=NULL WHERE id=$1 RETURNING id,subject_type AS \"subjectType\",status,provider,reason_code AS \"reasonCode\",created_at AS \"createdAt\",updated_at AS \"updatedAt\",verified_at AS \"verifiedAt\"",[current.id])).rows[0];}return (await db.query('INSERT INTO verification_cases(tenant_id,subject_type,identity_id,status) VALUES($1,$2,$3,$4) RETURNING id,subject_type AS "subjectType",status,provider,reason_code AS "reasonCode",created_at AS "createdAt",updated_at AS "updatedAt",verified_at AS "verifiedAt"',[tenantId,subjectType,identityId??null,'pending'])).rows[0];}

  @Get('mine')async mine(@Headers('authorization')a?:string,@Headers('x-tenant-id')t?:string){const c=await this.ctx(a,t);return this.db.tenant(c.tenantId,db=>this.getCase(db,'identity',c.identity.id));}
  @Post('mine/request')async requestMine(@Headers('authorization')a?:string,@Headers('x-tenant-id')t?:string){const c=await this.ctx(a,t);return this.db.tenant(c.tenantId,db=>this.requestCase(db,c.tenantId,'identity',c.identity.id));}
  @Get('business')async business(@Headers('authorization')a?:string,@Headers('x-tenant-id')t?:string){const c=await this.ctx(a,t);if(!['owner','admin','manager','company'].includes(c.membership.role))throw new ForbiddenException('company_role_required');return this.db.tenant(c.tenantId,db=>this.getCase(db,'business'));}
  @Post('business/request')async requestBusiness(@Headers('authorization')a?:string,@Headers('x-tenant-id')t?:string){const c=await this.ctx(a,t);if(!['owner','admin','company'].includes(c.membership.role))throw new ForbiddenException('business_verification_admin_required');return this.db.tenant(c.tenantId,db=>this.requestCase(db,c.tenantId,'business'));}
}
