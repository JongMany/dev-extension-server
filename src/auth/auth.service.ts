import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SigninDto } from 'src/auth/dto/signin.dto';
import { SignupDto } from 'src/auth/dto/signup.dto';
import { UserRepository } from 'src/user/user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { RefreshRequestDto } from 'src/auth/dto/refresh.dto';
import { CheckDuplicate } from 'src/auth/dto/checkDuplicate.dto';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signin(signinDto: SigninDto) {
    const { email, password, apiKey } = signinDto;

    const user = await this.userRepository.findOne({ email, apiKey });

    if (user && (await bcrypt.compare(password, user.password))) {
      // 유저 토큰 생성 (Secret + Payload)
      const accessToken = this.getAccessToken(signinDto);
      // console.log('accessToken', accessToken);

      return {
        accessToken,
        email: user.email,
        nickname: user.nickname,
        apiKey: user.apiKey,
      };
    } else {
      throw new UnauthorizedException('Login Failed');
    }
  }
  async checkDuplicate(input: CheckDuplicate) {
    const isDuplicate = await this.userRepository.checkDuplicate(input);
    if (isDuplicate) {
      return true;
    } else {
      return false;
    }
  }

  // accessToken 발급
  getAccessToken(signinDto: RefreshRequestDto) {
    const { email } = signinDto;
    const payload = { id: email };
    // console.log('payload', payload);
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1m',
    });
  }

  // refreshToken 발급
  setRefreshToken(signinDto: SigninDto, res: Response) {
    const { email } = signinDto;
    const payload = { id: email };
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '2w',
    });
    this.userRepository.updateRefreshToken(email, refreshToken);

    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: false });
    return;
  }

  async signup(signupDto: SignupDto) {
    return this.userRepository.createUser(signupDto);
  }

  async refreshTokenMatches(refreshToken: string, email: string) {
    const user = await this.userRepository.findUserByEmail(email);

    const isMatches = this.isMatch(refreshToken, user?.refreshToken);

    if (isMatches) return user;
  }

  isMatch(refreshToken: string, userRefreshToken: string) {
    return refreshToken === userRefreshToken;
  }
}
