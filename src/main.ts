import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as cookieparser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });
  const port = process.env.PORT;
  app.use(cookieparser());

  Logger.log(`Running on ${port}`);
  await app.listen(port);
}
bootstrap();
