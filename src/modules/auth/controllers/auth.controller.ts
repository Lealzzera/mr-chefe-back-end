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
import { z } from 'zod';
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
    const signInBodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });
    const userData = signInBodySchema.parse({ email, password });
    const { accessToken, refreshToken } = await this.authService.generateTokens(
      {
        email: userData.email,
        password: userData.password,
      },
    );

    const sevenDaysExpirationTime = 7 * 24 * 60 * 1000;

    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'production' ? false : true,
      sameSite: 'strict',
      maxAge: sevenDaysExpirationTime,
    });

    return response.json({ accessToken }).status(200);
  }

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
