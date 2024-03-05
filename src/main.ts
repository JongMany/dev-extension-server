import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

const whiteList = ['http://localhost:3000'];
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: whiteList,
    /* (origin, callback) => {
      console.log('origin', origin);
      if (whiteList.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }, */
    // origin: '*',
    credentials: true,
    // allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  });
  app.use(cookieParser());
  await app.listen(8080);
}
bootstrap();
