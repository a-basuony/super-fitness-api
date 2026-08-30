import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class createCategoryDto {
  @IsString()
  @ApiProperty({ example: 'yoga', description: 'Category name' })
  name: string;
}
