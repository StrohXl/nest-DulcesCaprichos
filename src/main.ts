import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { ClassSerializerInterceptor, ValidationPipe} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.use(cors());
  await app.listen(8000);
}
bootstrap();
