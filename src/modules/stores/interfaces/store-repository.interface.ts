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
  fetchStoresByStoresId(idStores: number[]): Promise<Store[] | null>;
  findStoreByOwnerId(ownerId: string): Promise<Store | null>;
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
