import { Injectable } from '@nestjs/common';

import { GoalRepository } from 'src/goal/goal.repository';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class GoalService {
  constructor(
    private readonly goalRepository: GoalRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async getAllGoals(email: string) {
    const goals = await this.userRepository.getAllGoals(email);
    return goals;
  }
}
