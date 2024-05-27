import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/user.schema';
import { UserService } from './user.service';
import { UserRepository } from 'src/user/user.repository';

import { ProfileModule } from 'src/profile/profile.module';
import { TimeModule } from 'src/time/time.module';

@Module({
  imports: [
    forwardRef(() => ProfileModule),
    forwardRef(() => TimeModule),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserRepository, MongooseModule],
})
export class UserModule {}
