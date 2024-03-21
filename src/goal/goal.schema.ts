import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Goal extends Document {
  @Prop({ required: true })
  dueDate: Date;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  projectName: string;

  @Prop({ required: true })
  task: string;

  @Prop({ required: true })
  owner: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  isCompleted: boolean;
}

export const GoalSchema = SchemaFactory.createForClass(Goal);
export type GoalDocument = Goal & Document;
