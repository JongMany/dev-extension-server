import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Time, TimeSchema } from 'src/time/time.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Time.name,
        schema: TimeSchema,
      },
    ]),
  ],
})
export class TimeModule {}
