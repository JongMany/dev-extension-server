import { Injectable } from '@nestjs/common';
import { eachDayOfInterval, format } from 'date-fns';
import { TimePayload } from 'src/time/dto/saveTime.dto';
import { TimeRepository } from 'src/time/time.repository';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class TimeService {
  constructor(
    private readonly timeRepository: TimeRepository,
    private readonly userRepository: UserRepository,
  ) {}
  async saveProgrammingTime(apiKey: string, payload: TimePayload) {
    try {
      const timeModel = await this.timeRepository.saveProgrammingTime(
        apiKey,
        payload,
      );
      console.log('timeModel', timeModel);
      this.userRepository.saveProgrammingTime(apiKey, timeModel);
      return { status: 'OK' };
    } catch (err) {
      console.log('error', err);
      return { status: 'ERROR' };
    }
  }

  async getTimesDuringPeriod([from, to]: [string, string]) {
    const allDates = eachDayOfInterval({ start: from, end: to });
    const dates = allDates.map((date) => format(date, 'yyyy/MM/dd'));

    const times = await this.timeRepository.getTimeDuringPeriod(dates);
    // times.reduce((acc, cur) => {
    //   const day = format(cur.programDay, "yyyy/MM/dd");
    //   if(!acc[day] {
    //     acc[day] = cur.programDuration;
    //   }) else {

    //   }
    //   return acc;
    // }, {});
    const timeMap: TimeMap = times.reduce((acc, cur) => {
      const day = format(cur.programDay, 'yyyy/MM/dd');
      console.log(day);
      if (!acc[day]) {
        acc[day] = cur.programDuration;
      } else {
        acc[day] += cur.programDuration;
      }
      return acc;
    }, {});
    return Object.entries(timeMap).map(([date, programDuration]) => ({
      date,
      time: programDuration / (1000 * 60),
    }));
  }
}

type TimeMap = {
  [key: string]: number;
};
