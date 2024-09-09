import { Module } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { RegisterService } from './use-cases/register.service';
import { UsersController } from './controllers/users.controller';
import { FindUserByIdService } from './use-cases/find-user-by-id.service';
import { FindAllUsersService } from './use-cases/find-all-users.service';

@Module({
  providers: [
    RegisterService,
    FindUserByIdService,
    FindAllUsersService,
    { provide: 'IUsersRepository', useClass: UsersRepository },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
