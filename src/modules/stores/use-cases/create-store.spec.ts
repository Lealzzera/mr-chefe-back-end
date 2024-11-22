import { describe, expect, it, beforeEach } from 'vitest';
import { InMemoryStoresRepository } from '../repositories/in-memory-stores-repository/in-memory-stores.repository';
import { CreateStoreService } from './create-store.service';
import { InMemoryUsersRepository } from 'src/modules/users/repositories/in-memory-repositories/in-memory-users.repository';
import { NotFoundException } from '@nestjs/common';
import { InMemoryUserStoresRepository } from 'src/modules/userStores/repositories/in-memory-user-stores-repository/in-memory-user-stores-repository';

let inMemoryStoresRepository: InMemoryStoresRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryUserStoreRepository: InMemoryUserStoresRepository;
let sut: CreateStoreService;

describe('Create store service tests', () => {
  beforeEach(() => {
    inMemoryStoresRepository = new InMemoryStoresRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryUserStoreRepository = new InMemoryUserStoresRepository();
    sut = new CreateStoreService(
      inMemoryStoresRepository,
      inMemoryUsersRepository,
      inMemoryUserStoreRepository,
    );
  });
  it('should be able to create a store', async () => {
    const user = await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'john@acme.com',
      password: 'test123456',
      cpf: '00000000000',
      phoneNumber: '11999999999',
    });
    const { store } = await sut.exec({
      name: 'Test Store',
      cep: '00000000',
      city: 'test city',
      neighborhood: 'test neighborhood',
      state: 'test state',
      street: 'test street',
      ownerId: user.id,
    });

    expect(store.id).toEqual(expect.any(Number));
  });

  it('should not be able to create a store with a wrong owner id', async () => {
    await expect(
      sut.exec({
        name: 'Test Store',
        cep: '00000000',
        city: 'test city',
        neighborhood: 'test neighborhood',
        state: 'test state',
        street: 'test street',
        ownerId: '1234',
      }),
    ).rejects.toBeInstanceOf(NotFoundException);
  });
});
