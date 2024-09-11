import { Module } from '@nestjs/common';
import { CreateStoreService } from './use-cases/create-store.service';
import { StoreRepository } from './repositories/store.repository';
import { StoresController } from './controllers/stores.controller';
import { JwtService } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { UsersRepository } from '../users/repositories/users.repository';

@Module({
  imports: [UsersModule],
  providers: [
    CreateStoreService,
    JwtService,
    {
      provide: 'IStoreRepository',
      useClass: StoreRepository,
    },
    { provide: 'IUsersRepository', useClass: UsersRepository },
  ],
  controllers: [StoresController],
  exports: [],
})
export class StoresModule {}
