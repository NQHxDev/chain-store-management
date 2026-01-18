import { ITokenPayload } from '@/modules/auth/auth.interface';
import envConfig from '@/shared/envConfig';
import { JWTService } from '@/shared/services/jwt.service';
import {
   CanActivate,
   ExecutionContext,
   ForbiddenException,
   Injectable,
   NotFoundException,
   UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export abstract class BaseJwtGuard implements CanActivate {
   constructor(
      protected jwtService: JWTService,
      private cookieKey: 'accessToken' | 'refreshToken',
      private secret: string
   ) {}

   async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();

      const cookies = request.cookies || request.signedCookies;
      const tokenValue: string = cookies?.[this.cookieKey];

      if (!tokenValue) {
         throw new NotFoundException({
            statusCode: 404,
            message: 'Không tìm thấy Token',
            code: 'TOKEN_NOT_FOUND',
            suggested_action: this.cookieKey,
         });
      }

      try {
         const payload = await this.jwtService.verifyToken(tokenValue, this.secret);

         const tokenPayloadData: ITokenPayload = {
            userId: payload.userId,
            status: payload.status,
            role: payload.role,
            sessionId: payload.sessionId,
         };

         request['tokenPayload'] = tokenPayloadData;
         return true;
      } catch (error) {
         if (error.name === 'TokenExpiredError') {
            throw new UnauthorizedException({
               statusCode: 401,
               message: 'Token đã hết hạn',
               code: 'TOKEN_EXPIRED',
               suggested_action: this.cookieKey,
            });
         }
         throw new ForbiddenException('Token không hợp lệ');
      }
   }
}

@Injectable()
export class AccessTokenGuard extends BaseJwtGuard {
   constructor(jwtService: JWTService) {
      super(jwtService, 'accessToken', envConfig.ACCESS_TOKEN_SECRET);
   }
}

@Injectable()
export class RefreshTokenGuard extends BaseJwtGuard {
   constructor(jwtService: JWTService) {
      super(jwtService, 'refreshToken', envConfig.REFRESH_TOKEN_SECRET);
   }
}
