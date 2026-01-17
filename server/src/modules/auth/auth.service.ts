import {
   IAuthResponse,
   ILoginDTO,
   IRegisterDTO,
   ITokenPayload,
   SessionData,
} from '@/modules/auth/auth.interface';
import { IUser } from '@/modules/user/user.interface';
import { UserRepository } from '@/modules/user/user.repository';
import BaseResponse from '@/shared/base.response';
import envConfig from '@/shared/envConfig';
import { HashingService } from '@/shared/services/hashing.service';
import { JWTService } from '@/shared/services/jwt.service';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
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

      const authResponse = await this.authResponse(userInfo, deviceInfo);
      return BaseResponse.success(authResponse, 'Đăng nhập thành công', HttpStatus.OK);
   }

   private async authResponse(userData: ITokenPayload, deviceInfo: unknown) {
      const sessionId = uuidv7();
      const refreshToken = uuidv7();

      const timeLifeAccessToken = (envConfig.ACCESS_TOKEN_EXPIRE as StringValue) || '1h';
      const timeLifeRefreshToken = (envConfig.ACCESS_TOKEN_EXPIRE as StringValue) || '1h';
      const accessToken = await this.jwtService.signToken(
         userData,
         envConfig.ACCESS_TOKEN_SECRET,
         ms(timeLifeAccessToken)
      );

      await this.cacheManager.set(
         `user:${userData.userId}:session:${sessionId}`,
         deviceInfo,
         ms(timeLifeRefreshToken)
      );

      const hashedRefreshToken = await HashingService.hashValue(refreshToken);
      await this.cacheManager.set(
         `session:${sessionId}`,
         {
            refreshToken: hashedRefreshToken,
            user: userData,
         },
         ms(timeLifeRefreshToken)
      );

      const response: IAuthResponse = {
         user: userData,
         token: {
            accessToken: accessToken,
            refreshToken: refreshToken,
         },
         sessionId: sessionId,

         createAt: new Date().toISOString(),
      };

      return response;
   }

   async logout(sessionId: string) {
      const sessionRaw = await this.cacheManager.get(`session:${sessionId}`);

      if (!sessionRaw) {
         return BaseResponse.message('Đăng xuất thành công', HttpStatus.OK);
      }
      const sessionValue = (
         typeof sessionRaw === 'string' ? JSON.parse(sessionRaw) : sessionRaw
      ) as SessionData;

      await this.cacheManager.del(`user:${sessionValue.user.userId}:session:${sessionId}`);
      await this.cacheManager.del(`session:${sessionId}`);

      return BaseResponse.message('Đăng xuất thành công', HttpStatus.OK);
   }
}
