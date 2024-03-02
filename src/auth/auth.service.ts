import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SigninDto } from 'src/auth/dto/signin.dto';
import { SignupDto } from 'src/auth/dto/signup.dto';
import { UserRepository } from 'src/user/user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signin(signinDto: SigninDto) {
    const { email, password, apiKey } = signinDto;

    const user = await this.userRepository.findOne({ email, apiKey });
    console.log(user, signinDto);
    if (user && (await bcrypt.compare(password, user.password))) {
      // 유저 토큰 생성 (Secret + Payload)
      const payload = { email };
      const accessToken = this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('Login Failed');
    }
  }

  async signup(signupDto: SignupDto) {
    return this.userRepository.createUser(signupDto);
  }
}
