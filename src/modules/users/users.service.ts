import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UpdatePersonalInfoDto } from './dto/update.personalinfo.dto';
import { Repository } from 'typeorm';
import { UpdateBodyInfoDto } from './dto/update.body.info.dto';
import { UpdateFitnessGoalsDto } from './dto/update.fitness.goals.dto';
import * as bcrypt from 'bcrypt';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findById(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getProfile(userId: string) {
    return this.findById(userId);
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const user = await this.findById(userId);
    Object.assign(user, dto);
    return await this.userRepository.save(user);
  }

  async completeStepOne(userId: string, dto: UpdatePersonalInfoDto) {
    const user = await this.findById(userId);

    Object.assign(user, dto);
    user.currentStep = 1;
    return await this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async completeStepTwo(userId: string, dto: UpdateBodyInfoDto) {
    const user = await this.findById(userId);

    Object.assign(user, dto);
    user.currentStep = 2;
    return await this.userRepository.save(user);
  }

  async completeStepThree(userId: string, dto: UpdateFitnessGoalsDto) {
    const user = await this.findById(userId);

    Object.assign(user, dto);
    user.currentStep = 3;
    user.isOnboardingCompleted = true;
    return await this.userRepository.save(user);
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
    const user = await this.findById(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Compare old password
    const isPasswordMatched = await bcrypt.compare(
      changePasswordDto.oldPassword,
      user.password,
    );

    if (!isPasswordMatched) {
      throw new BadRequestException('Old password is incorrect');
    }

    // Prevent same password
    const isSamePassword = await bcrypt.compare(
      changePasswordDto.newPassword,
      user.password,
    );

    if (isSamePassword) {
      throw new BadRequestException('New password must be different from old password');
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(changePasswordDto.newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;

    await this.userRepository.save(user);
    return {
      message: 'Password changed successfully',
    };
  }
}
