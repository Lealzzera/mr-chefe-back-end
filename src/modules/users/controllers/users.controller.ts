import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { RegisterService } from '../use-cases/register.service';
import { z } from 'zod';
import { FindUserByEmailService } from '../use-cases/find-user-by-email.service';

class RegisterDto {
  name: string;
  email: string;
  password: string;
}

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
  async registerUser(@Body() { name, email, password }: RegisterDto) {
    try {
      const registerUserBodySchema = z.object({
        name: z.string(),
        password: z.string().min(6),
        email: z.string().email(),
      });

      const userData = registerUserBodySchema.parse({ name, email, password });

      this.registerService.exec({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });
    } catch (err) {
      throw new BadRequestException({ message: err.message });
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
