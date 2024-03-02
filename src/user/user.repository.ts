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
