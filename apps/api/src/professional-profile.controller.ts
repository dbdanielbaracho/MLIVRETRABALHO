import { Body, Controller, Get, Headers, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DatabaseService } from './database.service';
@Controller('professional-profile') export class ProfessionalProfileController {
 constructor(private readonly db:DatabaseService,private readonly auth:AuthService){}
 @Get() async get(@Headers('authorization') authorization?:string){const i=await this.auth.identityFromAuthorization(authorization);const r=await this.db.query('SELECT id,display_name AS "displayName",home_city AS "homeCity" FROM professional_profiles WHERE identity_id=$1',[i.id]);return r.rows[0]??null;}
 @Put() async upsert(@Body() body:{displayName?:string;homeCity?:string},@Headers('authorization') authorization?:string){const i=await this.auth.identityFromAuthorization(authorization);const displayName=body.displayName?.trim();if(!displayName)throw new Error('display_name_required');const r=await this.db.query('INSERT INTO professional_profiles(subject_id,identity_id,display_name,home_city) VALUES($1,$1,$2,$3) ON CONFLICT(identity_id) WHERE identity_id IS NOT NULL DO UPDATE SET display_name=excluded.display_name,home_city=excluded.home_city,updated_at=now() RETURNING id,display_name AS "displayName",home_city AS "homeCity"',[i.id,displayName,body.homeCity?.trim()||null]);return r.rows[0];}
}
