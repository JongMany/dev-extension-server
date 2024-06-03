import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';

import { Response } from 'express';

import { SaveTimeDto } from 'src/time/dto/saveTime.dto';
import { TimeService } from 'src/time/time.service';

@Controller('time')
export class TimeController {
  constructor(private timeService: TimeService) {}

  @Post('save')
  async saveProgrammingTime(
    @Body() saveTimeDto: SaveTimeDto,
    // @Req() req: Request,
    @Res() res: Response,
  ) {
    // console.log(saveTimeDto.apiKey)
    try {
      const apiKey = saveTimeDto.apiKey; // apiKey를 통해 유저를 구분
      const payload = saveTimeDto.payload; // 실제 저장할 데이터
      const result = await this.timeService.saveProgrammingTime(
        apiKey,
        payload,
      );
      if (result.status === 'OK') {
        return res.status(HttpStatus.OK).json({ message: 'SUCCESSFUL' });
      } else {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'error',
        });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'error' });
    }
  }

  @Get('/overall/:email/from/:from/to/:to')
  async getProgrammingData(
    @Param('email') email: string,
    @Param('from') from: string,
    @Param('to') to: string,
    @Res() res: Response,
  ) {
    // console.log('from', from, 'to', to);
    try {
      const result = await this.timeService.getProgrammingDataDuringPeriod(
        email,
        [from, to],
      );
      return res.status(HttpStatus.OK).json({ data: result });
      // console.log(result);
      // return result;
    } catch (error) {
      // console.log(error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'error' });
    }

    // console.log(dates);
    // return `from ${from} to ${to}`;
  }

  @Get('/rank/from/:from/to/:to')
  async getRanking(
    @Param('from') from: string,
    @Param('to') to: string,
    @Res() res: Response,
  ) {
    try {
      const result = await this.timeService.getRanking([from, to]);
      // console.log(result);
      return res.status(HttpStatus.OK).json({ data: result });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'error' });
    }
  }

  @Get('/myRank/:email/from/:from/to/:to')
  async findMyRank(
    @Param('email') email: string,
    @Param('from') from: string,
    @Param('to') to: string,
    @Res() res: Response,
  ) {
    try {
      const result = await this.timeService.findMyRank(email, [from, to]);
      return res.status(HttpStatus.OK).json({ data: result });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'error' });
    }
  }

  @Get('/:email/from/:from/to/:to')
  async getProgrammingTime2(
    @Param('email') email: string,
    @Param('from') from: string,
    @Param('to') to: string,
    @Res() res: Response,
  ) {
    // console.log('from', from, 'to', to);
    try {
      const result = await this.timeService.getTimesDuringPeriod(email, [
        from,
        to,
      ]);
      return res.status(HttpStatus.OK).json({ data: result });
    } catch (error) {
      // console.log(error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'error' });
    }

    // console.log(dates);
    // return `from ${from} to ${to}`;
  }
  @Get('')
  async getProgrammingTime() {
    return 'get programming time123';
  }
}
