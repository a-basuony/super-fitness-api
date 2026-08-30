import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the category group', example: 'full body' })
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'The ID of the category', example: 1 })
  categoryId: number;
}
