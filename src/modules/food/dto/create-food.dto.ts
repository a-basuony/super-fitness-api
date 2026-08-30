import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsString,
  IsNumber,
  IsOptional,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { MealCategory } from 'src/common/utils/enums';
import { CreateIngredientDto } from './create-ingredient.dto';

export class CreateFoodDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ enum: MealCategory })
  @IsEnum(MealCategory)
  category: MealCategory;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  calories: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  protein: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  carbs: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  fats: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  image_url?: string;

  @ApiPropertyOptional({ type: [CreateIngredientDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateIngredientDto)
  ingredients?: CreateIngredientDto[];
}
