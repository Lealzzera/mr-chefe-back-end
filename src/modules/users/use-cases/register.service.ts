import { User } from '@prisma/client';
import { IUsersRepository } from '../interfaces/users-repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';

export interface RegisterServiceRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterRequestResponse {
  user: User;
}

@Injectable()
export class RegisterService {
  constructor(
    @Inject('IUsersRepository') private usersRepository: IUsersRepository,
  ) {}
  async exec({
    name,
    email,
    password,
  }: RegisterServiceRequest): Promise<RegisterRequestResponse> {
    const passwordHashed = await hash(password, 6);

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHashed,
    });

    return { user };
  }
}
