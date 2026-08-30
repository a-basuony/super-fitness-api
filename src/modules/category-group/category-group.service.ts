import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create.categoryGroup.dto';
import { CategoryGroup } from './entity/categoryGroup.entity';
import { CategoryService } from '../category/category.service';

@Injectable()
export class CategoryGroupService {
  constructor(
    @InjectRepository(CategoryGroup)
    private readonly categoryGroupRepo: Repository<CategoryGroup>,
    private readonly categoryService: CategoryService,
  ) {}

  async create(body: CreateGroupDto) {
    await this.categoryService.findCategoryById(body.categoryId);
    const nameExist = await this.categoryGroupRepo.findOne({
      where: { name: body.name },
    });
    if (nameExist) {
      throw new ConflictException('category group name already exist');
    }
    const categoryGroup = this.categoryGroupRepo.create({
      name: body.name,
      category: { id: body.categoryId },
    });
    return await this.categoryGroupRepo.save(categoryGroup);
  }
  async findOne(id: number) {
    const categoryGroup = await this.categoryGroupRepo.findOne({ where: { id } });
    if (!categoryGroup) {
      throw new NotFoundException('Category group not found');
    }
    return categoryGroup;
  }
  async update(id: number, updateDto: Partial<CreateGroupDto>) {
    const group = await this.findOne(id);
    this.categoryGroupRepo.merge(group, {
      name: updateDto.name,
      category: updateDto.categoryId ? { id: updateDto.categoryId } : group.category,
    });
    return await this.categoryGroupRepo.save(group);
  }
  async remove(id: number) {
    const group = await this.findOne(id);
    return await this.categoryGroupRepo.remove(group);
  }
  async getAll() {
    return await this.categoryGroupRepo.find({
      relations: { category: true },
    });
  }

  async getSegmentsByGroup(groupId: number) {
    const group = await this.categoryGroupRepo.findOne({
      where: { id: groupId },
      relations: ['segments'],
    });

    if (!group) {
      throw new NotFoundException('Category group not found');
    }

    return group.segments || [];
  }
}
