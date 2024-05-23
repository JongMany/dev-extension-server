import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { SaveTimeDto } from 'src/time/dto/saveTime.dto';

@Controller('time')
export class TimeController {
  @Post('save')
  async saveProgrammingTime(
    @Body() saveTimeDto: SaveTimeDto,
    // @Req() req: Request,
    @Res() res: Response,
  ) {
    // console.log(saveTimeDto.apiKey);
    console.log(saveTimeDto);
    return res.status(HttpStatus.OK).json({ message: 'success' });
  }

  @Get('')
  async getProgrammingTime() {
    return 'get programming time12';
  }
  @Get('2')
  async getProgrammingTime2() {
    return 'get programming time112';
  }
}
