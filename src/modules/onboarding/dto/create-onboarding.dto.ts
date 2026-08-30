import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOnboardingDto {
  @ApiProperty({ example: 'Push Day', description: 'Onboarding item title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Complete push workout',
    description: 'Onboarding item description',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Onboarding item image file',
  })
  image: any;

  @ApiProperty({ example: 1, description: 'Onboarding item order' })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  order_index?: number;

  @ApiProperty({ example: true, description: 'Is onboarding item active' })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
