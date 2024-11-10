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

export type AddUserToStoreProps = {
  userId: string;
  storeId: number;
  role: 'USER' | 'MANAGER' | 'ALL_ACCESS';
};

export type FindUserInAStoreById = {
  userId: string;
  storeId: number;
};

export interface IUserStoresRepository {
  findUserInAStoreById({
    userId,
    storeId,
  }: FindUserInAStoreById): Promise<UserStore | null>;

  addUserToStore({
    userId,
    storeId,
    role,
  }: AddUserToStoreProps): Promise<UserStore>;

  fetchUserStoresByUserId(userId: string): Promise<UserStore[] | null>;
}
