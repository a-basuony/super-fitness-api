import { UserEntity } from 'src/modules/users/entity/user.entity';

export interface UserReq extends Request {
  user: UserEntity;
}
