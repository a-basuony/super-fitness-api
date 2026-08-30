import { Module } from '@nestjs/common';
import { AiChatService } from './ai-chat.service';
import { AiChatController } from './ai-chat.controller';
import { AiModule } from '../ai/ai.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatMessage } from './entity/chat-message.entity';
import { ChatSession } from './entity/chat-session.entity';
import { UserEntity } from '../users/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';

@Module({
  imports: [AiModule, TypeOrmModule.forFeature([ChatSession, ChatMessage, UserEntity])],
  controllers: [AiChatController],
  providers: [AiChatService, JwtService, ConfigService, UsersService],
})
export class AiChatModule {}
