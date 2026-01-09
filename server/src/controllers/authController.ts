import dotenv from 'dotenv';

dotenv.config({
   quiet: true,
   override: false,
});

import type { Request, Response, NextFunction } from 'express';

import type { LoginRequestBody } from '../types/interfaces/interfaceAccount.ts';
import type { DeviceInfo, StoredRefreshToken } from '../types/interfaces/interfaceToken.ts';

import AuthService from '../services/authService.ts';
import { AuthError, ValidationError } from '../appError.ts';
import SecurityService from '../services/securityService.ts';
import redisService from '../services/redisService.ts';
import googleClient from '../configs/cfgGoogleClient.ts';

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
            maxAge: result.timeRemember,
            path: '/',
         });

         res.cookie('sessionId', sessionIdToStore, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
            maxAge: result.timeRemember,
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

   loginByGoogle = (req: Request, res: Response, next: NextFunction) => {
      const url = googleClient.generateAuthUrl({
         access_type: 'offline',
         scope: ['profile', 'email'],
         prompt: 'consent',
      });

      res.redirect(url);
   };

   loginByGoogleCallback = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const deviceInfo: DeviceInfo = {
            ipAddress:
               req.ip || (req.headers['x-forwarded-for'] as string)?.split(',')[0] || 'unknown',
            userAgent: req.headers['user-agent'] ?? '',
            sessionId: req.sessionID || '',
         };

         const { code } = req.query;

         const { tokens } = await googleClient.getToken(code as string);
         googleClient.setCredentials(tokens);

         const ticket = await googleClient.verifyIdToken({
            idToken: tokens.id_token!,
            audience: process.env.GOOGLE_CLIENT_ID,
         });

         const payload = ticket.getPayload();

         if (!payload) throw new Error('Invalid Google Payload');

         console.log(JSON.stringify(payload));

         const { email, name, picture, sub: googleId, at_hash } = payload;

         if (!payload.email_verified) {
            throw new AuthError('Email Google chưa được xác thực!');
         }

         const result = await AuthService.loginByGoogle(
            {
               email: email!,
               name: name!,
               picture: picture || '',
               sub: googleId,
               at_hash: at_hash || '',
            },
            deviceInfo
         );

         const sessionIdToStore = result.tokens.sessionId || deviceInfo.sessionId;

         res.cookie('refreshToken', result.tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
            maxAge: result.timeRemember,
            path: '/',
         });

         res.cookie('sessionId', sessionIdToStore, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
            maxAge: result.timeRemember,
            path: '/',
         });

         res.redirect(`/oauth/callback?accessToken=${result.tokens.accessToken}`);
      } catch (err) {
         next(err);
      }
   };
}

class AccountProfileController {
   updatePhoneNumber = async (req: Request, res: Response, next: NextFunction) => {
      try {
         /*
            data: {
               ac_id:
               newPhone:
            }
         */
      } catch (error) {
         next(error);
      }
   };
}

export default AuthController;
