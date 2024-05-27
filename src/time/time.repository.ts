import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { format } from 'date-fns';
import { Model } from 'mongoose';
import { TimePayload } from 'src/time/dto/saveTime.dto';
import { Time, TimeDocuemnt } from 'src/time/time.schema';

@Injectable()
export class TimeRepository {
  constructor(
    @InjectModel(Time.name)
    private timeModel: Model<TimeDocuemnt>,
  ) {}

  async saveProgrammingTime(apiKey: string, payload: TimePayload) {
    try {
      const programDay = format(payload.currentTime, 'yyyy-MM-dd');
      const time = new this.timeModel({
        apiKey,
        programmingDate: payload.currentTime,
        programDay: programDay,
        programDuration: payload.programmingTime,
        programLanguage: payload.extensionName,
        fileName: payload.fileName,
        project: payload.docs,
      });
      console.log('time', time);
      const tm = await time.save();
      console.log('tm', tm);
      return time;
      // return time;
    } catch (err) {
      console.log('error', err);
    }
  }
}
