import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { WorkoutService } from './workout.service';
import { WorkoutController } from './workout.controller';
import { Workout } from './entity/workout.entity';
import { CategorySegment } from '../category-segment/entity/category-segment.entity';
import { WorkoutCategory } from '../category/entity/category.entity';
import { CloudinaryService } from '../../common/services/cloudinary.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Workout, CategorySegment, WorkoutCategory]),
    JwtModule,
    UsersModule,
  ],
  controllers: [WorkoutController],
  providers: [WorkoutService, CloudinaryService],
  exports: [WorkoutService],
})
export class WorkoutModule {}
