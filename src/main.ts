import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

import { json } from 'express';

const whiteList = ['http://43.203.55.144', 'http://localhost:3000', '*'];
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: whiteList,
    // origin: true,
    /* (origin, callback) => {
      console.log('origin', origin);
      if (whiteList.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }, */
    // origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',

    credentials: true,
    // allowedHeaders:
    //   'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  });
  app.use(cookieParser());
  app.use(json());

  await app.listen(8080);
}
bootstrap();
