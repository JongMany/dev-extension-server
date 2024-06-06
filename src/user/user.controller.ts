import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from 'src/user/user.service';

@Controller('user')
// @UseGuards(AuthGuard('access'))
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/nickname/:email')
  async getUserNickNameByEmail(
    @Param('email') email: string,
    @Res() res: Response,
  ) {
    try {
      const nickname = await this.userService.getUserNickNameByEmail(email);
      if (nickname) {
        return res.status(200).json({
          nickname,
        });
      }
      if (!nickname) {
        return res.status(404).json({
          error: 'user not found',
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        error: 'error',
      });
    }
  }

  @Get('/get-apiKey')
  getApiKey(@Req() req: Request, @Res() res: Response) {
    return res.status(200).json({
      good: 'good',
    });
  }
}
