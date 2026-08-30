import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class UpdateCategoryDto {
  @IsString()
  @ApiProperty({ example: 'yoga', description: 'Category name' })
  name: string;
}
