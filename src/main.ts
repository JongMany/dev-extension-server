import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

import { Request, Response, json } from 'express';

const whiteList = ['http://43.203.55.144', 'http://localhost:3000'];
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Pre flight request
  app.use((req: Request, res: Response, next) => {
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.header(
        'Access-Control-Allow-Methods',
        'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      );
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      );
      return res.sendStatus(200);
    }
    next();
  });

  app.enableCors({
    // origin: whiteList,
    // origin: whiteList,
    // origin: true,
    origin: (origin, callback) => {
      if (!origin || whiteList.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
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
