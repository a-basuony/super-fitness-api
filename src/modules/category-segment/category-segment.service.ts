import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategorySegmentDto } from './dto/create-category-segment.dto';
import { UpdateCategorySegmentDto } from './dto/update-category-segment.dto';
import { QueryCategorySegmentDto } from './dto/query-category-segment.dto';
import { CategorySegment } from './entity/category-segment.entity';
import { CategoryGroup } from '../category-group/entity/categoryGroup.entity';
import { WorkoutCategory } from '../category/entity/category.entity';
import { CategorySegmentStats } from './entity/category-segment-stats';

@Injectable()
export class CategorySegmentService {
  constructor(
    @InjectRepository(CategorySegment)
    private segmentRepo: Repository<CategorySegment>,
    @InjectRepository(CategoryGroup)
    private groupRepo: Repository<CategoryGroup>,
    @InjectRepository(WorkoutCategory)
    private categoryRepo: Repository<WorkoutCategory>,
    @InjectRepository(CategorySegmentStats)
    private statsRepo: Repository<CategorySegmentStats>,
  ) {}

  async create(dto: CreateCategorySegmentDto) {
    const group = await this.groupRepo.findOne({ where: { id: dto.groupId } });
    if (!group) {
      throw new NotFoundException('Category group not found');
    }

    const existing = await this.segmentRepo.findOne({
      where: { name: dto.name, group: { id: dto.groupId } },
    });
    if (existing) {
      throw new ConflictException(
        'A segment with this name already exists in this group',
      );
    }

    const segment = this.segmentRepo.create({ name: dto.name, group });
    return await this.segmentRepo.save(segment);
  }

  async findAll(query: QueryCategorySegmentDto) {
    let queryBuilder = this.segmentRepo
      .createQueryBuilder('segment')
      .leftJoinAndSelect('segment.group', 'group')
      .leftJoinAndSelect('group.category', 'category');

    // Apply filters
    if (query.groupId) {
      queryBuilder = queryBuilder.andWhere('group.id = :groupId', {
        groupId: query.groupId,
      });
    }

    if (query.categoryId) {
      queryBuilder = queryBuilder.andWhere('category.id = :categoryId', {
        categoryId: query.categoryId,
      });
    }

    if (query.difficulty) {
      queryBuilder = queryBuilder
        .innerJoin('workouts', 'workout', 'workout.segmentId = segment.id')
        .andWhere('workout.difficulty = :difficulty', {
          difficulty: query.difficulty,
        });
    }

    queryBuilder = queryBuilder.orderBy('segment.name', 'ASC');

    return await queryBuilder.getMany();
  }

  async findOne(id: number) {
    const segment = await this.segmentRepo.findOne({
      where: { id },
      relations: ['group', 'group.category'],
    });
    if (!segment) {
      throw new NotFoundException('Segment not found');
    }
    return segment;
  }

  async update(id: number, dto: UpdateCategorySegmentDto) {
    const segment = await this.findOne(id);

    if (dto.name) {
      const duplicate = await this.segmentRepo.findOne({
        where: { name: dto.name, group: { id: segment.group.id } },
      });
      if (duplicate && duplicate.id !== id) {
        throw new ConflictException('Segment name already exists in this group');
      }
      segment.name = dto.name;
    }

    if (dto.groupId && dto.groupId !== segment.group.id) {
      const newGroup = await this.groupRepo.findOne({ where: { id: dto.groupId } });
      if (!newGroup) {
        throw new NotFoundException('New group not found');
      }
      segment.group = newGroup;
    }

    return this.segmentRepo.save(segment);
  }

  async remove(id: number) {
    const segment = await this.findOne(id);
    await this.segmentRepo.remove(segment);
    return { message: 'Segment deleted successfully' };
  }

  async incrementViews(id: number) {
    const segment = await this.segmentRepo.findOne({ where: { id } });
    if (!segment) throw new NotFoundException('Segment not found');

    let stats = await this.statsRepo.findOne({
      where: { segment: { id } },
      relations: ['segment'],
    });
    if (!stats) {
      stats = this.statsRepo.create({ segment, views: 1 });
    } else {
      stats.views = (stats.views || 0) + 1;
    }

    return await this.statsRepo.save(stats);
  }

  async getStats(id: number) {
    const stats = await this.statsRepo.findOne({
      where: { segment: { id } },
      relations: ['segment'],
    });
    if (!stats) throw new NotFoundException('Stats not found');
    return stats;
  }

  async getPopularSegments(limit = 10) {
    const rows = await this.statsRepo
      .createQueryBuilder('stats')
      .leftJoinAndSelect('stats.segment', 'segment')
      .orderBy('stats.views', 'DESC')
      .take(limit)
      .getMany();

    return rows.map((r) => ({
      segment: r.segment,
      views: r.views,
    }));
  }
}
