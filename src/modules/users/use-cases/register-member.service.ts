import {
  Inject,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { IUsersRepository } from '../interfaces/users-repository.interface';
import { User } from '@prisma/client';
import { generate } from 'generate-password';
import { hash } from 'bcrypt';
import { IStoreRepository } from 'src/modules/stores/interfaces/store-repository.interface';
import { IUserStoresRepository } from 'src/modules/userStores/interfaces/user-stores-repository.interface';

export interface IRegisterMember {
  idStore: number;
  name: string;
  email: string;
  phoneNumber: string;
  cpf: string;
  role: 'USER' | 'MANAGER';
}

export interface RegisterRequestResponse {
  user: User;
}

export class RegisterMemberService {
  constructor(
    @Inject('IUsersRepository') private usersRepository: IUsersRepository,
    @Inject('IStoreRepository') private storeRepository: IStoreRepository,
    @Inject('IUserStoreRepository')
    private userStoreRepository: IUserStoresRepository,
  ) {}

  async exec({
    idStore,
    name,
    email,
    phoneNumber,
    role,
    cpf,
  }: IRegisterMember) {
    const doesUserExist = await this.usersRepository.findByEmail(email);

    if (!idStore) {
      throw new UnauthorizedException('idStore must to be provided.');
    }

    const store = await this.storeRepository.findStoreById(idStore);

    if (!store) {
      throw new NotFoundException('Store provided not found');
    }

    //TODO: CREATE AN WAY TO SEND THIS PASSWORD BY EMAIL
    let user: User;
    if (!doesUserExist) {
      const password = generate({ length: 8, numbers: true });

      const passwordHashed = await hash(password, 6);

      user = await this.usersRepository.create({
        name,
        email,
        phoneNumber,
        password: passwordHashed,
        cpf,
      });

      await this.userStoreRepository.addUserToStore({
        userId: doesUserExist ? doesUserExist.id : user.id,
        storeId: idStore,
        role,
      });

      return { user };
    }

    const isUserAlreadyRegistered =
      await this.userStoreRepository.findUserInAStoreById({
        userId: doesUserExist.id,
        storeId: idStore,
      });

    if (isUserAlreadyRegistered.storeId === idStore) {
      throw new UnauthorizedException('User already registered on the store.');
    }

    await this.userStoreRepository.addUserToStore({
      userId: doesUserExist ? doesUserExist.id : user.id,
      storeId: idStore,
      role,
    });

    return { user };
  }
}
