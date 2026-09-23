import { Body, Controller, Get, Headers, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DatabaseService } from './database.service';
@Controller('professional-profile') export class ProfessionalProfileController {
 constructor(private readonly db:DatabaseService,private readonly auth:AuthService){}
 @Get() async get(@Headers('authorization') authorization?:string){const i=await this.auth.identityFromAuthorization(authorization);const r=await this.db.query('SELECT id,display_name AS "displayName",home_city AS "homeCity",primary_role AS "primaryRole" FROM professional_profiles WHERE identity_id=$1',[i.id]);return r.rows[0]??null;}
 @Put() async upsert(@Body() body:{displayName?:string;homeCity?:string;primaryRole?:string},@Headers('authorization') authorization?:string){const i=await this.auth.identityFromAuthorization(authorization);const displayName=body.displayName?.trim();if(!displayName)throw new Error('display_name_required');const r=await this.db.query('INSERT INTO professional_profiles(subject_id,identity_id,display_name,home_city,primary_role) VALUES($1,$1,$2,$3,$4) ON CONFLICT(identity_id) WHERE identity_id IS NOT NULL DO UPDATE SET display_name=excluded.display_name,home_city=excluded.home_city,primary_role=excluded.primary_role,updated_at=now() RETURNING id,display_name AS "displayName",home_city AS "homeCity",primary_role AS "primaryRole"',[i.id,displayName,body.homeCity?.trim()||null,body.primaryRole?.trim()||null]);return r.rows[0];}
}
