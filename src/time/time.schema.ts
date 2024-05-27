import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsDate, IsNumber } from 'class-validator';
import { Document } from 'mongoose';

@Schema()
export class Time extends Document {
  @Prop({ required: true })
  @IsNumber()
  programDuration: number;

  @Prop({ required: true, type: Date, unique: false })
  @IsDate()
  programDay: Date; // 날짜

  @Prop({ required: true, type: Date, default: Date.now })
  @IsDate()
  programmingDate: Date; // 프로그래밍한 시각

  @Prop({ required: true })
  apiKey: string;

  @Prop({ required: true })
  programLanguage: string;

  @Prop({ required: true })
  fileName: string;

  @Prop({ required: true })
  project: string[];
}

export const TimeSchema = SchemaFactory.createForClass(Time);
export type TimeDocuemnt = Time & Document;
