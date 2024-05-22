import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TimeModule } from './time/time.module';
import { CommonModule } from './common/common.module';
import { GoalModule } from './goal/goal.module';
import { ProfileModule } from './profile/profile.module';
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
    CommonModule,
    GoalModule,
    ProfileModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {
  private readonly isDev: boolean = process.env.NODE_ENV === 'development';
  constructor() {
    console.log(process.env.MONGO_URI);
  }
  configure() {
    // mongoose 쿼리 logger
    mongoose.set('debug', this.isDev);
  }
}
