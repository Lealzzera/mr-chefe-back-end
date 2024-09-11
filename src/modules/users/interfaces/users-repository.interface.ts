import { User } from '@prisma/client';

export type CreateUserProps = {
  name: string;
  email: string;
  password: string;
};

export interface IUsersRepository {
  findUserById(id: string): Promise<User | null>;
  findUsers(): Promise<User[] | []>;
  findByEmail(email: string): Promise<User | null>;
  create({ name, email, password }: CreateUserProps): Promise<User>;
}
