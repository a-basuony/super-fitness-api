import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { GenderType, GoalType, PhysicalActivityLevel } from 'src/common/utils/enums';

export class UpdateProfileDto {
  @ApiProperty({ example: 'John', required: false })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({ example: 'Doe', required: false })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({ example: 'https://example.com/profile.jpg', required: false })
  @IsString()
  @IsOptional()
  profilePicture?: string;

  @ApiProperty({ enum: GenderType, example: GenderType.MALE, required: false })
  @IsEnum(GenderType)
  @IsOptional()
  gender?: GenderType;

  @ApiProperty({ example: 25, required: false })
  @IsNumber()
  @Min(10)
  @Max(100)
  @IsOptional()
  age?: number;

  @ApiProperty({ example: 75.5, required: false })
  @IsNumber()
  @Min(30)
  @Max(300)
  @IsOptional()
  weight?: number;

  @ApiProperty({ enum: GoalType, example: GoalType.WEIGHT_LOSS, required: false })
  @IsEnum(GoalType)
  @IsOptional()
  goal?: GoalType;

  @ApiProperty({
    enum: PhysicalActivityLevel,
    example: PhysicalActivityLevel.INTERMEDIATE,
    required: false,
  })
  @IsEnum(PhysicalActivityLevel)
  @IsOptional()
  physicalActivityLevel?: PhysicalActivityLevel;
}
