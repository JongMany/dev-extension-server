import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Time, TimeSchema } from 'src/time/time.schema';
import { TimeService } from './time.service';
import { TimeController } from './time.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Time.name,
        schema: TimeSchema,
      },
    ]),
  ],
  providers: [TimeService],
  controllers: [TimeController],
})
export class TimeModule {}
