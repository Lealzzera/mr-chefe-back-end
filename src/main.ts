import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as cookieparser from 'cookie-parser';
import { hostname } from 'os';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });
  const port = process.env.PORT;
  app.use(cookieparser());
  app.useGlobalPipes(new ValidationPipe());

  Logger.log(`Running on ${port}`);
  await app.listen(Number(port));
}
bootstrap();
