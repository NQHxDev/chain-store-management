import envConfig from '@/shared/envConfig';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import ms, { StringValue } from 'ms';
import { map, Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
   intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
      return next.handle().pipe(
         map((data) => {
            const response = context.switchToHttp().getResponse();
            const timeLifeSession = (envConfig.REFRESH_TOKEN_EXPIRE as StringValue) || '7d';

            if (data.data?.token.accessToken && data.data?.token.refreshToken) {
               // eslint-disable-next-line @typescript-eslint/no-unsafe-call
               response.cookie('accessToken', data.data.token.accessToken, {
                  httpOnly: true,
                  secure: envConfig.NODE_ENV === 'production',
                  sameSite: envConfig.NODE_ENV === 'production' ? 'strict' : 'lax',
                  maxAge: ms(timeLifeSession),
               });

               // eslint-disable-next-line @typescript-eslint/no-unsafe-call
               response.cookie('refreshToken', data.data.token.refreshToken, {
                  httpOnly: true,
                  secure: envConfig.NODE_ENV === 'production',
                  sameSite: envConfig.NODE_ENV === 'production' ? 'strict' : 'lax',
                  maxAge: ms(timeLifeSession),
               });
            }

            if (data.data?.payload.sessionId) {
               // eslint-disable-next-line @typescript-eslint/no-unsafe-call
               response.cookie('sessionId', data.data.payload.sessionId, {
                  httpOnly: true,
                  secure: envConfig.NODE_ENV === 'production',
                  sameSite: envConfig.NODE_ENV === 'production' ? 'strict' : 'lax',
                  maxAge: ms(timeLifeSession),
               });
            }

            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return data;
         })
      );
   }
}

@Injectable()
export class AuthClearCookieInterceptor implements NestInterceptor {
   intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
      return next.handle().pipe(
         map((data) => {
            const response = context.switchToHttp().getResponse();

            //! SetOption giống với lúc cho vào Cookie
            const cookieOptions = {
               httpOnly: true,
               secure: envConfig.NODE_ENV === 'production',
               sameSite: envConfig.NODE_ENV === 'production' ? 'strict' : 'lax',
            };

            // Tiến hành xóa cookie
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            response.clearCookie('accessToken', cookieOptions);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            response.clearCookie('refreshToken', cookieOptions);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            response.clearCookie('sessionId', cookieOptions);

            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return data;
         })
      );
   }
}
