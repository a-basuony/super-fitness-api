import { IsOptional, IsInt, Min, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { WorkoutDifficulty } from '../../workout/entity/workout.entity';

export class QueryCategorySegmentDto {
  @ApiProperty({ required: false, description: 'filter by group id' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  groupId?: number;

  @ApiProperty({ required: false, description: 'filter by category id' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  categoryId?: number;

  @ApiProperty({
    required: false,
    description: 'filter by workout difficulty',
    enum: WorkoutDifficulty,
  })
  @IsOptional()
  @IsEnum(WorkoutDifficulty)
  difficulty?: WorkoutDifficulty;
}
