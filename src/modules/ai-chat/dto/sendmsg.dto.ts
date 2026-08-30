import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class SendMessageDto {
  @IsOptional()
  @IsUUID()
  @ApiPropertyOptional({
    description: 'Optional session ID for the chat session.',
    example: '7c6c93e9-5602-472d-b128-57c14da3fbd2',
  })
  sessionId?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  @ApiProperty({ example: 'hello gemini' })
  message: string;

  //   @IsUUID()
  //   @IsNotEmpty()
  //   userId: string;
}
