import { UserType } from './enums';

export type JwtPayload = {
  userId: string;
  userType: UserType;
};
