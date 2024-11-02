import { UserStore } from '@prisma/client';

import { IUserStoresRepository } from '../../interfaces/user-stores-repository.interface';

export class InMemoryUserStoresRepository implements IUserStoresRepository {
  private userStoresDataBase = [];
  async fetchUserStoresByUserId(userId: string): Promise<UserStore[] | null> {
    const stores = this.userStoresDataBase.filter(
      (item) => item.userId === userId,
    );

    return stores ?? null;
  }
}
