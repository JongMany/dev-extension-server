import { Injectable } from '@nestjs/common';
import { ProfileRepository } from 'src/profile/profile.repository';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async createProfile(email: string) {
    const newProfile = await this.profileRepository.createProfile(email);
    console.log(newProfile);
    return newProfile;
  }

  async getProfileByEmail(email: string) {
    const profile = await this.profileRepository.getProfile(email);
    return profile;
  }
}
