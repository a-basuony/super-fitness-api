import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategorySegmentDto {
  @ApiProperty({ example: 'Lower Chest' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 3, description: '  Category Group ' })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  groupId: number;
}
