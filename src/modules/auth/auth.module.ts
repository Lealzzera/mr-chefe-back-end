import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { FindUserByEmailService } from '../users/use-cases/find-user-by-email.service';
import { UsersRepository } from '../users/repositories/users.repository';

@Module({
  imports: [
    ConfigModule,
    JwtModule.register({
      secret: process.env.JWT_ACCES_TOKEN_SECRET,
      signOptions: { expiresIn: '5min' },
    }),
    UsersModule,
    PassportModule,
    JwtModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    FindUserByEmailService,
    { provide: 'IUsersRepository', useClass: UsersRepository },
  ],
})
export class AuthModule {}
