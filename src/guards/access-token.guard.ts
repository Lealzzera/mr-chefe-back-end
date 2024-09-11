import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authorization = context.switchToHttp().getRequest()
      .headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException();
    }

    try {
      await this.jwtService.verify(authorization.split(' ')[1], {
        secret: process.env.JWT_ACCES_TOKEN_SECRET,
      });

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token.');
    }
  }
}
