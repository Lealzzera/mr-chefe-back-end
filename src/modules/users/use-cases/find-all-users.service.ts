import { Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { IUsersRepository } from '../interfaces/users-repository.interface';

export interface FindAllUsersServiceResponse {
  users: User[] | [];
}

@Injectable()
export class FindAllUsersService {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  async exec() {
    const users = await this.usersRepository.findUsers();
    return { users };
  }
}
