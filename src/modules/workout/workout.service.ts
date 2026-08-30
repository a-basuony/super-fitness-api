import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workout } from './entity/workout.entity';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { QueryWorkoutDto } from './dto/query-workout.dto';
import { CategorySegment } from '../category-segment/entity/category-segment.entity';
import { CloudinaryService } from '../../common/services/cloudinary.service';

@Injectable()
export class WorkoutService {
  private readonly logger = new Logger(WorkoutService.name);

  constructor(
    @InjectRepository(Workout)
    private readonly workoutRepository: Repository<Workout>,
    @InjectRepository(CategorySegment)
    private readonly categorySegmentRepository: Repository<CategorySegment>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(
    createWorkoutDto: CreateWorkoutDto,
    videoFile?: Express.Multer.File,
  ): Promise<Workout> {
    const { segmentId, ...workoutData } = createWorkoutDto;

    // Validate segment exists
    const segment = await this.categorySegmentRepository.findOne({
      where: { id: segmentId },
    });

    if (!segment) {
      throw new NotFoundException(`Category segment with ID ${segmentId} not found`);
    }

    // Upload video if provided
    let videoUrl: string | undefined;
    let videoPublicId: string | undefined;

    if (videoFile) {
      try {
        const uploadResult = await this.cloudinaryService.uploadVideo(
          videoFile,
          'workouts/videos',
        );
        videoUrl = uploadResult.secure_url;
        videoPublicId = uploadResult.public_id;
      } catch {
        throw new BadRequestException('Failed to upload video');
      }
    }

    const workout = this.workoutRepository.create({
      ...workoutData,
      segment,
      videoUrl,
      videoPublicId,
    });

    return await this.workoutRepository.save(workout);
  }

  async findAll(queryDto: QueryWorkoutDto) {
    const {
      page = 1,
      limit = 10,
      search,
      difficulty,
      segmentId,
      minDuration,
      maxDuration,
      minCalories,
      maxCalories,
    } = queryDto;

    const queryBuilder = this.workoutRepository
      .createQueryBuilder('workout')
      .leftJoinAndSelect('workout.segment', 'segment')
      .leftJoinAndSelect('segment.group', 'group')
      .leftJoinAndSelect('group.category', 'category');

    // Search by title or description
    if (search) {
      queryBuilder.andWhere(
        '(workout.title ILIKE :search OR workout.description ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    // Filter by difficulty
    if (difficulty) {
      queryBuilder.andWhere('workout.difficulty = :difficulty', {
        difficulty,
      });
    }

    // Filter by segment
    if (segmentId) {
      queryBuilder.andWhere('workout.segment.id = :segmentId', { segmentId });
    }

    // Filter by duration range
    if (minDuration !== undefined) {
      queryBuilder.andWhere('workout.durationMinutes >= :minDuration', {
        minDuration,
      });
    }

    if (maxDuration !== undefined) {
      queryBuilder.andWhere('workout.durationMinutes <= :maxDuration', {
        maxDuration,
      });
    }

    // Filter by calories range
    if (minCalories !== undefined) {
      queryBuilder.andWhere('workout.calories >= :minCalories', {
        minCalories,
      });
    }

    if (maxCalories !== undefined) {
      queryBuilder.andWhere('workout.calories <= :maxCalories', {
        maxCalories,
      });
    }

    // Pagination
    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);

    // Order by creation date (newest first)
    queryBuilder.orderBy('workout.createdAt', 'DESC');

    const [data, total] = await queryBuilder.getManyAndCount();

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number): Promise<Workout> {
    const workout = await this.workoutRepository.findOne({
      where: { id },
      relations: ['segment', 'segment.group', 'segment.group.category'],
    });

    if (!workout) {
      throw new NotFoundException(`Workout with ID ${id} not found`);
    }

    return workout;
  }

  async update(
    id: number,
    updateWorkoutDto: UpdateWorkoutDto,
    videoFile?: Express.Multer.File,
  ): Promise<Workout> {
    const workout = await this.findOne(id);
    const { segmentId, ...workoutData } = updateWorkoutDto;

    // Validate segment if provided
    if (segmentId) {
      const segment = await this.categorySegmentRepository.findOne({
        where: { id: segmentId },
      });

      if (!segment) {
        throw new NotFoundException(`Category segment with ID ${segmentId} not found`);
      }

      workout.segment = segment;
    }

    // Handle video upload
    if (videoFile) {
      // Delete old video if exists
      if (workout.videoPublicId) {
        try {
          await this.cloudinaryService.deleteVideo(workout.videoPublicId);
        } catch {
          this.logger.warn('Failed to delete old video');
        }
      }

      // Upload new video
      try {
        const uploadResult = await this.cloudinaryService.uploadVideo(
          videoFile,
          'workouts/videos',
        );
        workout.videoUrl = uploadResult.secure_url;
        workout.videoPublicId = uploadResult.public_id;
      } catch {
        throw new BadRequestException('Failed to upload video');
      }
    }

    // Update other fields
    Object.assign(workout, workoutData);

    return await this.workoutRepository.save(workout);
  }

  async remove(id: number): Promise<void> {
    const workout = await this.findOne(id);

    // Delete video from Cloudinary if exists
    if (workout.videoPublicId) {
      try {
        await this.cloudinaryService.deleteVideo(workout.videoPublicId);
      } catch {
        this.logger.warn('Failed to delete video from Cloudinary');
      }
    }

    await this.workoutRepository.remove(workout);
  }

  async removeVideo(id: number): Promise<Workout> {
    const workout = await this.findOne(id);

    if (!workout.videoPublicId) {
      throw new BadRequestException('Workout does not have a video');
    }

    // Delete video from Cloudinary
    try {
      await this.cloudinaryService.deleteVideo(workout.videoPublicId);
    } catch {
      throw new BadRequestException('Failed to delete video from Cloudinary');
    }

    // Update workout
    workout.videoUrl = null;
    workout.videoPublicId = null;

    return await this.workoutRepository.save(workout);
  }

  async getBySegmentAndDifficulty(
    segmentId: number,
    difficulty?: string,
  ): Promise<Workout[]> {
    const segment = await this.categorySegmentRepository.findOne({
      where: { id: segmentId },
    });

    if (!segment) {
      throw new NotFoundException(`Category segment with ID ${segmentId} not found`);
    }

    const queryBuilder = this.workoutRepository
      .createQueryBuilder('workout')
      .where('workout.segmentId = :segmentId', { segmentId });

    if (difficulty) {
      queryBuilder.andWhere('workout.difficulty = :difficulty', {
        difficulty,
      });
    }

    queryBuilder.orderBy('workout.createdAt', 'DESC');

    return await queryBuilder.getMany();
  }
}
