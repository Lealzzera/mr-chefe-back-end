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
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('sessions')
  async signIn(
    @Body() { email, password }: { email: string; password: string },
    @Res() response: Response,
  ) {
    if (!email || !password) {
      throw new UnauthorizedException('Invalid user credentials.');
    }
    const { accessToken, refreshToken } = await this.authService.generateTokens(
      {
        email,
        password,
      },
    );

    const sevenDaysExpirationTime = 60 * 1000 * 60 * 24 * 7;

    return response
      .status(201)
      .cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: sevenDaysExpirationTime,
        sameSite: 'strict',
        path: '/',
      })
      .json({ accessToken });
  }

  @HttpCode(200)
  @Post('refresh')
  async refresh(@Req() request: Request) {
    const refreshToken = await request.cookies['refresh_token'];

    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    const { sub } = await this.jwtService.decode(refreshToken);
    const accessToken = await this.authService.generateAccessToken({ sub });

    return { accessToken };
  }
}
