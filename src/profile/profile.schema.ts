import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Profile extends Document {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true, default: '' })
  company: string;

  @Prop({ required: true, default: '' })
  address: string;

  @Prop({ required: true, default: [] })
  link: string[];

  @Prop({ required: true, default: '' })
  instaId: string;

  @Prop({ required: true, default: '' })
  introduction: boolean;

  // @Prop({ type: Types.ObjectId, ref: User.name })
  // user: Types.ObjectId;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
export type ProfileDocument = Profile & Document;
