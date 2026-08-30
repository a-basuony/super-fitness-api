import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/common/services/guards/auth/auth.guard';
import { CategorySegmentService } from './category-segment.service';
import { CreateCategorySegmentDto } from './dto/create-category-segment.dto';
import { UpdateCategorySegmentDto } from './dto/update-category-segment.dto';
import { QueryCategorySegmentDto } from './dto/query-category-segment.dto';
import { RolesGuard } from 'src/common/services/guards/auth/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserType } from '../../common/utils/enums';

@ApiTags('Category Segments')
@Controller('segments')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
export class CategorySegmentController {
  constructor(private readonly segmentService: CategorySegmentService) {}

  @Post()
  @Roles(UserType.ADMIN)
  @ApiOperation({ summary: 'Create a new subcategory segment' })
  @ApiResponse({ status: 201, description: 'Segment created successfully' })
  async create(@Body() dto: CreateCategorySegmentDto) {
    return await this.segmentService.create(dto);
  }

  @Get()
  @Roles(UserType.USER, UserType.ADMIN)
  @ApiOperation({ summary: 'Get segments (with filtering by groupId or categoryId)' })
  @ApiResponse({ status: 200, description: 'Segments retrieved successfully' })
  async findAll(@Query() query: QueryCategorySegmentDto) {
    return await this.segmentService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single segment with details' })
  @ApiResponse({ status: 200, description: 'Segment found' })
  @ApiParam({ name: 'id', description: 'Segment ID' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.segmentService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserType.ADMIN)
  @ApiOperation({ summary: 'Update a segment' })
  @ApiResponse({ status: 200, description: 'Segment updated successfully' })
  @ApiParam({ name: 'id', description: 'Segment ID' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCategorySegmentDto,
  ) {
    return await this.segmentService.update(id, dto);
  }

  @Delete(':id')
  @Roles(UserType.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a segment' })
  @ApiResponse({ status: 204, description: 'Segment deleted successfully' })
  @ApiParam({ name: 'id', description: 'Segment ID' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.segmentService.remove(id);
  }

  @Post(':id/view')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Increment segment views count' })
  @ApiResponse({ status: 200, description: 'Views incremented' })
  @ApiParam({ name: 'id', description: 'Segment ID' })
  async incrementView(@Param('id', ParseIntPipe) id: number) {
    return await this.segmentService.incrementViews(id);
  }

  @Get(':id/stats')
  @ApiOperation({ summary: 'Show segment statistics' })
  @ApiResponse({ status: 200, description: 'Stats retrieved' })
  @ApiParam({ name: 'id', description: 'Segment ID' })
  async getStats(@Param('id', ParseIntPipe) id: number) {
    return await this.segmentService.getStats(id);
  }
}
