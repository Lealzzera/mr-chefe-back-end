import { User, UserStore } from '@prisma/client';

export type CreateUserProps = {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  cpf: string;
};

export type AddUserToStoreProps = {
  userId: string;
  storeId: number;
  role: 'USER' | 'MANAGER';
};

export interface IUsersRepository {
  findUserInAstoreById(userId: string): Promise<UserStore | null>;
  addUserToStore({
    userId,
    storeId,
    role,
  }: AddUserToStoreProps): Promise<UserStore>;
  findUserById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create({
    name,
    email,
    password,
    phoneNumber,
    cpf,
  }: CreateUserProps): Promise<User>;
}
