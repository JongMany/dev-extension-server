import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { SigninDto } from 'src/auth/dto/signin.dto';
import { SignupDto } from 'src/auth/dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signup(@Body(ValidationPipe) signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post('/signin')
  async signin(@Body(ValidationPipe) body: SigninDto, @Res() res: Response) {
    const user = await this.authService.signin(body);
    if (user) {
      return res.status(HttpStatus.OK).json(user);
    } else {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Invalid credentials' });
    }
  }
}
