import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { UserService } from 'src/user/user.service';

@Controller('user')
@UseGuards(AuthGuard('access'))
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getRankers() {
    return 'This will return the rankers';
  }

  @Get('/get-apiKey')
  getApiKey(@Req() req: Request, @Res() res: Response) {
    return res.status(200).json({
      good: 'good',
    });
  }
}
