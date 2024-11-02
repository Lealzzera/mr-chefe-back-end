import { forwardRef, Module } from '@nestjs/common';
import { UserStoresController } from './controllers/users-stores.controller';
import { UsersModule } from '../users/users.module';
import { UsersRepository } from '../users/repositories/users.repository';
import { JwtService } from '@nestjs/jwt';
import { FetchStoresService } from './use-cases/fetch-stores.service';
import { UserStoresRepository } from './repositories/user-stores.repository';

@Module({
  imports: [forwardRef(() => UsersModule)],
  providers: [
    JwtService,
    FetchStoresService,
    { provide: 'IUserStoresRepository', useClass: UserStoresRepository },
    { provide: 'IUsersRepository', useClass: UsersRepository },
  ],
  controllers: [UserStoresController],
  exports: [],
})
export class UserStoresModule {}
