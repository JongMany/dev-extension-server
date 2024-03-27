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
          const cookie = req?.cookies?.refreshToken || req.headers.refreshtoken;
          console.log('cookie', cookie, req.headers);
          console.log(cookie);
          return cookie;
        },
      ]),
    });
  }

  async validate(request: Request, payload: any) {
    const { id } = payload;
    console.log('hi', id, payload);

    const refreshToken =
      request.cookies['refreshToken'] || request.headers.refreshtoken;

    return this.authService.refreshTokenMatches(refreshToken, id);
  }
}
