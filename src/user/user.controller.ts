import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get()
  getRankers() {
    return 'This will return the rankers';
  }
}
