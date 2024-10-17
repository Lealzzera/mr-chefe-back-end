import { Store } from '@prisma/client';

export type CreateStoreProps = {
  name: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
  ownerId: string;
};

export interface IStoreRepository {
  findStoreById(id: number): Promise<Store | null>;
  createStore({
    name,
    street,
    neighborhood,
    city,
    state,
    cep,
    ownerId,
  }: CreateStoreProps): Promise<Store>;
}
