import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from 'src/user/user.schema';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAcessStrategy } from 'src/auth/jwt-access.strategy';
import { JwtRefreshStrategy } from 'src/auth/jwt-refresh.strategy';
import { Profile } from 'src/profile/profile.schema';

import { ProfileModule } from 'src/profile/profile.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => ProfileModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      global: true,
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: User },
      { name: Profile.name, schema: Profile },
    ]),
  ],

  controllers: [AuthController],
  providers: [AuthService, JwtAcessStrategy, JwtRefreshStrategy],
  exports: [JwtAcessStrategy, JwtRefreshStrategy, PassportModule, AuthService],
})
export class AuthModule {}
