import 'reflect-metadata';

import envConfig from '@/shared/envConfig';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from '@/shared/transform.interceptor';
import { CustomValidation } from '@/shared/custom.validation';
import cookieParser from 'cookie-parser';

async function bootstrap() {
   const app = await NestFactory.create(AppModule);

   app.setGlobalPrefix('api');
   app.use(cookieParser());

   app.useGlobalInterceptors(new TransformInterceptor());
   app.useGlobalPipes(
      new CustomValidation({
         whitelist: true,
         forbidNonWhitelisted: true,
         transform: true,
      })
   );

   await app.listen(envConfig.PORT_SV ?? 3000);
}

void bootstrap();
