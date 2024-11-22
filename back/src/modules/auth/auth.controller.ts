// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { Controller, Post, Body, Header, Res, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response as ResponseType } from 'express';
import { User } from 'src/models/user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
    // Do nothing.
  }

  @Post('login')
  @Header('Authorization', 'Bearer')
  async login(
    @Res({ passthrough: true }) res: ResponseType,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const token = await this.authService.login(email, password);

    await this.authService.validateUser(email);

    res.cookie('SESSION', token.accessToken, {
      httpOnly: true,
      domain: process.env.DOMAIN,
    });
    res.status(202);

    return token;
  }

  @Post('register')
  async register(@Body() user: User) {
    await this.authService.register(user);
  }

  // eslint-disable-next-line class-methods-use-this
  @Get('logout')
  logout(@Res({ passthrough: true }) res: ResponseType) {
    res.cookie('SESSION', null, {
      httpOnly: true,
      domain: process.env.DOMAIN,
    });
  }
}
