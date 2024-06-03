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

  async getTimesDuringPeriod(email: string, [from, to]: [string, string]) {
    try {
      const userApiKey = await this.userRepository.getApiKeyByEmail(email);
      if (!userApiKey) {
        return [];
      }
      const allDates = eachDayOfInterval({ start: from, end: to });
      const dates = allDates.map((date) => format(date, 'yyyy/MM/dd'));

      const times = await this.timeRepository.getTimeDuringPeriod(
        [from, to],
        userApiKey,
      );
      // console.log('getTime', userApiKey, dates, times);
      // times.reduce((acc, cur) => {
      //   const day = format(cur.programDay, "yyyy/MM/dd");
      //   if(!acc[day] {
      //     acc[day] = cur.programDuration;
      //   }) else {

      //   }
      //   return acc;
      // }, {});
      const timeMap: TimeMap = times.reduce((acc, cur) => {
        const day = format(cur.programDay, 'yyyy-MM-dd');
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
    } catch (err) {
      console.log(err);
    }
  }

  async getProgrammingDataDuringPeriod(
    email: string,
    [from, to]: [string, string],
  ) {
    try {
      const userApiKey = await this.userRepository.getApiKeyByEmail(email);
      if (!userApiKey) {
        return [];
      }
      const allDates = eachDayOfInterval({ start: from, end: to });
      const dates = allDates.map((date) => format(date, 'yyyy/MM/dd'));

      const times = await this.timeRepository.getTimeDuringPeriod(
        [from, to],
        userApiKey,
      );
      // console.log('getTime', userApiKey, dates, times);
      // times.reduce((acc, cur) => {
      //   const day = format(cur.programDay, "yyyy/MM/dd");
      //   if(!acc[day] {
      //     acc[day] = cur.programDuration;
      //   }) else {

      //   }
      //   return acc;
      // }, {});
      return times.map((time) => ({
        fileName: time.fileName,
        programDuration: time.programDuration,
        programLanguage: time.programLanguage,
        project: time.project,
        programDay: time.programDay,
        programmingTime: time.programmingDate,
      }));
    } catch (err) {
      console.log(err);
    }
  }

  async findMyRank(email: string, [from, to]: [string, string]) {
    try {
      const userApiKey = await this.userRepository.getApiKeyByEmail(email);
      if (!userApiKey) {
        return [];
      }
      const times = await this.timeRepository.getAllRank([from, to]);
      const result = times.find((time) => time._id.apiKey === userApiKey);
      const user = await this.userRepository.getEmailByApiKey(userApiKey);
      return {
        email: user.email,
        nickname: user.nickname,
        totalDuration: result?.totalDuration || 0,
        rank: result?.rank || 0,
      };
      // return times;
    } catch (err) {
      console.log(err);
    }
  }

  async getRanking([from, to]: [string, string]) {
    try {
      const times = await this.timeRepository.getRanking([from, to]);
      for (const time of times) {
        const user = await this.userRepository.getEmailByApiKey(
          time._id.apiKey,
        );
        time['email'] = user.email;
        time['nickname'] = user.nickname;
      }
      return times.map((item) => ({
        email: item['email'],
        nickname: item['nickname'],
        totalDuration: item.totalDuration,
      }));
    } catch (err) {
      console.log(err);
    }
  }
}

type TimeMap = {
  [key: string]: number;
};
