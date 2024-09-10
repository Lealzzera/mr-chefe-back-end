import { Inject, Injectable } from '@nestjs/common';
import { IStoreRepository } from '../interfaces/store-repository.interface';
import { Store } from '@prisma/client';

export interface CreateStoreServiceRequest {
  name: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
  userId: string;
}

export interface CreateStoreServiceResponse {
  store: Store;
}

@Injectable()
export class CreateStoreService {
  constructor(
    @Inject('IStoreRepository') private storeRepository: IStoreRepository,
  ) {}

  async exec({
    name,
    street,
    neighborhood,
    city,
    state,
    cep,
    userId,
  }: CreateStoreServiceRequest): Promise<CreateStoreServiceResponse> {
    const store = await this.storeRepository.createStore({
      name,
      street,
      neighborhood,
      city,
      state,
      cep,
      userId,
    });
    return { store };
  }
}
