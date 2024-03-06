import { Request } from 'express';
import { Types } from 'mongoose';

export class JwtDto extends Request {
  user: {
    apiKey: string;
    nickname: string;
    email: string;
    _id: Types.ObjectId;
  };
}
