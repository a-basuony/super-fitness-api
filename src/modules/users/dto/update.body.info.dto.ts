import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class UpdateBodyInfoDto {
  @ApiProperty({ example: 70 })
  @IsNumber()
  @Min(30)
  weight: number;
  @ApiProperty({ example: 170 })
  @IsNumber()
  @Min(100)
  height: number;
}
