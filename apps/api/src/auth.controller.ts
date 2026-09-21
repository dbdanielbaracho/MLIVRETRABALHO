import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { createHash, randomUUID, scryptSync, timingSafeEqual } from 'node:crypto';

type Identity={id:string;email:string;passwordHash:string};
const identities:Identity[]=[]; const sessions=new Map<string,string>();
const hashPassword=(password:string)=>scryptSync(password,'mlivretrabalho-v0',64).toString('hex');
const tokenHash=(token:string)=>createHash('sha256').update(token).digest('hex');

@Controller('auth')
export class AuthController {
 @Post('signup')
 signup(@Body() body:{email?:string;password?:string}){
  if(!body.email||!body.password||body.password.length<8) throw new UnauthorizedException('invalid_signup');
  if(identities.some(i=>i.email===body.email!.toLowerCase())) throw new UnauthorizedException('email_in_use');
  const identity={id:randomUUID(),email:body.email.toLowerCase(),passwordHash:hashPassword(body.password)}; identities.push(identity);
  return {id:identity.id,email:identity.email};
 }
 @Post('signin')
 signin(@Body() body:{email?:string;password?:string}){
  const identity=identities.find(i=>i.email===body.email?.toLowerCase()); if(!identity||!body.password) throw new UnauthorizedException();
  const supplied=Buffer.from(hashPassword(body.password),'hex'), stored=Buffer.from(identity.passwordHash,'hex');
  if(!timingSafeEqual(supplied,stored)) throw new UnauthorizedException();
  const token=randomUUID()+randomUUID(); sessions.set(tokenHash(token),identity.id);
  return {accessToken:token,identity:{id:identity.id,email:identity.email}};
 }
}
