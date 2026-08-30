import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { CategorySegment } from './category-segment.entity';

@Entity('category_segment_stats')
export class CategorySegmentStats {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => CategorySegment, { onDelete: 'CASCADE' })
  @JoinColumn()
  @Index()
  segment: CategorySegment;

  @Column({ default: 0 })
  views: number;

  @UpdateDateColumn()
  updatedAt: Date;
}
