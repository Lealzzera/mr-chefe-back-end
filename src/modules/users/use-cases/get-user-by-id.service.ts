import { IUsersRepository } from '../interfaces/users-repository.interface';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';

type UserDataObject = {
  name: string;
  email: string;
  cpf: string;
  phoneNumber: string;
};

export interface GetUserByIdServiceResponse {
  user: UserDataObject;
}

@Injectable()
export class GetUserByIdService {
  constructor(
    @Inject('IUsersRepository') private usersRepository: IUsersRepository,
  ) {}
  async exec(userId: string): Promise<GetUserByIdServiceResponse> {
    if (!userId.length) {
      throw new BadRequestException('Must provide an user id.');
    }
    const userById = await this.usersRepository.findUserById(userId);
    return {
      user: {
        cpf: userById.cpf,
        email: userById.email,
        name: userById.name,
        phoneNumber: userById.phoneNumber,
      },
    };
  }
}
