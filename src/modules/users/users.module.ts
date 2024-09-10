import { Module } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { RegisterService } from './use-cases/register.service';
import { UsersController } from './controllers/users.controller';
import { FindUserByEmailService } from './use-cases/find-user-by-email.service';
import { FindAllUsersService } from './use-cases/find-all-users.service';

@Module({
  providers: [
    RegisterService,
    FindUserByEmailService,
    FindAllUsersService,
    { provide: 'IUsersRepository', useClass: UsersRepository },
  ],
  controllers: [UsersController],
  exports: [FindUserByEmailService],
})
export class UsersModule {}
