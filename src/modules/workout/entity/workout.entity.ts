import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { CategorySegment } from '../../category-segment/entity/category-segment.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum WorkoutDifficulty {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

@Entity('workouts')
@Index(['difficulty'])
export class Workout {
  @ApiProperty({ example: 1, description: 'Unique identifier of the workout' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Pushups', description: 'Title of the workout' })
  @Column()
  title: string;

  @ApiPropertyOptional({
    example: 'Standard pushups targeting chest and triceps',
    description: 'Description of the workout',
  })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({ description: 'Category segment this workout belongs to' })
  @ManyToOne(() => CategorySegment, { onDelete: 'CASCADE', eager: true })
  segment: CategorySegment;

  @ApiProperty({
    enum: WorkoutDifficulty,
    example: WorkoutDifficulty.BEGINNER,
    description: 'Difficulty level',
  })
  @Column({
    type: 'enum',
    enum: WorkoutDifficulty,
    default: WorkoutDifficulty.BEGINNER,
  })
  difficulty: WorkoutDifficulty;

  @ApiPropertyOptional({ example: 15, description: 'Duration of the workout in minutes' })
  @Column({ type: 'int', nullable: true })
  durationMinutes: number;

  @ApiPropertyOptional({ example: 120, description: 'Estimated calories burned' })
  @Column({ type: 'int', nullable: true })
  calories: number;

  @ApiPropertyOptional({ example: 3, description: 'Number of sets' })
  @Column({ type: 'int', nullable: true })
  sets: number;

  @ApiPropertyOptional({ example: 12, description: 'Number of reps per set' })
  @Column({ type: 'int', nullable: true })
  reps: number;

  @ApiPropertyOptional({
    example: 'https://cloudinary.com/video.mp4',
    description: 'URL of the workout demonstration video',
  })
  @Column({ nullable: true })
  videoUrl: string;

  @Column({ nullable: true })
  videoPublicId: string;

  @ApiProperty({ example: '2026-05-21T17:00:31.000Z', description: 'Creation timestamp' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: '2026-05-21T17:00:31.000Z',
    description: 'Last update timestamp',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
