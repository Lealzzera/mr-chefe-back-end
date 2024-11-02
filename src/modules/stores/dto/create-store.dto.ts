import { IsString } from 'class-validator';

export class CreateStoreDTO {
  @IsString()
  name: string;

  @IsString()
  street: string;

  @IsString()
  neighborhood: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  cep: string;

  @IsString()
  ownerId: string;
}
