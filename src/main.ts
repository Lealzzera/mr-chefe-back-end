import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './env/env.service';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });
  const configService = app.get(EnvService);
  const port = configService.get('PORT');

  Logger.log(`Running on ${port}`);
  await app.listen(port);
}
bootstrap();
