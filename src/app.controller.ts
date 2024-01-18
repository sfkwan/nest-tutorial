import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './auth/roles.guard';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly jwtService: JwtService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  @ApiBearerAuth()
  getProfile(@Req() req : Request) {
    return req.user;
  }



@UseGuards(RolesGuard)
@Get('role-guard')
@ApiBearerAuth()
roleGuard() {
  return "hasRoles";
}

@Get('validation-test') 
validate(): any {
  const publicKey = '';
  const token = '';
  this.jwtService.verify(token, {
    publicKey,
    algorithms: ['RS256'],
  });
}

}