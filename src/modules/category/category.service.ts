import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkoutCategory } from './entity/category.entity';
import { Repository } from 'typeorm';
import { createCategoryDto } from './dtos/create.category';
import { NotFoundException } from '@nestjs/common';
import { UpdateCategoryDto } from './dtos/update.category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(WorkoutCategory)
    private readonly categoryRepo: Repository<WorkoutCategory>,
  ) {}

  async create(body: createCategoryDto) {
    const categoryExist = await this.categoryRepo.findOneBy({ name: body.name });
    if (categoryExist) {
      throw new ConflictException('Category already exists');
    }
    const category = this.categoryRepo.create(body);
    return await this.categoryRepo.save(category);
  }

  async getAll() {
    return await this.categoryRepo.find({ relations: ['groups'] });
  }

  async findCategoryById(id: number) {
    const category = await this.categoryRepo.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('catgeory is not exist or removed');
    }
    return category;
  }
  async remove(id: number) {
    await this.findCategoryById(id);
    return await this.categoryRepo.delete(id);
  }
  async update(id: number, updatedCategory: UpdateCategoryDto) {
    const category = await this.findCategoryById(id);
    this.categoryRepo.merge(category, updatedCategory);
    return await this.categoryRepo.save(category);
  }

  async getGroupsByCategory(categoryId: number) {
    await this.findCategoryById(categoryId);
    const groups = await this.categoryRepo.find({
      where: { id: categoryId },
      relations: ['groups'],
    });
    return groups[0]?.groups || [];
  }
}
