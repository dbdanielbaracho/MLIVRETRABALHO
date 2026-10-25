import {BadRequestException,Body,ConflictException,Controller,ForbiddenException,Headers,NotFoundException,Param,Post,UnauthorizedException} from '@nestjs/common';
import {AuthService} from './auth.service';
import {DatabaseService} from './database.service';
import {PlatformSupportDispatchStore} from './platform-support-dispatch-store';
import {PlatformSupportRoleStore} from './platform-support-role-store';
@Controller('platform-support/admin')
export class PlatformSupportAdminController{
 private readonly dispatch:PlatformSupportDispatchStore;private readonly roles:PlatformSupportRoleStore;
 constructor(db:DatabaseService,private readonly auth:AuthService){this.dispatch=new PlatformSupportDispatchStore(db);this.roles=new PlatformSupportRoleStore(db);}
 private async invoke<T>(authorization:string|undefined,work:(id:string)=>Promise<T>){
  const identity=await this.auth.identityFromAuthorization(authorization);
  try{return await work(identity.id);}catch(e){const code=e instanceof Error?e.message:'';
   if(code==='platform_support_identity_required')throw new UnauthorizedException(code);
   if(code==='platform_support_dispatch_denied')throw new ForbiddenException(code);
   if(code==='platform_support_not_found')throw new NotFoundException(code);
   if(['platform_support_assignment_conflict','platform_support_role_conflict','platform_support_case_closed'].includes(code))throw new ConflictException(code);
   if(['platform_support_role_invalid','platform_support_dispatch_invalid'].includes(code))throw new BadRequestException(code);throw e;
  }
 }
 private input(body:unknown,fields:string[]){if(!body||typeof body!=='object'||Array.isArray(body)||Object.keys(body).some(k=>!fields.includes(k))||fields.some(k=>!Object.hasOwn(body,k)))throw Error('platform_support_dispatch_invalid');return body as Record<string,unknown>;}
 @Post('operators/:id')
 role(@Param('id')target:string,@Body()body:unknown,@Headers('authorization')a?:string){return this.invoke(a,id=>{const x=this.input(body,['active','expectedRevision']);return this.roles.change(id,target,x.active as boolean,x.expectedRevision as number);});}
 @Post('cases/:id/assignment')
 assign(@Param('id')caseId:string,@Body()body:unknown,@Headers('authorization')a?:string){return this.invoke(a,id=>{const x=this.input(body,['targetOperatorId','expectedRevision']);return this.dispatch.change(id,caseId,x.targetOperatorId as string|null,x.expectedRevision as number);});}
}
