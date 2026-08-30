import { Module } from '@nestjs/common';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { FoodEntity } from './entity/food.entity';
import { IngredientEntity } from './entity/ingredient.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FoodEntity, IngredientEntity]),
    JwtModule,
    UsersModule,
  ],
  controllers: [FoodController],
  providers: [FoodService],
})
export class FoodModule {}
