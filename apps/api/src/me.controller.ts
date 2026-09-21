import { Controller, Get, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
@Controller('me') export class MeController {constructor(private readonly auth:AuthService){} @Get() get(@Headers('authorization') authorization?:string){return this.auth.identityFromAuthorization(authorization);}}
