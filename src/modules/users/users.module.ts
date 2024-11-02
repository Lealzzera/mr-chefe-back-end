import { forwardRef, Module } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { RegisterService } from './use-cases/register.service';
import { UsersController } from './controllers/users.controller';
import { RegisterMemberService } from './use-cases/register-member.service';
import { JwtService } from '@nestjs/jwt';
import { StoresModule } from '../stores/stores.module';
import { StoreRepository } from '../stores/repositories/store.repository';

@Module({
  imports: [forwardRef(() => StoresModule)],
  providers: [
    RegisterService,
    JwtService,
    RegisterMemberService,
    { provide: 'IUsersRepository', useClass: UsersRepository },
    {
      provide: 'IStoreRepository',
      useClass: StoreRepository,
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
