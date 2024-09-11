import { User } from '@prisma/client';
import {
  CreateUserProps,
  IUsersRepository,
} from '../../interfaces/users-repository.interface';
import { randomUUID } from 'crypto';

export class InMemoryUsersRepository implements IUsersRepository {
  private usersDatabase = [];

  findUserById(id: string): Promise<User | null> {
    const user = this.usersDatabase.find((item) => item.id === id);

    return user;
  }
  async findUsers(): Promise<User[] | []> {
    const users = this.usersDatabase.map((user) => user);
    return users;
  }
  findByEmail(email: string): Promise<User | null> {
    const user = this.usersDatabase.find((item) => {
      return item.email === email;
    });

    return user ? user : null;
  }
  async create({ name, email, password }: CreateUserProps): Promise<User> {
    const user = { id: randomUUID(), name, email, password };
    this.usersDatabase.push(user);
    return user;
  }
}
