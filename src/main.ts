import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './AppModule';

import { HttpExceptionFilter } from 'libs/HttpExceptionFilter';
import { WsExceptionFilter } from 'libs/WsExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new WsExceptionFilter());

  await app.listen(3000);
}
bootstrap();
