import BaseResponse from '@/shared/base.response';
import {
   Body,
   Controller,
   Delete,
   Get,
   HttpStatus,
   Inject,
   Post,
   Put,
   UseGuards,
   UseInterceptors,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { LoginValidation, RegisterValidation } from '@/modules/auth/auth.validation';
import { AuthService } from '@/modules/auth/auth.service';
import { AuthClearCookieInterceptor, AuthInterceptor } from '@/modules/auth/auth.interceptor';
import {
   GetDeviceInfo,
   GetRefreshToken,
   GetSessionId,
   GetTokenPayload,
} from '@/modules/auth/auth.decorator';
import { AccessTokenGuard } from '@/shared/guards/token.guard';
import type { ITokenPayload } from '@/modules/auth/auth.interface';

@Controller('auth')
export class AuthController {
   constructor(
      private readonly authService: AuthService,
      @Inject(CACHE_MANAGER) private cacheManager: Cache
   ) {}

   @Get('health')
   health() {
      return BaseResponse.message('Controller Auth Running ...', HttpStatus.OK);
   }

   @Post('check')
   check(
      // @GetSessionId() sessionId: string,
      @GetDeviceInfo() deviceInfo: unknown,
      @GetRefreshToken() refreshToken: string
   ) {
      return BaseResponse.success(deviceInfo, `RefreshToken: ${refreshToken}`, HttpStatus.OK);
   }

   @Post('register')
   register(@Body() registerBody: RegisterValidation) {
      return this.authService.register(registerBody);
   }

   @UseInterceptors(AuthInterceptor)
   @Post('login')
   login(@Body() loginBody: LoginValidation, @GetDeviceInfo() deviceInfo: unknown) {
      return this.authService.login(loginBody, deviceInfo);
   }

   @UseInterceptors(AuthClearCookieInterceptor)
   @Delete('logout')
   logout(@GetSessionId() sessionId: string) {
      return this.authService.logout(sessionId);
   }

   @UseGuards(AccessTokenGuard)
   @Put('access')
   access(@GetTokenPayload() tokenPayload: ITokenPayload) {
      return this.authService.access(tokenPayload);
   }

   @UseInterceptors(AuthInterceptor)
   @Put('refresh')
   refresh(
      @GetSessionId() sessionId: string,
      @GetRefreshToken() refreshToken: string,
      @GetDeviceInfo() deviceInfo: unknown
   ) {
      return this.authService.refresh(sessionId, refreshToken, deviceInfo);
   }
}
