import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { JwtAcessStrategy } from 'src/auth/jwt-access.strategy';
import { JwtRefreshStrategy } from 'src/auth/jwt-refresh.strategy';
import { ProfileModule } from 'src/profile/profile.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    AuthModule,
    forwardRef(() => ProfileModule),
  ],
  providers: [JwtRefreshStrategy, JwtAcessStrategy, AuthService],
  exports: [JwtRefreshStrategy, JwtAcessStrategy],
})
export class CommonModule {}
