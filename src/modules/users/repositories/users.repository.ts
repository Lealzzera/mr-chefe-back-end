import { User, UserStore } from '@prisma/client';
import {
  AddUserToStoreProps,
  CreateUserProps,
  IUsersRepository,
} from '../interfaces/users-repository.interface';
import { prisma } from 'src/prisma/prisma-client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository implements IUsersRepository {
  async findUserInAstoreById(userId: string): Promise<UserStore | null> {
    const user = await prisma.userStore.findFirst({
      where: {
        userId,
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

  async findUserById(id: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async create({
    name,
    email,
    password,
    cpf,
    phoneNumber,
  }: CreateUserProps): Promise<User> {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        cpf,
        phoneNumber,
      },
    });
    return user;
  }
}
