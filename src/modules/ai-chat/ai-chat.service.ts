import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { GEMINI_MODEL } from '../../common/utils/constants';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatMessage } from './entity/chat-message.entity';
import { DataSource, Repository } from 'typeorm';
import { ChatSession } from './entity/chat-session.entity';
import { UserEntity } from '../users/entity/user.entity';
import { ChatPromptTemplate, MessagesPlaceholder } from '@langchain/core/prompts';
import { HumanMessage, AIMessage } from '@langchain/core/messages';
import { BadRequestException } from '@nestjs/common';
import { SenderType } from '../../common/utils/enums';
import { FITNESS_SYSTEM_PROMPT } from '../../common/utils/fitness-prompt';

@Injectable()
export class AiChatService {
  private readonly logger = new Logger(AiChatService.name);

  constructor(
    private dataSource: DataSource,
    @Inject(GEMINI_MODEL) private readonly geminiModel: ChatGoogleGenerativeAI,
    @InjectRepository(ChatSession)
    private readonly chatSessionRepository: Repository<ChatSession>,
    @InjectRepository(ChatMessage)
    private readonly chatMessageRepository: Repository<ChatMessage>,
  ) {}

  async processUserMessage(
    userMessage: string,
    sessionId: string,
    user: UserEntity,
  ): Promise<{ sessionId: string; response: string }> {
    let session: ChatSession;

    if (sessionId) {
      session = await this.chatSessionRepository.findOne({
        where: { id: sessionId, user: { id: user.id } },
        relations: ['messages'],
        order: { messages: { createdAt: 'DESC' } },
      });
      if (!session) throw new NotFoundException('Session not found');

      if (session.messages) {
        session.messages = session.messages.slice(0, 10).reverse();
      }
    } else {
      session = this.chatSessionRepository.create({
        user,
        title: userMessage.substring(0, 30) + '...',
      });
      session = await this.chatSessionRepository.save(session);
    }

    const historyMessages = (session.messages || []).map((msg) => {
      return msg.sender === SenderType.USER
        ? new HumanMessage(msg.content)
        : new AIMessage(msg.content);
    });

    const prompt = ChatPromptTemplate.fromMessages([
      ['system', FITNESS_SYSTEM_PROMPT],
      new MessagesPlaceholder('chat_history'),
      ['human', '{input}'],
    ]);

    const chain = prompt.pipe(this.geminiModel as any);

    return await this.dataSource.transaction(async (transactionalEntityManager) => {
      try {
        const userMsg = this.chatMessageRepository.create({
          content: userMessage,
          sender: SenderType.USER,
          session: session,
        });
        await transactionalEntityManager.save(userMsg);

        const stream = await chain.stream({
          name: user.firstName,
          age: user.age,
          goal: user.goal,
          activity: user.physicalActivityLevel,
          gender: user.gender,
          chat_history: historyMessages,
          input: userMessage,
        });

        let fullResponse = '';
        for await (const chunk of stream as AsyncIterable<{ content: string }>) {
          fullResponse +=
            typeof chunk.content === 'string'
              ? chunk.content
              : JSON.stringify(chunk.content);
        }

        const aiMsg = this.chatMessageRepository.create({
          content: fullResponse,
          sender: SenderType.AI,
          session: session,
        });
        await transactionalEntityManager.save(aiMsg);

        return {
          sessionId: session.id,
          response: fullResponse,
        };
      } catch (error: unknown) {
        const errMsg = error instanceof Error ? error.message : 'Unknown error';
        const errStack = error instanceof Error ? error.stack : undefined;
        this.logger.error(
          `Failed to process AI chat for user ${user.id} in session ${sessionId || 'NEW'}: ${errMsg}`,
          errStack,
        );

        throw new BadRequestException('Failed to get response from AI');
      }
    });
  }

  async getUserHistory(
    userId: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: ChatSession[]; total: number; page: number; lastPage: number }> {
    const skip = (page - 1) * limit;

    const [sessions, total] = await this.chatSessionRepository.findAndCount({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
      relations: ['messages'],
      take: limit,
      skip: skip,
    });

    return {
      data: sessions,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async deleteSession(sessionId: string, userId: string) {
    const session = await this.chatSessionRepository.findOne({
      where: { id: sessionId, user: { id: userId } },
    });

    if (!session) {
      throw new NotFoundException('Session not found or you do not have permission');
    }

    const deleteResult = await this.chatSessionRepository.delete(sessionId);

    if (deleteResult.affected === 0) {
      throw new NotFoundException(
        'Failed to delete session - might have been deleted already',
      );
    }

    return { message: 'Chat session deleted successfully' };
  }
}
