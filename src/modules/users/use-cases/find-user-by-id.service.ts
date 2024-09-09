import { Inject, Injectable } from '@nestjs/common';
import { IUsersRepository } from '../interfaces/users-repository.interface';
import { User } from '@prisma/client';

export interface FindUserByIdServiceRequest {
  id: string;
}

export interface FindUserByIdServiceResponse {
  user: User | null;
}

@Injectable()
export class FindUserByIdService {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRespository: IUsersRepository,
  ) {}

  async exec({
    id,
  }: FindUserByIdServiceRequest): Promise<FindUserByIdServiceResponse> {
    const user = await this.usersRespository.findById({ id });
    return { user };
  }
}
