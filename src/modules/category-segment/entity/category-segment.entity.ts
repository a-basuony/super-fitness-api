// category-segment.entity.ts
import { CategoryGroup } from 'src/modules/category-group/entity/categoryGroup.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  Index,
  Unique,
} from 'typeorm';

@Entity('category_segments')
@Unique(['group', 'name'])
export class CategorySegment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => CategoryGroup, (group) => group.segments, { onDelete: 'CASCADE' })
  @Index()
  group: CategoryGroup;

  @CreateDateColumn()
  createdAt: Date;
}
