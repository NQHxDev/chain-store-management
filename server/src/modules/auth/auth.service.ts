import {
   IAuthResponse,
   ILoginDTO,
   IRegisterDTO,
   ISessionData,
   ITokenPayload,
} from '@/modules/auth/auth.interface';
import { IUser } from '@/modules/user/user.interface';
import { UserRepository } from '@/modules/user/user.repository';
import BaseResponse from '@/shared/base.response';
import envConfig from '@/shared/envConfig';
import { HashingService } from '@/shared/services/hashing.service';
import { JWTService } from '@/shared/services/jwt.service';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import ms, { StringValue } from 'ms';
import { uuidv7 } from 'uuidv7';

@Injectable()
export class AuthService {
   constructor(
      private readonly userRepository: UserRepository,
      private readonly jwtService: JWTService,
      @Inject(CACHE_MANAGER) private cacheManager: Cache
   ) {}

   async existingUsername(username: string): Promise<boolean> {
      const userId = await this.userRepository.getUserIdByUsername(username);

      return userId !== null;
   }

   async existingEmail(email: string): Promise<boolean> {
      const userId = await this.userRepository.getUserIdByEmail(email);

      return userId !== null;
   }

   async register(registerBody: IRegisterDTO) {
      if (registerBody.password !== registerBody.confirmPassword) {
         return BaseResponse.message(
            'Mật khẩu không khớp vui lòng thử lại',
            HttpStatus.BAD_REQUEST
         );
      }

      const isExistingEmail = await this.existingEmail(registerBody.email);
      const isExistingUsername = await this.existingUsername(registerBody.username);
      if (isExistingEmail || isExistingUsername) {
         console.log('NQH Log:', isExistingEmail, isExistingUsername);
         return BaseResponse.message('Email hoặc Username này đã tồn tại', HttpStatus.CONFLICT);
      }

      const userId = uuidv7();
      const hashedPassword = await HashingService.hashValue(registerBody.password);

      const newUser: IUser = {
         userId: userId,
         username: registerBody.username,
         email: registerBody.username,
         password: hashedPassword,
         status: 'inactive',
         roleId: 7,
      };

      const result = await this.userRepository.createUser(newUser);
      return BaseResponse.success(result, 'Đăng ký tài khoản thành công', HttpStatus.CREATED);
   }

   async login(loginBody: ILoginDTO, deviceInfo: unknown) {
      const isEmail = loginBody.identifier.includes('@');

      const userLogin = await this.userRepository.getInfoUserLogin(loginBody.identifier, isEmail);
      if (!userLogin) {
         return BaseResponse.message('Không tìm thấy Tài khoản này', HttpStatus.NOT_FOUND);
      }

      const isMatchPassword = await HashingService.verifyValue(
         userLogin.passwordHash,
         loginBody.password
      );

      if (!isMatchPassword) {
         return BaseResponse.message(
            'Tài khoản hoặc Mật khẩu không chính xác',
            HttpStatus.UNAUTHORIZED
         );
      }

      const userInfo = await this.userRepository.getInfoUserForPayload(userLogin.userId);
      if (!userInfo) {
         return BaseResponse.message('Không thể khởi tạo phiên đăng nhập', HttpStatus.UNAUTHORIZED);
      }
      const sessionId = uuidv7();

      const authResponse = await this.authResponse(sessionId, userInfo.userId, deviceInfo);
      return BaseResponse.success(authResponse, 'Đăng nhập thành công', HttpStatus.OK);
   }

