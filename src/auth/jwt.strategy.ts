import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SigninDto } from 'src/auth/dto/signin.dto';
import * as config from 'config';

import { UserRepository } from 'src/user/user.repository';
import { User } from 'src/user/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super({
      secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: SigninDto) {
    const { email, apiKey } = payload;
    const user: User = await this.userRepository.findOne({ email, apiKey });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
