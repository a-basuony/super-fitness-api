import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Delete,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { AiChatService } from './ai-chat.service';
import { SendMessageDto } from './dto/sendmsg.dto';
import { User } from 'src/common/decorators/user.decorator';
import { UserEntity } from '../users/entity/user.entity';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/common/services/guards/auth/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserType } from '../../common/utils/enums';
import { ThrottlerGuard } from '@nestjs/throttler';

@ApiTags('AI Chat')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('ai-chat')
export class AiChatController {
  constructor(private readonly aiChatService: AiChatService) {}

  @UseGuards(ThrottlerGuard)
  @ApiResponse({ status: 201, description: 'Message processed successfully.' })
  @ApiOperation({ summary: 'Send a message to the AI and receive a response.' })
  @Roles(UserType.USER)
  @Post()
  async sendMessage(@Body() sendMessageDto: SendMessageDto, @User() user: UserEntity) {
    return await this.aiChatService.processUserMessage(
      sendMessageDto.message,
      sendMessageDto.sessionId,
      user,
    );
  }

  @ApiResponse({
    status: 200,
    description: 'Retrieve user chat history with pagination successfully.',
  })
  @ApiOperation({ summary: 'Retrieve chat session history.' })
  @ApiQuery({ name: 'page', description: 'Page number', required: false, type: Number })
  @ApiQuery({
    name: 'limit',
    description: 'Number of sessions per page',
    required: false,
    type: Number,
  })
  @Roles(UserType.USER)
  @Get('history')
  async getHistory(
    @User() user: UserEntity,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const pageNum = Number(page) > 0 ? Number(page) : 1;
    const limitNum = Number(limit) > 0 ? Number(limit) : 10;

    return await this.aiChatService.getUserHistory(user.id, pageNum, limitNum);
  }

  @ApiResponse({ status: 200, description: 'Session deleted successfully.' })
  @ApiOperation({ summary: 'Delete a specific chat session.' })
  @ApiParam({ name: 'id', description: 'Session UUID' })
  @Roles(UserType.USER)
  @Delete('session/:id')
  async deleteSession(
    @Param('id', new ParseUUIDPipe()) sessionId: string,
    @User('id') userId: string,
  ) {
    return await this.aiChatService.deleteSession(sessionId, userId);
  }
}
