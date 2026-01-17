import { ITokenPayload } from '@/modules/auth/auth.interface';
import { UserRepository } from '@/modules/user/user.repository';
import BaseResponse from '@/shared/base.response';
import { JWTService } from '@/shared/services/jwt.service';
import { Body, Controller, Get, HttpStatus, Inject, Post } from '@nestjs/common';
import ms from 'ms';
import { uuidv7 } from 'uuidv7';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { RegisterValidation } from '@/modules/auth/auth.validation';
import { AuthService } from '@/modules/auth/auth.service';

@Controller('auth')
export class AuthController {
   constructor(
      private readonly authService: AuthService,
      private readonly jwtService: JWTService,
      private readonly userRepository: UserRepository,
      @Inject(CACHE_MANAGER) private cacheManager: Cache
   ) {}

   @Get('health')
   health() {
      return BaseResponse.message('Controller Auth Running ...', HttpStatus.OK);
   }

   @Post('check')
   async check() {
      const userInfo = await this.userRepository.getInfoUserForPayload(
         '019bcb3d-1e1b-7cdf-bc74-a9cefa875528'
      );
      if (userInfo) {
         const newPayload: ITokenPayload = {
            userId: userInfo.userId,
            status: userInfo.status,
            role: userInfo.role,

            createAt: new Date().toISOString(),
         };

         const sessionId = uuidv7();

         const newToken = await this.jwtService.signToken(newPayload, 'NQHxZeionDev', ms('1m'));

         const tokenData = await this.jwtService.verifyToken(newToken, 'NQHxZeionDev');

         await this.cacheManager.set(
            `user:${userInfo.userId}:session:${sessionId}`,
            newPayload,
            ms('1m')
         );

         return BaseResponse.success(
            { newToken, tokenData, sessionId },
            'Sign & Verify Token Successful ...',
            HttpStatus.OK
         );
      }

      return BaseResponse.message('Sign & Verify Token Failed ...', HttpStatus.UNAUTHORIZED);
   }

   @Post('register')
   register(@Body() registerBody: RegisterValidation) {
      return this.authService.register(registerBody);
   }
}
