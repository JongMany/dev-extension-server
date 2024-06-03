import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from 'src/auth/auth.service';

// import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(private authService: AuthService) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          //TODO: 수정해야함
          // const cookie = req?.cookies?.refreshToken || req.headers.refreshtoken;
          // const cookie = req?.cookies?.refreshToken || req.headers.refreshtoken;
          // const cookie = req?.cookies?.refreshToken || req.headers.refreshtoken;
          // const cookie = (req as any).session.cookie;
          const cookie = req.body.refreshToken;
          // console.log('cookie', cookie, req.headers);
          // console.log('cookie', req.body.refreshToken);
          return cookie;
        },
      ]),
    });
  }

  async validate(request: Request, payload: any) {
    const { id } = payload;

    // const refreshToken =
    //   request.cookies['refreshToken'] || request.headers.refreshtoken;
    const refreshToken = request.body.refreshToken;
    // console.log('refreshTokens', id, refreshToken);
    // console.log(await this.authService.refreshTokenMatches(refreshToken, id));
    return this.authService.refreshTokenMatches(refreshToken, id);
  }
}
