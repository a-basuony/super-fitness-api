import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { GoalType, PhysicalActivityLevel, GenderType } from '../../common/utils/enums';

describe('UsersService', () => {
  let service: UsersService;

  const mockUser = {
    id: '1',
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    password: '$2b$10$hashedpassword',
    isEmailVerified: true,
    type: 'user',
  };

  const mockUserRepository = {
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getProfile', () => {
    it('should return user profile', async () => {
      mockUserRepository.findOneBy.mockResolvedValue(mockUser);

      const result = await service.getProfile('1');

      expect(result).toEqual(mockUser);
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ id: '1' });
    });

    it('should throw NotFoundException if user not found', async () => {
      mockUserRepository.findOneBy.mockResolvedValue(null);

      await expect(service.getProfile('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateProfile', () => {
    it('should update user profile successfully', async () => {
      mockUserRepository.findOneBy.mockResolvedValue(mockUser);
      mockUserRepository.save.mockResolvedValue({ ...mockUser, firstName: 'Updated' });

      const updateProfileDto = { firstName: 'Updated' };
      const result = await service.updateProfile('1', updateProfileDto);

      expect(result.firstName).toBe('Updated');
      expect(mockUserRepository.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException if user not found', async () => {
      mockUserRepository.findOneBy.mockResolvedValue(null);

      await expect(service.updateProfile('1', { firstName: 'Updated' })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('changePassword', () => {
    it('should change password successfully', async () => {
      mockUserRepository.findOneBy.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('new_hashed_password' as never);
      mockUserRepository.save.mockResolvedValue({
        ...mockUser,
        password: 'new_hashed_password',
      });

      const changePasswordDto = {
        oldPassword: 'currentPassword',
        newPassword: 'NewPassword123!',
      };

      const result = await service.changePassword('1', changePasswordDto);

      expect(result).toHaveProperty('message', 'Password changed successfully');
      expect(mockUserRepository.save).toHaveBeenCalled();
    });

    it('should throw BadRequestException with incorrect current password', async () => {
      mockUserRepository.findOneBy.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);

      const changePasswordDto = {
        oldPassword: 'currentPassword',
        newPassword: 'NewPassword123!',
      };

      await expect(service.changePassword('1', changePasswordDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw NotFoundException if user not found', async () => {
      mockUserRepository.findOneBy.mockResolvedValue(null);

      const changePasswordDto = {
        oldPassword: 'currentPassword',
        newPassword: 'NewPassword123!',
      };

      await expect(service.changePassword('1', changePasswordDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('completeStepOne', () => {
    it('should update personal info successfully', async () => {
      mockUserRepository.findOneBy.mockResolvedValue(mockUser);
      mockUserRepository.save.mockResolvedValue({ ...mockUser, currentStep: 1 });

      const updatePersonalInfoDto = { gender: GenderType.MALE, age: 25 };
      const result = await service.completeStepOne('1', updatePersonalInfoDto);

      expect(result.currentStep).toBe(1);
      expect(mockUserRepository.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException if user not found', async () => {
      mockUserRepository.findOneBy.mockResolvedValue(null);

      await expect(
        service.completeStepOne('1', { gender: GenderType.MALE, age: 25 }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('completeStepTwo', () => {
    it('should update body info successfully', async () => {
      mockUserRepository.findOneBy.mockResolvedValue(mockUser);
      mockUserRepository.save.mockResolvedValue({ ...mockUser, currentStep: 2 });

      const updateBodyInfoDto = { height: 180, weight: 75 };
      const result = await service.completeStepTwo('1', updateBodyInfoDto);

      expect(result.height).toBe(180);
      expect(mockUserRepository.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException if user not found', async () => {
      mockUserRepository.findOneBy.mockResolvedValue(null);

      await expect(
        service.completeStepTwo('1', { height: 180, weight: 75 }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('completeStepThree', () => {
    it('should update fitness goals successfully', async () => {
      mockUserRepository.findOneBy.mockResolvedValue(mockUser);
      mockUserRepository.save.mockResolvedValue({
        ...mockUser,
        goal: GoalType.WEIGHT_LOSS,
        physicalActivityLevel: PhysicalActivityLevel.BEGINNER,
      });

      const updateFitnessGoalsDto = {
        goal: GoalType.WEIGHT_LOSS,
        physicalActivityLevel: PhysicalActivityLevel.BEGINNER,
      };
      const result = await service.completeStepThree('1', updateFitnessGoalsDto);

      expect(result.goal).toBe(GoalType.WEIGHT_LOSS);
      expect(mockUserRepository.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException if user not found', async () => {
      mockUserRepository.findOneBy.mockResolvedValue(null);

      await expect(
        service.completeStepThree('1', {
          goal: GoalType.WEIGHT_LOSS,
          physicalActivityLevel: PhysicalActivityLevel.ROOKIE,
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      mockUserRepository.find.mockResolvedValue([mockUser]);

      const result = await service.findAll();

      expect(result).toEqual([mockUser]);
      expect(mockUserRepository.find).toHaveBeenCalled();
    });
  });
});
