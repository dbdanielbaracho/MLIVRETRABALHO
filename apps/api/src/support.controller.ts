import {randomUUID} from 'node:crypto';
import {BadRequestException,Body,ConflictException,Controller,ForbiddenException,Get,Headers,Param,Post} from '@nestjs/common';
import {AuthService} from './auth.service';
import {DatabaseService} from './database.service';
import {exceptionSla} from './exception-sla';
import {supportCaseInput} from './support-input';
import {supportRequestKey,supportRequestDigest} from './support-idempotency';
type ReplayCase={id:string;category:string;priority:string;status:string;createdAt:string;requestHash:string};
const acknowledgement=(c:ReplayCase)=>({id:c.id,category:c.category,priority:c.priority,status:c.status,createdAt:c.createdAt});
@Controller()
export class SupportController {
 constructor(private readonly db:DatabaseService,private readonly auth:AuthService){}
 @Post('support-cases/intent')
 async prepare(@Body()body:unknown,@Headers('authorization')authorization?:string,@Headers('x-tenant-id')tenantId?:string){
  const identity=await this.auth.identityFromAuthorization(authorization);
  if(!tenantId)throw new BadRequestException('tenant_required');
  await this.auth.requireMembership(identity.id,tenantId);
  const input=supportCaseInput(body);
  if(!input)throw new BadRequestException('support_case_invalid');
  if(input.assignmentId!==null)await this.db.tenant(tenantId,async db=>{
   const assignment=(await db.query<{id:string}>('SELECT id FROM work_assignments WHERE tenant_id=$1 AND id=$2',[tenantId,input.assignmentId])).rows[0];
   if(!assignment)throw new BadRequestException('support_assignment_not_found');
  });
  // Preparing an unused key creates no case. Creation still authenticates and checks membership.
  return {requestKey:randomUUID(),reporterIdentityId:identity.id};
 }
 @Post('support-cases')
 async create(@Body()body:unknown,@Headers('authorization')authorization?:string,@Headers('x-tenant-id')tenantId?:string,@Headers('idempotency-key')key?:string){
  const identity=await this.auth.identityFromAuthorization(authorization);
  if(!tenantId)throw new BadRequestException('tenant_required');
  await this.auth.requireMembership(identity.id,tenantId);
  const input=supportCaseInput(body);
  if(!input)throw new BadRequestException('support_case_invalid');
  const requestKey=supportRequestKey(key);
  if(requestKey===null)throw new BadRequestException('support_request_key_invalid');
  const digest=requestKey!==undefined?supportRequestDigest(input):undefined;
  return this.db.tenant(tenantId,async db=>{
   const replay=async()=>{
    const existing=(await db.query<ReplayCase>('SELECT id,category,priority,status,created_at AS "createdAt",request_payload_hash AS "requestHash" FROM support_cases WHERE tenant_id=$1 AND reporter_identity_id=$2 AND request_key=$3',[tenantId,identity.id,requestKey])).rows[0];
    if(!existing)return null;
    if(existing.requestHash!==digest)throw new ConflictException('support_request_key_conflict');
    return acknowledgement(existing);
   };
   if(requestKey!==undefined){const existing=await replay();if(existing)return existing;}
   if(input.assignmentId!==null){
    const assignment=(await db.query<{id:string}>('SELECT id FROM work_assignments WHERE tenant_id=$1 AND id=$2',[tenantId,input.assignmentId])).rows[0];
    if(!assignment)throw new BadRequestException('support_assignment_not_found');
   }
   const values=[tenantId,identity.id,input.assignmentId,input.category,input.description,input.priority];
   if(requestKey===undefined)return (await db.query('INSERT INTO support_cases(tenant_id,reporter_identity_id,assignment_id,category,description,priority) VALUES($1,$2,$3,$4,$5,$6) RETURNING id,category,priority,status,created_at AS "createdAt"',values)).rows[0];
   const created=(await db.query('INSERT INTO support_cases(tenant_id,reporter_identity_id,assignment_id,category,description,priority,request_key,request_payload_hash) VALUES($1,$2,$3,$4,$5,$6,$7,$8) ON CONFLICT(tenant_id,reporter_identity_id,request_key) WHERE request_key IS NOT NULL DO NOTHING RETURNING id,category,priority,status,created_at AS "createdAt"',[...values,requestKey,digest])).rows[0];
   if(created)return created;
   const existing=await replay();if(existing)return existing;
   throw Error('support_request_replay_missing');
  });
 }
@Get('support-cases/mine')async mine(@Headers('authorization')a?:string,@Headers('x-tenant-id')t?:string){const i=await this.auth.identityFromAuthorization(a);if(!t)throw new BadRequestException('tenant_required');await this.auth.requireMembership(i.id,t);return this.db.tenant(t,async db=>(await db.query('SELECT id,assignment_id AS "assignmentId",category,priority,status,description,resolution_note AS "resolutionNote",created_at AS "createdAt" FROM support_cases WHERE tenant_id=$1 AND reporter_identity_id=$2 ORDER BY created_at DESC',[t,i.id])).rows)}
private async admin(a?:string,t?:string){const i=await this.auth.identityFromAuthorization(a);if(!t)throw new BadRequestException('tenant_required');const m=await this.auth.requireMembership(i.id,t);if(!['owner','admin'].includes(m.role))throw new ForbiddenException('admin_required');return{i,t}}
@Get('company/exceptions')async exceptions(@Headers('authorization')a?:string,@Headers('x-tenant-id')t?:string){const c=await this.admin(a,t);return this.db.tenant(c.t,async db=>{const support=(await db.query(`SELECT id,'support' type,category,priority,status,created_at AS "createdAt" FROM support_cases WHERE tenant_id=$1 AND status IN('open','reviewing')`,[c.t])).rows;const safety=(await db.query(`SELECT id,'safety' type,category,'urgent' priority,status,created_at AS "createdAt" FROM safety_cases WHERE tenant_id=$1 AND status IN('open','reviewing')`,[c.t])).rows;const integrity=(await db.query(`SELECT id,'integrity' type,kind category,'normal' priority,status,created_at AS "createdAt" FROM marketplace_integrity_cases WHERE tenant_id=$1 AND status IN('open','needs_more_info')`,[c.t])).rows;return[...support,...safety,...integrity].map((x:any)=>exceptionSla(x)).sort((x:any,y:any)=>Number(y.overdue)-Number(x.overdue)||String(x.createdAt).localeCompare(String(y.createdAt)))})}
@Post('company/support-cases/:id/status')async status(@Param('id')id:string,@Body()b:{status?:string;note?:string},@Headers('authorization')a?:string,@Headers('x-tenant-id')t?:string){const c=await this.admin(a,t);const note=b.note?.trim();if(!['reviewing','resolved','dismissed'].includes(b.status??'')||!note)throw new BadRequestException('support_status_invalid');return this.db.tenant(c.t,async db=>(await db.query(`UPDATE support_cases SET status=$3,resolution_note=$4,resolved_at=CASE WHEN $3 IN('resolved','dismissed') THEN now() ELSE NULL END WHERE tenant_id=$1 AND id=$2 RETURNING id,status,resolution_note AS "resolutionNote",resolved_at AS "resolvedAt"`,[c.t,id,b.status,note])).rows[0]??(()=>{throw new BadRequestException('support_case_not_found')})())}}
