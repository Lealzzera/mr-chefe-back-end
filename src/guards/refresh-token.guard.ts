import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RefreshJWTGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authorization = context.switchToHttp().getRequest();

    if (!authorization) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verify(
        authorization.headers.authorization.split(' ')[1],
        {
          secret: process.env.JWT_REFRESH_TOKEN_SECRET,
        },
      );

      authorization['user'] = payload;

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token.');
    }
  }
}
