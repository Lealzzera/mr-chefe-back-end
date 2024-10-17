import { Store } from '@prisma/client';
import {
  CreateStoreProps,
  IStoreRepository,
} from '../../interfaces/store-repository.interface';

export class InMemoryStoresRepository implements IStoreRepository {
  private storeDatabase = [];
  async findStoreById(id: number): Promise<Store | null> {
    const store = this.storeDatabase.find((store) => store.id === id);
    return store || null;
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
    const store = {
      id: this.storeDatabase.length + 1,
      name,
      street,
      neighborhood,
      city,
      state,
      cep,
      ownerId,
    };
    await this.storeDatabase.push(store);

    return store;
  }
}
