import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateProfileDto } from 'src/profile/dto/updateProfile.dto';
import { Profile, ProfileDocument } from 'src/profile/profile.schema';

@Injectable()
export class ProfileRepository {
  constructor(
    @InjectModel(Profile.name)
    private profileModel: Model<ProfileDocument>,
  ) {}

  async createProfile(email: string) {
    try {
      const profile = new this.profileModel({
        email,
        instaId: '',
        company: '',
        address: '',
        link: [],
        introduction: '',
      });

      return profile;
    } catch (err) {
      console.log('error', err);
    }
  }

  async getProfile(email: string) {
    return await this.profileModel.findOne({ email });
  }

  async updateProfile(email: string, updatedProfileDto: UpdateProfileDto) {
    return await this.profileModel.findOneAndUpdate(
      { email },
      updatedProfileDto,
    );
  }
}
