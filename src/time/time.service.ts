import { Injectable } from '@nestjs/common';
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
}
