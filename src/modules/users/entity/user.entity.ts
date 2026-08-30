import { EmailChangeEntity } from '../../auth/entity/email-change.entity';
import { Exclude } from 'class-transformer';
import { ChatSession } from 'src/modules/ai-chat/entity/chat-session.entity';
import { PasswordResetEntity } from 'src/modules/auth/entity/reset-password.entity';
import { CURRENT_TIMESTAMP } from 'src/common/utils/constants';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  GenderType,
  GoalType,
  PhysicalActivityLevel,
  UserType,
} from 'src/common/utils/enums';
import {
  UpdateDateColumn,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @ApiProperty({
    example: 'd3b07384-d113-4956-a5db-251f95713488',
    description: 'Unique identifier',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'user@example.com', description: 'User email address' })
  @Column({ type: 'varchar', length: '250', unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @ApiProperty({ enum: UserType, example: UserType.USER, description: 'User role type' })
  @Column({ type: 'enum', enum: UserType, default: UserType.USER })
  type: UserType;

  @ApiProperty({ example: 'John', description: 'User first name' })
  @Column()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'User last name' })
  @Column()
  lastName: string;

  @ApiPropertyOptional({
    example: 'https://example.com/profile.jpg',
    description: 'Profile picture URL',
  })
  @Column({ nullable: true })
  profilePicture: string;

  @ApiProperty({ example: true, description: 'Whether the account is active' })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({ example: false, description: 'Whether the email is verified' })
  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({ nullable: true })
  emailVerificationToken: string;

  @ApiPropertyOptional({
    enum: GenderType,
    example: GenderType.MALE,
    description: 'User gender',
  })
  @Column({ nullable: true, enum: GenderType })
  gender: GenderType;

  @ApiPropertyOptional({ example: 28, description: 'User age' })
  @Column({ nullable: true })
  age: number;

  @ApiPropertyOptional({ example: 75, description: 'User weight in kg' })
  @Column({ nullable: true })
  weight: number;

  @ApiPropertyOptional({ example: 175, description: 'User height in cm' })
  @Column({ nullable: true })
  height: number;

  @ApiPropertyOptional({
    enum: GoalType,
    example: GoalType.WEIGHT_LOSS,
    description: 'Fitness goal',
  })
  @Column({ nullable: true, enum: GoalType })
  goal: GoalType;

  @ApiPropertyOptional({
    enum: PhysicalActivityLevel,
    example: PhysicalActivityLevel.INTERMEDIATE,
    description: 'Activity level',
  })
  @Column({ nullable: true, enum: PhysicalActivityLevel })
  physicalActivityLevel: PhysicalActivityLevel;

  @Column({
    nullable: true,
  })
  hashedRefreshToken?: string;

  @OneToMany(() => PasswordResetEntity, (passwordReset) => passwordReset.user)
  passwordResets: PasswordResetEntity[];
  @OneToMany(() => EmailChangeEntity, (emailChange) => emailChange.user)
  emailChanges: EmailChangeEntity[];

  @ApiProperty({ example: '2026-05-21T17:00:31.000Z', description: 'Creation timestamp' })
  @CreateDateColumn({ type: 'timestamp', default: () => CURRENT_TIMESTAMP })
  created_at: Date;

  @ApiProperty({
    example: '2026-05-21T17:00:31.000Z',
    description: 'Last update timestamp',
  })
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => CURRENT_TIMESTAMP,
    onUpdate: CURRENT_TIMESTAMP,
  })
  updated_at: Date;

  @ApiProperty({ example: 1, description: 'Current step in onboarding process' })
  @Column('int4', { default: 1 })
  currentStep: number;

  @ApiProperty({ example: false, description: 'Whether onboarding has been completed' })
  @Column({ default: false })
  isOnboardingCompleted: boolean;

  @OneToMany(() => ChatSession, (chatSession) => chatSession.user)
  chatSessions: ChatSession[];
}
