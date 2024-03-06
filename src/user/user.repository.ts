import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FindUserDto } from 'src/auth/dto/findUser.dto';
import { SignupDto } from 'src/auth/dto/signup.dto';
import { User, UserDocument } from 'src/user/user.schema';
import * as bcrypt from 'bcryptjs';
import { CheckDuplicate } from 'src/auth/dto/checkDuplicate.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async findOne(findUserDto: FindUserDto) {
    const { email, apiKey } = findUserDto;
    const user = await this.userModel.findOne({ email, apiKey });
    return user;
  }

  async checkDuplicate(input: CheckDuplicate) {
    const user = await this.userModel.findOne(input);
    console.log(user, input);
    if (user) {
      return true;
    } else {
      return false;
    }
  }
  async getAllGoals(email: string) {
    const user = await this.userModel.findOne({ email });
    const goals = user.get('goal');
    return goals;
  }

  async updateAccessToken(email: string, accessToken: string) {
    return await this.userModel.updateOne({ email }, { accessToken });
  }

  async findUserByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async updateRefreshToken(email: string, refreshToken: string) {
    return await this.userModel.updateOne({ email }, { refreshToken });
  }

  async createUser(signupDto: SignupDto) {
    const { nickname, email, apiKey, password } = signupDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      await this.userModel.create({
        nickname,
        email,
        apiKey,
        password: hashedPassword,
      });
    } catch (err) {
      console.log(err);
      if (err.code === 11000) {
        throw new ConflictException('Already exists user');
      } else {
        throw new InternalServerErrorException();
      }
    }
    // const user = new this.userModel({ nickname, email, apiKey, password });
    // return user.save();
  }
}
