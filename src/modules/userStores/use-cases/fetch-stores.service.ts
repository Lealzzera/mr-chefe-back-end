import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserStore } from '@prisma/client';
import { IUsersRepository } from 'src/modules/users/interfaces/users-repository.interface';
import { IUserStoresRepository } from '../interfaces/user-stores-repository.interface';

export interface FetchStoresServiceRequest {
  userId: string;
}

export interface FetchStoresServiceResponse {
  stores: UserStore[];
}

@Injectable()
export class FetchStoresService {
  constructor(
    @Inject('IUsersRepository') private usersRepository: IUsersRepository,
    @Inject('IUserStoresRepository')
    private userStoresRepository: IUserStoresRepository,
  ) {}

  async exec({
    userId,
  }: FetchStoresServiceRequest): Promise<FetchStoresServiceResponse | null> {
    const user = await this.usersRepository.findUserById(userId);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const stores =
      await this.userStoresRepository.fetchUserStoresByUserId(userId);
    return { stores };
  }
}
