import { UserStore } from '@prisma/client';

import { prisma } from 'src/prisma/prisma-client';
import { Injectable } from '@nestjs/common';
import { IUserStoresRepository } from '../interfaces/user-stores-repository.interface';

@Injectable()
export class UserStoresRepository implements IUserStoresRepository {
  async fetchUserStoresByUserId(userId: string): Promise<UserStore[] | null> {
    const stores = await prisma.userStore.findMany({
      where: {
        userId,
      },
    });

    return stores ?? null;
  }
}
