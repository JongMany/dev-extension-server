import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
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
}
