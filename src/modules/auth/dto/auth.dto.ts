import { IsEmail, IsString } from 'class-validator';

export class AuthDTO {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
