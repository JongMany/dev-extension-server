import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import { Document, Types } from 'mongoose';
import { Time } from 'src/time/time.schema';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  @IsNotEmpty()
  @IsString()
  nickname: string;

  @Prop({ required: true, unique: true })
  @IsNotEmpty()
  @IsString()
  email: string;

  @Prop({ required: true, unique: true })
  @IsNotEmpty()
  @IsString()
  apiKey: string;

  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  password: string;

  @Prop({ type: [Types.ObjectId], ref: Time.name })
  developTime: Time[];
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
