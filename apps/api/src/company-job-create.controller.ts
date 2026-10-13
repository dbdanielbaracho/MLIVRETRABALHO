import { BadRequestException, Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DatabaseService } from './database.service';
import { isEngagementModality } from './engagement-modality';
function parseCanonicalUtcDateTime(value:string){
 const match=/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})(?:\.(\d{1,3}))?Z$/.exec(value);
 if(!match)return null;
 const parsed=new Date(value);
 if(Number.isNaN(parsed.getTime()))return null;
 const normalized=`${match[1]}.${(match[2]??'').padEnd(3,'0')}Z`;
 return parsed.toISOString()===normalized?parsed:null;
}
@Controller('company/jobs')
export class CompanyJobCreateController {
 constructor(private readonly db:DatabaseService,private readonly auth:AuthService){}
 private async context(a?:string,tenantId?:string){const identity=await this.auth.identityFromAuthorization(a);if(!tenantId)throw new BadRequestException('tenant_required');const membership=await this.auth.requireMembership(identity.id,tenantId);if(!['owner','admin','manager','company'].includes(membership.role))throw new BadRequestException('company_role_required');return {identity,tenantId};}
 @Get() async list(@Headers('authorization') a?:string,@Headers('x-tenant-id') tenantId?:string){const c=await this.context(a,tenantId);return this.db.tenant(c.tenantId,async db=>(await db.query('SELECT id,title,status,location,work_city AS "workCity",starts_at AS "startsAt",ends_at AS "endsAt",pay_cents AS "payCents" FROM company_jobs WHERE tenant_id=$1 ORDER BY created_at DESC',[c.tenantId])).rows);}
 @Post() async create(@Body() value:unknown,@Headers('authorization') a?:string,@Headers('x-tenant-id') tenantId?:string){
  const c=await this.context(a,tenantId);
  if(!value||typeof value!=='object'||Array.isArray(value))throw new BadRequestException('company_job_invalid');
  const body=value as Record<string,unknown>;
  if(typeof body.title!=='string'||!body.title.trim())throw new BadRequestException('title_required');
  for(const key of ['requiredRole','location','workCity'])if(body[key]!=null&&typeof body[key]!=='string')throw new BadRequestException('company_job_invalid');
  // pay_cents is the existing nonnegative PostgreSQL integer column, not a new business cap.
  if(body.payCents!=null&&(typeof body.payCents!=='number'||!Number.isInteger(body.payCents)||body.payCents<0||body.payCents>2147483647))throw new BadRequestException('pay_invalid');
  if(body.engagementModality!=null&&(typeof body.engagementModality!=='string'||!isEngagementModality(body.engagementModality)))throw new BadRequestException('engagement_modality_invalid');
  if(!body.startsAt||!body.endsAt)throw new BadRequestException('shift_window_required');
  if(typeof body.startsAt!=='string'||typeof body.endsAt!=='string')throw new BadRequestException('shift_window_invalid');
  const startsAt=parseCanonicalUtcDateTime(body.startsAt),endsAt=parseCanonicalUtcDateTime(body.endsAt);
  if(!startsAt||!endsAt)throw new BadRequestException('shift_window_invalid');
  if(endsAt<=startsAt)throw new BadRequestException('shift_window_invalid');
  const title=body.title.trim(),requiredRole=typeof body.requiredRole==='string'?body.requiredRole.trim()||title:title;
  return this.db.tenant(c.tenantId,async db=>(await db.query('INSERT INTO company_jobs(tenant_id,title,required_role,status,location,work_city,starts_at,ends_at,pay_cents,engagement_modality) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id,title,required_role AS "requiredRole",status,location,work_city AS "workCity",starts_at AS "startsAt",ends_at AS "endsAt",pay_cents AS "payCents",engagement_modality AS "engagementModality"',[c.tenantId,title,requiredRole,'open',typeof body.location==='string'?body.location.trim()||null:null,typeof body.workCity==='string'?body.workCity.trim()||null:null,startsAt.toISOString(),endsAt.toISOString(),body.payCents??0,body.engagementModality??'gig'])).rows[0]);
 }
}
