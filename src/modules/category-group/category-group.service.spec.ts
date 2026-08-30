import { Test, TestingModule } from '@nestjs/testing';
import { CategoryGroupService } from './category-group.service';
import { CategoryService } from '../category/category.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoryGroup } from './entity/categoryGroup.entity';
import { WorkoutCategory } from '../category/entity/category.entity';

describe('CategoryGroupService', () => {
  let service: CategoryGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryGroupService,
        CategoryService,
        { provide: getRepositoryToken(CategoryGroup), useValue: {} },
        { provide: getRepositoryToken(WorkoutCategory), useValue: {} },
      ],
    }).compile();

    service = module.get<CategoryGroupService>(CategoryGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
