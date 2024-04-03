import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Profile extends Document {
  @Prop({ required: true })
  email: string;

  @Prop({ default: '' })
  company: string;

  @Prop({ default: '' })
  address: string;

  @Prop({ default: [] })
  link: string[];

  @Prop({ default: '' })
  instaId: string;

  @Prop({ default: '' })
  introduction: string;

  // @Prop({ type: Types.ObjectId, ref: User.name })
  // user: Types.ObjectId;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
export type ProfileDocument = Profile & Document;
