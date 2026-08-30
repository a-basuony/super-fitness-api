import { IsOptional, IsInt, Min, IsEnum, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { WorkoutDifficulty } from '../entity/workout.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryWorkoutDto {
  @ApiPropertyOptional({ example: 1, description: 'Page number for pagination' })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number = 1;

  @ApiPropertyOptional({ example: 10, description: 'Number of items per page' })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number = 10;

  @ApiPropertyOptional({
    example: 'pushups',
    description: 'Search term for workout title',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    enum: WorkoutDifficulty,
    example: WorkoutDifficulty.BEGINNER,
    description: 'Filter by difficulty',
  })
  @IsOptional()
  @IsEnum(WorkoutDifficulty)
  difficulty?: WorkoutDifficulty;

  @ApiPropertyOptional({ example: 1, description: 'Filter by Category Segment ID' })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  segmentId?: number;

  @ApiPropertyOptional({ example: 10, description: 'Minimum duration in minutes' })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  minDuration?: number;

  @ApiPropertyOptional({ example: 30, description: 'Maximum duration in minutes' })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  maxDuration?: number;

  @ApiPropertyOptional({ example: 50, description: 'Minimum calories burned' })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  minCalories?: number;

  @ApiPropertyOptional({ example: 300, description: 'Maximum calories burned' })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  maxCalories?: number;
}
