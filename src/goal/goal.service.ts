import { Injectable } from '@nestjs/common';
// import { Types } from 'mongoose';
import { CreateTaskDto } from 'src/goal/dto/createTask.dto';
import { UpdateTaskDto } from 'src/goal/dto/updateTask.dto';

import { GoalRepository } from 'src/goal/goal.repository';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class GoalService {
  constructor(
    private readonly goalRepository: GoalRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async getAllTasks(email: string) {
    const taskIds = await this.userRepository.getAllGoalIds(email);
    console.log(taskIds);
    const tasks = await this.goalRepository.getAllGoals(taskIds);
    return tasks;
  }

  async createTask(task: CreateTaskDto, email: string) {
    const createdTask = await this.goalRepository.createTask(task, email);
    return createdTask;
  }

  async updateTask(task: UpdateTaskDto, taskId: string) {
    const updatedTask = await this.goalRepository.updateTask(task, taskId);
    console.log(updatedTask);
    return updatedTask;
  }

  async removeTask(taskId: string) {
    const removedTask = await this.goalRepository.removeTask(taskId);
    return removedTask;
  }
}
