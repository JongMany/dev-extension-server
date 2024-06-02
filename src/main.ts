import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

import { Request, Response, json } from 'express';

const whiteList = [
  'http://43.203.55.144',
  'http://127.0.0.1:3000',
  'http://localhost:3000',
];
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // // Pre flight request
  // app.use((req: Request, res: Response, next) => {
  //   if (req.method === 'OPTIONS') {
  //     res.header('Access-Control-Allow-Origin', req.headers.origin);
  //     res.header(
  //       'Access-Control-Allow-Methods',
  //       'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  //     );
  //     res.header('Access-Control-Allow-Credentials', 'true');
  //     res.header(
  //       'Access-Control-Allow-Headers',
  //       'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  //     );
  //     return res.sendStatus(200);
  //   }
  //   next();
  // });

  // app.enableCors({
  //   // origin: whiteList,
  //   // origin: whiteList,
  //   // origin: true,
  //   origin: (origin, callback) => {
  //     if (!origin || whiteList.indexOf(origin) !== -1) {
  //       callback(null, true);
  //     } else {
  //       callback(new Error('Not allowed by CORS'));
  //     }
  //   },
  //   // origin: '*',
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',

  //   credentials: true,
  //   // allowedHeaders:
  //   //   'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  // });
  app.use(cookieParser());

  // Logging middleware to debug CORS issues
  app.use((req: Request, res: Response, next) => {
    // console.log(`Request from origin: ${req.headers.origin}`);
    // console.log(`Request method: ${req.method}`);
    next();
  });

  app.enableCors({
    origin: (origin, callback) => {
      // console.log(origin, whiteList);
      if (!origin || whiteList.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  });

  // 세션허용
  app.use(
    session({
      secret: 'SECRET', // 비밀키를 여기에 설정하세요
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 3600000, // 쿠키의 만료 시간 (1시간)
        httpOnly: true, // 자바스크립트 접근 방지
        secure: false, // 프로덕션 환경에서는 true로 설정
        sameSite: 'none', // 프로덕션 환경에서는 'none'으로 설정
        domain:
          process.env.NODE_ENV === 'production'
            ? 'http://43.203.82.210:8080'
            : 'http://localhost:8080',
      },
    }),
  );

  // Manually handle OPTIONS requests
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
      return res.sendStatus(204);
    }
    next();
  });

  app.use(json());

  // Logging
  app.use((req: Request, res: Response, next) => {
    // console.log(`Request from origin: ${req.headers.origin}`);
    // console.log(`Request method: ${req.method}`);
    next();
  });

  await app.listen(8080);
}
bootstrap();
