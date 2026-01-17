import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator((data: string | undefined, ctx: ExecutionContext) => {
   const request = ctx.switchToHttp().getRequest();
   const user = request.user;

   // Nếu truyền @GetUser('userId') thì lấy đúng trường đó,
   // còn @GetUser() thì lấy cả object user

   // eslint-disable-next-line @typescript-eslint/no-unsafe-return
   return data ? user?.[data] : user;
});
