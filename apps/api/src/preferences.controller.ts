import {BadRequestException,Body,ConflictException,Controller,Get,Headers,Put,UnauthorizedException} from '@nestjs/common';
import {AuthService} from './auth.service';
import {DatabaseService} from './database.service';
import {preferencesInput} from './preferences-input';

const projection='preferred_role_ids AS "preferredRoleIds",preferred_cities AS "preferredCities",revision::float8 AS revision,updated_at AS "updatedAt"';
const empty=()=>({configured:false,preferredRoleIds:[],preferredCities:[],revision:0,updatedAt:null});
@Controller('me/preferences') export class PreferencesController{
 constructor(private readonly db:DatabaseService,private readonly auth:AuthService){}
 // Identity-owned platform path, like profile/capabilities. No tenant runtime grants.
 private async owner<T>(identityId:string,work:(client:import('pg').PoolClient)=>Promise<T>){
  return this.db.transaction(async client=>{
   const active=await client.query('SELECT id FROM identities WHERE id=$1 AND deactivated_at IS NULL FOR SHARE',[identityId]);
   if(!active.rows[0])throw new UnauthorizedException();
   const profile=await client.query('SELECT id FROM professional_profiles WHERE identity_id=$1 FOR KEY SHARE',[identityId]);
   if(!profile.rows[0])throw new BadRequestException('professional_profile_required');
   return work(client);
  });
 }
 @Get() async get(@Headers('authorization') authorization?:string){
  const identity=await this.auth.identityFromAuthorization(authorization);
  return this.owner(identity.id,async client=>{const row=(await client.query('SELECT '+projection+' FROM professional_preferences WHERE identity_id=$1',[identity.id])).rows[0];return row?{configured:true,...row}:empty();});
 }
 @Put() async put(@Body() body:unknown,@Headers('authorization') authorization?:string){
  const identity=await this.auth.identityFromAuthorization(authorization),input=preferencesInput(body);
  if(!input)throw new BadRequestException('preferences_input_invalid');
  return this.owner(identity.id,async client=>{
   const roles=await client.query<{id:string}>('SELECT id FROM taxonomy_roles WHERE id=ANY($1::text[]) AND active=true ORDER BY id FOR SHARE',[input.preferredRoleIds]);
   if(roles.rows.length!==input.preferredRoleIds.length)throw new BadRequestException('canonical_role_required');
   const row=(await client.query(`INSERT INTO professional_preferences(identity_id,preferred_role_ids,preferred_cities,revision)
    SELECT $1,$2::text[],$3::text[],1 WHERE $4::bigint=0
    ON CONFLICT(identity_id) DO NOTHING RETURNING ${projection}`,[identity.id,input.preferredRoleIds,input.preferredCities,input.expectedRevision])).rows[0];
   if(row)return {configured:true,...row};
   const updated=(await client.query(`UPDATE professional_preferences SET preferred_role_ids=$2,preferred_cities=$3,revision=revision+1,updated_at=now()
    WHERE identity_id=$1 AND revision=$4 AND $4::bigint>0 AND revision<9007199254740991 RETURNING ${projection}`,[identity.id,input.preferredRoleIds,input.preferredCities,input.expectedRevision])).rows[0];
   if(!updated)throw new ConflictException('preferences_revision_conflict');
   return {configured:true,...updated};
  });
 }
}
