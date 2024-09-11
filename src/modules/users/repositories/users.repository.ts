import { User } from '@prisma/client';
import {
  CreateUserProps,
  IUsersRepository,
} from '../interfaces/users-repository.interface';
import { prisma } from 'src/prisma/prisma-client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository implements IUsersRepository {
  async findUserById(id: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    return user;
  }
  async findUsers(): Promise<User[] | []> {
    const users = await prisma.user.findMany();
    return users;
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }
  async create({ name, email, password }: CreateUserProps): Promise<User> {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    return user;
  }
}
