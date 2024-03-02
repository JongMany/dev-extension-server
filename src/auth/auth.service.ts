import { Injectable } from '@nestjs/common';
import { SigninDto } from 'src/auth/dto/signin.dto';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async signIn(signInDto: SigninDto) {
    const { email, password, apiKey } = signInDto;
    const user = await this.userRepository.signin({ email, password, apiKey });
    return user;
  }
}
