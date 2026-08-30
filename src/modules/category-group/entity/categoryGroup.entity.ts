import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  Index,
  Unique,
} from 'typeorm';
import { WorkoutCategory } from '../../category/entity/category.entity';
import { CategorySegment } from 'src/modules/category-segment/entity/category-segment.entity';

@Entity('category_groups')
@Unique(['category', 'name'])
export class CategoryGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => WorkoutCategory, (category) => category.groups, {
    onDelete: 'CASCADE',
  })
  @Index()
  category: WorkoutCategory;

  @OneToMany(() => CategorySegment, (segment) => segment.group)
  segments: CategorySegment[];

  @CreateDateColumn()
  createdAt: Date;
}
