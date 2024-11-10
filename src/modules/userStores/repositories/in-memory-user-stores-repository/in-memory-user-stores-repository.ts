import { UserStore } from '@prisma/client';

import {
  AddUserToStoreProps,
  FindUserInAStoreById,
  IUserStoresRepository,
} from '../../interfaces/user-stores-repository.interface';

export class InMemoryUserStoresRepository implements IUserStoresRepository {
  findUserInAStoreById({
    userId,
    storeId,
  }: FindUserInAStoreById): Promise<UserStore | null> {
    throw new Error('Method not implemented.');
  }
  addUserToStore({
    userId,
    storeId,
    role,
  }: AddUserToStoreProps): Promise<UserStore> {
    throw new Error('Method not implemented.');
  }
  private userStoresDataBase = [];
  async fetchUserStoresByUserId(userId: string): Promise<UserStore[] | null> {
    const stores = this.userStoresDataBase.filter(
      (item) => item.userId === userId,
    );

    return stores ?? null;
  }
}
