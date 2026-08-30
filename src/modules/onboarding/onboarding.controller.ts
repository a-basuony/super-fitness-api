import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiConsumes,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { OnboardingService } from './onboarding.service';
import { CreateOnboardingDto } from './dto/create-onboarding.dto';
import { UpdateOnboardingDto } from './dto/update-onboarding.dto';
import { createImageValidation } from 'src/common/pipes/file-validation.pipe';
import { AuthGuard } from 'src/common/services/guards/auth/auth.guard';
import { RolesGuard } from 'src/common/services/guards/auth/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserType } from '../../common/utils/enums';

@ApiTags('Onboarding')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('onboarding')
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  @Get()
  @Roles(UserType.USER, UserType.ADMIN)
  @ApiOperation({ summary: 'Get all onboarding items.' })
  @ApiResponse({ status: 200, description: 'Returns a list of onboarding items.' })
  async findAll() {
    return this.onboardingService.findAll();
  }

  @Post()
  @Roles(UserType.ADMIN)
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create a new onboarding item.' })
  @ApiResponse({
    status: 201,
    description: 'Onboarding item created successfully.',
  })
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() dto: CreateOnboardingDto,
    @UploadedFile(createImageValidation({})) file: Express.Multer.File,
  ) {
    const data = await this.onboardingService.create(dto, file);
    return {
      message: 'Onboarding item created successfully',
      data,
    };
  }

  @Patch(':id')
  @Roles(UserType.ADMIN)
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update an existing onboarding item.' })
  @ApiParam({ name: 'id', description: 'Onboarding item ID' })
  @ApiResponse({
    status: 200,
    description: 'Onboarding item updated successfully.',
  })
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateOnboardingDto,
    @UploadedFile(createImageValidation({ required: false }))
    file?: Express.Multer.File,
  ) {
    const data = await this.onboardingService.update(id, dto, file);
    return {
      message: 'Onboarding item updated successfully',
      data,
    };
  }

  @Delete(':id')
  @Roles(UserType.ADMIN)
  @ApiOperation({ summary: 'Delete an onboarding item.' })
  @ApiParam({ name: 'id', description: 'Onboarding item ID' })
  @ApiResponse({
    status: 200,
    description: 'Onboarding item deleted successfully.',
  })
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    await this.onboardingService.delete(id);
    return { message: 'Onboarding item deleted successfully' };
  }
}
