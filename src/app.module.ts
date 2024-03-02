import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TimeModule } from './time/time.module';
import mongoose from 'mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UserModule,
    AuthModule,
    TimeModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {
  private readonly isDev: boolean = process.env.NODE_ENV === 'development';
  configure() {
    // mongoose 쿼리 logger
    mongoose.set('debug', this.isDev);
  }
}
