import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Goal, GoalDocument } from 'src/goal/goal.schema';

@Injectable()
export class GoalRepository {
  constructor(
    @InjectModel(Goal.name)
    private goalModel: Model<GoalDocument>,
  ) {}
}
