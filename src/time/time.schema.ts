import { Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Time extends Document {}

export const TimeSchema = SchemaFactory.createForClass(Time);
