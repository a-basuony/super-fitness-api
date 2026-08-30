import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { CURRENT_TIMESTAMP } from 'src/common/utils/constants';
import { MealCategory } from 'src/common/utils/enums';
import { IngredientEntity } from './ingredient.entity';

@Entity('foods')
export class FoodEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: MealCategory,
  })
  category: MealCategory;

  @Column({ type: 'int' })
  calories: number;

  @Column({ type: 'float' })
  protein: number;

  @Column({ type: 'float' })
  carbs: number;

  @Column({ type: 'float' })
  fats: number;

  @Column({ nullable: true })
  image_url: string;

  @OneToMany(() => IngredientEntity, (ingredient) => ingredient.food, {
    cascade: true,
    eager: true,
  })
  ingredients: IngredientEntity[];

  @CreateDateColumn({ type: 'timestamp', default: () => CURRENT_TIMESTAMP })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => CURRENT_TIMESTAMP,
    onUpdate: CURRENT_TIMESTAMP,
  })
  updated_at: Date;
}
