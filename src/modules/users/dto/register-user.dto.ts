import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class RegisterUserDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 0,
    minUppercase: 0,
    minSymbols: 0,
    minNumbers: 0,
  })
  password: string;
}
