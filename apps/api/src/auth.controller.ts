import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { createHash, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { DatabaseService } from './database.service';
const encodePassword=(password:string)=>{const salt=randomBytes(16);const hash=scryptSync(password,salt,64);return 'scrypt$'+salt.toString('hex')+'$'+hash.toString('hex');};
const verifyPassword=(password:string,encoded:string)=>{const [kind,saltHex,hashHex]=encoded.split('$');if(kind!=='scrypt'||!saltHex||!hashHex)return false;const supplied=scryptSync(password,Buffer.from(saltHex,'hex'),64);const stored=Buffer.from(hashHex,'hex');return supplied.length===stored.length&&timingSafeEqual(supplied,stored);};
const tokenHash=(token:string)=>createHash('sha256').update(token).digest('hex');
@Controller('auth')
export class AuthController {
 constructor(private readonly db:DatabaseService){}
 @Post('signup') async signup(@Body() body:{email?:string;password?:string}){
  if(!body.email||!body.password||body.password.length<8) throw new UnauthorizedException('invalid_signup');
  const email=body.email.trim().toLowerCase(); try{const r=await this.db.query<{id:string;email:string}>('INSERT INTO identities(email,password_hash) VALUES($1,$2) RETURNING id,email',[email,encodePassword(body.password)]);return r.rows[0];}catch(e:any){if(e?.code==='23505')throw new UnauthorizedException('email_in_use');throw e;}
 }
 @Post('signin') async signin(@Body() body:{email?:string;password?:string}){
  if(!body.email||!body.password)throw new UnauthorizedException(); const email=body.email.trim().toLowerCase();
  const r=await this.db.query<{id:string;email:string;password_hash:string}>('SELECT id,email,password_hash FROM identities WHERE email=$1',[email]);const identity=r.rows[0];if(!identity||!verifyPassword(body.password,identity.password_hash))throw new UnauthorizedException();
  const token=randomBytes(32).toString('base64url');await this.db.query("INSERT INTO sessions(identity_id,token_hash,expires_at) VALUES($1,$2,now()+interval '30 days')",[identity.id,tokenHash(token)]);return {accessToken:token,identity:{id:identity.id,email:identity.email}};
 }
 @Post('signout') async signout(@Body() body:{accessToken?:string}){if(body.accessToken)await this.db.query('DELETE FROM sessions WHERE token_hash=$1',[tokenHash(body.accessToken)]);return {ok:true};}
}
