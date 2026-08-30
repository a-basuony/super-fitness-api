import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ChatSession } from './chat-session.entity';
import { SenderType } from 'src/common/utils/enums';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ChatMessage {
  @ApiProperty({ example: 1, description: 'Unique identifier of the chat message' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Hello, how can I help you?', description: 'Message content' })
  @Column({ type: 'text' })
  content: string;

  @ApiProperty({
    enum: SenderType,
    example: SenderType.USER,
    description: 'Sender role (USER or AI)',
  })
  @Column({ type: 'enum', enum: SenderType, default: SenderType.USER })
  sender: SenderType;

  @ApiProperty({ example: '2026-05-21T17:00:31.000Z', description: 'Creation timestamp' })
  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => ChatSession, (session) => session.messages, { onDelete: 'CASCADE' })
  session: ChatSession;
}
