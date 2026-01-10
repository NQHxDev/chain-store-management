import { SetAuthCookieParams } from '@/types/interfaces/interfaceToken';
import { Response } from 'express';
import { authCookieOptions, clearCookieOptions } from '@/configs/cfgCookie';

export class CookieUtil {
   static setAuthCookies(res: Response, data: SetAuthCookieParams) {
      res.cookie('refreshToken', data.refreshToken, authCookieOptions(data.timeRemember));
      res.cookie('sessionId', data.sessionId, authCookieOptions(data.timeRemember));
   }

   static clearAuthCookies(res: Response) {
      res.clearCookie('refreshToken', clearCookieOptions());
      res.clearCookie('sessionId', clearCookieOptions());
   }
}
