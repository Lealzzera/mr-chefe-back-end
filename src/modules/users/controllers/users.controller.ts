import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { RegisterService } from '../use-cases/register.service';
import { RegisterUserDTO } from '../dto/register-user.dto';

@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(private readonly registerService: RegisterService) {}

  @Post('/register')
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
}
