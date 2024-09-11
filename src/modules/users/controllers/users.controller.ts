import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { RegisterService } from '../use-cases/register.service';
import { FindUserByEmailService } from '../use-cases/find-user-by-email.service';
import { RegisterUserDTO } from '../dto/register-user.dto';

@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(
    private readonly registerService: RegisterService,
    private readonly findUserByEmailService: FindUserByEmailService,
  ) {}

  @Post()
  @HttpCode(201)
  async registerUser(@Body() { name, email, password }: RegisterUserDTO) {
    try {
      await this.registerService.exec({
        name,
        email,
        password,
      });
    } catch (err) {
      return { message: err.response };
    }
  }

  @HttpCode(200)
  @Post('/me')
  async findAnUser(@Body() email: string) {
    try {
      const { user } = await this.findUserByEmailService.exec(email);
      return user;
    } catch (err) {
      throw new BadRequestException({ message: err.message });
    }
  }
}
