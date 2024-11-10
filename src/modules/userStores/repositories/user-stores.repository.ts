import { UserStore } from '@prisma/client';

import { prisma } from 'src/prisma/prisma-client';
import { Injectable } from '@nestjs/common';
import {
  AddUserToStoreProps,
  FindUserInAStoreById,
  IUserStoresRepository,
} from '../interfaces/user-stores-repository.interface';

@Injectable()
export class UserStoresRepository implements IUserStoresRepository {
  async findUserInAStoreById({
    userId,
    storeId,
  }: FindUserInAStoreById): Promise<UserStore | null> {
    const user = await prisma.userStore.findFirst({
      where: {
        userId,
        storeId,
      },
    });

    return user;
  }
  async addUserToStore({ userId, storeId, role }: AddUserToStoreProps) {
    const userAdded = await prisma.userStore.create({
      data: {
        userId,
        storeId,
        role,
      },
    });

    return userAdded;
  }
  async fetchUserStoresByUserId(userId: string): Promise<UserStore[] | null> {
    const stores = await prisma.userStore.findMany({
      where: {
        userId,
      },
    });

    return stores ?? null;
  }
}
