import { User } from '@prisma/client';

export type CreateUserProps = {
  name: string;
  email: string;
  password: string;
};

export interface IUsersRepository {
  create({ name, email, password }: CreateUserProps): Promise<User>;
}
