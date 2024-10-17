import { User, UserStore } from '@prisma/client';
import {
  AddUserToStoreProps,
  CreateUserProps,
  IUsersRepository,
} from '../../interfaces/users-repository.interface';
import { randomUUID } from 'crypto';

export class InMemoryUsersRepository implements IUsersRepository {
  private usersDatabase = [];

  async findUserInAstoreById(userId: string): Promise<UserStore | null> {
    const userStore = await this.usersDatabase.find(
      (user) => user.userId === userId,
    );
    return userStore || null;
  }
  async addUserToStore({
    userId,
    storeId,
    role,
  }: AddUserToStoreProps): Promise<UserStore> {
    const userStore = { userId, storeId, role };
    await this.usersDatabase.push(userStore);

    return userStore;
  }

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

  async create({
    name,
    email,
    password,
    phoneNumber,
    cpf,
  }: CreateUserProps): Promise<User> {
    const user = { id: randomUUID(), name, email, password, phoneNumber, cpf };
    await this.usersDatabase.push(user);
    return user;
  }
}
