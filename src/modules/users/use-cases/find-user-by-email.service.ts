import { Inject, Injectable } from '@nestjs/common';
import { IUsersRepository } from '../interfaces/users-repository.interface';
import { User } from '@prisma/client';

export interface FindUserByEmailServiceResponse {
  user: User | null;
}

@Injectable()
export class FindUserByEmailService {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRespository: IUsersRepository,
  ) {}

  async exec(email: string): Promise<FindUserByEmailServiceResponse> {
    const user = await this.usersRespository.findByEmail(email);
    return { user };
  }
}
