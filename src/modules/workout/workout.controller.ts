import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiConsumes,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { WorkoutService } from './workout.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { QueryWorkoutDto } from './dto/query-workout.dto';
import { AuthGuard } from 'src/common/services/guards/auth/auth.guard';
import { RolesGuard } from 'src/common/services/guards/auth/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserType } from '../../common/utils/enums';
import { Workout, WorkoutDifficulty } from './entity/workout.entity';

@ApiTags('Workouts')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('workouts')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Post()
  @Roles(UserType.ADMIN)
  @UseInterceptors(FileInterceptor('video'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create a new workout.' })
  @ApiResponse({
    status: 201,
    description: 'Workout successfully created.',
    type: Workout,
  })
  async create(
    @Body() createWorkoutDto: CreateWorkoutDto,
    @UploadedFile() video?: Express.Multer.File,
  ) {
    return await this.workoutService.create(createWorkoutDto, video);
  }

  @Get()
  @Roles(UserType.USER, UserType.ADMIN)
  @ApiOperation({ summary: 'Get workouts with filters.' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of workouts.',
    type: [Workout],
  })
  async findAll(@Query() queryDto: QueryWorkoutDto) {
    return await this.workoutService.findAll(queryDto);
  }

  @Get('segment/:segmentId')
  @Roles(UserType.USER, UserType.ADMIN)
  @ApiOperation({ summary: 'Get workouts by category segment.' })
  @ApiParam({ name: 'segmentId', description: 'Category segment ID', type: Number })
  @ApiQuery({
    name: 'difficulty',
    required: false,
    enum: WorkoutDifficulty,
    description: 'Difficulty level',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of workouts under the segment.',
    type: [Workout],
  })
  async getBySegment(
    @Param('segmentId', ParseIntPipe) segmentId: number,
    @Query('difficulty') difficulty?: string,
  ) {
    return await this.workoutService.getBySegmentAndDifficulty(segmentId, difficulty);
  }

  @Get(':id')
  @Roles(UserType.USER, UserType.ADMIN)
  @ApiOperation({ summary: 'Get workout details by ID.' })
  @ApiParam({ name: 'id', description: 'Workout ID', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Returns the workout details.',
    type: Workout,
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.workoutService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserType.ADMIN)
  @UseInterceptors(FileInterceptor('video'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update an existing workout.' })
  @ApiParam({ name: 'id', description: 'Workout ID', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Workout successfully updated.',
    type: Workout,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWorkoutDto: UpdateWorkoutDto,
    @UploadedFile() video?: Express.Multer.File,
  ) {
    return await this.workoutService.update(id, updateWorkoutDto, video);
  }

  @Delete(':id')
  @Roles(UserType.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a workout by ID.' })
  @ApiParam({ name: 'id', description: 'Workout ID', type: Number })
  @ApiResponse({ status: 204, description: 'Workout successfully deleted.' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.workoutService.remove(id);
  }

  @Delete(':id/video')
  @Roles(UserType.ADMIN)
  @ApiOperation({ summary: 'Delete the demonstration video from a workout.' })
  @ApiParam({ name: 'id', description: 'Workout ID', type: Number })
  @ApiResponse({ status: 200, description: 'Video successfully deleted.', type: Workout })
  async removeVideo(@Param('id', ParseIntPipe) id: number) {
    return await this.workoutService.removeVideo(id);
  }
}
