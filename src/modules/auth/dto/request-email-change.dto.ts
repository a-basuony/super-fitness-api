import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RequestEmailChangeDto {
  @ApiProperty({ example: 'newuser@example.com', description: 'The new email address' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  newEmail: string;
}
