import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Pool, PoolClient, QueryResultRow } from 'pg';
@Injectable()
export class DatabaseService implements OnModuleDestroy {
 private readonly pool=new Pool({connectionString:process.env.DATABASE_URL});
 query<T extends QueryResultRow=QueryResultRow>(text:string,values:unknown[]=[]){return this.pool.query<T>(text,values);}
 async tenant<T>(tenantId:string,work:(client:PoolClient)=>Promise<T>):Promise<T>{
  const client=await this.pool.connect();
  try{
   await client.query('BEGIN');
   await client.query("SELECT set_config('app.tenant_id',$1,true)",[tenantId]);
   await client.query('SET LOCAL ROLE app_runtime');
   const value=await work(client);
   await client.query('COMMIT');
   return value;
  }catch(e){
   await client.query('ROLLBACK');
   throw e;
  }finally{client.release();}
 }
 async onModuleDestroy(){await this.pool.end();}
}
