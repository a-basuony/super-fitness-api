import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OnboardingEntity } from './entity/onboarding.entity';
import { CreateOnboardingDto } from './dto/create-onboarding.dto';
import { UpdateOnboardingDto } from './dto/update-onboarding.dto';
import { CloudinaryService } from '../../common/services/cloudinary.service';

@Injectable()
export class OnboardingService {
  constructor(
    @InjectRepository(OnboardingEntity)
    private readonly onboardingRepository: Repository<OnboardingEntity>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async findAll() {
    return this.onboardingRepository.find({
      where: { is_active: true },
      order: { order_index: 'ASC' },
    });
  }

  async findOne(id: string) {
    const item = await this.onboardingRepository.findOne({
      where: { id },
    });

    if (!item) {
      throw new NotFoundException('Onboarding item not found');
    }

    return item;
  }

  async create(dto: CreateOnboardingDto, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Image file is required');
    }

    const { secure_url, public_id } = await this.cloudinaryService.uploadImage(
      file,
      'onboarding',
    );

    const order_index = await this.resolveOrderIndex(dto.order_index);

    const entity = this.onboardingRepository.create({
      ...dto,
      secure_url,
      public_id,
      order_index,
      is_active: dto.is_active ?? true,
    });

    return this.onboardingRepository.save(entity);
  }

  async update(id: string, dto: UpdateOnboardingDto, file?: Express.Multer.File) {
    const existing = await this.findOne(id);

    if (file) {
      await this.cloudinaryService.deleteImage(existing.public_id);

      const uploaded = await this.cloudinaryService.uploadImage(file, 'onboarding');

      existing.secure_url = uploaded.secure_url;
      existing.public_id = uploaded.public_id;
    }

    if (
      dto.order_index !== undefined &&
      dto.order_index !== null &&
      dto.order_index !== existing.order_index
    ) {
      existing.order_index = await this.resolveOrderIndex(dto.order_index);
    }

    Object.assign(existing, dto);

    return this.onboardingRepository.save(existing);
  }

  async delete(id: string) {
    const existing = await this.findOne(id);

    await this.cloudinaryService.deleteImage(existing.public_id);

    await this.onboardingRepository.delete(id);
  }

  private async resolveOrderIndex(order_index?: number): Promise<number> {
    if (!order_index) {
      const count = await this.onboardingRepository.count();
      return count + 1;
    }

    const exists = await this.onboardingRepository.findOne({
      where: { order_index },
    });
    if (!exists) return order_index;

    const count = await this.onboardingRepository.count();
    return count + 1;
  }
}
