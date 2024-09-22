import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Res,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Response } from 'express';
import { AuthDTO } from '../dto/auth.dto';
import { RefreshJWTGuard } from 'src/guards/refresh-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(201)
  @Post('sessions')
  async signIn(
    @Body() { email, password }: AuthDTO,
    @Res() response: Response,
  ) {
    if (!email || !password) {
      throw new UnauthorizedException('Invalid user credentials.');
    }
    const { accessToken, refreshToken } = await this.authService.generateToken({
      email,
      password,
    });

    return response.status(201).json({ accessToken, refreshToken });
  }

  @UseGuards(RefreshJWTGuard)
  @HttpCode(201)
  @Post('refresh')
  async refreshToken(@Req() req) {
    return await this.authService.generateRefreshToken(req.user);
  }
}
