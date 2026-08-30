import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request = ctx
    .switchToHttp()
    .getRequest<import('../interface/userreq.interface').UserReq>();
  const user = request.user as unknown as Record<string, unknown>;

  return data ? user?.[data] : user;
});
