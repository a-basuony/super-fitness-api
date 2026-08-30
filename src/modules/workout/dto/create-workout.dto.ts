import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  Min,
  IsEnum,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { WorkoutDifficulty } from '../entity/workout.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateWorkoutDto {
  @ApiProperty({ example: 'Pushups', description: 'Title of the workout' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @ApiPropertyOptional({
    example: 'Standard pushups targeting chest and triceps',
    description: 'Description of the workout',
  })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  description?: string;

  @ApiProperty({
    example: 1,
    description: 'ID of the category segment this workout belongs to',
  })
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  segmentId: number;

  @ApiProperty({
    enum: WorkoutDifficulty,
    example: WorkoutDifficulty.BEGINNER,
    description: 'Difficulty level',
  })
  @IsEnum(WorkoutDifficulty)
  @IsNotEmpty()
  difficulty: WorkoutDifficulty;

  @ApiPropertyOptional({ example: 15, description: 'Duration of the workout in minutes' })
  @IsInt()
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  durationMinutes?: number;

  @ApiPropertyOptional({ example: 120, description: 'Estimated calories burned' })
  @IsInt()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  calories?: number;

  @ApiPropertyOptional({ example: 3, description: 'Number of sets' })
  @IsInt()
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  sets?: number;

  @ApiPropertyOptional({ example: 12, description: 'Number of reps per set' })
  @IsInt()
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  reps?: number;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    description: 'Workout demonstration video file',
  })
  video?: any;
}
