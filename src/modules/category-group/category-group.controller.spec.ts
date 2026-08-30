import { Test, TestingModule } from '@nestjs/testing';
import { CategoryGroupController } from './category-group.controller';
import { CategoryGroupService } from './category-group.service';
import { CategoryService } from '../category/category.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoryGroup } from './entity/categoryGroup.entity';
import { WorkoutCategory } from '../category/entity/category.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/modules/users/users.service';

describe('CategoryGroupController', () => {
  let controller: CategoryGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryGroupController],
      providers: [
        CategoryGroupService,
        CategoryService,
        { provide: getRepositoryToken(CategoryGroup), useValue: {} },
        { provide: getRepositoryToken(WorkoutCategory), useValue: {} },
        { provide: JwtService, useValue: {} },
        { provide: ConfigService, useValue: {} },
        { provide: UsersService, useValue: {} },
      ],
    }).compile();

    controller = module.get<CategoryGroupController>(CategoryGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
