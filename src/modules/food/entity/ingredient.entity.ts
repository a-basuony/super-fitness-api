import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { FoodEntity } from './food.entity';

@Entity('ingredients')
export class IngredientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'float', nullable: true })
  quantity: number;

  @Column({ nullable: true })
  unit: string;

  @ManyToOne(() => FoodEntity, (food) => food.ingredients, {
    onDelete: 'CASCADE',
  })
  food: FoodEntity;
}
