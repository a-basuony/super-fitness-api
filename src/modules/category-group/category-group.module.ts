import { Module } from '@nestjs/common';
import { CategoryGroupService } from './category-group.service';
import { CategoryGroupController } from './category-group.controller';
import { UserEntity } from '../users/entity/user.entity';
import { WorkoutCategory } from '../category/entity/category.entity';
import { CategoryGroup } from './entity/categoryGroup.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CategoryService } from '../category/category.service';
import { WorkoutModule } from '../workout/workout.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryGroup, WorkoutCategory, UserEntity]),
    WorkoutModule,
  ],
  controllers: [CategoryGroupController],
  providers: [CategoryGroupService, JwtService, UsersService, CategoryService],
})
export class CategoryGroupModule {}
