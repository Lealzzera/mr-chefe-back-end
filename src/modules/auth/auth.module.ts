import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { UsersRepository } from '../users/repositories/users.repository';

@Module({
  imports: [
    ConfigModule,
    JwtModule.register({
      secret: process.env.JWT_ACCES_TOKEN_SECRET,
      signOptions: { expiresIn: '5min' },
    }),
    PassportModule,
    JwtModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    { provide: 'IUsersRepository', useClass: UsersRepository },
  ],
})
export class AuthModule {}
