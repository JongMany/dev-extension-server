import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from 'src/auth/auth.service';

// import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(private authService: AuthService) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const cookie = req?.cookies?.refreshToken;
          return cookie;
        },
      ]),
    });
  }

  async validate(request: Request, payload: any) {
    const { id } = payload;

    const refreshToken = request.cookies['refreshToken'];

    return this.authService.refreshTokenMatches(refreshToken, id);
  }
}
