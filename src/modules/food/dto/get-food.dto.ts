import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { MealCategory } from 'src/common/utils/enums';

export class FoodFilterDto {
  @ApiPropertyOptional({ enum: MealCategory })
  @IsOptional()
  @IsEnum(MealCategory)
  category?: MealCategory;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  minCalories?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  maxCalories?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
