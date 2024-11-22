import { forwardRef, Module } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { RegisterService } from './use-cases/register.service';
import { UsersController } from './controllers/users.controller';
import { RegisterMemberService } from './use-cases/register-member.service';
import { JwtService } from '@nestjs/jwt';
import { StoresModule } from '../stores/stores.module';
import { StoreRepository } from '../stores/repositories/store.repository';
import { UserStoresRepository } from '../userStores/repositories/user-stores.repository';
import { GetUserByIdService } from './use-cases/get-user-by-id.service';

@Module({
  imports: [forwardRef(() => StoresModule)],
  providers: [
    GetUserByIdService,
    RegisterService,
    JwtService,
    RegisterMemberService,
    { provide: 'IUsersRepository', useClass: UsersRepository },
    {
      provide: 'IStoreRepository',
      useClass: StoreRepository,
    },
    { provide: 'IUserStoreRepository', useClass: UserStoresRepository },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
