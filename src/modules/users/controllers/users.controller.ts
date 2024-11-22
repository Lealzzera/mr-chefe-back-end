import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RegisterService } from '../use-cases/register.service';
import { RegisterUserDTO } from '../dto/register-user.dto';
import { RegisterMemberDTO } from '../dto/register-member.dto';
import { RegisterMemberService } from '../use-cases/register-member.service';
import { AccessTokenGuard } from 'src/guards/access-token.guard';
import { GetUserByIdService } from '../use-cases/get-user-by-id.service';

@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(
    private readonly getUserById: GetUserByIdService,
    private readonly registerService: RegisterService,
    private readonly registerMemberService: RegisterMemberService,
  ) {}

  @Post('/register')
  @HttpCode(201)
  async registerUser(
    @Body() { name, email, password, phoneNumber, cpf }: RegisterUserDTO,
  ) {
    try {
      await this.registerService.exec({
        name,
        email,
        password,
        phoneNumber,
        cpf,
      });
    } catch (err) {
      return { message: err.response };
    }
  }

  @UseGuards(AccessTokenGuard)
  @Post('/register-member')
  @HttpCode(201)
  async registerEmployeeMember(
    @Body() { idStore, name, email, phoneNumber, role, cpf }: RegisterMemberDTO,
  ) {
    await this.registerMemberService.exec({
      idStore,
      name,
      email,
      phoneNumber,
      role,
      cpf,
    });
  }

  @UseGuards(AccessTokenGuard)
  @Get('/:userId')
  @HttpCode(201)
  async fetchUserInfo(@Param('userId') userId: string) {
    try {
      const user = await this.getUserById.exec(userId);
      return user;
    } catch (err) {
      return err;
    }
  }
}
