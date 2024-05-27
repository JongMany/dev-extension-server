import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
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

  @Get('')
  async getProgrammingTime() {
    return 'get programming time123';
  }
  @Get('2')
  async getProgrammingTime2() {
    return 'get programming time112';
  }
}
