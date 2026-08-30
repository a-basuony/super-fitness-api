import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

import { CategoryGroup } from '../../category-group/entity/categoryGroup.entity';

@Entity('workout_categories')
export class WorkoutCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => CategoryGroup, (group) => group.category)
  groups: CategoryGroup[];
}
