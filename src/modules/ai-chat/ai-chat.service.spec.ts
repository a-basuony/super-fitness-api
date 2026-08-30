import { Test, TestingModule } from '@nestjs/testing';
import { AiChatService } from './ai-chat.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ChatSession } from './entity/chat-session.entity';
import { ChatMessage } from './entity/chat-message.entity';
import { DataSource } from 'typeorm';

describe('AiChatService', () => {
  let service: AiChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AiChatService,
        { provide: DataSource, useValue: {} },
        { provide: 'GEMINI_MODEL', useValue: {} },
        { provide: getRepositoryToken(ChatSession), useValue: {} },
        { provide: getRepositoryToken(ChatMessage), useValue: {} },
      ],
    }).compile();

    service = module.get<AiChatService>(AiChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
