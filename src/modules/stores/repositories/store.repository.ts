import { Store } from '@prisma/client';
import {
  CreateStoreProps,
  IStoreRepository,
} from '../interfaces/store-repository.interface';
import { prisma } from 'src/prisma/prisma-client';

export class StoreRepository implements IStoreRepository {
  async findStoreByOwnerId(ownerId: string): Promise<Store | null> {
    const store = await prisma.store.findFirst({
      where: {
        ownerId,
      },
    });

    return store ?? null;
  }

  async findStoreById(id: number): Promise<Store | null> {
    const store = await prisma.store.findFirst({
      where: {
        id,
      },
    });

    return store;
  }
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
