import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Res,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('sessions')
  async signIn(
    @Body() { email, password }: { email: string; password: string },
    @Res() response: Response,
  ) {
    if (!email || !password) {
      throw new UnauthorizedException('Invalid user credentials.');
    }
    const { accessToken } = await this.authService.generateToken({
      email,
      password,
    });

    const fifteenDaysFromNow = 60 * 1000 * 60 * 24 * 15;
    return response
      .status(201)
      .cookie('access_token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: fifteenDaysFromNow,
        sameSite: 'lax',
        expires: new Date(Date.now() + fifteenDaysFromNow),
        domain:
          process.env.NODE_ENV === 'production'
            ? 'https://www.mrchefe.com.br'
            : 'http://localhost:3000/',
      })
      .json({ accessToken });
  }
}
