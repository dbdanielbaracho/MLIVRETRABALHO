import {Controller,Get,Query} from '@nestjs/common';
import {DatabaseService} from './database.service';
import type {CanonicalRole} from './taxonomy';
import {searchRoles} from './taxonomy';
type CatalogRole=CanonicalRole&{id:string};
@Controller('taxonomy')
export class TaxonomyController{
 constructor(private readonly db:DatabaseService){}
 @Get('roles')
 async roles(@Query('q') q?:string){
  const {rows}=await this.db.query<CatalogRole>(
   'SELECT id,vertical,family,role,specializations,skills,certifications FROM taxonomy_roles WHERE active=true ORDER BY vertical,family,role,id'
  );
  return searchRoles(rows,q);
 }
}
