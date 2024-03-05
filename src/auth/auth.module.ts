import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from 'src/user/user.schema';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtAcessStrategy } from 'src/auth/jwt-access.strategy';
import { JwtRefreshStrategy } from 'src/auth/jwt-refresh.strategy';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
    MongooseModule.forFeature([{ name: User.name, schema: User }]),
  ],

  controllers: [AuthController],
  providers: [AuthService, JwtAcessStrategy, JwtRefreshStrategy],
  exports: [JwtAcessStrategy, JwtRefreshStrategy, PassportModule, AuthService],
})
export class AuthModule {}
