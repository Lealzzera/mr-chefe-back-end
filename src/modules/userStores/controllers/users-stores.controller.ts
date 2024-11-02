import { Controller, Get, HttpCode, Param, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from 'src/guards/access-token.guard';
import { UserStoresDTO } from '../dto/users-stores.dto';
import { FetchStoresService } from '../use-cases/fetch-stores.service';

@UseGuards(AccessTokenGuard)
@Controller({ path: 'user-store', version: '1' })
export class UserStoresController {
  constructor(private fetchStoresService: FetchStoresService) {}

  @Get(':userId')
  @HttpCode(200)
  async fetchUserStores(@Param() { userId }: UserStoresDTO) {
    try {
      const stores = await this.fetchStoresService.exec({ userId });
      return stores;
    } catch (err) {
      return err;
    }
  }
}
