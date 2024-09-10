import { Module } from '@nestjs/common';
import { CreateStoreService } from './use-cases/create-store.service';
import { StoreRepository } from './repositories/store.repository';
import { StoresController } from './controllers/stores.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [
    CreateStoreService,
    JwtService,
    {
      provide: 'IStoreRepository',
      useClass: StoreRepository,
    },
  ],
  controllers: [StoresController],
  exports: [],
})
export class StoresModule {}
