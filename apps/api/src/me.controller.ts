import { Controller, Get, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
@Controller('me') export class MeController {constructor(private readonly auth:AuthService){} @Get() async get(@Headers('authorization') authorization?:string){const identity=await this.auth.identityFromAuthorization(authorization);return {...identity,memberships:await this.auth.memberships(identity.id)};}}
