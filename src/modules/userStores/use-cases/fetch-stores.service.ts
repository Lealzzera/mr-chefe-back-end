import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserStore } from '@prisma/client';
import { IUsersRepository } from 'src/modules/users/interfaces/users-repository.interface';
import { IUserStoresRepository } from '../interfaces/user-stores-repository.interface';
import { IStoreRepository } from 'src/modules/stores/interfaces/store-repository.interface';

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
    private userStoreRepository: IUserStoresRepository,
    @Inject('IStoreRepository') private storeRepository: IStoreRepository,
  ) {}

  async exec({ userId }: FetchStoresServiceRequest): Promise<any> {
    const user = await this.usersRepository.findUserById(userId);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const storeListWhichUserIsAMember =
      await this.userStoreRepository.fetchUserStoresByUserId(userId);

    const storesIdList = storeListWhichUserIsAMember.map(
      ({ storeId }) => storeId,
    );

    console.log({ storeListWhichUserIsAMember });
    const storeListWithStoreInformation =
      await this.storeRepository.fetchStoresByStoresId(storesIdList);
    console.log({ storeListWithStoreInformation });

    const newArrrayReduced = storeListWhichUserIsAMember
      .sort((a, b) => a.storeId - b.storeId)
      .reduce((acc, store, index) => {
        const newObject = {
          ...storeListWithStoreInformation.sort((a, b) => a.id - b.id)[index],
          role: store.role,
        };
        acc.push(newObject);

        return acc;
      }, []);

    return newArrrayReduced;
  }
}
