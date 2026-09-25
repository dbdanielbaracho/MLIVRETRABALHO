import { BadRequestException, Body, Controller, ForbiddenException, Get, Headers, Param, Post } from '@nestjs/common';
import { createHash, randomBytes } from 'crypto';
import { AuthService } from './auth.service';
import { DatabaseService } from './database.service';

const MANAGEMENT_ROLES=new Set(['owner','admin','manager']);
const UUID_RE=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

@Controller('company/members')
export class CompanyMembersController{
  constructor(private readonly db:DatabaseService,private readonly auth:AuthService){}

  private async ownerContext(authorization?:string,tenantId?:string){
    const identity=await this.auth.identityFromAuthorization(authorization);
    if(!tenantId)throw new BadRequestException('tenant_required');
    const membership=await this.auth.requireMembership(identity.id,tenantId);
    if(membership.role!=='owner')throw new ForbiddenException('owner_role_required');
    return {identity,tenantId};
  }

  @Get()
  async list(@Headers('authorization') authorization?:string,@Headers('x-tenant-id') tenantId?:string){
    const c=await this.ownerContext(authorization,tenantId);
    return this.db.tenant(c.tenantId,async db=>(await db.query(`SELECT m.identity_id AS "identityId",i.email,m.role,m.created_at AS "createdAt",i.deactivated_at AS "deactivatedAt"
      FROM tenant_memberships m JOIN identities i ON i.id=m.identity_id
      WHERE m.tenant_id=$1 ORDER BY m.created_at`,[c.tenantId])).rows);
  }

  @Get('invitations')
  async invitations(@Headers('authorization') authorization?:string,@Headers('x-tenant-id') tenantId?:string){
    const c=await this.ownerContext(authorization,tenantId);
    return this.db.tenant(c.tenantId,async db=>(await db.query(`SELECT id,email,role,created_at AS "createdAt",expires_at AS "expiresAt",accepted_at AS "acceptedAt",revoked_at AS "revokedAt"
      FROM company_member_invitations WHERE tenant_id=$1 ORDER BY created_at DESC LIMIT 100`,[c.tenantId])).rows);
  }

  @Post('invitations')
  async invite(@Body() body:{email?:string;role?:string},@Headers('authorization') authorization?:string,@Headers('x-tenant-id') tenantId?:string){
    const c=await this.ownerContext(authorization,tenantId);
    const email=String(body?.email??'').trim().toLowerCase();
    const role=String(body?.role??'');
    if(!email||!email.includes('@'))throw new BadRequestException('invitation_email_invalid');
    if(!MANAGEMENT_ROLES.has(role))throw new BadRequestException('invitation_role_invalid');
    const secret=randomBytes(32).toString('base64url');
    const inviteCode=`${c.tenantId}.${secret}`;
    const tokenHash=createHash('sha256').update(inviteCode).digest('hex');
    return this.db.tenant(c.tenantId,async db=>{
      await db.query(`UPDATE company_member_invitations SET revoked_at=now()
        WHERE tenant_id=$1 AND lower(email)=lower($2) AND accepted_at IS NULL AND revoked_at IS NULL`,[c.tenantId,email]);
      const row=(await db.query<{id:string;expiresAt:string}>(`INSERT INTO company_member_invitations(tenant_id,email,role,token_hash,invited_by_identity_id,expires_at)
        VALUES($1,$2,$3,$4,$5,now()+interval '7 days') RETURNING id,expires_at AS "expiresAt"`,[c.tenantId,email,role,tokenHash,c.identity.id])).rows[0];
      return {invitationId:row.id,email,role,expiresAt:row.expiresAt,inviteCode};
    });
  }

  @Post('invitations/:id/revoke')
  async revoke(@Param('id') id:string,@Headers('authorization') authorization?:string,@Headers('x-tenant-id') tenantId?:string){
    const c=await this.ownerContext(authorization,tenantId);
    return this.db.tenant(c.tenantId,async db=>{
      const row=(await db.query<{id:string}>(`UPDATE company_member_invitations SET revoked_at=COALESCE(revoked_at,now())
        WHERE id=$1 AND tenant_id=$2 AND accepted_at IS NULL RETURNING id`,[id,c.tenantId])).rows[0];
      if(!row)throw new BadRequestException('invitation_not_revocable');
      return {revoked:true,invitationId:row.id};
    });
  }

  @Post('invitations/accept')
  async accept(@Body() body:{inviteCode?:string},@Headers('authorization') authorization?:string){
    const identity=await this.auth.identityFromAuthorization(authorization);
    const inviteCode=String(body?.inviteCode??'').trim();
    const dot=inviteCode.indexOf('.');
    if(dot<1)throw new BadRequestException('invitation_invalid');
    const tenantId=inviteCode.slice(0,dot);
    if(!UUID_RE.test(tenantId))throw new BadRequestException('invitation_invalid');
    const tokenHash=createHash('sha256').update(inviteCode).digest('hex');
    return this.db.tenant(tenantId,async db=>{
      const invitation=(await db.query<{id:string;email:string;role:string}>(`SELECT id,email,role FROM company_member_invitations
        WHERE tenant_id=$1 AND token_hash=$2 AND accepted_at IS NULL AND revoked_at IS NULL AND expires_at>now() FOR UPDATE`,[tenantId,tokenHash])).rows[0];
      if(!invitation)throw new BadRequestException('invitation_invalid_or_expired');
      if(invitation.email.toLowerCase()!==identity.email.toLowerCase())throw new ForbiddenException('invitation_email_mismatch');
      await db.query(`INSERT INTO tenant_memberships(tenant_id,subject_id,identity_id,role)
        VALUES($1,$2,$2,$3)
        ON CONFLICT(tenant_id,identity_id) WHERE identity_id IS NOT NULL DO UPDATE SET role=EXCLUDED.role`,[tenantId,identity.id,invitation.role]);
      await db.query(`UPDATE company_member_invitations SET accepted_at=now(),accepted_by_identity_id=$2 WHERE id=$1`,[invitation.id,identity.id]);
      return {accepted:true,tenantId,role:invitation.role};
    });
  }
}
