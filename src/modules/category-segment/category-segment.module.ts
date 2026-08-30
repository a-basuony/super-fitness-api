import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategorySegmentController } from './category-segment.controller';
import { CategorySegmentService } from './category-segment.service';
import { CategorySegment } from './entity/category-segment.entity';
import { CategoryGroup } from '../category-group/entity/categoryGroup.entity';
import { WorkoutCategory } from '../category/entity/category.entity';
import { CategorySegmentStats } from './entity/category-segment-stats';
import { WorkoutModule } from '../workout/workout.module';
import { Workout } from '../workout/entity/workout.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CategorySegment,
      CategoryGroup,
      WorkoutCategory,
      Workout,
      CategorySegmentStats,
      UserEntity,
    ]),
    WorkoutModule,
  ],
  controllers: [CategorySegmentController],
  providers: [CategorySegmentService, JwtService, UsersService],
  exports: [CategorySegmentService],
})
export class CategorySegmentModule {}
