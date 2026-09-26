import { BadRequestException, Body, Controller, Headers, HttpException, Post, UnauthorizedException } from '@nestjs/common';
import { createHash, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { DatabaseService } from './database.service';
import { AuthService } from './auth.service';
const MAX_EMAIL_LENGTH=320;
const MAX_PASSWORD_LENGTH=128;
const MAX_WORKSPACE_NAME_LENGTH=120;
const encodePassword=(password:string)=>{const salt=randomBytes(16);const hash=scryptSync(password,salt,64);return 'scrypt$'+salt.toString('hex')+'$'+hash.toString('hex');};
const verifyPassword=(password:string,encoded:string)=>{const [kind,saltHex,hashHex]=encoded.split('$');if(kind!=='scrypt'||!saltHex||!hashHex)return false;const supplied=scryptSync(password,Buffer.from(saltHex,'hex'),64);const stored=Buffer.from(hashHex,'hex');return supplied.length===stored.length&&timingSafeEqual(supplied,stored);};
const tokenHash=(token:string)=>createHash('sha256').update(token).digest('hex');
const workspaceSlug=(name:string)=>{const base=name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,40)||'empresa';return `${base}-${randomBytes(4).toString('hex')}`;};
const DUMMY_PASSWORD_HASH=encodePassword('mlivretrabalho-invalid-account');
const SIGNIN_MAX_FAILURES=8;
const SIGNIN_WINDOW_MS=15*60*1000;
const SIGNIN_LOCK_MINUTES=15;
const MAX_ACTIVE_SESSIONS=10;
const normalizedEmail=(value:string)=>value.trim().toLowerCase();
const emailInputValid=(value:string)=>{const v=normalizedEmail(value);return v.length>=3&&v.length<=MAX_EMAIL_LENGTH&&v.includes('@')&&!/\s/.test(v);};
@Controller('auth')
export class AuthController {
 constructor(private readonly db:DatabaseService, private readonly auth:AuthService){}
 @Post('signup') async signup(@Body() body:{email?:string;password?:string;accountType?:'professional'|'company';workspaceName?:string}){
  if(!body.email||!body.password||body.password.length<8||body.password.length>MAX_PASSWORD_LENGTH||!emailInputValid(body.email)) throw new UnauthorizedException('invalid_signup');
  const email=normalizedEmail(body.email); const accountType=body.accountType??'professional';
  if(accountType!=='professional'&&accountType!=='company')throw new BadRequestException('account_type_invalid');
  const passwordHash=encodePassword(body.password);
  try{
   if(accountType==='company'){
    const workspaceName=body.workspaceName?.trim();if(!workspaceName)throw new BadRequestException('workspace_name_required');
    if(workspaceName.length>MAX_WORKSPACE_NAME_LENGTH)throw new BadRequestException('workspace_name_too_long');
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
  if(!body.email||!body.password||body.password.length>MAX_PASSWORD_LENGTH||!emailInputValid(body.email))throw new UnauthorizedException();
  const email=normalizedEmail(body.email);
  const r=await this.db.query<{id:string;email:string;password_hash:string}>('SELECT id,email,password_hash FROM identities WHERE email=$1 AND deactivated_at IS NULL',[email]);
  const identity=r.rows[0];
  if(!identity){verifyPassword(body.password,DUMMY_PASSWORD_HASH);throw new UnauthorizedException();}

  const result=await this.db.transaction(async db=>{
   await db.query('INSERT INTO auth_signin_limits(identity_id) VALUES($1) ON CONFLICT(identity_id) DO NOTHING',[identity.id]);
   let limit=(await db.query<{failedCount:number;windowStartedAt:string;locked:boolean}>(`SELECT failed_count AS "failedCount",window_started_at AS "windowStartedAt",(locked_until IS NOT NULL AND locked_until>now()) AS locked FROM auth_signin_limits WHERE identity_id=$1 FOR UPDATE`,[identity.id])).rows[0];
   if(limit.locked)return {kind:'locked' as const};
   if(new Date(limit.windowStartedAt).getTime()<=Date.now()-SIGNIN_WINDOW_MS){
    await db.query('UPDATE auth_signin_limits SET failed_count=0,window_started_at=now(),locked_until=NULL,updated_at=now() WHERE identity_id=$1',[identity.id]);
    limit={...limit,failedCount:0,windowStartedAt:new Date().toISOString(),locked:false};
   }
   if(!verifyPassword(body.password,identity.password_hash)){
    const next=limit.failedCount+1;
    await db.query(`UPDATE auth_signin_limits SET failed_count=$2,locked_until=CASE WHEN $2>=$3 THEN now()+($4::int * interval '1 minute') ELSE NULL END,updated_at=now() WHERE identity_id=$1`,[identity.id,next,SIGNIN_MAX_FAILURES,SIGNIN_LOCK_MINUTES]);
    return {kind:(next>=SIGNIN_MAX_FAILURES?'locked':'invalid') as 'locked'|'invalid'};
   }
   const token=randomBytes(32).toString('base64url');
   await db.query('DELETE FROM auth_signin_limits WHERE identity_id=$1',[identity.id]);
   await db.query('DELETE FROM sessions WHERE identity_id=$1 AND expires_at<=now()',[identity.id]);
   await db.query("INSERT INTO sessions(identity_id,token_hash,expires_at) VALUES($1,$2,now()+interval '30 days')",[identity.id,tokenHash(token)]);
   await db.query(`DELETE FROM sessions s USING (
      SELECT id FROM sessions WHERE identity_id=$1 ORDER BY created_at DESC,id DESC OFFSET $2
    ) old WHERE s.id=old.id`,[identity.id,MAX_ACTIVE_SESSIONS]);
   return {kind:'ok' as const,token};
  });
  if(result.kind==='locked')throw new HttpException('too_many_signin_attempts',429);
  if(result.kind==='invalid')throw new UnauthorizedException();
  const memberships=await this.auth.memberships(identity.id);
  return {accessToken:result.token,identity:{id:identity.id,email:identity.email},memberships};
 }
 @Post('signout') async signout(@Headers('authorization') authorization?:string){const [scheme,token]=authorization?.split(' ') ?? [];if(scheme!=='Bearer'||!token)throw new UnauthorizedException();await this.auth.identityFromAuthorization(authorization);await this.auth.revoke(token);return {ok:true};}
}
