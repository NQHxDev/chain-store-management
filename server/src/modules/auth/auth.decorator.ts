import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UAParser } from 'ua-parser-js';

export const GetSessionId = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
   const request = ctx.switchToHttp().getRequest();

   // eslint-disable-next-line @typescript-eslint/no-unsafe-return
   return request.cookies?.['sessionId'];
});

export const GetDeviceInfo = createParamDecorator((data: string, ctx: ExecutionContext) => {
   const request = ctx.switchToHttp().getRequest();

   const userAgent: string = request.headers['user-agent'] || '';
   // eslint-disable-next-line @typescript-eslint/no-unsafe-call
   const parser = new UAParser(userAgent);
   // eslint-disable-next-line @typescript-eslint/no-unsafe-call
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
