import { IsString } from 'class-validator';

export class UserStoresDTO {
  @IsString()
  userId: string;
}
