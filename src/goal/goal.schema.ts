import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Goal extends Document {
  @Prop({ required: true })
  date: Date;

  @Prop({ required: true, unique: true })
  projectName: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  owner: string;
}

export const GoalSchema = SchemaFactory.createForClass(Goal);
export type GoalDocument = Goal & Document;
