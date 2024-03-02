import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from 'src/user/user.schema';
import { UserModule } from 'src/user/user.module';
// import { UserRepository } from 'src/user/user.repository';
// import { UserRepository } from 'src/user/user.repository';

@Module({
  imports: [
    forwardRef(() => UserModule),
    MongooseModule.forFeature([{ name: User.name, schema: User }]),
  ],

  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
