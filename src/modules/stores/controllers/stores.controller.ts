import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { CreateStoreService } from '../use-cases/create-store.service';
import { AccessTokenGuard } from 'src/guards/access-token.guard';
class CreateStoreDto {
  name: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
  userId: string;
}

@Controller({
  path: 'stores',
  version: '1',
})
@UseGuards(AccessTokenGuard)
export class StoresController {
  constructor(private readonly createStoreService: CreateStoreService) {}
  @Post()
  @HttpCode(201)
  async create(
    @Body()
    { name, street, neighborhood, city, state, cep, userId }: CreateStoreDto,
  ) {
    return this.createStoreService.exec({
      name,
      street,
      neighborhood,
      city,
      state,
      cep,
      userId,
    });
  }
}
