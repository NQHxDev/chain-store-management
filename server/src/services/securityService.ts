import jwt from 'jsonwebtoken';
import { uuidv7 } from 'uuidv7';
import crypto from 'crypto';

import redisService from './redisService';
import type {
   TokenPayload,
   TokenPair,
   StoredRefreshToken,
   DeviceInfo,
   TokenValidationResult,
   RefreshResult,
} from '../types/interfaces/interfaceToken.ts';
import { AppError, ValidationError } from '@/appError';
import AccountRepository from '@/repositories/repoAccount';

class SecurityService {
   private static readonly ACCESS_TOKEN_SECRET =
      process.env.ACCESS_TOKEN_SECRET ||
      '1ba334774c081349a2b0edfb314094cc726b07d72b760d926b29ca54ae66e23d';

   private static readonly ACCESS_TOKEN_EXPIRY = '15m';
   private static readonly REFRESH_TOKEN_EXPIRY = 7 * 24 * 60 * 60;

   private static readonly REDIS_PREFIX = {
      REFRESH_TOKEN: 'refresh_token',
      BLACKLIST_TOKEN: 'blacklist_token',
      RATE_LIMIT: 'rate_limit',
   };

   /**
    * Tạo cặp Access Token và Refresh Token
    */
   static async createTokenPair(
      payload: TokenPayload,
      deviceInfo: DeviceInfo,
      options?: { reuseSessionId?: boolean; useProvidedSessionId?: boolean }
   ): Promise<TokenPair> {
      let sessionId: string;

      if (options?.reuseSessionId) {
         if (!payload.sessionId) {
            throw new AppError(500, 'SessionId is required when reuseSessionId = true');
         }
         sessionId = payload.sessionId;
      } else if (options?.useProvidedSessionId && deviceInfo.sessionId) {
         sessionId = deviceInfo.sessionId;
      } else {
         sessionId = uuidv7();
      }

      const tokenPayload: TokenPayload = {
         ...payload,
         sessionId,
      };

      const accessToken = jwt.sign(tokenPayload, this.ACCESS_TOKEN_SECRET, {
         expiresIn: this.ACCESS_TOKEN_EXPIRY,
         algorithm: 'HS256',
      });

      const refreshToken = crypto.randomBytes(64).toString('hex');

      await this.storeRefreshToken(refreshToken, payload.userId, sessionId, deviceInfo);

      return { accessToken, refreshToken, expiresIn: 15 * 60, sessionId };
   }

   /**
    * Lưu Refresh Token vào Redis
    */
   private static async storeRefreshToken(
      refreshToken: string,
      userId: string | number,
      sessionId: string,
      deviceInfo: DeviceInfo
   ): Promise<void> {
      const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');

      const sessionKey = `refresh_token:${sessionId}`;
      const userSessionsKey = `user_sessions:${userId}`;

      await redisService.set(
         sessionKey,
         {
            tokenHash,
            userId,
            deviceInfo,
         },
         this.REFRESH_TOKEN_EXPIRY
      );
      await redisService.sadd(userSessionsKey, sessionId);
      await this.cleanupOldSessions(userId.toString());
   }

   /**
    * Giới hạn số lượng session cho mỗi user
    */
   private static async cleanupOldSessions(userId: string): Promise<void> {
      const key = `user_sessions:${userId}`;
      const sessions = await redisService.smembers(key);

      if (sessions.length <= 5) return;

      const sessionsToRemove = sessions.slice(0, sessions.length - 5);

      for (const sessionId of sessionsToRemove) {
         await redisService.del(`refresh_token:${sessionId}`);
         await redisService.srem(key, sessionId);
      }
   }

