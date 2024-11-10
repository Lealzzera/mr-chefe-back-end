import { User } from '@prisma/client';

export type CreateUserProps = {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  cpf: string;
};

export interface IUsersRepository {
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
