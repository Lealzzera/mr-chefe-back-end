import { User } from '@prisma/client';
import {
  CreateUserProps,
  IUsersRepository,
} from '../interfaces/users-repository.interface';
import { prisma } from 'src/prisma/prisma-client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository implements IUsersRepository {
  create({ name, email, password }: CreateUserProps): Promise<User> {
    const user = prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    return user;
  }
}
