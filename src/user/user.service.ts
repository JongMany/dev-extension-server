import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}
  async getUserNickNameByEmail(email: string) {
    const user = await this.userRepository.findUserByEmail(email);
    if (user) {
      return user.get('nickname');
    }

    return null;
  }
}
