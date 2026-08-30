import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../users/entity/user.entity';
import { PasswordResetEntity } from './entity/reset-password.entity';
import { EmailChangeEntity } from './entity/email-change.entity';
import {
  ConflictException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;

  const mockUser = {
    id: '1',
    email: 'test@example.com',
    password: '$2b$10$hashedpassword',
    firstName: 'Test',
    lastName: 'User',
    isEmailVerified: false,
    emailVerificationToken: null,
    hashedRefreshToken: null,
  };

  const mockUserRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
  };

  const mockPasswordResetRepository = {
    save: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
  };

  const mockEmailChangeRepository = {
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
    verifyAsync: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn(),
  };

  const mockEmailClient = {
    emit: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserRepository,
        },
        {
          provide: getRepositoryToken(PasswordResetEntity),
          useValue: mockPasswordResetRepository,
        },
        {
          provide: getRepositoryToken(EmailChangeEntity),
          useValue: mockEmailChangeRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: 'EMAIL_QUEUE',
          useValue: mockEmailClient,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should login successfully with valid credentials', async () => {
      mockUserRepository.findOne.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);
      mockJwtService.signAsync
        .mockResolvedValueOnce('access_token')
        .mockResolvedValueOnce('refresh_token');
      mockUserRepository.update.mockResolvedValue(undefined);

      const result = await service.login({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(result).toHaveProperty('message', 'Login successful');
      expect(result.data).toHaveProperty('user');
      expect(result.data).toHaveProperty('tokens');
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
    });

    it('should throw UnauthorizedException with invalid email', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(
        service.login({ email: 'invalid@example.com', password: 'password123' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException with invalid password', async () => {
      mockUserRepository.findOne.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);

      await expect(
        service.login({ email: 'test@example.com', password: 'wrongpassword' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed_password' as never);
      mockUserRepository.create.mockReturnValue(mockUser);
      mockUserRepository.save.mockResolvedValue(mockUser);
      mockEmailClient.emit.mockReturnValue(undefined);

      const registerDto = {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: 'Password123!',
      };

      const result = await service.register(registerDto);

      expect(result).toHaveProperty('message', 'User registered successfully');
      expect(result.data.user).toHaveProperty('id');
      expect(mockEmailClient.emit).toHaveBeenCalledWith('email.send', expect.any(Object));
    });

    it('should throw ConflictException if email already exists', async () => {
      mockUserRepository.findOne.mockResolvedValue(mockUser);

      const registerDto = {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: 'Password123!',
      };

      await expect(service.register(registerDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('forgotPassword', () => {
    it('should send OTP for password reset', async () => {
      mockUserRepository.findOne.mockResolvedValue(mockUser);
      mockPasswordResetRepository.save.mockResolvedValue(undefined);
      mockEmailClient.emit.mockReturnValue(undefined);

      const result = await service.forgotPassword({ email: 'test@example.com' });

      expect(result).toHaveProperty(
        'message',
        'If the email exists, a reset OTP has been sent',
      );
      expect(mockEmailClient.emit).toHaveBeenCalled();
    });

    it('should return success message even if email does not exist', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      const result = await service.forgotPassword({ email: 'nonexistent@example.com' });

      expect(result).toHaveProperty(
        'message',
        'If the email exists, a reset OTP has been sent',
      );
      expect(mockEmailClient.emit).not.toHaveBeenCalled();
    });
  });

  describe('refreshTokens', () => {
    it('should refresh tokens successfully', async () => {
      mockJwtService.verifyAsync.mockResolvedValue({ userId: '1', userType: 'user' });
      mockUserRepository.findOne.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);
      mockJwtService.signAsync
        .mockResolvedValueOnce('new_access_token')
        .mockResolvedValueOnce('new_refresh_token');
      mockUserRepository.update.mockResolvedValue(undefined);

      const result = await service.refreshTokens('valid_refresh_token');

      expect(result).toHaveProperty('message', 'Tokens refreshed successfully');
      expect(result.data).toHaveProperty('tokens');
    });

    it('should throw UnauthorizedException with invalid refresh token', async () => {
      mockJwtService.verifyAsync.mockRejectedValue(new Error('Invalid token'));

      await expect(service.refreshTokens('invalid_token')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('logout', () => {
    it('should logout user successfully', async () => {
      mockUserRepository.update.mockResolvedValue(undefined);

      const result = await service.logout('1');

      expect(result).toHaveProperty('message', 'Logged out successfully');
      expect(mockUserRepository.update).toHaveBeenCalledWith('1', {
        hashedRefreshToken: null,
      });
    });
  });

  describe('verifyEmail', () => {
    it('should verify email successfully', async () => {
      const userWithToken = { ...mockUser, emailVerificationToken: 'valid_token' };
      mockUserRepository.findOne.mockResolvedValue(userWithToken);
      mockUserRepository.save.mockResolvedValue(undefined);

      const result = await service.verifyEmail('valid_token');

      expect(result).toHaveProperty(
        'message',
        'Email verified successfully. You can now log in.',
      );
      expect(mockUserRepository.save).toHaveBeenCalled();
    });

    it('should throw BadRequestException with invalid token', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(service.verifyEmail('invalid_token')).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
