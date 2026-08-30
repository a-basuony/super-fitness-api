import { Controller, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CategoryGroupService } from './category-group.service';
import { Post, Body, Param, Patch, Delete, Get } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateGroupDto } from './dto/create.categoryGroup.dto';
import { AuthGuard } from 'src/common/services/guards/auth/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/services/guards/auth/roles.guard';
import { UserType } from '../../common/utils/enums';

@ApiTags('Category Groups')
@ApiBearerAuth()
@Controller('category-group')
@UseGuards(AuthGuard, RolesGuard)
export class CategoryGroupController {
  constructor(private readonly categoryGroupService: CategoryGroupService) {}

  @Roles(UserType.ADMIN)
  @ApiResponse({ status: 201, description: 'Category group created successfully' })
  @ApiOperation({ summary: 'Create a new category group' })
  @Post()
  async create(@Body() body: CreateGroupDto) {
    return await this.categoryGroupService.create(body);
  }

  @ApiResponse({ status: 200, description: 'Category group updated successfully' })
  @ApiOperation({ summary: 'Update an existing category group' })
  @ApiParam({ name: 'id', description: 'Category Group ID' })
  @Patch(':id')
  @Roles(UserType.ADMIN)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: Partial<CreateGroupDto>,
  ) {
    return await this.categoryGroupService.update(id, updateDto);
  }

  @ApiResponse({ status: 200, description: 'Category group removed successfully' })
  @ApiOperation({ summary: 'Delete a category group' })
  @ApiParam({ name: 'id', description: 'Category Group ID' })
  @Delete(':id')
  @Roles(UserType.ADMIN)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.categoryGroupService.remove(id);
  }

  @ApiResponse({ status: 200, description: 'Retrieved all category groups successfully' })
  @ApiOperation({ summary: 'Get all category groups' })
  @Roles(UserType.USER)
  @Get()
  async getAll() {
    return await this.categoryGroupService.getAll();
  }

  @ApiResponse({ status: 200, description: 'Get segments for group successfully' })
  @ApiOperation({ summary: 'Get segments belonging to a category group' })
  @ApiParam({ name: 'groupId', description: 'Category Group ID' })
  @Get(':groupId/segments')
  async getSegmentsByGroup(@Param('groupId', ParseIntPipe) groupId: number) {
    return await this.categoryGroupService.getSegmentsByGroup(groupId);
  }
}
