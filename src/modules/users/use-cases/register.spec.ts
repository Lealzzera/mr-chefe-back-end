import { describe, expect, it, beforeEach } from 'vitest';
import { RegisterService } from './register.service';
import { InMemoryUsersRepository } from '../repositories/in-memory-repositories/in-memory-users.repository';
import { ConflictException } from '@nestjs/common';
import { compare } from 'bcrypt';

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: RegisterService;

describe('Register service tests', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new RegisterService(inMemoryUsersRepository);
  });

  it('should be able to register an user', async () => {
    const { name, email, password, phoneNumber, cpf } = {
      name: 'John Doe',
      email: 'john.doe@acme.com',
      password: 'test123456',
      phoneNumber: '11999999999',
      cpf: '00000000000',
    };

    const { user } = await sut.exec({
      name,
      email,
      password,
      phoneNumber,
      cpf,
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should not be able to register an user with the same e-mail twice', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john.doe@acme.com',
      password: 'test123456',
      phoneNumber: '11999999999',
      cpf: '00000000000',
    };

    await sut.exec({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      phoneNumber: userData.phoneNumber,
      cpf: userData.cpf,
    });

    await expect(
      sut.exec({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        phoneNumber: userData.phoneNumber,
        cpf: userData.cpf,
      }),
    ).rejects.toBeInstanceOf(ConflictException);
  });

  it('should hash user password', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john.doe@acme.com',
      password: 'test123456',
      phoneNumber: '11999999999',
      cpf: '00000000000',
    };

    const { user } = await sut.exec({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      phoneNumber: userData.phoneNumber,
      cpf: userData.cpf,
    });

    const userPassword = await compare(userData.password, user.password);

    expect(userPassword).toBe(true);
  });
});
