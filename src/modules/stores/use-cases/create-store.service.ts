import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IStoreRepository } from '../interfaces/store-repository.interface';
import { Store } from '@prisma/client';
import { IUsersRepository } from 'src/modules/users/interfaces/users-repository.interface';

export interface CreateStoreServiceRequest {
  name: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
  ownerId: string;
}

export interface CreateStoreServiceResponse {
  store: Store;
}

@Injectable()
export class CreateStoreService {
  constructor(
    @Inject('IStoreRepository') private storeRepository: IStoreRepository,
    @Inject('IUsersRepository') private userRepository: IUsersRepository,
  ) {}

  async exec({
    name,
    street,
    neighborhood,
    city,
    state,
    cep,
    ownerId,
  }: CreateStoreServiceRequest): Promise<CreateStoreServiceResponse> {
    const user = await this.userRepository.findUserById(ownerId);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const store = await this.storeRepository.createStore({
      name,
      street,
      neighborhood,
      city,
      state,
      cep,
      ownerId,
    });
    return { store };
  }
}
