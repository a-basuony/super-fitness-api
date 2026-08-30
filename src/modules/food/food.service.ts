import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FoodEntity } from './entity/food.entity';
import { FoodFilterDto } from './dto/get-food.dto';
import { CreateFoodDto } from './dto/create-food.dto';
import { IngredientEntity } from './entity/ingredient.entity';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(FoodEntity) private foodRepository: Repository<FoodEntity>,
  ) {}

  async create(dto: CreateFoodDto) {
    const food = this.foodRepository.create(dto);
    return this.foodRepository.save(food);
  }

  async findAll(filter: FoodFilterDto) {
    const q = this.foodRepository
      .createQueryBuilder('food')
      .leftJoinAndSelect('food.ingredients', 'ingredient');

    if (filter.category) {
      q.andWhere('food.category = :category', {
        category: filter.category,
      });
    }

    if (filter.minCalories) {
      q.andWhere('food.calories >= :minCalories', {
        minCalories: filter.minCalories,
      });
    }

    if (filter.maxCalories) {
      q.andWhere('food.calories <= :maxCalories', {
        maxCalories: filter.maxCalories,
      });
    }

    if (filter.name) {
      q.andWhere('food.name LIKE :name', {
        name: `%${filter.name}%`,
      });
    }

    return q.getMany();
  }

  async findOne(id: number) {
    const food = await this.foodRepository.findOne({
      where: { id },
      relations: ['ingredients'],
    });
    if (!food) {
      throw new NotFoundException('Food not found');
    }
    return food;
  }

  async remove(id: number) {
    const result = await this.foodRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Food not found');
    }
    return { message: 'Food deleted successfully' };
  }

  async addIngredient(foodId: number, dto: CreateIngredientDto) {
    const food = await this.foodRepository.findOne({
      where: { id: foodId },
      relations: ['ingredients'],
    });

    if (!food) {
      throw new NotFoundException('Food not found');
    }
    const ingredient = this.foodRepository.manager.create(IngredientEntity, {
      ...dto,
      food,
    });
    return await this.foodRepository.manager.save(ingredient);
  }

  async removeIngredient(foodId: number, ingredientId: number) {
    const ingredient = await this.foodRepository.manager.findOne(IngredientEntity, {
      where: {
        id: ingredientId,
        food: { id: foodId },
      },
    });

    if (!ingredient) {
      throw new NotFoundException('Ingredient not found for this food');
    }

    return this.foodRepository.manager.remove(ingredient);
  }

  async updateIngredient(foodId: number, ingredientId: number, dto: UpdateIngredientDto) {
    const ingredient = await this.foodRepository.manager.findOne(IngredientEntity, {
      where: {
        id: ingredientId,
        food: { id: foodId },
      },
      relations: ['food'],
    });

    if (!ingredient) {
      throw new NotFoundException('Ingredient not found for this food');
    }

    Object.assign(ingredient, dto);

    return this.foodRepository.manager.save(ingredient);
  }
}
