import { Module } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { RegisterService } from './use-cases/register.service';
import { UsersController } from './controllers/users.controller';
import { RegisterMemberService } from './use-cases/register-member.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [
    RegisterService,
    JwtService,
    RegisterMemberService,
    { provide: 'IUsersRepository', useClass: UsersRepository },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
