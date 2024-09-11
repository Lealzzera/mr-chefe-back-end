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
    const { name, email, password } = {
      name: 'John Doe',
      email: 'john.doe@acme.com',
      password: 'test123456',
    };

    const { user } = await sut.exec({ name, email, password });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should not be able to register an user with the same e-mail twice', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john.doe@acme.com',
      password: 'test123456',
    };

    await sut.exec({
      name: userData.name,
      email: userData.email,
      password: userData.password,
    });

    await expect(
      sut.exec({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      }),
    ).rejects.toBeInstanceOf(ConflictException);
  });

  it('should hash user password', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john.doe@acme.com',
      password: 'test123456',
    };

    const { user } = await sut.exec({
      name: userData.name,
      email: userData.email,
      password: userData.password,
    });

    const userPassword = await compare(userData.password, user.password);

    expect(userPassword).toBe(true);
  });
});
