import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createHash } from 'node:crypto';
import { DatabaseService } from './database.service';
@Injectable()
export class AuthService {
 constructor(private readonly db:DatabaseService){}
 private hash(token:string){return createHash('sha256').update(token).digest('hex');}
 async identityFromAuthorization(value?:string){
  const [scheme,token]=value?.split(' ') ?? []; if(scheme!=='Bearer'||!token)throw new UnauthorizedException();
  const r=await this.db.query<{id:string;email:string}>('SELECT i.id,i.email FROM sessions s JOIN identities i ON i.id=s.identity_id WHERE s.token_hash=$1 AND s.expires_at>now()',[this.hash(token)]);
  if(!r.rows[0])throw new UnauthorizedException(); return r.rows[0];
 }
 async revoke(token:string){await this.db.query('DELETE FROM sessions WHERE token_hash=$1',[this.hash(token)]);}
}
