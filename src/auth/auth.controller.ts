import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { SignupDto } from 'src/auth/dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() body: SignupDto) {
    // Handle sign up logic
    console.log(body);
  }
}
