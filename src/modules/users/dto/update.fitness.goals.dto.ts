import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { GoalType, PhysicalActivityLevel } from 'src/common/utils/enums';

export class UpdateFitnessGoalsDto {
  @ApiProperty({ enum: GoalType, example: GoalType.WEIGHT_LOSS })
  @IsEnum(GoalType)
  goal: GoalType;
  @ApiProperty({
    enum: PhysicalActivityLevel,
    example: PhysicalActivityLevel.BEGINNER,
  })
  @IsEnum(PhysicalActivityLevel)
  physicalActivityLevel: PhysicalActivityLevel;
}
