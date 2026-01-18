import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UAParser } from 'ua-parser-js';

const getCookie = (ctx: ExecutionContext, key: string) => {
   const request = ctx.switchToHttp().getRequest();
   // eslint-disable-next-line @typescript-eslint/no-unsafe-return
   return request.cookies?.[key];
};

export const GetSessionId = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
   return getCookie(ctx, 'sessionId') as string;
});

export const GetRefreshToken = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
   return getCookie(ctx, 'refreshToken') as string;
});

export const GetAccessToken = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
   return getCookie(ctx, 'accessToken') as string;
});

export const GetTokenPayload = createParamDecorator(
   (data: string | undefined, ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest();
      const tokenPayload = request.tokenPayload;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return data ? tokenPayload?.[data] : tokenPayload;
   }
);

export const GetDeviceInfo = createParamDecorator((data: string, ctx: ExecutionContext) => {
   const request = ctx.switchToHttp().getRequest();

   const userAgent: string = request.headers['user-agent'] || '';

   const parser = new UAParser(userAgent);
   const result = parser.getResult();

   const ip = request.headers['x-forwarded-for'] || request.socket.remoteAddress || '127.0.0.1';
   const deviceInfo = {
      ip: ip,
      ua: result.browser.name
         ? `${result.browser.name}/${result.os.name}`
         : userAgent || 'Unknown/Unknown',
      device: result.device.type || 'Desktop',
   };

   // eslint-disable-next-line @typescript-eslint/no-unsafe-return
   return data ? deviceInfo?.[data] : deviceInfo;
});
