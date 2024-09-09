import { User } from '@prisma/client';

export type CreateUserProps = {
  name: string;
  email: string;
  password: string;
};

export interface IUsersRepository {
  findUsers(): Promise<User[] | []>;
  findById({ id }: { id: string }): Promise<User | null>;
  create({ name, email, password }: CreateUserProps): Promise<User>;
}
