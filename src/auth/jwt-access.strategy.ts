import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import * as config from 'config';

import { UserRepository } from 'src/user/user.repository';
import { User } from 'src/user/user.schema';

@Injectable()
export class JwtAcessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(private userRepository: UserRepository) {
    super({
      secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: any, done: VerifiedCallback) {
    const { id } = payload;
    // console.log('access payload id', payload.id);
    const user: User = await this.userRepository.findUserByEmail(id);

    console.log(id);
    if (!user) {
      return done(new UnauthorizedException(), false);
    }

    return done(null, user);
  }
}
