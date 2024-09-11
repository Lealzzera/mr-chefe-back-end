import { User } from '@prisma/client';
import {
  CreateUserProps,
  IUsersRepository,
} from '../../interfaces/users-repository.interface';
import { randomUUID } from 'crypto';

export class InMemoryUsersRepository implements IUsersRepository {
  private usersDatabase = [];

  async findUserById(id: string): Promise<User | null> {
    const user = await this.usersDatabase.find((item) => item.id === id);

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.usersDatabase.find((item) => {
      return item.email === email;
    });

    return user ? user : null;
  }

  async create({ name, email, password }: CreateUserProps): Promise<User> {
    const user = { id: randomUUID(), name, email, password };
    await this.usersDatabase.push(user);
    return user;
  }
}
