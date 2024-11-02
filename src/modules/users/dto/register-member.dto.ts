import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

enum UserRole {
  USER = 'USER',
  MANAGER = 'MANAGER',
}

export class RegisterMemberDTO {
  @IsNumber()
  idStore: number;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('BR')
  phoneNumber: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsString()
  cpf: string;
}
