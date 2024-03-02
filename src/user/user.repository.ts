import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/user.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(
    nickname: string,
    email: string,
    apiKey: string,
    password: string,
  ) {
    const user = new this.userModel({ nickname, email, apiKey, password });
    return user.save();
  }
}