   /**
    * Xác thực Access Token
    */
   static async verifyAccessToken(token: string): Promise<TokenValidationResult> {
      try {
         // Kiểm tra token có trong blacklist không
         const isBlacklisted = await this.isTokenBlacklisted(token);
         if (isBlacklisted) {
            return {
               isValid: false,
               error: 'Token đã bị thu hồi',
            };
         }

         // Xác thực token
         const payload = jwt.verify(token, this.ACCESS_TOKEN_SECRET, {
            algorithms: ['HS256'],
         }) as TokenPayload;

         return {
            isValid: true,
            payload,
         };
      } catch (error) {
         console.error('Verify access token error:', error);

         if (error instanceof jwt.TokenExpiredError) {
            return {
               isValid: false,
               error: 'Token đã hết hạn',
            };
         }

         if (error instanceof jwt.JsonWebTokenError) {
            return {
               isValid: false,
               error: 'Token không hợp lệ',
            };
         }

         return {
            isValid: false,
            error: 'Lỗi xác thực token',
         };
      }
   }

   /**
    * Làm mới Access Token bằng Refresh Token
    */
   static async refreshToken(
      refreshToken: string,
      deviceInfo: DeviceInfo
   ): Promise<RefreshResult | null> {
      const { sessionId } = deviceInfo;

      if (!sessionId) {
         throw new AppError(400, 'SessionId is required');
      }

      const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
      const sessionKey = `refresh_token:${sessionId}`;
      const stored = await redisService.get<StoredRefreshToken>(sessionKey);

      if (!stored) {
         return null;
      }
      if (stored.tokenHash !== tokenHash) {
         await this.revokeAllUserSessions(stored.userId);
         return null;
      }

      const user = await this.getUserInfo(stored.userId);
      if (!user) {
         return null;
      }

      const payload: TokenPayload = {
         userId: user.id,
         username: user.username,
         email: user.email,
         role: user.role,
         sessionId,
      };

      // Rotate refresh token
      await this.revokeRefreshToken(sessionId);

      const tokens = await this.createTokenPair(payload, deviceInfo, {
         reuseSessionId: true,
      });

      return {
         tokens,
         user,
      };
   }

   /**
    * Thu hồi Refresh Token
    */
   static async revokeRefreshToken(sessionId: string): Promise<void> {
      const sessionKey = `refresh_token:${sessionId}`;
      const session = await redisService.get<StoredRefreshToken>(sessionKey);

      if (session) {
         const userSessionsKey = `user_sessions:${session.userId}`;
         await redisService.srem(userSessionsKey, sessionId);
      }

      await redisService.del(sessionKey);
   }

   /**
    * Thu hồi tất cả sessions của user
    */
   static async revokeAllUserSessions(userId: string | number): Promise<void> {
      const key = `user_sessions:${userId}`;
      const sessions = await redisService.smembers(key);

      for (const sessionId of sessions) {
         await redisService.del(`refresh_token:${sessionId}`);
      }

      await redisService.del(key);
   }

   /**
    * Blacklist Access Token
    * Khi người dùng đã Logout hoặc Reset Pass
    */
   static async blacklistAccessToken(token: string, expiresIn: number = 15 * 60): Promise<void> {
      try {
         const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

         const blacklistKey = `${this.REDIS_PREFIX.BLACKLIST_TOKEN}:${tokenHash}`;

         await redisService.set(
            blacklistKey,
            { blacklistedAt: new Date().toISOString() },
            expiresIn
         );
      } catch (error) {
         console.error('Blacklist access token error:', error);
      }
   }

   /**
    * Kiểm tra token có bị blacklist không
    */
   private static async isTokenBlacklisted(token: string): Promise<boolean> {
      try {
         const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

         const blacklistKey = `${this.REDIS_PREFIX.BLACKLIST_TOKEN}:${tokenHash}`;
         const exists = await redisService.exists(blacklistKey);

         return exists;
      } catch (error) {
         console.error('Check token blacklist error:', error);
         return false;
      }
   }

   /**
    * Lấy thông tin user
    */
   static async getUserInfo(userId: string | number): Promise<any> {
      const repoAccount = new AccountRepository();
      const result = await repoAccount.getInfoAccountByID(userId);
      if (!result) {
         throw new ValidationError('ID người dùng không tồn tại!');
      }
      const { infoAccount, role_account } = result;

      return {
         id: userId,
         username: infoAccount.username,
         email: infoAccount.email,
         role: role_account,
      };
   }
}

export default SecurityService;
