import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { JwtPayload } from 'src/@types/jwt-payload';
import { IUsersRepository } from '../users/interfaces/users-repository.interface';

export interface AuthServiceRequest {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject('IUsersRepository') private usersRepository: IUsersRepository,
    private jwtService: JwtService,
  ) {}

  async generateToken({ email, password }: AuthServiceRequest) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid user credentials.');
    }

    const doesPasswordMatch = await compare(password, user.password);

    if (!doesPasswordMatch) {
      throw new UnauthorizedException('Invalid user credentials.');
    }

    const payload = { sub: user.id };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: '1h',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: '15d',
    });
    return { accessToken, refreshToken };
  }

  async generateRefreshToken(user) {
    const payload = { sub: user.sub };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: '1h',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: '15d',
    });

    return { accessToken, refreshToken };
  }
}
