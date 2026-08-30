import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/modules/users/users.service';

describe('AuthGuard', () => {
  it('should be defined', () => {
    const jwtService = {} as JwtService;
    const usersService = {} as UsersService;
    const configService = {} as ConfigService;
    expect(new AuthGuard(jwtService, usersService, configService)).toBeDefined();
  });
});
