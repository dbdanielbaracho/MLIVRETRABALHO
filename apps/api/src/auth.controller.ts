import { BadRequestException, Body, Controller, Headers, Post, UnauthorizedException } from '@nestjs/common';
import { createHash, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { DatabaseService } from './database.service';
import { AuthService } from './auth.service';
const encodePassword=(password:string)=>{const salt=randomBytes(16);const hash=scryptSync(password,salt,64);return 'scrypt$'+salt.toString('hex')+'$'+hash.toString('hex');};
const verifyPassword=(password:string,encoded:string)=>{const [kind,saltHex,hashHex]=encoded.split('$');if(kind!=='scrypt'||!saltHex||!hashHex)return false;const supplied=scryptSync(password,Buffer.from(saltHex,'hex'),64);const stored=Buffer.from(hashHex,'hex');return supplied.length===stored.length&&timingSafeEqual(supplied,stored);};
const tokenHash=(token:string)=>createHash('sha256').update(token).digest('hex');
const workspaceSlug=(name:string)=>{const base=name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,40)||'empresa';return `${base}-${randomBytes(4).toString('hex')}`;};
@Controller('auth')
export class AuthController {
 constructor(private readonly db:DatabaseService, private readonly auth:AuthService){}
 @Post('signup') async signup(@Body() body:{email?:string;password?:string;accountType?:'professional'|'company';workspaceName?:string}){
  if(!body.email||!body.password||body.password.length<8) throw new UnauthorizedException('invalid_signup');
  const email=body.email.trim().toLowerCase(); const accountType=body.accountType??'professional';
  if(accountType!=='professional'&&accountType!=='company')throw new BadRequestException('account_type_invalid');
  const passwordHash=encodePassword(body.password);
  try{
   if(accountType==='company'){
    const workspaceName=body.workspaceName?.trim();if(!workspaceName)throw new BadRequestException('workspace_name_required');
    const slug=workspaceSlug(workspaceName);
    const r=await this.db.query<{id:string;email:string;tenantId:string;role:string}>(`WITH i AS (
      INSERT INTO identities(email,password_hash) VALUES($1,$2) RETURNING id,email
    ), t AS (
      INSERT INTO tenants(slug,display_name) VALUES($3,$4) RETURNING id
    ), m AS (
      INSERT INTO tenant_memberships(tenant_id,subject_id,identity_id,role)
      SELECT t.id,i.id,i.id,'owner' FROM t CROSS JOIN i
      RETURNING tenant_id,role
    )
    SELECT i.id,i.email,m.tenant_id AS "tenantId",m.role FROM i CROSS JOIN m`,[email,passwordHash,slug,workspaceName]);
    return {...r.rows[0],accountType:'company'};
   }
   const r=await this.db.query<{id:string;email:string}>('INSERT INTO identities(email,password_hash) VALUES($1,$2) RETURNING id,email',[email,passwordHash]);
   return {...r.rows[0],accountType:'professional'};
  }catch(e:any){if(e instanceof BadRequestException)throw e;if(e?.code==='23505')throw new UnauthorizedException('email_in_use');throw e;}
 }
 @Post('signin') async signin(@Body() body:{email?:string;password?:string}){
  if(!body.email||!body.password)throw new UnauthorizedException(); const email=body.email.trim().toLowerCase();
  const r=await this.db.query<{id:string;email:string;password_hash:string}>('SELECT id,email,password_hash FROM identities WHERE email=$1 AND deactivated_at IS NULL',[email]);const identity=r.rows[0];if(!identity||!verifyPassword(body.password,identity.password_hash))throw new UnauthorizedException();
  const token=randomBytes(32).toString('base64url');await this.db.query("INSERT INTO sessions(identity_id,token_hash,expires_at) VALUES($1,$2,now()+interval '30 days')",[identity.id,tokenHash(token)]);const memberships=await this.auth.memberships(identity.id);return {accessToken:token,identity:{id:identity.id,email:identity.email},memberships};
 }
 @Post('signout') async signout(@Headers('authorization') authorization?:string){const [scheme,token]=authorization?.split(' ') ?? [];if(scheme!=='Bearer'||!token)throw new UnauthorizedException();await this.auth.identityFromAuthorization(authorization);await this.auth.revoke(token);return {ok:true};}
}
