import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}
}
