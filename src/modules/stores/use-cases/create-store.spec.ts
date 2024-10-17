import { describe, expect, it, beforeEach } from 'vitest';
import { InMemoryStoresRepository } from '../repositories/in-memory-stores-repository/in-memory-stores.repository';
import { CreateStoreService } from './create-store.service';
import { InMemoryUsersRepository } from 'src/modules/users/repositories/in-memory-repositories/in-memory-users.repository';
import { NotFoundException } from '@nestjs/common';

let inMemoryStoresRepository: InMemoryStoresRepository;
let usersRepository: InMemoryUsersRepository;
let sut: CreateStoreService;

describe('Create store service tests', () => {
  beforeEach(() => {
    inMemoryStoresRepository = new InMemoryStoresRepository();
    usersRepository = new InMemoryUsersRepository();
    sut = new CreateStoreService(inMemoryStoresRepository, usersRepository);
  });
  it('should be able to create a store', async () => {
    const user = await usersRepository.create({
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
