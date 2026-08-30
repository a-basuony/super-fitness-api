import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { GenderType } from 'src/common/utils/enums';
export class UpdatePersonalInfoDto {
  @ApiProperty({ enum: GenderType, example: GenderType.MALE })
  @IsEnum(GenderType)
  @IsNotEmpty()
  gender: GenderType;
  @IsNumber()
  @Min(10)
  @Max(100)
  @ApiProperty({ example: 20 })
  age: number;
}
