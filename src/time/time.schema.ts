import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Time extends Document {}

export const TimeSchema = SchemaFactory.createForClass(Time);
