import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { RegisterService } from '../use-cases/register.service';
import { z } from 'zod';
import { FindUserByIdService } from '../use-cases/find-user-by-id.service';
import { FindAllUsersService } from '../use-cases/find-all-users.service';

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
    private readonly findUserByIdService: FindUserByIdService,
    private readonly findAllUsersService: FindAllUsersService,
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
  @Get(':id')
  async getAnUser(@Param('id') id: string) {
    try {
      const user = this.findUserByIdService.exec({ id });
      return user;
    } catch (err) {
      throw new BadRequestException({ message: err.message });
    }
  }

  @HttpCode(200)
  @Get(':id')
  async getAllUsers() {
    try {
      const users = await this.findAllUsersService.exec();
      return { users };
    } catch (err) {
      throw new BadRequestException({ message: err.message });
    }
  }
}
