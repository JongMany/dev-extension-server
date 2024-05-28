import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { format } from 'date-fns';
import { Model } from 'mongoose';
import { TimePayload } from 'src/time/dto/saveTime.dto';
import { Time, TimeDocuemnt } from 'src/time/time.schema';
import { ko } from 'date-fns/locale';
@Injectable()
export class TimeRepository {
  constructor(
    @InjectModel(Time.name)
    private timeModel: Model<TimeDocuemnt>,
  ) {}

  async saveProgrammingTime(apiKey: string, payload: TimePayload) {
    try {
      const currentDate = new Date();
      const current = format(currentDate, 'yyyy-MM-dd HH:mm:ss', {
        locale: ko,
      });
      // const programDay = format(payload.currentTime, 'yyyy/MM/dd');
      const programDay = format(currentDate, 'yyyy-MM-dd', { locale: ko });
      console.log(programDay, current);
      const time = new this.timeModel({
        apiKey,
        // programmingDate: payload.currentTime,
        programmingDate: current,
        programDay: programDay,
        programDuration: payload.programmingTime,
        programLanguage: payload.extensionName,
        fileName: payload.fileName,
        project: payload.docs,
      });
      console.log('time', time, programDay);
      const tm = await time.save();
      console.log('tm', tm);
      return time;
      // return time;
    } catch (err) {
      console.log('error', err);
      throw new Error(err);
    }
  }

  async getTimeDuringPeriod(dates: string[]) {
    console.log(dates);
    const time = await this.timeModel.find({
      programDay: { $in: dates },
    });
    console.log('time', time);
    return time;
  }
}
