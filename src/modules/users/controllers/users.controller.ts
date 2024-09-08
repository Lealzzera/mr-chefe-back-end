import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { RegisterService } from '../use-cases/register.service';

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
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  async registerUser(@Body() { name, email, password }: RegisterDto) {
    const user = await this.registerService.exec({ name, email, password });
  }
}
