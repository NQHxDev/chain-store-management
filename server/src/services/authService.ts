import bcrypt from 'bcrypt';
import { uuidv7 } from 'uuidv7';

import type { IAccountRequest, IAccount } from '../types/interfaces/interfaceAccount.ts';
import { ValidationError, AuthError, ForbiddenError } from '../appError.ts';
import RepoAccount from '../repositories/repoAccount.ts';
import SecurityService from './securityService.ts';
import type { DeviceInfo } from '../types/interfaces/interfaceToken.ts';

const repoAccount = new RepoAccount();

class AuthService {
   static register = async (data: IAccountRequest) => {
      const isUsernameExists = await repoAccount.existsByUsername(data.username);
      if (isUsernameExists) {
         throw new ValidationError('Username đã tồn tại!');
      }

      const isEmailExists = await repoAccount.existsByEmail(data.email);
      if (isEmailExists) {
         throw new ValidationError('Email đã tồn tại!');
      }

      const cloneID = uuidv7();
      const password_hash = await bcrypt.hash(data.password, 10);

      const newAccount: IAccount = {
         ac_id: cloneID,
         username: data.username,
         password_hash,
         email: data.email,
      };

      await repoAccount.createAccount(newAccount);
      return {
         data: {
            ac_id: newAccount.ac_id,
            username: newAccount.username,
            email: newAccount.email,
            status: newAccount.status || 'pending',
         },
      };
   };

   static login = async (
      data: {
         identifier: string;
         password: string;
         remember: boolean;
      },
      deviceInfo: DeviceInfo
   ) => {
      const result = await repoAccount.findByIdentifier(data.identifier);
      if (!result) {
         throw new ValidationError('Tên đăng nhập hoặc Email không tồn tại!');
      }
      const { account, role_account } = result;

      const isMatch = await bcrypt.compare(data.password, account.password_hash);

      if (!isMatch) {
         throw new AuthError('Sai tài khoản hoặc mật khẩu!');
      }

      if (account.status === 'ban') {
         throw new ForbiddenError('Tài khoản đã bị đỉnh chỉ. Vui lòng liên hệ BQT!');
      }

      if (!deviceInfo.sessionId) {
         deviceInfo.sessionId = uuidv7();
      }

      const tokenPair = await SecurityService.createTokenPair(
         {
            userId: account.ac_id,
            username: account.username,
            email: account.email,
            role: role_account.role_id,
         },
         deviceInfo,
         {
            useProvidedSessionId: true,
         }
      );

      const timeOneDay = 24 * 60 * 60 * 1000;
      const timeRememberSession = data.remember ? 7 * timeOneDay : timeOneDay;

      return {
         account: {
            ac_id: account.ac_id,
            username: account.username,
            email: account.email,
            roles: role_account,
         },
         tokens: tokenPair,
         timeRememberSession,
      };
   };

   static refreshToken = async (refreshToken: string, deviceInfo: DeviceInfo) => {
      return await SecurityService.refreshToken(refreshToken, deviceInfo);
   };

   static checkIdentifier = async (identifier: string) => {
      const trimmed = identifier.trim();
      if (!trimmed) return null;

      let typeCheck = identifier.includes('@') ? 'email' : 'username';

      if (typeCheck === 'email') {
         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         if (!emailRegex.test(trimmed)) {
            throw new ValidationError('Email không xác định, vui lòng thử lại!');
         }
         return await repoAccount.existsByEmail(trimmed);
      }
      const usernameRegex = /^[a-zA-Z0-9_]{6,30}$/;
      if (!usernameRegex.test(trimmed)) {
         throw new ValidationError('Username không xác định, vui lòng thử lại!');
      }

      return await repoAccount.existsByUsername(trimmed);
   };
}

export default AuthService;
