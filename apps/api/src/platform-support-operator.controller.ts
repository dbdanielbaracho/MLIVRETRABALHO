import {BadRequestException,Body,ConflictException,Controller,Get,Headers,NotFoundException,Post,Param,Query,UnauthorizedException} from '@nestjs/common';
import {AuthService} from './auth.service';
import {DatabaseService} from './database.service';
import {PlatformSupportOperatorStore} from './platform-support-operator-store';

// A company membership never authorizes these operations. The store rechecks
// the active platform role, current assignment and active requester per call.
@Controller('platform-support/cases')
export class PlatformSupportOperatorController{
 private readonly store:PlatformSupportOperatorStore;
 constructor(db:DatabaseService,private readonly auth:AuthService){this.store=new PlatformSupportOperatorStore(db);}
 private async invoke<T>(authorization:string|undefined,work:(id:string)=>Promise<T>){
  const identity=await this.auth.identityFromAuthorization(authorization);
  try{return await work(identity.id);}catch(error){
   const code=error instanceof Error?error.message:'';
   if(code==='platform_support_identity_required')throw new UnauthorizedException(code);
   if(code==='platform_support_not_found')throw new NotFoundException(code);
   if(['platform_support_payload_conflict','platform_support_case_closed'].includes(code))throw new ConflictException(code);
   if(['platform_support_input_invalid','platform_support_response_invalid','platform_support_page_invalid'].includes(code))throw new BadRequestException(code);
   throw error;
  }
 }
 @Get()
 list(@Query('limit')limit:unknown,@Query('cursor')cursor:unknown,@Headers('authorization')a?:string){return this.invoke(a,id=>this.store.list(id,limit,cursor));}
 @Get(':id')
 detail(@Param('id')caseId:string,@Headers('authorization')a?:string){return this.invoke(a,id=>this.store.detail(id,caseId));}
 @Post(':id/responses')
 respond(@Param('id')caseId:string,@Body()body:unknown,@Headers('authorization')a?:string){return this.invoke(a,id=>this.store.respond(id,caseId,body));}
}
