import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FindUserByEmailService } from '../users/use-cases/find-user-by-email.service';
import { compare } from 'bcrypt';
import { JwtPayload } from 'src/@types/jwt-payload';

export interface AuthServiceRequest {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly findUserByEmailService: FindUserByEmailService,
    private jwtService: JwtService,
  ) {}

  async generateTokens({ email, password }: AuthServiceRequest) {
    const { user } = await this.findUserByEmailService.exec(email);
    const doesPasswordMatch = await compare(password, user.password);
    if (!user || !doesPasswordMatch) {
      throw new Error('Invalid user credentials.');
    }

    const payload = { sub: user.id };
    const accessToken = await this.generateAccessToken(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: '7d',
    });
    return { accessToken, refreshToken };
  }

  async generateAccessToken(payload: JwtPayload) {
    const accessToken = this.jwtService.sign(payload);
    return accessToken;
  }
}
