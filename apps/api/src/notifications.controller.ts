import { BadRequestException,Controller,Get,Headers,Param,Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DatabaseService } from './database.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly db:DatabaseService,private readonly auth:AuthService){}

  private async identity(a?:string){return this.auth.identityFromAuthorization(a);}
  private async tenantContext(identityId:string,t?:string){
    if(!t)throw new BadRequestException('tenant_required');
    await this.auth.requireMembership(identityId,t);
    return t;
  }

  private async tenantIds(identityId:string,t?:string){
    if(t){await this.auth.requireMembership(identityId,t);return [t];}
    return (await this.auth.memberships(identityId)).map(x=>x.tenant_id);
  }

  @Get('unread-count')
  async unread(@Headers('authorization')a?:string,@Headers('x-tenant-id')t?:string){
    const identity=await this.identity(a);const tenants=await this.tenantIds(identity.id,t);let count=0;
    for(const tenantId of tenants){
      const r=await this.db.tenant(tenantId,async db=>(await db.query<{count:number}>('SELECT count(*)::int count FROM notifications WHERE tenant_id=$2 AND identity_id=$1 AND read_at IS NULL',[identity.id,tenantId])).rows[0]);
      count+=r?.count??0;
    }
    return {count};
  }

  @Get('mine')
  async mine(@Headers('authorization')a?:string,@Headers('x-tenant-id')t?:string){
    const identity=await this.identity(a);const tenants=await this.tenantIds(identity.id,t);const items:any[]=[];
    for(const tenantId of tenants){
      const rows=await this.db.tenant(tenantId,async db=>(await db.query('SELECT id,type,title,body,read_at AS "readAt",created_at AS "createdAt" FROM notifications WHERE tenant_id=$2 AND identity_id=$1 ORDER BY created_at DESC LIMIT 100',[identity.id,tenantId])).rows);
      items.push(...rows.map((row:any)=>({...row,tenantId})));
    }
    return items.sort((a,b)=>new Date(b.createdAt).getTime()-new Date(a.createdAt).getTime()).slice(0,100);
  }

  @Post(':id/read')
  async read(@Param('id')id:string,@Headers('authorization')a?:string,@Headers('x-tenant-id')t?:string){
    const identity=await this.identity(a);const tenantId=await this.tenantContext(identity.id,t);
    return this.db.tenant(tenantId,async db=>(await db.query('UPDATE notifications SET read_at=COALESCE(read_at,now()) WHERE id=$1 AND identity_id=$2 AND tenant_id=$3 RETURNING id,read_at AS "readAt"',[id,identity.id,tenantId])).rows[0]??null);
  }
}
