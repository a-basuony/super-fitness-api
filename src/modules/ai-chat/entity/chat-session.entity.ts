import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UserEntity } from 'src/modules/users/entity/user.entity';
import { ChatMessage } from './chat-message.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity()
export class ChatSession {
  @ApiProperty({
    example: '7c6c93e9-5602-472d-b128-57c14da3fbd2',
    description: 'Unique identifier of the chat session',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiPropertyOptional({
    example: 'My Workout Plan',
    description: 'Title of the chat session',
  })
  @Column({ length: 150, nullable: true })
  title: string;

  @ApiProperty({ example: '2026-05-21T17:00:31.000Z', description: 'Creation timestamp' })
  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.chatSessions, { onDelete: 'CASCADE' })
  user: UserEntity;

  @ApiProperty({
    type: () => [ChatMessage],
    description: 'List of messages in this session',
  })
  @OneToMany(() => ChatMessage, (message) => message.session, { onDelete: 'CASCADE' })
  messages: ChatMessage[];
}
