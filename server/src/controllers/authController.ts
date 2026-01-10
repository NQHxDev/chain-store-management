import dotenv from 'dotenv';

dotenv.config({
   quiet: true,
   override: false,
});

import { uuidv7 } from 'uuidv7';
import type { Request, Response, NextFunction } from 'express';

import type { AuthRequest, LoginRequestBody } from '@/types/interfaces/interfaceAccount';
import type { DeviceInfo, StoredRefreshToken } from '@/types/interfaces/interfaceToken';

import AuthService from '@/services/auth/authService';
import { AuthError, ValidationError } from '@/appError';
import SecurityService from '@/services/auth/securityService';
import redisService from '@/services/redisService';
import googleClient from '@/configs/cfgGoogleClient';
import { CookieUtil } from '@/utils/cookieUtil';
import ProfileService from '@/services/auth/profileService';

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
         const deviceInfo: DeviceInfo = {
            ipAddress: req.ip ?? 'unknown',
            userAgent: req.headers['user-agent'] ?? '',
            sessionId: req.sessionID ?? uuidv7(),
         };

         const result = await AuthService.register(req.body, deviceInfo);

         if (result.tokens) {
            CookieUtil.setAuthCookies(res, {
               refreshToken: result.tokens.refreshToken,
               sessionId: deviceInfo.sessionId!,
               timeRemember: result.timeRemember,
            });
         }

         res.status(201).json({
            status: 'success',
            message: 'Đăng ký thành công!',
            data: result,
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

         CookieUtil.setAuthCookies(res, {
            refreshToken: result.tokens.refreshToken,
            sessionId: deviceInfo.sessionId!,
            timeRemember: result.timeRemember,
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
         CookieUtil.clearAuthCookies(res);

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

         CookieUtil.setAuthCookies(res, {
            refreshToken: result.tokens.refreshToken,
            sessionId: deviceInfo.sessionId!,
            timeRemember: 24 * 60 * 60 * 1000,
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

         CookieUtil.setAuthCookies(res, {
            refreshToken: result.tokens.refreshToken,
            sessionId: deviceInfo.sessionId!,
            timeRemember: result.timeRemember,
         });

         res.redirect(`/oauth/callback?accessToken=${result.tokens.accessToken}`);
      } catch (err) {
         next(err);
      }
   };
}

export class ProfileController {
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

   getProfileMe = async (req: AuthRequest, res: Response, next: NextFunction) => {
      try {
         const userId = req.user!.userId;

         const profile = await ProfileService.getProfileMe(userId);

         res.json({
            success: true,
            data: profile,
         });
      } catch (err) {
         next(err);
      }
   };
}

export default AuthController;
