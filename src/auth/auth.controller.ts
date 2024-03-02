import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { SigninDto } from 'src/auth/dto/signin.dto';
import { SignupDto } from 'src/auth/dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() body: SignupDto) {
    // Handle sign up logic
    console.log(body);
  }

  @Post('signin')
  signIn(@Body() body: SigninDto) {
    console.log(body);

    return 'Sign in!';
  }
}
