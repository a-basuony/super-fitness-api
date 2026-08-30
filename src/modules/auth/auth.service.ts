import {
  Injectable,
  Inject,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from '../users/entity/user.entity';
import { PasswordResetEntity } from './entity/reset-password.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { VerifyResetCodeDto } from './dto/verify-reset-code.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from '../../common/utils/types';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { generateOtp } from 'src/common/utils/otp.util';
import { ClientProxy } from '@nestjs/microservices';
import { RegisterDto } from './dto/register.dto';
import * as crypto from 'crypto';

import { EmailChangeEntity } from './entity/email-change.entity';
import { RequestEmailChangeDto } from './dto/request-email-change.dto';
import { VerifyEmailChangeDto } from './dto/verify-email-change.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(PasswordResetEntity)
    private readonly passwordResetRepository: Repository<PasswordResetEntity>,

    @InjectRepository(EmailChangeEntity)
    private readonly emailChangeRepository: Repository<EmailChangeEntity>,

    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject('EMAIL_QUEUE') private readonly emailClient: ClientProxy,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const tokens = await this.createTokens({
      userId: user.id,
      userType: user.type,
    });

    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      message: 'Login successful',
      data: {
        user,
        tokens,
      },
    };
  }

  private async createTokens(
    payload: JwtPayload,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: 900,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: 604800,
    });

    return { accessToken, refreshToken };
  }

  private async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    return this.userRepository.update(userId, {
      hashedRefreshToken,
    });
  }

  async logout(userId: string) {
    await this.userRepository.update(userId, {
      hashedRefreshToken: null,
    });

    return {
      message: 'Logged out successfully',
    };
  }

  async refreshTokens(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      const user = await this.userRepository.findOne({ where: { id: payload.userId } });

      if (!user || !user.hashedRefreshToken) {
        throw new UnauthorizedException('Access Denied');
      }

      const refreshTokenMatches = await bcrypt.compare(
        refreshToken,
        user.hashedRefreshToken,
      );

      if (!refreshTokenMatches) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const tokens = await this.createTokens({
        userId: user.id,
        userType: user.type,
      });

      await this.updateRefreshToken(user.id, tokens.refreshToken);

      return {
        message: 'Tokens refreshed successfully',
        data: { tokens },
      };
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;

    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      return {
        message: 'If the email exists, a reset OTP has been sent',
      };
    }

    const otp = generateOtp(6);

    await this.invalidatePreviousOtps(user.id);

    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15);

    await this.passwordResetRepository.save({
      otp,
      expiresAt,
      user,
    });

    this.emailClient.emit('email.send', {
      to: user.email,
      subject: 'Password Reset OTP',
      template: 'forgot-password',
      context: {
        firstName: user.firstName,
        otp,
      },
    });

    return {
      message: 'If the email exists, a reset OTP has been sent',
    };
  }

  async verifyResetCode(verifyResetCodeDto: VerifyResetCodeDto) {
    const { otp, email } = verifyResetCodeDto;

    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new BadRequestException('Invalid email or OTP');
    }

    const passwordReset = await this.passwordResetRepository.findOne({
      where: {
        user: { id: user.id },
        otp,
        isUsed: false,
      },
    });

    if (!passwordReset) {
      throw new BadRequestException('Invalid or expired OTP');
    }

    const now = new Date();
    if (passwordReset.expiresAt < now) {
      throw new BadRequestException('OTP has expired');
    }

    return {
      message: 'OTP verified successfully',
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { email, otp, newPassword } = resetPasswordDto;

    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new BadRequestException('Invalid email or OTP');
    }

    const passwordReset = await this.passwordResetRepository.findOne({
      where: {
        user: { id: user.id },
        otp,
        isUsed: false,
      },
    });

    if (!passwordReset) {
      throw new BadRequestException('Invalid or expired OTP');
    }

    const now = new Date();
    if (passwordReset.expiresAt < now) {
      throw new BadRequestException('OTP has expired');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    passwordReset.isUsed = true;
    passwordReset.usedAt = new Date();
    await this.passwordResetRepository.save(passwordReset);

    await this.userRepository.update(user.id, {
      password: hashedPassword,
      hashedRefreshToken: null,
    });

    return {
      message: 'Password reset successfully',
    };
  }

  async requestEmailChange(userId: string, dto: RequestEmailChangeDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const normalizedNewEmail = dto.newEmail.trim().toLowerCase();

    if (normalizedNewEmail === user.email.toLowerCase()) {
      throw new BadRequestException('New email must be different from current email');
    }

    const existingUser = await this.userRepository.findOne({
      where: { email: normalizedNewEmail },
    });

    if (existingUser) {
      throw new ConflictException('Email is already in use');
    }

    // Invalidate old pending email-change requests
    const previousRequests = await this.emailChangeRepository.find({
      where: {
        user: { id: userId },
        isUsed: false,
      },
      relations: ['user'],
    });

    if (previousRequests.length > 0) {
      for (const request of previousRequests) {
        request.isUsed = true;
        request.usedAt = new Date();
      }

      await this.emailChangeRepository.save(previousRequests);
    }

    const otp = generateOtp(6);

    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);

    const emailChangeRequest = this.emailChangeRepository.create({
      newEmail: normalizedNewEmail,
      otp,
      expiresAt,
      isUsed: false,
      usedAt: null,
      user,
    });

    await this.emailChangeRepository.save(emailChangeRequest);

    this.emailClient.emit('email.send', {
      to: normalizedNewEmail,
      subject: 'Confirm your new email address',
      template: 'change-email',
      context: {
        firstName: user.firstName,
        otp,
      },
    });

    return {
      message: 'Verification OTP sent to the new email address',
    };
  }

  async verifyEmailChange(userId: string, dto: VerifyEmailChangeDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const emailChangeRequest = await this.emailChangeRepository.findOne({
      where: {
        user: { id: userId },
        otp: dto.otp,
        isUsed: false,
      },
      relations: ['user'],
      order: {
        expiresAt: 'DESC',
      },
    });

    if (!emailChangeRequest) {
      throw new BadRequestException('Invalid or already used OTP');
    }

    if (emailChangeRequest.expiresAt < new Date()) {
      throw new BadRequestException('OTP has expired');
    }

    const existingUser = await this.userRepository.findOne({
      where: {
        email: emailChangeRequest.newEmail,
      },
    });

    if (existingUser && existingUser.id !== user.id) {
      throw new ConflictException('Email is already in use');
    }

    user.email = emailChangeRequest.newEmail;
    user.isEmailVerified = true;
    user.hashedRefreshToken = null;

    await this.userRepository.save(user);

    emailChangeRequest.isUsed = true;
    emailChangeRequest.usedAt = new Date();

    await this.emailChangeRepository.save(emailChangeRequest);

    return {
      message: 'Email updated successfully',
      data: {
        email: user.email,
      },
    };
  }

  private async invalidatePreviousOtps(userId: string) {
    await this.passwordResetRepository.update(
      { user: { id: userId }, isUsed: false },
      { isUsed: true },
    );
  }

  async register(registerDto: RegisterDto) {
    const { firstName, lastName, email, password } = registerDto;
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');

    const newUser = this.userRepository.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      emailVerificationToken: verificationToken,
    });

    const savedUser = await this.userRepository.save(newUser);

    this.emailClient.emit('email.send', {
      to: savedUser.email,
      subject: 'Welcome to FTNS!',
      template: 'welcome',
      context: {
        firstName: savedUser.firstName,
      },
    });

    const verificationLink = `${this.configService.get<string>('APP_URL')}/auth/verify-email?token=${verificationToken}`;
    this.emailClient.emit('email.send', {
      to: savedUser.email,
      subject: 'Verify your email address',
      template: 'verify-email',
      context: {
        firstName: savedUser.firstName,
        verificationLink,
      },
    });

    return {
      message: 'User registered successfully',
      data: {
        user: {
          id: savedUser.id,
          firstName: savedUser.firstName,
          lastName: savedUser.lastName,
          email: savedUser.email,
          type: savedUser.type,
        },
      },
    };
  }

  async verifyEmail(token: string) {
    const user = await this.userRepository.findOne({
      where: { emailVerificationToken: token },
    });

    if (!user) {
      throw new BadRequestException('Invalid or expired verification token');
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = null;
    await this.userRepository.save(user);

    return {
      message: 'Email verified successfully. You can now log in.',
    };
  }
}
