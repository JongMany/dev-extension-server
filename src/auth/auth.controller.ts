import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { RefreshRequestDto } from 'src/auth/dto/refresh.dto';
import { SigninDto } from 'src/auth/dto/signin.dto';
import { SignupDto } from 'src/auth/dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  // signup(@Req() req: Request) {
  signup(@Body(ValidationPipe) signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post('/signin')
  async signin(@Body(ValidationPipe) body: SigninDto, @Res() res: Response) {
    try {
      const user = await this.authService.signin(body);
      if (user) {
        this.authService.setRefreshToken(body, res);
        return res.status(HttpStatus.OK).json(user);
      } else {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  }

  @UseGuards(AuthGuard('refresh'))
  @Post('/refresh')
  async restoreAccessToken(
    @Body() body: RefreshRequestDto,
    @Res() res: Response,
  ) {
    // const accessToken = await this.authService.getAccessToken(body);
    const accessToken = this.authService.getAccessToken(body);
    return res.status(HttpStatus.OK).json({ accessToken });
  }
}
