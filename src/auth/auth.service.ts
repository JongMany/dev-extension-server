import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { SigninDto } from 'src/auth/dto/signin.dto';
import { SignupDto } from 'src/auth/dto/signup.dto';
import { UserRepository } from 'src/user/user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { RefreshRequestDto } from 'src/auth/dto/refresh.dto';
import { CheckDuplicate } from 'src/auth/dto/checkDuplicate.dto';
import { ProfileService } from 'src/profile/profile.service';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    @Inject(ProfileService)
    private profileService: ProfileService,
  ) {}

  async signin(signinDto: SigninDto) {
    const { email, password, apiKey } = signinDto;

    const user = await this.userRepository.findOne({ email, apiKey });

    if (user && (await bcrypt.compare(password, user.password))) {
      // 유저 토큰 생성 (Secret + Payload)
      const accessToken = await this.getAccessToken(signinDto);
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
  async getAccessToken(signinDto: RefreshRequestDto) {
    const { email } = signinDto;
    const payload = { id: email };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '5m',
    });
    const user = await this.userRepository.updateAccessToken(
      email,
      accessToken,
    );

    if (user) {
      return accessToken;
    } else {
      throw new Error();
    }
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
    try {
      const profile = await this.profileService.createProfile(signupDto.email);
      const user = await this.userRepository.createUser(signupDto, profile._id);
      console.log(profile, user);
      await profile.save();
      return user;
    } catch (error) {
      console.log(error);
    }
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
