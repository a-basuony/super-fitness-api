import { Test, TestingModule } from '@nestjs/testing';
import { AiChatController } from './ai-chat.controller';
import { AiChatService } from './ai-chat.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ChatSession } from './entity/chat-session.entity';
import { ChatMessage } from './entity/chat-message.entity';
import { DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/modules/users/users.service';
import { ThrottlerModule } from '@nestjs/throttler';

describe('AiChatController', () => {
  let controller: AiChatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ThrottlerModule.forRoot()],
      controllers: [AiChatController],
      providers: [
        AiChatService,
        { provide: DataSource, useValue: {} },
        { provide: 'GEMINI_MODEL', useValue: {} },
        { provide: getRepositoryToken(ChatSession), useValue: {} },
        { provide: getRepositoryToken(ChatMessage), useValue: {} },
        { provide: JwtService, useValue: {} },
        { provide: ConfigService, useValue: {} },
        { provide: UsersService, useValue: {} },
      ],
    }).compile();

    controller = module.get<AiChatController>(AiChatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
