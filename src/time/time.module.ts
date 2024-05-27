import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Time, TimeSchema } from 'src/time/time.schema';
import { TimeService } from './time.service';
import { TimeController } from './time.controller';
import { TimeRepository } from 'src/time/time.repository';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    MongooseModule.forFeature([
      {
        name: Time.name,
        schema: TimeSchema,
      },
    ]),
  ],
  providers: [TimeService, TimeRepository],
  controllers: [TimeController],
})
export class TimeModule {}
