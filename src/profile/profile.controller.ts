import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { UpdateProfileDto } from 'src/profile/dto/updateProfile.dto';
import { ProfileService } from 'src/profile/profile.service';
import { JwtDto } from 'src/types/jwtDto.types';

@Controller('profile')
@UseGuards(AuthGuard('access'))
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get('/:email')
  async getProfile(@Param('email') email: string, @Res() res: Response) {
    console.log('get profile', email);
    try {
      const profile = await this.profileService.getProfileByEmail(email);
      return res.status(HttpStatus.OK).json({ profile });
    } catch (error) {
      console.error('error', error);
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  @Post('/')
  async updateProfile(
    @Req() req: JwtDto,
    @Body() updatedProfileDto: UpdateProfileDto,
    @Res() res: Response,
  ) {
    const { email } = req.user;

    // console.log('body', body);
    try {
      const updatedProfile = await this.profileService.updateProfile(
        email,
        updatedProfileDto,
      );
      console.log(updatedProfile);
      return res.status(HttpStatus.OK).json({ status: 'UPDATED' });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }
}
