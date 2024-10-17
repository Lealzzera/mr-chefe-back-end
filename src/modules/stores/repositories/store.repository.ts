import { Store } from '@prisma/client';
import {
  CreateStoreProps,
  IStoreRepository,
} from '../interfaces/store-repository.interface';
import { prisma } from 'src/prisma/prisma-client';

export class StoreRepository implements IStoreRepository {
  async createStore({
    name,
    street,
    neighborhood,
    city,
    state,
    cep,
    ownerId,
  }: CreateStoreProps): Promise<Store> {
    const store = await prisma.store.create({
      data: {
        name,
        street,
        neighborhood,
        city,
        state,
        cep,
        ownerId,
      },
    });

    return store;
  }
}
