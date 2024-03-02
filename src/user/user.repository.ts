import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SigninDto } from 'src/auth/dto/signin.dto';
import { SignupDto } from 'src/auth/dto/signup.dto';
import { User, UserDocument } from 'src/user/user.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async signin(signinDto: SigninDto) {
    const { email, password, apiKey } = signinDto;
    const user = await this.userModel.findOne({ email, password, apiKey });
    return user;
  }

  async createUser(signupDto: SignupDto) {
    const { nickname, email, apiKey, password } = signupDto;
    // const user = new this.userModel({ nickname, email, apiKey, password });
    // return user.save();
  }
}