   private async authResponse(sessionId: string, userId: string, deviceInfo: unknown) {
      const timeLifeRefreshToken = (envConfig.REFRESH_TOKEN_EXPIRE as StringValue) || '1h';

      const tokenPayload = await this.userRepository.getInfoUserForPayload(userId);
      if (!tokenPayload) {
         throw new NotFoundException('Không tìm thấy tài khoản để Refresh');
      }
      tokenPayload.sessionId = sessionId;

      const accessToken = await this.jwtService.signToken(
         tokenPayload,
         envConfig.ACCESS_TOKEN_SECRET,
         envConfig.ACCESS_TOKEN_EXPIRE
      );

      /**
       * Cache phiên đăng nhập cho 1 thiết bị
       * Có thể đăng nhập trên nhiều thiết bị cùng 1 lúc
       * Phù hợp với Đổi mật khẩu hay Logout trên nhiều thiết bị
       * Dễ Rotate hơn khi phát hiện thiết bị lạ
       */
      await this.cacheManager.set(
         `user:${tokenPayload.userId}:session:${sessionId}`,
         deviceInfo,
         ms(timeLifeRefreshToken)
      );

      // Rotate một RefreshToken mới nhằm đảm bảo an toàn hơn
      const refreshToken = uuidv7();
      // Hash Token lại trước khi Cache tăng tính bảo mật và tính toàn vẹn của Token
      const hashedRefreshToken = await HashingService.hashValue(refreshToken);

      /**
       * Khởi tạo 1 phiên đăng nhập mới
       * Lưu lại sessionId làm Key để sau này dễ tìm kiếm và Rotate
       * Kiểm soát tốt việc Token bị đánh cắp và tái sử dụng
       */
      await this.cacheManager.set(
         `session:${sessionId}`,
         {
            refreshTokenHash: hashedRefreshToken,
            user: tokenPayload,
         },
         ms(timeLifeRefreshToken)
      );

      const response: IAuthResponse = {
         payload: tokenPayload,
         token: {
            accessToken: accessToken,
            refreshToken: refreshToken,
         },

         createAt: new Date().toISOString(),
      };

      return response;
   }

   async logout(sessionId: string) {
      const sessionRaw = await this.cacheManager.get(`session:${sessionId}`);

      if (!sessionRaw) {
         return BaseResponse.message('Đăng xuất thành công', HttpStatus.NO_CONTENT);
      }
      const sessionValue = (
         typeof sessionRaw === 'string' ? JSON.parse(sessionRaw) : sessionRaw
      ) as ISessionData;

      await this.cacheManager.del(`user:${sessionValue.user.userId}:session:${sessionId}`);
      await this.cacheManager.del(`session:${sessionId}`);

      return BaseResponse.message('Đăng xuất thành công', HttpStatus.NO_CONTENT);
   }

   async refresh(sessionId: string, refreshToken: string, deviceInfo: unknown) {
      const sessionData: ISessionData | undefined = await this.cacheManager.get(
         `session:${sessionId}`
      );
      if (!sessionData) {
         console.log('NQHxLog sessionData:', sessionData);
         return await this.logout(sessionId);
      }

      const isMatchToken = await HashingService.verifyValue(
         sessionData.refreshTokenHash,
         refreshToken
      );
      if (!isMatchToken) {
         return await this.logout(sessionId);
      }

      const authResponse = await this.authResponse(sessionId, sessionData.user.userId, deviceInfo);

      return BaseResponse.success(authResponse, 'Refresh thành công', HttpStatus.OK);
   }

   async access(tokenPayload: ITokenPayload) {
      const sessionId = tokenPayload.sessionId;
      if (!sessionId) {
         return BaseResponse.message('SessionId không xác định', HttpStatus.NOT_FOUND);
      }

      const sessionData: ISessionData | undefined = await this.cacheManager.get(
         `session:${sessionId}`
      );
      if (!sessionData) {
         return await this.logout(sessionId);
      }

      const payload = await this.userRepository.getInfoUserForPayload(sessionData.user.userId);
      if (!payload) {
         return BaseResponse.message('Không tìm thấy tài khoản để Refresh', HttpStatus.NOT_FOUND);
      }
      payload.sessionId = sessionId;

      const response: IAuthResponse = {
         payload: payload,
         createAt: new Date().toISOString(),
      };
      return BaseResponse.success(response, 'Refresh thành công', HttpStatus.OK);
   }
}
