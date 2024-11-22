import { UserStore } from '@prisma/client';

import {
  AddUserToStoreProps,
  FindUserInAStoreById,
  IUserStoresRepository,
} from '../../interfaces/user-stores-repository.interface';

export class InMemoryUserStoresRepository implements IUserStoresRepository {
  private userStoresDataBase = [];
  async findUserInAStoreById({
    userId,
    storeId,
  }: FindUserInAStoreById): Promise<UserStore | null> {
    return null;
  }
  async addUserToStore({
    userId,
    storeId,
    role,
  }: AddUserToStoreProps): Promise<UserStore> {
    const userStore = { userId, storeId, role };

    await this.userStoresDataBase.push(userStore);

    return userStore;
  }
  async fetchUserStoresByUserId(userId: string): Promise<UserStore[] | null> {
    const stores = this.userStoresDataBase.filter(
      (item) => item.userId === userId,
    );

    return stores ?? null;
  }
}
