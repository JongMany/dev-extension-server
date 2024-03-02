import { Controller, Post } from '@nestjs/common';

@Controller('time')
export class TimeController {
  @Post()
  async saveProgrammingTime() {
    return 'Programming time saved!';
  }
}
