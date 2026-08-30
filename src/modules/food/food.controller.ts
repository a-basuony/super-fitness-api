import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { FoodService } from './food.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Patch,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { FoodFilterDto } from './dto/get-food.dto';
import { MealCategory } from '../../common/utils/enums';
import { CreateFoodDto } from './dto/create-food.dto';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { AuthGuard } from 'src/common/services/guards/auth/auth.guard';
import { RolesGuard } from 'src/common/services/guards/auth/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserType } from '../../common/utils/enums';

@ApiTags('Foods')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('foods')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post()
  @Roles(UserType.ADMIN)
  @ApiOperation({ summary: 'Create a new food item.' })
  @ApiResponse({ status: 201, description: 'Food item created successfully.' })
  create(@Body() dto: CreateFoodDto) {
    return this.foodService.create(dto);
  }

  @Get()
  @Roles(UserType.USER, UserType.ADMIN)
  @ApiOperation({ summary: 'Get all food items with optional filters.' })
  @ApiResponse({ status: 200, description: 'Returns a list of food items.' })
  @ApiQuery({ name: 'category', required: false, enum: MealCategory })
  @ApiQuery({ name: 'minCalories', required: false, type: Number })
  @ApiQuery({ name: 'maxCalories', required: false, type: Number })
  @ApiQuery({ name: 'name', required: false, type: String })
  findAll(@Query() filter: FoodFilterDto) {
    return this.foodService.findAll(filter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get food item by ID.' })
  @ApiResponse({ status: 200, description: 'Returns the requested food item.' })
  @ApiParam({ name: 'id', description: 'Food ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.foodService.findOne(id);
  }

  @Delete(':id')
  @Roles(UserType.ADMIN)
  @ApiOperation({ summary: 'Delete a food item by ID.' })
  @ApiResponse({ status: 200, description: 'Food item deleted successfully.' })
  @ApiParam({ name: 'id', description: 'Food ID' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.foodService.remove(id);
  }

  @Post(':id/ingredients')
  @Roles(UserType.ADMIN)
  @ApiOperation({ summary: 'Add an ingredient to a food item.' })
  @ApiResponse({ status: 201, description: 'Ingredient added successfully.' })
  @ApiParam({ name: 'id', description: 'Food ID', type: Number })
  addIngredient(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateIngredientDto) {
    return this.foodService.addIngredient(id, dto);
  }

  @Patch(':foodId/ingredients/:ingredientId')
  @Roles(UserType.ADMIN)
  @ApiOperation({ summary: 'Update an ingredient for a food item.' })
  @ApiResponse({ status: 200, description: 'Ingredient updated successfully.' })
  @ApiParam({ name: 'foodId', description: 'Food ID', type: Number })
  @ApiParam({ name: 'ingredientId', description: 'Ingredient ID', type: Number })
  updateIngredient(
    @Param('foodId', ParseIntPipe) foodId: number,
    @Param('ingredientId', ParseIntPipe) ingredientId: number,
    @Body() dto: UpdateIngredientDto,
  ) {
    return this.foodService.updateIngredient(foodId, ingredientId, dto);
  }

  @Delete(':foodId/ingredients/:ingredientId')
  @Roles(UserType.ADMIN)
  @ApiOperation({ summary: 'Delete an ingredient from a food item.' })
  @ApiResponse({ status: 200, description: 'Ingredient deleted successfully.' })
  @ApiParam({ name: 'foodId', description: 'Food ID', type: Number })
  @ApiParam({ name: 'ingredientId', description: 'Ingredient ID', type: Number })
  removeIngredient(
    @Param('foodId', ParseIntPipe) foodId: number,
    @Param('ingredientId', ParseIntPipe) ingredientId: number,
  ) {
    return this.foodService.removeIngredient(foodId, ingredientId);
  }
}
