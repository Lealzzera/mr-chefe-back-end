import { Module } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { RegisterService } from './use-cases/register.service';
import { UsersController } from './controllers/users.controller';

@Module({
  providers: [
    RegisterService,
    { provide: 'IUsersRepository', useClass: UsersRepository },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
