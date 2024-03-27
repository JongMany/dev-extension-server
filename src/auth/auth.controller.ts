import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import {
  CheckApiKeyDuplicateDto,
  CheckEmailDuplicateDto,
  // CheckEmailDuplicateDto,
  CheckNicknameDuplicateDto,
} from 'src/auth/dto/checkDuplicate.dto';
// import { RefreshRequestDto } from 'src/auth/dto/refresh.dto';
import { SigninDto } from 'src/auth/dto/signin.dto';
import { SignupDto } from 'src/auth/dto/signup.dto';
import { JwtDto } from 'src/types/jwtDto.types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  // signup(@Req() req: Request) {
  async signup(
    @Body(ValidationPipe) signupDto: SignupDto,
    @Res() res: Response,
  ) {
    console.log('signupDto', signupDto);

    try {
      await this.authService.signup(signupDto);
      return res.status(HttpStatus.CREATED).json({ message: 'User created' });
    } catch (error) {
      console.log('error', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
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

  @Post('/duplicate-check/email')
  // @UseGuards(AuthGuard('access'))
  async checkDuplicateEmail(
    @Body() checkEmailDuplicateDto: CheckEmailDuplicateDto,
    @Res() res: Response,
  ) {
    const { email } = checkEmailDuplicateDto;
    console.log(email);
    const isDuplicate = await this.authService.checkDuplicate({ email });

    if (isDuplicate) {
      return res.status(HttpStatus.OK).json({
        message: 'Already exists user',
        statusCode: 409,
      });
    } else {
      return res.status(HttpStatus.OK).json({
        message: 'Available email',
        statusCode: 200,
      });
    }
  }

  @Post('/duplicate-check/nickname')
  async checkDuplicateNickname(
    @Body(ValidationPipe) checkDuplicateDto: CheckNicknameDuplicateDto,
    @Res() res: Response,
  ) {
    const { nickname } = checkDuplicateDto;
    const isDuplicate = await this.authService.checkDuplicate({ nickname });

    if (isDuplicate) {
      return res.status(HttpStatus.OK).json({
        message: 'Already exists user',
        statusCode: 409,
      });
    } else {
      return res.status(HttpStatus.OK).json({
        message: 'Available nickname',
        statusCode: 200,
      });
    }
  }

  @Post('/duplicate-check/apiKey')
  async checkDuplicateApiKey(
    @Body(ValidationPipe) checkDuplicateDto: CheckApiKeyDuplicateDto,
    @Res() res: Response,
  ) {
    const { apiKey } = checkDuplicateDto;
    const isDuplicate = await this.authService.checkDuplicate({ apiKey });
    if (isDuplicate) {
      return res.status(HttpStatus.OK).json({
        message: 'Already exists user',
        statusCode: 409,
      });
    } else {
      return res.status(HttpStatus.OK).json({
        message: 'Available apiKey',
        statusCode: 200,
      });
    }
  }

  @UseGuards(AuthGuard('refresh'))
  @Post('/refresh')
  async restoreAccessToken(@Req() req: JwtDto, @Res() res: Response) {
    // const accessToken = await this.authService.getAccessToken(body);

    const accessToken = await this.authService.getAccessToken({
      email: req.user.email,
    });
    return res.status(HttpStatus.OK).json({ accessToken });
  }
}
