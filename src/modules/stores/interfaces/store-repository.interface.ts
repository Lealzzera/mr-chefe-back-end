import { Store } from '@prisma/client';

export type CreateStoreProps = {
  name: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
  userId: string;
};

export interface IStoreRepository {
  createStore({
    name,
    street,
    neighborhood,
    city,
    state,
    cep,
    userId,
  }: CreateStoreProps): Promise<Store>;
}
