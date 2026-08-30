import { PartialType } from '@nestjs/swagger';
import { CreateCategorySegmentDto } from './create-category-segment.dto';

export class UpdateCategorySegmentDto extends PartialType(CreateCategorySegmentDto) {}
