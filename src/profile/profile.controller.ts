import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { ProfileService } from 'src/profile/profile.service';

@Controller('profile')
@UseGuards(AuthGuard('access'))
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get('/:email')
  async getProfile(@Param('email') email: string, @Res() res: Response) {
    try {
      const profile = await this.profileService.getProfileByEmail(email);
      return res.status(HttpStatus.OK).json({ profile });
    } catch (error) {
      console.error('error', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  }
}
