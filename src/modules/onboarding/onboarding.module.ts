import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { OnboardingEntity } from './entity/onboarding.entity';
import { OnboardingController } from './onboarding.controller';
import { OnboardingService } from './onboarding.service';
import { CloudinaryService } from '../../common/services/cloudinary.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([OnboardingEntity]), JwtModule, UsersModule],
  controllers: [OnboardingController],
  providers: [OnboardingService, CloudinaryService],
})
export class OnboardingModule {}
