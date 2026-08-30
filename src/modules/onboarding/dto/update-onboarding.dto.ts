import { IsString, IsNumber, IsPositive, IsBoolean, IsOptional } from 'class-validator';
import { CreateOnboardingDto } from './create-onboarding.dto';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class UpdateOnboardingDto extends PartialType(CreateOnboardingDto) {
  @ApiPropertyOptional({ example: 'Push Day v2', description: 'Updated title' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    example: 'Complete push workout v2',
    description: 'Updated description',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    description: 'Updated onboarding item image file',
  })
  @IsOptional()
  image?: any;

  @ApiPropertyOptional({ example: 2, description: 'Updated order' })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  order_index?: number;

  @ApiPropertyOptional({ example: false, description: 'Updated active status' })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
