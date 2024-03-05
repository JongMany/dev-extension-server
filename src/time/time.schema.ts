import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsDate, IsNumber } from 'class-validator';
import { Document } from 'mongoose';

@Schema()
export class Time extends Document {
  @Prop({ required: true, unique: true })
  @IsNumber()
  time: number;

  @Prop({ required: true, type: Date, default: Date.now })
  @IsDate()
  date: Date;
}

export const TimeSchema = SchemaFactory.createForClass(Time);
