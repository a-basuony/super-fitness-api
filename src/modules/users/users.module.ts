import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtService } from '@nestjs/jwt';
import { ChatSession } from '../ai-chat/entity/chat-session.entity';
import { ChatMessage } from '../ai-chat/entity/chat-message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ChatSession, ChatMessage])],
  controllers: [UsersController],
  providers: [UsersService, JwtService],
  exports: [UsersService, JwtService],
})
export class UsersModule {}
