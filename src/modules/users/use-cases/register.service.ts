import { User } from '@prisma/client';
import { IUsersRepository } from '../interfaces/users-repository.interface';
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { hash } from 'bcrypt';

export interface RegisterServiceRequest {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  cpf: string;
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
    phoneNumber,
    cpf,
  }: RegisterServiceRequest): Promise<RegisterRequestResponse> {
    const doesUserExist = await this.usersRepository.findByEmail(email);

    if (doesUserExist) {
      throw new ConflictException('User e-mail provided already exists.');
    }

    if (!email || !name || !password || !phoneNumber || !cpf) {
      throw new BadRequestException(
        'Must to provide: Email, Name, Password, Phone number and CPF',
      );
    }

    const passwordHashed = await hash(password, 6);
    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHashed,
      phoneNumber,
      cpf,
    });
    return { user };
  }
}
