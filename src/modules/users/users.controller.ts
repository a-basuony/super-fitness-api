import { Body, Controller, Get, Patch, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdatePersonalInfoDto } from './dto/update.personalinfo.dto';
import { ApiBearerAuth, ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UpdateBodyInfoDto } from './dto/update.body.info.dto';
import { UpdateFitnessGoalsDto } from './dto/update.fitness.goals.dto';
import { AuthGuard } from 'src/common/services/guards/auth/auth.guard';
import { UserReq } from 'src/common/interface/userreq.interface';
import { UserEntity } from './entity/user.entity';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { RolesGuard } from 'src/common/services/guards/auth/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserType } from '../../common/utils/enums';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiOkResponse({ description: 'Returns user profile', type: UserEntity })
  async getProfile(@Request() req: UserReq) {
    return await this.usersService.getProfile(req.user.id);
  }

  @Patch('profile')
  @ApiOperation({ summary: 'Update user profile' })
  @ApiOkResponse({ description: 'Profile successfully updated', type: UserEntity })
  async updateProfile(@Request() req: UserReq, @Body() dto: UpdateProfileDto) {
    return await this.usersService.updateProfile(req.user.id, dto);
  }

  @ApiOperation({ summary: 'update personal info' })
  @ApiOkResponse({
    description: 'personal info successfully updated',
    type: UserEntity,
  })
  @Patch('personal-info')
  async stepOne(@Request() req: UserReq, @Body() dto: UpdatePersonalInfoDto) {
    return await this.usersService.completeStepOne(req.user.id, dto);
  }
  @ApiOperation({ summary: 'update body info' })
  @ApiOkResponse({
    description: 'body info successfully updated',
    type: UserEntity,
  })
  @Patch('body-info')
  async StepTwo(@Request() req: UserReq, @Body() dto: UpdateBodyInfoDto) {
    return await this.usersService.completeStepTwo(req.user.id, dto);
  }

  @Patch('fitness-goals')
  @ApiOperation({ summary: 'update fitness goals' })
  @ApiOkResponse({
    description: 'fitness goals successfully updated',
    type: UserEntity,
  })
  async stepThree(@Request() req: UserReq, @Body() dto: UpdateFitnessGoalsDto) {
    return await this.usersService.completeStepThree(req.user.id, dto);
  }
  @Get()
  @Roles(UserType.ADMIN)
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ description: 'Returns list of users', type: [UserEntity] })
  async findAll() {
    return await this.usersService.findAll();
  }

  @Patch('change-password')
  @ApiOperation({ summary: 'Change user password' })
  @ApiOkResponse({ description: 'Password changed successfully' })
  async changePassword(@Request() req: UserReq, @Body() dto: ChangePasswordDto) {
    return await this.usersService.changePassword(req.user.id, dto);
  }
}
