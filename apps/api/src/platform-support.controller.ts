import {BadRequestException,Body,ConflictException,Controller,Get,Headers,NotFoundException,Post,Param,Query,ServiceUnavailableException,UnauthorizedException} from '@nestjs/common';
import {AuthService} from './auth.service';
import {DatabaseService} from './database.service';
import {PlatformSupportOwnerStore} from './platform-support-owner-store';
@Controller('me/platform-support')
export class PlatformSupportController{
 private readonly store:PlatformSupportOwnerStore;
 constructor(db:DatabaseService,private readonly auth:AuthService){this.store=new PlatformSupportOwnerStore(db);}
 private async invoke<T>(authorization:string|undefined,work:(id:string)=>Promise<T>){
  const identity=await this.auth.identityFromAuthorization(authorization);
  try{return await work(identity.id);}catch(error){
   const code=error instanceof Error?error.message:'';
   if(code==='platform_support_identity_required')throw new UnauthorizedException(code);
   if(code==='platform_support_not_found')throw new NotFoundException(code);
   if(code==='platform_support_unavailable')throw new ServiceUnavailableException(code);
   if(['platform_support_payload_conflict','platform_support_intent_expired','platform_support_case_closed'].includes(code))throw new ConflictException(code);
   if(['platform_support_input_invalid','platform_support_page_invalid'].includes(code))throw new BadRequestException(code);
   throw error;
  }
 }
 @Get()
 list(@Query('limit')limit:unknown,@Query('cursor')cursor:unknown,@Headers('authorization')a?:string){return this.invoke(a,id=>this.store.list(id,limit,cursor));}
 @Post('intent')
 prepare(@Body()body:unknown,@Headers('authorization')a?:string){return this.invoke(a,id=>this.store.prepare(id,body));}
 @Post()
 submit(@Body()body:unknown,@Headers('idempotency-key')key:string|undefined,@Headers('authorization')a?:string){return this.invoke(a,id=>this.store.submit(id,key??'',body));}
 @Get('recovery/:key')
 recover(@Param('key')key:string,@Headers('authorization')a?:string){return this.invoke(a,id=>this.store.recover(id,key));}
 @Get(':id')
 detail(@Param('id')caseId:string,@Headers('authorization')a?:string){return this.invoke(a,id=>this.store.detail(id,caseId));}
 @Post(':id/withdraw')
 withdraw(@Param('id')caseId:string,@Headers('authorization')a?:string){return this.invoke(a,id=>this.store.withdraw(id,caseId));}
}
