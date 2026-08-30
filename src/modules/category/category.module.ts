import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/entity/user.entity';
import { CategoryGroup } from '../category-group/entity/categoryGroup.entity';
import { WorkoutCategory } from './entity/category.entity';
import { WorkoutModule } from '../workout/workout.module';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, JwtService, UsersService],
  imports: [
    TypeOrmModule.forFeature([WorkoutCategory, CategoryGroup, UserEntity]),
    WorkoutModule,
  ],
})
export class CategoryModule {}
