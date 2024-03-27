import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateTaskDto } from 'src/goal/dto/createTask.dto';
import { UpdateTaskDto } from 'src/goal/dto/updateTask.dto';
import { Goal, GoalDocument } from 'src/goal/goal.schema';
import { User, UserDocument } from 'src/user/user.schema';

@Injectable()
export class GoalRepository {
  constructor(
    @InjectModel(Goal.name)
    private goalModel: Model<GoalDocument>,

    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async createTask(goalDto: CreateTaskDto, email: string) {
    const task = new this.goalModel({
      ...goalDto,
      isCompleted: false,
      email,
    });

    try {
      const savedTask = await task.save();
      return this.userModel.findOneAndUpdate(
        { email },
        { $push: { goal: savedTask._id } },
        { new: true },
      );
    } catch (error) {
      console.log('error', error);
    }
  }

  async getAllGoals(goalIds: Types.ObjectId[]) {
    const goals = await this.goalModel.find({ _id: { $in: goalIds } });
    return goals;
  }

  async updateTask(task: UpdateTaskDto, taskId: string) {
    return this.goalModel.findByIdAndUpdate(taskId, { ...task });
  }

  async removeTask(taskId: string) {
    return this.goalModel.findByIdAndDelete(taskId);
  }
}
