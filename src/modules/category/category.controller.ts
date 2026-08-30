import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { createCategoryDto } from './dtos/create.category';
import { AuthGuard } from 'src/common/services/guards/auth/auth.guard';
import { ParseIntPipe } from '@nestjs/common';
import { UpdateCategoryDto } from './dtos/update.category.dto';
import { RolesGuard } from 'src/common/services/guards/auth/roles.guard';
import { UserType } from '../../common/utils/enums';
import { Roles } from 'src/common/decorators/roles.decorator';

@ApiTags('Categories')
@Controller('category')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Roles(UserType.ADMIN)
  @ApiResponse({ status: 201, description: 'Category created successfully' })
  @ApiOperation({ summary: 'Create a new category' })
  @Post()
  async create(@Body() body: createCategoryDto) {
    return await this.categoryService.create(body);
  }

  @ApiResponse({ status: 200, description: 'Categories retrieved successfully' })
  @ApiOperation({ summary: 'Get all categories' })
  @Get()
  @Roles(UserType.USER)
  async getAll() {
    return await this.categoryService.getAll();
  }

  @ApiResponse({ status: 200, description: 'Groups for category retrieved successfully' })
  @ApiOperation({ summary: 'Get all groups in a category' })
  @ApiParam({ name: 'categoryId', description: 'Category ID' })
  @Get(':categoryId/groups')
  async getGroupsByCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return await this.categoryService.getGroupsByCategory(categoryId);
  }

  @ApiResponse({ status: 200, description: 'Category removed successfully' })
  @ApiOperation({ summary: 'Delete a category' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  @Roles(UserType.ADMIN)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.categoryService.remove(id);
  }

  @ApiResponse({ status: 200, description: 'Category updated successfully' })
  @ApiOperation({ summary: 'Update an existing category' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  @Patch(':id')
  @Roles(UserType.ADMIN)
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateCategoryDto) {
    return await this.categoryService.update(id, body);
  }
}
