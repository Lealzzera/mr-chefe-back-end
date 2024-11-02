import { UserStore } from '@prisma/client';

export type CreateStoreProps = {
  name: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
  ownerId: string;
};

export interface IUserStoresRepository {
  fetchUserStoresByUserId(userId: string): Promise<UserStore[] | null>;
}
