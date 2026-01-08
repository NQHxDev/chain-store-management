import type { Request, Response, NextFunction } from 'express';

import type { LoginRequestBody } from '../types/interfaces/interfaceAccount.ts';
import type { DeviceInfo, StoredRefreshToken } from '../types/interfaces/interfaceToken.ts';

import AuthService from '../services/authService.ts';
import { AuthError, ValidationError } from '../appError.ts';
import SecurityService from '../services/securityService.ts';
import redisService from '../services/redisService.ts';

declare global {
   namespace Express {
      interface Request {
         sessionID: string;
      }
   }
}
class AuthController {
   register = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const data = req.body;

         const result = await AuthService.register(data);

         res.status(201).send({
            status: 'success',
            message: 'Tạo tài khoản thành công!',
            data: {
               detail: result.data,
            },
         });
      } catch (error) {
         next(error);
      }
   };

   login = async (req: Request<{}, {}, LoginRequestBody>, res: Response, next: NextFunction) => {
      try {
         const deviceInfo: DeviceInfo = {
            ipAddress:
               req.ip || (req.headers['x-forwarded-for'] as string)?.split(',')[0] || 'unknown',
            userAgent: req.headers['user-agent'] ?? '',
            sessionId: req.sessionID || '',
         };

         const result = await AuthService.login(req.body, deviceInfo);
         const sessionIdToStore = result.tokens.sessionId || deviceInfo.sessionId;

         res.cookie('refreshToken', result.tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
            maxAge: result.timeRememberSession,
            path: '/',
         });

         res.cookie('sessionId', sessionIdToStore, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
            maxAge: result.timeRememberSession,
            path: '/',
         });

         res.status(200).send({
            status: 'success',
            message: 'Đăng nhập thành công!',
            data: {
               account: result.account,
               tokens: {
                  accessToken: result.tokens.accessToken,
               },
            },
         });
      } catch (error) {
         next(error);
      }
   };

   logout = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const sessionId = req.cookies.sessionId;
         const authHeader = req.headers.authorization;

         if (sessionId) {
            const sessionKey = `refresh_token:${sessionId}`;
            const storedSession = await redisService.get<StoredRefreshToken>(sessionKey);

            if (storedSession) {
               // Xóa khỏi user sessions
               const userSessionsKey = `user_sessions:${storedSession.userId}`;
               await redisService.srem(userSessionsKey, sessionId);
            }

            // Xóa refresh token
            await redisService.del(sessionKey);
         }

         if (authHeader && authHeader.startsWith('Bearer ')) {
            const accessToken = authHeader.substring(7);
            await SecurityService.blacklistAccessToken(accessToken);
         }

         // Xóa cookies
         res.clearCookie('sessionId', {
            path: '/',
         });

         res.clearCookie('refreshToken', {
            path: '/',
         });

         res.status(200).send({
            status: 'success',
            message: 'Đăng xuất thành công',
         });
      } catch (error) {
         next(error);
      }
   };

   refreshToken = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const refreshToken = req.cookies.refreshToken;

         if (!refreshToken) {
            return res.sendStatus(204);
         }

         const sessionId = req.cookies.sessionId;

         if (!refreshToken) {
            throw new AuthError('Không tìm thấy refreshToken');
         }

         if (!sessionId) {
            throw new AuthError('Không tìm thấy sessionId');
         }

         const deviceInfo: DeviceInfo = {
            ipAddress: req.ip ?? '',
            userAgent: req.headers['user-agent'] ?? '',
            sessionId: sessionId || '',
         };

         const result = await AuthService.refreshToken(refreshToken, deviceInfo);

         if (!result) {
            return res.sendStatus(204);
         }

         res.cookie('refreshToken', result.tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/',
         });

         res.cookie('sessionId', deviceInfo.sessionId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/',
         });

         res.status(201).send({
            status: 'success',
            message: 'Refresh token thành công',
            data: {
               accessToken: result.tokens.accessToken,
               account: {
                  id: result.user.id,
                  username: result.user.username,
                  email: result.user.email,
                  roles: result.user.role,
               },
            },
         });
      } catch (error) {
         next(error);
      }
   };

   checkIdentifier = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const { identifier } = req.query;

         if (!identifier || typeof identifier !== 'string') {
            throw new ValidationError('Tài khoản không hợp lệ!');
         }
         const result = await AuthService.checkIdentifier(identifier);

         res.status(200).send({
            available: !result,
         });
      } catch (error) {
         next(error);
      }
   };
}

export default AuthController;
