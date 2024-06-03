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

      // console.log('time', time, payload);
      const tm = await time.save();
      console.log('tm', tm);
      // return tm;
      return time;
    } catch (err) {
      console.log('save time error', err);
      throw new Error(err);
    }
  }

  async getTimeDuringPeriod([from, to]: [string, string], apiKey: string) {
    console.log([from, to], apiKey);
    const time = await this.timeModel.find({
      programDay: { $gte: from, $lte: to },
      apiKey,
    });
    console.log('time', time);
    return time;
  }

  async getAllRank([from, to]: [string, string]) {
    const time = await this.timeModel.aggregate([
      {
        $match: {
          programDay: { $gte: new Date(from), $lte: new Date(to) },
        },
      },
      {
        $group: {
          _id: { apiKey: '$apiKey' },
          totalDuration: { $sum: '$programDuration' },
        },
      },
      {
        $sort: { totalDuration: -1 },
      },
      {
        $setWindowFields: {
          partitionBy: null, // 전체 집합에 대해 순위를 매깁니다
          sortBy: { totalDuration: -1 },
          output: {
            rank: {
              $denseRank: {},
            },
          },
        },
      },
    ]);
    console.log(time);
    return time;
  }

  async getRanking([from, to]: [string, string]) {
    // console.log(from, to);

    const time = await this.timeModel.aggregate([
      {
        $match: {
          programDay: { $gte: new Date(from), $lte: new Date(to) },
        },
      },
      {
        $group: {
          _id: { apiKey: '$apiKey' },
          totalDuration: { $sum: '$programDuration' },
        },
      },
      {
        $sort: { totalDuration: -1 },
      },
      {
        $limit: 20,
      },
    ]);
    return time;
  }
}
